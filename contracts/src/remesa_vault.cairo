#[starknet::contract]
mod RemesaVault {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::security::reentrancy_guard::ReentrancyGuardComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: ReentrancyGuardComponent, storage: reentrancy_guard, event: ReentrancyGuardEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl ReentrancyGuardInternalImpl = ReentrancyGuardComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        // Core storage
        total_volume: u256,
        total_transactions: u256,
        
        // User balances
        balances: LegacyMap<ContractAddress, u256>,
        
        // Family vault configuration
        family_members: LegacyMap<(ContractAddress, u256), ContractAddress>, // (owner, index) -> member
        family_count: LegacyMap<ContractAddress, u256>,
        vault_codes: LegacyMap<ContractAddress, felt252>, // Emergency code
        
        // Transaction tracking
        pending_transfers: LegacyMap<u256, Transfer>,
        transfer_nonce: u256,
        
        // Fee configuration
        platform_fee_bps: u256, // Basis points (0.5% = 50)
        fee_collector: ContractAddress,
        
        // Supported tokens
        supported_tokens: LegacyMap<ContractAddress, bool>,
        
        // Components
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        reentrancy_guard: ReentrancyGuardComponent::Storage,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Transfer {
        from: ContractAddress,
        to: ContractAddress,
        amount: u256,
        token: ContractAddress,
        timestamp: u64,
        status: TransferStatus,
        ai_score: u8, // AI fraud score 0-100
    }

    #[derive(Drop, Serde, starknet::Store)]
    enum TransferStatus {
        Pending,
        Completed,
        Cancelled,
        FraudBlocked,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TransferInitiated: TransferInitiated,
        TransferCompleted: TransferCompleted,
        FraudDetected: FraudDetected,
        FamilyMemberAdded: FamilyMemberAdded,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        ReentrancyGuardEvent: ReentrancyGuardComponent::Event,
    }

    #[derive(Drop, starknet::Event)]
    struct TransferInitiated {
        transfer_id: u256,
        from: ContractAddress,
        to: ContractAddress,
        amount: u256,
        token: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct TransferCompleted {
        transfer_id: u256,
        fee_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct FraudDetected {
        transfer_id: u256,
        ai_score: u8,
        reason: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct FamilyMemberAdded {
        owner: ContractAddress,
        member: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        fee_collector: ContractAddress,
        platform_fee_bps: u256,
    ) {
        self.ownable.initializer(owner);
        self.fee_collector.write(fee_collector);
        self.platform_fee_bps.write(platform_fee_bps); // 50 = 0.5%
    }

    #[abi(embed_v0)]
    impl RemesaVaultImpl of super::IRemesaVault<ContractState> {
        // Initialize transfer with AI fraud check
        fn initiate_transfer(
            ref self: ContractState,
            to: ContractAddress,
            amount: u256,
            token: ContractAddress,
            ai_score: u8, // Passed from frontend AI analysis
        ) -> u256 {
            self.reentrancy_guard.start();
            
            let caller = get_caller_address();
            assert(self.supported_tokens.read(token), 'Token not supported');
            assert(amount > 0, 'Amount must be positive');
            
            // AI fraud check
            if ai_score > 80 {
                let transfer_id = self.transfer_nonce.read();
                
                self.emit(FraudDetected {
                    transfer_id,
                    ai_score,
                    reason: 'HIGH_RISK_PATTERN',
                });
                
                self.reentrancy_guard.end();
                return 0; // Return 0 to indicate fraud block
            }

            // Create transfer record
            let transfer_id = self.transfer_nonce.read();
            let transfer = Transfer {
                from: caller,
                to,
                amount,
                token,
                timestamp: get_block_timestamp(),
                status: TransferStatus::Pending,
                ai_score,
            };

            self.pending_transfers.write(transfer_id, transfer);
            self.transfer_nonce.write(transfer_id + 1);

            // Transfer tokens to contract
            let token_dispatcher = IERC20Dispatcher { contract_address: token };
            token_dispatcher.transfer_from(caller, starknet::get_contract_address(), amount);

            self.emit(TransferInitiated {
                transfer_id,
                from: caller,
                to,
                amount,
                token,
            });

            self.reentrancy_guard.end();
            transfer_id
        }

        // Complete transfer after confirmations
        fn complete_transfer(
            ref self: ContractState,
            transfer_id: u256,
            family_code: felt252, // Optional family vault code
        ) {
            self.reentrancy_guard.start();
            
            let mut transfer = self.pending_transfers.read(transfer_id);
            assert(transfer.status == TransferStatus::Pending, 'Invalid status');
            
            let caller = get_caller_address();
            
            // Check family vault code if recipient has one set
            let vault_code = self.vault_codes.read(transfer.to);
            if vault_code != 0 {
                assert(family_code == vault_code, 'Invalid family code');
            }

            // Calculate fee
            let fee_amount = (transfer.amount * self.platform_fee_bps.read()) / 10000;
            let recipient_amount = transfer.amount - fee_amount;

            // Transfer to recipient
            let token_dispatcher = IERC20Dispatcher { contract_address: transfer.token };
            token_dispatcher.transfer(transfer.to, recipient_amount);
            
            // Transfer fee to collector
            if fee_amount > 0 {
                token_dispatcher.transfer(self.fee_collector.read(), fee_amount);
            }

            // Update state
            transfer.status = TransferStatus::Completed;
            self.pending_transfers.write(transfer_id, transfer);
            
            self.total_volume.write(self.total_volume.read() + transfer.amount);
            self.total_transactions.write(self.total_transactions.read() + 1);

            self.emit(TransferCompleted {
                transfer_id,
                fee_amount,
            });

            self.reentrancy_guard.end();
        }

        // Add family member for vault protection
        fn add_family_member(
            ref self: ContractState,
            member: ContractAddress,
        ) {
            let caller = get_caller_address();
            let count = self.family_count.read(caller);
            
            self.family_members.write((caller, count), member);
            self.family_count.write(caller, count + 1);

            self.emit(FamilyMemberAdded {
                owner: caller,
                member,
            });
        }

        // Set emergency vault code
        fn set_vault_code(
            ref self: ContractState,
            code: felt252,
        ) {
            let caller = get_caller_address();
            self.vault_codes.write(caller, code);
        }

        // View functions
        fn get_transfer(self: @ContractState, transfer_id: u256) -> Transfer {
            self.pending_transfers.read(transfer_id)
        }

        fn get_platform_stats(self: @ContractState) -> (u256, u256) {
            (self.total_volume.read(), self.total_transactions.read())
        }

        fn is_family_member(
            self: @ContractState,
            owner: ContractAddress,
            member: ContractAddress,
        ) -> bool {
            let count = self.family_count.read(owner);
            let mut i: u256 = 0;
            loop {
                if i >= count {
                    break false;
                }
                if self.family_members.read((owner, i)) == member {
                    break true;
                }
                i += 1;
            }
        }

        // Admin functions
        fn add_supported_token(
            ref self: ContractState,
            token: ContractAddress,
        ) {
            self.ownable.assert_only_owner();
            self.supported_tokens.write(token, true);
        }

        fn update_platform_fee(
            ref self: ContractState,
            new_fee_bps: u256,
        ) {
            self.ownable.assert_only_owner();
            assert(new_fee_bps <= 200, 'Fee too high'); // Max 2%
            self.platform_fee_bps.write(new_fee_bps);
        }
    }
}

#[starknet::interface]
trait IRemesaVault<TContractState> {
    fn initiate_transfer(
        ref self: TContractState,
        to: ContractAddress,
        amount: u256,
        token: ContractAddress,
        ai_score: u8,
    ) -> u256;
    
    fn complete_transfer(
        ref self: TContractState,
        transfer_id: u256,
        family_code: felt252,
    );
    
    fn add_family_member(ref self: TContractState, member: ContractAddress);
    fn set_vault_code(ref self: TContractState, code: felt252);
    fn get_transfer(self: @TContractState, transfer_id: u256) -> Transfer;
    fn get_platform_stats(self: @TContractState) -> (u256, u256);
    fn is_family_member(
        self: @TContractState,
        owner: ContractAddress,
        member: ContractAddress,
    ) -> bool;
    fn add_supported_token(ref self: TContractState, token: ContractAddress);
    fn update_platform_fee(ref self: TContractState, new_fee_bps: u256);
}

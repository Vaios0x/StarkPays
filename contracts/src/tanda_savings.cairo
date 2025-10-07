#[starknet::contract]
mod TandaSavings {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::security::pausable::PausableComponent;
    use openzeppelin::security::reentrancyguard::ReentrancyGuardComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: PausableComponent, storage: pausable, event: PausableEvent);
    component!(path: ReentrancyGuardComponent, storage: reentrancy, event: ReentrancyEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl PausableInternalImpl = PausableComponent::InternalImpl<ContractState>;
    impl ReentrancyInternalImpl = ReentrancyGuardComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        // Tanda management
        tandas: LegacyMap<u256, Tanda>,
        tanda_count: u256,
        user_tandas: LegacyMap<ContractAddress, u256>, // user -> tanda_id
        tanda_members: LegacyMap<(u256, u256), ContractAddress>, // (tanda_id, index) -> member
        member_count: LegacyMap<u256, u256>, // tanda_id -> member_count
        
        // Contributions
        contributions: LegacyMap<(u256, ContractAddress), Contribution>,
        contribution_count: LegacyMap<u256, u256>, // tanda_id -> contribution_count
        
        // Payouts
        payouts: LegacyMap<(u256, u256), Payout>, // (tanda_id, round) -> payout
        payout_count: LegacyMap<u256, u256>, // tanda_id -> payout_count
        
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        reentrancy: ReentrancyGuardComponent::Storage,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Tanda {
        id: u256,
        creator: ContractAddress,
        name: felt252,
        description: felt252,
        contribution_amount: u256,
        frequency_days: u256,
        max_members: u256,
        status: TandaStatus,
        created_at: u64,
        token: ContractAddress,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Contribution {
        member: ContractAddress,
        amount: u256,
        round: u256,
        timestamp: u64,
        status: ContributionStatus,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Payout {
        recipient: ContractAddress,
        amount: u256,
        round: u256,
        timestamp: u64,
        status: PayoutStatus,
    }

    #[derive(Drop, Serde, starknet::Store)]
    enum TandaStatus {
        Active,
        Completed,
        Cancelled,
    }

    #[derive(Drop, Serde, starknet::Store)]
    enum ContributionStatus {
        Pending,
        Completed,
        Late,
    }

    #[derive(Drop, Serde, starknet::Store)]
    enum PayoutStatus {
        Pending,
        Completed,
        Failed,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TandaCreated: TandaCreated,
        MemberJoined: MemberJoined,
        ContributionMade: ContributionMade,
        PayoutExecuted: PayoutExecuted,
        TandaCompleted: TandaCompleted,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        ReentrancyEvent: ReentrancyGuardComponent::Event,
    }

    #[derive(Drop, starknet::Event)]
    struct TandaCreated {
        tanda_id: u256,
        creator: ContractAddress,
        name: felt252,
        contribution_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct MemberJoined {
        tanda_id: u256,
        member: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct ContributionMade {
        tanda_id: u256,
        member: ContractAddress,
        amount: u256,
        round: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct PayoutExecuted {
        tanda_id: u256,
        recipient: ContractAddress,
        amount: u256,
        round: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct TandaCompleted {
        tanda_id: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl TandaSavingsImpl of super::ITandaSavings<ContractState> {
        fn create_tanda(
            ref self: ContractState,
            name: felt252,
            description: felt252,
            contribution_amount: u256,
            frequency_days: u256,
            max_members: u256,
            token: ContractAddress,
        ) -> u256 {
            self.pausable.assert_not_paused();
            
            let caller = get_caller_address();
            let tanda_id = self.tanda_count.read();
            
            let tanda = Tanda {
                id: tanda_id,
                creator: caller,
                name,
                description,
                contribution_amount,
                frequency_days,
                max_members,
                status: TandaStatus::Active,
                created_at: get_block_timestamp(),
                token,
            };
            
            self.tandas.write(tanda_id, tanda);
            self.tanda_count.write(tanda_id + 1);
            
            // Creator joins automatically
            self.member_count.write(tanda_id, 1);
            self.tanda_members.write((tanda_id, 0), caller);
            self.user_tandas.write(caller, tanda_id);
            
            self.emit(TandaCreated {
                tanda_id,
                creator: caller,
                name,
                contribution_amount,
            });
            
            self.emit(MemberJoined {
                tanda_id,
                member: caller,
            });
            
            tanda_id
        }

        fn join_tanda(
            ref self: ContractState,
            tanda_id: u256,
        ) {
            self.pausable.assert_not_paused();
            
            let caller = get_caller_address();
            let mut tanda = self.tandas.read(tanda_id);
            
            assert(tanda.status == TandaStatus::Active, 'Tanda not active');
            assert(self.member_count.read(tanda_id) < tanda.max_members, 'Tanda full');
            
            let member_index = self.member_count.read(tanda_id);
            self.tanda_members.write((tanda_id, member_index), caller);
            self.member_count.write(tanda_id, member_index + 1);
            self.user_tandas.write(caller, tanda_id);
            
            self.emit(MemberJoined {
                tanda_id,
                member: caller,
            });
        }

        fn contribute(
            ref self: ContractState,
            tanda_id: u256,
        ) {
            self.pausable.assert_not_paused();
            self.reentrancy.start();
            
            let caller = get_caller_address();
            let tanda = self.tandas.read(tanda_id);
            
            assert(tanda.status == TandaStatus::Active, 'Tanda not active');
            assert(self.is_member(tanda_id, caller), 'Not a member');
            
            let round = self.contribution_count.read(tanda_id);
            let contribution = Contribution {
                member: caller,
                amount: tanda.contribution_amount,
                round,
                timestamp: get_block_timestamp(),
                status: ContributionStatus::Pending,
            };
            
            // Transfer tokens
            let token_dispatcher = IERC20Dispatcher { contract_address: tanda.token };
            token_dispatcher.transfer_from(caller, starknet::get_contract_address(), tanda.contribution_amount);
            
            self.contributions.write((tanda_id, round), contribution);
            self.contribution_count.write(tanda_id, round + 1);
            
            self.emit(ContributionMade {
                tanda_id,
                member: caller,
                amount: tanda.contribution_amount,
                round,
            });
            
            self.reentrancy.end();
        }

        fn execute_payout(
            ref self: ContractState,
            tanda_id: u256,
            round: u256,
        ) {
            self.pausable.assert_not_paused();
            self.reentrancy.start();
            
            let caller = get_caller_address();
            let tanda = self.tandas.read(tanda_id);
            
            assert(tanda.status == TandaStatus::Active, 'Tanda not active');
            assert(caller == tanda.creator, 'Only creator can execute payouts');
            
            let member_index = round % self.member_count.read(tanda_id);
            let recipient = self.tanda_members.read((tanda_id, member_index));
            
            let total_contributions = self.contribution_count.read(tanda_id);
            let payout_amount = total_contributions * tanda.contribution_amount;
            
            let payout = Payout {
                recipient,
                amount: payout_amount,
                round,
                timestamp: get_block_timestamp(),
                status: PayoutStatus::Pending,
            };
            
            // Transfer to recipient
            let token_dispatcher = IERC20Dispatcher { contract_address: tanda.token };
            token_dispatcher.transfer(recipient, payout_amount);
            
            payout.status = PayoutStatus::Completed;
            self.payouts.write((tanda_id, round), payout);
            self.payout_count.write(tanda_id, round + 1);
            
            self.emit(PayoutExecuted {
                tanda_id,
                recipient,
                amount: payout_amount,
                round,
            });
            
            // Check if tanda is complete
            if round + 1 >= self.member_count.read(tanda_id) {
                let mut tanda = self.tandas.read(tanda_id);
                tanda.status = TandaStatus::Completed;
                self.tandas.write(tanda_id, tanda);
                
                self.emit(TandaCompleted { tanda_id });
            }
            
            self.reentrancy.end();
        }

        // View functions
        fn get_tanda(self: @ContractState, tanda_id: u256) -> Tanda {
            self.tandas.read(tanda_id)
        }

        fn get_member_count(self: @ContractState, tanda_id: u256) -> u256 {
            self.member_count.read(tanda_id)
        }

        fn is_member(
            self: @ContractState,
            tanda_id: u256,
            member: ContractAddress,
        ) -> bool {
            let count = self.member_count.read(tanda_id);
            let mut i: u256 = 0;
            loop {
                if i >= count {
                    break false;
                }
                if self.tanda_members.read((tanda_id, i)) == member {
                    break true;
                }
                i += 1;
            }
        }

        fn get_contribution(
            self: @ContractState,
            tanda_id: u256,
            round: u256,
        ) -> Contribution {
            self.contributions.read((tanda_id, round))
        }

        fn get_payout(
            self: @ContractState,
            tanda_id: u256,
            round: u256,
        ) -> Payout {
            self.payouts.read((tanda_id, round))
        }
    }
}

#[starknet::interface]
trait ITandaSavings<TContractState> {
    fn create_tanda(
        ref self: TContractState,
        name: felt252,
        description: felt252,
        contribution_amount: u256,
        frequency_days: u256,
        max_members: u256,
        token: ContractAddress,
    ) -> u256;
    
    fn join_tanda(ref self: TContractState, tanda_id: u256);
    fn contribute(ref self: TContractState, tanda_id: u256);
    fn execute_payout(ref self: TContractState, tanda_id: u256, round: u256);
    
    fn get_tanda(self: @TContractState, tanda_id: u256) -> Tanda;
    fn get_member_count(self: @TContractState, tanda_id: u256) -> u256;
    fn is_member(
        self: @TContractState,
        tanda_id: u256,
        member: ContractAddress,
    ) -> bool;
    fn get_contribution(
        self: @TContractState,
        tanda_id: u256,
        round: u256,
    ) -> Contribution;
    fn get_payout(
        self: @TContractState,
        tanda_id: u256,
        round: u256,
    ) -> Payout;
}

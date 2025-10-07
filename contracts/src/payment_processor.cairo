#[starknet::contract]
mod PaymentProcessor {
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
        total_volume: u256,
        total_transactions: u256,
        merchant_balances: LegacyMap<ContractAddress, u256>,
        platform_fee_bps: u256,
        
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        reentrancy: ReentrancyGuardComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PaymentProcessed: PaymentProcessed,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        ReentrancyEvent: ReentrancyGuardComponent::Event,
    }

    #[derive(Drop, starknet::Event)]
    struct PaymentProcessed {
        from: ContractAddress,
        to: ContractAddress,
        amount: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
        self.platform_fee_bps.write(50); // 0.5% fee
    }

    #[abi(embed_v0)]
    impl PaymentProcessorImpl of super::IPaymentProcessor<ContractState> {
        fn process_payment(
            ref self: ContractState,
            merchant: ContractAddress,
            amount: u256,
            token: ContractAddress,
        ) {
            self.pausable.assert_not_paused();
            self.reentrancy.start();
            
            let caller = get_caller_address();
            let fee = (amount * self.platform_fee_bps.read()) / 10000;
            let merchant_amount = amount - fee;

            // Transfer
            let token_dispatcher = IERC20Dispatcher { contract_address: token };
            token_dispatcher.transfer_from(caller, merchant, merchant_amount);

            // Update stats
            self.total_volume.write(self.total_volume.read() + amount);
            self.total_transactions.write(self.total_transactions.read() + 1);

            self.emit(PaymentProcessed { from: caller, to: merchant, amount });
            self.reentrancy.end();
        }

        fn get_stats(self: @ContractState) -> (u256, u256) {
            (self.total_volume.read(), self.total_transactions.read())
        }
    }
}

#[starknet::interface]
trait IPaymentProcessor<TContractState> {
    fn process_payment(
        ref self: TContractState,
        merchant: ContractAddress,
        amount: u256,
        token: ContractAddress,
    );
    fn get_stats(self: @TContractState) -> (u256, u256);
}

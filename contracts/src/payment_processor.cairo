use starknet::ContractAddress;

#[starknet::interface]
pub trait IPaymentProcessor<TContractState> {
    fn process_payment(ref self: TContractState, merchant: ContractAddress, amount: u256);
    fn get_stats(self: @TContractState) -> (u256, u256);
}

#[starknet::contract]
pub mod PaymentProcessor {
use starknet::ContractAddress;
use starknet::get_caller_address;
use starknet::storage::StoragePointerReadAccess;
use starknet::storage::StoragePointerWriteAccess;

    #[storage]
    pub struct Storage {
        total_volume: u256,
        total_transactions: u256,
        platform_fee_bps: u256,
        owner: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        PaymentProcessed: PaymentProcessed,
    }

    #[derive(Drop, starknet::Event)]
    pub struct PaymentProcessed {
        pub from: ContractAddress,
        pub to: ContractAddress,
        pub amount: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
        self.platform_fee_bps.write(50); // 0.5% fee
    }

    #[abi(embed_v0)]
    pub impl PaymentProcessorImpl of super::IPaymentProcessor<ContractState> {
        fn process_payment(ref self: ContractState, merchant: ContractAddress, amount: u256) {
            let caller = get_caller_address();
            
            // Update stats
            self.total_volume.write(self.total_volume.read() + amount);
            self.total_transactions.write(self.total_transactions.read() + 1);

            self.emit(Event::PaymentProcessed(PaymentProcessed { 
                from: caller, 
                to: merchant, 
                amount 
            }));
        }

        fn get_stats(self: @ContractState) -> (u256, u256) {
            (self.total_volume.read(), self.total_transactions.read())
        }
    }
}
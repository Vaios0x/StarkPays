use starknet::ContractAddress;

#[starknet::interface]
pub trait IRemesaVault<TContractState> {
    fn initiate_transfer(ref self: TContractState, to: ContractAddress, amount: u256);
    fn complete_transfer(ref self: TContractState, to: ContractAddress, amount: u256);
    fn get_platform_stats(self: @TContractState) -> (u256, u256);
    fn update_platform_fee(ref self: TContractState, new_fee_bps: u256);
}

#[starknet::contract]
pub mod RemesaVault {
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
        TransferInitiated: TransferInitiated,
        TransferCompleted: TransferCompleted,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TransferInitiated {
        pub from: ContractAddress,
        pub to: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TransferCompleted {
        pub from: ContractAddress,
        pub to: ContractAddress,
        pub amount: u256,
        pub fee_amount: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, platform_fee_bps: u256) {
        self.owner.write(owner);
        self.platform_fee_bps.write(platform_fee_bps);
    }

    #[abi(embed_v0)]
    pub impl RemesaVaultImpl of super::IRemesaVault<ContractState> {
        fn initiate_transfer(ref self: ContractState, to: ContractAddress, amount: u256) {
            let caller = get_caller_address();
            assert(amount > 0, 'Amount > 0');

            self.emit(Event::TransferInitiated(TransferInitiated {
                from: caller,
                to,
                amount,
            }));
        }

        fn complete_transfer(ref self: ContractState, to: ContractAddress, amount: u256) {
            let caller = get_caller_address();
            
            // Calculate fee
            let fee_amount = (amount * self.platform_fee_bps.read()) / 10000;
            let _recipient_amount = amount - fee_amount;

            self.total_volume.write(self.total_volume.read() + amount);
            self.total_transactions.write(self.total_transactions.read() + 1);

            self.emit(Event::TransferCompleted(TransferCompleted {
                from: caller,
                to,
                amount,
                fee_amount,
            }));
        }

        fn get_platform_stats(self: @ContractState) -> (u256, u256) {
            (self.total_volume.read(), self.total_transactions.read())
        }

        fn update_platform_fee(ref self: ContractState, new_fee_bps: u256) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Only owner');
            assert(new_fee_bps <= 200, 'Fee too high'); // Max 2%
            self.platform_fee_bps.write(new_fee_bps);
        }
    }
}
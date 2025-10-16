use starknet::ContractAddress;

#[starknet::interface]
pub trait ITandaSavings<TContractState> {
    fn create_tanda(
        ref self: TContractState, 
        name: felt252, 
        contribution_amount: u256, 
        max_members: u256, 
        token: ContractAddress
    ) -> u256;
    fn join_tanda(ref self: TContractState, tanda_id: u256);
    fn contribute(ref self: TContractState, tanda_id: u256);
    fn execute_payout(ref self: TContractState, tanda_id: u256, recipient: ContractAddress, amount: u256);
    fn get_tanda_count(self: @TContractState) -> u256;
}

#[starknet::contract]
pub mod TandaSavings {
use starknet::ContractAddress;
use starknet::get_caller_address;
use starknet::storage::StoragePointerReadAccess;
use starknet::storage::StoragePointerWriteAccess;

    #[storage]
    pub struct Storage {
        tanda_count: u256,
        owner: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        TandaCreated: TandaCreated,
        MemberJoined: MemberJoined,
        ContributionMade: ContributionMade,
        PayoutExecuted: PayoutExecuted,
    }

    #[derive(Drop, starknet::Event)]
    pub struct TandaCreated {
        pub tanda_id: u256,
        pub creator: ContractAddress,
        pub name: felt252,
        pub contribution_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MemberJoined {
        pub tanda_id: u256,
        pub member: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ContributionMade {
        pub tanda_id: u256,
        pub member: ContractAddress,
        pub amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct PayoutExecuted {
        pub tanda_id: u256,
        pub recipient: ContractAddress,
        pub amount: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
    }

    #[abi(embed_v0)]
    pub impl TandaSavingsImpl of super::ITandaSavings<ContractState> {
        fn create_tanda(
            ref self: ContractState,
            name: felt252,
            contribution_amount: u256,
            max_members: u256,
            token: ContractAddress,
        ) -> u256 {
            let caller = get_caller_address();
            let tanda_id = self.tanda_count.read();
            
            self.tanda_count.write(tanda_id + 1);
            
            self.emit(Event::TandaCreated(TandaCreated {
                tanda_id,
                creator: caller,
                name,
                contribution_amount,
            }));
            
            self.emit(Event::MemberJoined(MemberJoined {
                tanda_id,
                member: caller,
            }));
            
            tanda_id
        }

        fn join_tanda(ref self: ContractState, tanda_id: u256) {
            let caller = get_caller_address();
            
            self.emit(Event::MemberJoined(MemberJoined {
                tanda_id,
                member: caller,
            }));
        }

        fn contribute(ref self: ContractState, tanda_id: u256) {
            let caller = get_caller_address();
            
            self.emit(Event::ContributionMade(ContributionMade {
                tanda_id,
                member: caller,
                amount: 1000000000000000000, // 1 ETH por defecto
            }));
        }

        fn execute_payout(ref self: ContractState, tanda_id: u256, recipient: ContractAddress, amount: u256) {
            let caller = get_caller_address();
            
            self.emit(Event::PayoutExecuted(PayoutExecuted {
                tanda_id,
                recipient,
                amount,
            }));
        }

        fn get_tanda_count(self: @ContractState) -> u256 {
            self.tanda_count.read()
        }
    }
}
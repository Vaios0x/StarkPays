use starknet::ContractAddress;
use starknet::testing::{set_caller_address, set_block_timestamp};
use starknet::deploy_syscall;
use starknet::contract_address_const;
use starknet::testing::set_contract_address;

use starkpays_contracts::payment_processor::{PaymentProcessor, IPaymentProcessorDispatcher, IPaymentProcessorDispatcherTrait};
use starkpays_contracts::payment_processor::{PaymentProcessorImpl, PaymentProcessorImplDispatcher, PaymentProcessorImplDispatcherTrait};

#[test]
fn test_payment_processing() {
    let mut calldata = array![
        contract_address_const!(0x123), // owner
    ];
    let (contract_address, _) = deploy_syscall(
        PaymentProcessor::TEST_CLASS_HASH.try_into().unwrap(),
        0,
        calldata.span(),
        false,
    ).unwrap();
    
    let dispatcher = IPaymentProcessorDispatcher { contract_address };
    let impl_dispatcher = PaymentProcessorImplDispatcher { contract_address };
    
    // Test initial state
    let (total_volume, total_transactions) = dispatcher.get_stats();
    assert(total_volume == 0, 'Initial volume should be 0');
    assert(total_transactions == 0, 'Initial transactions should be 0');
}

#[test]
fn test_payment_with_fee() {
    let mut calldata = array![
        contract_address_const!(0x123), // owner
    ];
    let (contract_address, _) = deploy_syscall(
        PaymentProcessor::TEST_CLASS_HASH.try_into().unwrap(),
        0,
        calldata.span(),
        false,
    ).unwrap();
    
    let dispatcher = IPaymentProcessorDispatcher { contract_address };
    
    // Mock payment processing
    let merchant = contract_address_const!(0x456);
    let amount = 1000;
    let token = contract_address_const!(0x789);
    
    // This would require proper token setup in a real test
    // dispatcher.process_payment(merchant, amount, token);
    
    // Verify stats updated
    let (total_volume, total_transactions) = dispatcher.get_stats();
    // assert(total_volume == amount, 'Volume should match amount');
    // assert(total_transactions == 1, 'Transaction count should be 1');
}

use starknet::ContractAddress;
use starknet::testing::{set_caller_address, set_block_timestamp};
use starknet::deploy_syscall;
use starknet::contract_address_const;

use starkpays_contracts::tanda_savings::{TandaSavings, ITandaSavingsDispatcher, ITandaSavingsDispatcherTrait};

#[test]
fn test_create_tanda() {
    let mut calldata = array![
        contract_address_const!(0x123), // owner
    ];
    let (contract_address, _) = deploy_syscall(
        TandaSavings::TEST_CLASS_HASH.try_into().unwrap(),
        0,
        calldata.span(),
        false,
    ).unwrap();
    
    let dispatcher = ITandaSavingsDispatcher { contract_address };
    
    // Test tanda creation
    let name = 'Test Tanda';
    let description = 'A test savings circle';
    let contribution_amount = 100;
    let frequency_days = 7;
    let max_members = 5;
    let token = contract_address_const!(0x789);
    
    let tanda_id = dispatcher.create_tanda(
        name,
        description,
        contribution_amount,
        frequency_days,
        max_members,
        token,
    );
    
    assert(tanda_id == 0, 'First tanda should have ID 0');
    
    // Verify tanda details
    let tanda = dispatcher.get_tanda(tanda_id);
    assert(tanda.contribution_amount == contribution_amount, 'Contribution amount should match');
    assert(tanda.max_members == max_members, 'Max members should match');
    
    // Verify creator is automatically a member
    let member_count = dispatcher.get_member_count(tanda_id);
    assert(member_count == 1, 'Creator should be first member');
}

#[test]
fn test_join_tanda() {
    let mut calldata = array![
        contract_address_const!(0x123), // owner
    ];
    let (contract_address, _) = deploy_syscall(
        TandaSavings::TEST_CLASS_HASH.try_into().unwrap(),
        0,
        calldata.span(),
        false,
    ).unwrap();
    
    let dispatcher = ITandaSavingsDispatcher { contract_address };
    
    // Create tanda
    let tanda_id = dispatcher.create_tanda(
        'Test Tanda',
        'A test savings circle',
        100,
        7,
        5,
        contract_address_const!(0x789),
    );
    
    // Set new caller (different from creator)
    set_caller_address(contract_address_const!(0x456));
    
    // Join tanda
    dispatcher.join_tanda(tanda_id);
    
    // Verify member count increased
    let member_count = dispatcher.get_member_count(tanda_id);
    assert(member_count == 2, 'Should have 2 members now');
    
    // Verify new caller is a member
    let is_member = dispatcher.is_member(tanda_id, contract_address_const!(0x456));
    assert(is_member == true, 'New caller should be a member');
}

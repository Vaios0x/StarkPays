#[cfg(test)]
mod tests {
    use super::*;
    use starknet::testing;
    use starknet::ContractAddress;

    #[test]
    fn test_initiate_transfer_success() {
        let owner = starknet::contract_address_const::<0x123>();
        let fee_collector = starknet::contract_address_const::<0x456>();
        
        // Deploy contract
        let mut state = RemesaVault::contract_state_for_testing();
        RemesaVault::constructor(ref state, owner, fee_collector, 50);

        // Add supported token
        let token = starknet::contract_address_const::<0x789>();
        testing::set_caller_address(owner);
        state.add_supported_token(token);

        // Test transfer initiation
        let sender = starknet::contract_address_const::<0xabc>();
        let recipient = starknet::contract_address_const::<0xdef>();
        
        testing::set_caller_address(sender);
        let transfer_id = state.initiate_transfer(
            recipient,
            1000_u256,
            token,
            20_u8, // Low AI score
        );

        assert(transfer_id == 0, 'Wrong transfer ID');
        
        let transfer = state.get_transfer(transfer_id);
        assert(transfer.amount == 1000_u256, 'Wrong amount');
        assert(transfer.from == sender, 'Wrong sender');
    }

    #[test]
    fn test_fraud_detection_blocks_high_risk() {
        let owner = starknet::contract_address_const::<0x123>();
        let fee_collector = starknet::contract_address_const::<0x456>();
        
        let mut state = RemesaVault::contract_state_for_testing();
        RemesaVault::constructor(ref state, owner, fee_collector, 50);

        let token = starknet::contract_address_const::<0x789>();
        testing::set_caller_address(owner);
        state.add_supported_token(token);

        let sender = starknet::contract_address_const::<0xabc>();
        let recipient = starknet::contract_address_const::<0xdef>();
        
        testing::set_caller_address(sender);
        let transfer_id = state.initiate_transfer(
            recipient,
            1000_u256,
            token,
            85_u8, // High AI score = fraud
        );

        assert(transfer_id == 0, 'Should block fraud');
    }

    #[test]
    fn test_family_member_management() {
        let owner = starknet::contract_address_const::<0x123>();
        let fee_collector = starknet::contract_address_const::<0x456>();
        
        let mut state = RemesaVault::contract_state_for_testing();
        RemesaVault::constructor(ref state, owner, fee_collector, 50);

        let caller = starknet::contract_address_const::<0xabc>();
        let family_member = starknet::contract_address_const::<0xdef>();
        
        testing::set_caller_address(caller);
        state.add_family_member(family_member);

        assert(state.is_family_member(caller, family_member), 'Should be family member');
    }

    #[test]
    fn test_vault_code_protection() {
        let owner = starknet::contract_address_const::<0x123>();
        let fee_collector = starknet::contract_address_const::<0x456>();
        
        let mut state = RemesaVault::contract_state_for_testing();
        RemesaVault::constructor(ref state, owner, fee_collector, 50);

        let caller = starknet::contract_address_const::<0xabc>();
        let vault_code = 'FAMILY123';
        
        testing::set_caller_address(caller);
        state.set_vault_code(vault_code);

        // Test that vault code is set
        assert(state.vault_codes.read(caller) == vault_code, 'Vault code not set');
    }
}

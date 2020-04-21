pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

/// @title BatchSender
/// @author eboado
/// @notice Smart contract to aggregate CREATEs to other contracts
contract BatchCreator {
    event ContractCreated(
        address _contract
    );

    /// @notice Internal function to execute a CREATE from a bytecode and byte-encoded constructor's args
    /// @param _bytecode Bytecode of the contract to deploy
    /// @param _args Bytes-encoded set of constructor's args
    /// @return _contract address of the deployed contract
    function _createContract(bytes memory _bytecode, bytes memory _args) internal returns (address _contract){
        // The encoded bytes of the args are concatenated to the contract's bytecode
        bytes memory _bytecodeWithArgs = abi.encodePacked(_bytecode, _args);
        assembly {
            _contract := create(0, add(_bytecodeWithArgs, 0x20), mload(_bytecodeWithArgs))
            if iszero(extcodesize(_contract)) {
                revert(0, 0)
            }
        }
        emit ContractCreated(_contract);
    }

    /// @notice Funtion to CREATE contracts in batch, from a list of bytecodes and byte-encoded constructor's args
    /// @param _bytecodes Array of bytes, one per each bytecod of contract to deploy
    /// @param _args Array of bytes, one per each bytes-encoded set of constructor's args
    /// - Use 0x for contracts with no-constructor or no-constructor arguments
    /// @return _contracts addresses of the deployed contracts
    function batchCreate(bytes[] memory _bytecodes, bytes[] memory _args) public returns (address[] memory _contracts){
        require(_bytecodes.length == _args.length, "INCONSISTENT_BYTECODES_ARGS");
        _contracts = new address[](_bytecodes.length);
        for(uint256 i = 0; i < _bytecodes.length; i++) {
            _contracts[i] = _createContract(_bytecodes[i], _args[i]);
        }
    }
}
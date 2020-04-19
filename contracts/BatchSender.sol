pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

/// @title BatchSender
/// @author eboado
/// @notice Smart contract to aggregate CALLs to other contracts
contract BatchSender {
    
    struct Call {
        address recipient;
        uint256 gas;
        uint256 value;
        bytes data;
    }

    struct RevertData {
        uint256 callId;
        bytes data;
    }

    /// @notice Function to execute in batch a list of Call structs
    /// - This same contract can't be recipient of any call, to avoid reentrancies
    /// - If a CALL reverts, the revert message of batchSend() will contain the revert data of the failed CALL
    /// @param _calls The list of Call structs to execute
    function batchSend(Call[] memory _calls) public payable {
        for(uint256 i = 0; i < _calls.length; i++) {
            (bool _success, bytes memory _data) = _calls[i].recipient.call{gas: _calls[i].gas, value: _calls[i].value}(_calls[i].data);
            if (!_success) {
                // Revert returning as revert message the content of the _data, without the initial length
                // The revert message is constructed by reading from the memory address of (_data + 32 bytes (0x20))
                // to that previous address + the length of the _data array, got from mload(_data) which returns
                // the memory content on the first 32 bytes of _data (the length)
                assembly { revert(add(0x20, _data), mload(_data)) }
            }
        }
    }

}
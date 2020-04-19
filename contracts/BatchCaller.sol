pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Address.sol";

/// @title BatchCaller
/// @author eboado
/// @notice Smart contract to aggregate STATICCALLs to view functions in other contracts
contract BatchCaller {
    using Address for address;

    struct Call {
        address recipient;
        bytes data;
    }

    struct CallResult {
        bool success;
        bytes data;
    }

    /// @notice Function to execute in batch a list of Call Structs
    /// - The recipients of all the staticcalls need to be contracts accounts
    /// @param _calls The list of Call structs to execute
    /// @return CallResult[] The list of CallResult structs
    function batchCalls(Call[] memory _calls) public view returns(CallResult[] memory) {
        for (uint256 i = 0; i < _calls.length; i++) {
            require(_calls[i].recipient.isContract() && _calls[i].recipient != address(this), "INVALID_RECIPIENT");
        }

        CallResult[] memory _callsResults = new CallResult[](_calls.length);
        for(uint256 i = 0; i < _calls.length; i++) {
            (bool _success, bytes memory _data) = _calls[i].recipient.staticcall(_calls[i].data);
            _callsResults[i] = CallResult({success: _success, data: _data});
        }
        return _callsResults;
    }

}

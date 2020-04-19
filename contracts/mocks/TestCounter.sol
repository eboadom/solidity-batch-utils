pragma solidity ^0.6.6;

contract TestCounter {
    uint256 public count = 0;

    function increment(uint256 _value) public {
        count += _value;
    }

    function incrementWithValue(uint256 _value) public payable {
        require(_value == msg.value, "INCONSISTENT_VALUE");
        count += msg.value;
    }
}
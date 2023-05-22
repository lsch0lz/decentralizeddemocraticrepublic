pragma solidity ^0.5.16;

contract StringContract {
    string private myString;

    constructor(string memory initialString) public {
        myString = initialString;
    }

    function getString() public view returns (string memory) {
        return myString;
    }

    function setString(string memory newString) public {
        myString = newString;
    }
}

pragma solidity ^0.4.25;

contract Inbox {
    string public message;

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function doMath(int a, int b) {
        // arbitrary math operations just to test
        a + b;
        b - a;
        a * b;
        a == 0;
    }

}
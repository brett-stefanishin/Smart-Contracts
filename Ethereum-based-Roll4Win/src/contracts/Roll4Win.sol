pragma solidity ^0.5.0;

contract Roll4Win {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        address payable author
    );

    constructor() public {
        name = "Roll4.Win - Decentralized Dice Gaming";
    }

    function createPost(string memory _content) public {
        // Require valid content
        require(bytes(_content).length > 0);
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _content, msg.sender);
        // Trigger event
        emit PostCreated(postCount, _content, msg.sender);
    }
}

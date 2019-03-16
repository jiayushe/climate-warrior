pragma solidity ^0.5.0;

contract Donation {
    address[16] public donors;
    address payable owner = msg.sender;
    string verifierName = "Minister";
    address public verifierAddr = 0xF7d8385E9f3800768b562A433db7a269CADDc42C; 
    uint public stake = 0 ether; 
    uint public startTime = block.timestamp;
    uint public daysAfter = 100;
    
    event DonatedChange(uint _badgeId, uint _amt);
    event Completed(uint _completionTime);
    
    // Checking if payable
    constructor() public payable{
        // assert(msg.value >= stake);
    }
    
    // Making a donation
    function donateChange(uint badgeId) public payable returns(uint){
        emit DonatedChange(badgeId, msg.value);
        donors[badgeId] = msg.sender;
        return badgeId;
    }
    
    // Checking if a pledge is completed
    function attestCompletion() public{
        assert(msg.sender==verifierAddr);
        assert(now <= startTime + daysAfter*1 days);
        emit Completed(now);
        owner.transfer(stake);
    }

    // Retrieving the donors
    function getDonors() public view returns(address[16] memory){
        return donors;
    }       
}

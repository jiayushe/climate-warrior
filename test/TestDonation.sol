pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Donation.sol";

contract TestDonation {
    // The address of the donation contract to be tested
    Donation donation = Donation(DeployedAddresses.Donation());

    // Testing the donateChange() function
    function testUserCanDonate() public {
        uint returnedId = donation.donateChange(expectedId);
        Assert.equal(returnedId, expectedId, "Donation for the expected badge should match what is returned.");
    }

    // Testing retrieval of a single badge's owner
    function testGetDonorAddressById() public {
        address donor = donation.donors(expectedId);
        Assert.equal(donor, expectedDonor, "Owner of the expected badge should be this contract");
    }

    // Testing retrieval of all badges' owners
    function testGetDonorAddressByIdInArray() public {
        // Store donors in memory rather than contract's storage
        address[16] memory donors = donation.getDonors();
        Assert.equal(donors[expectedId], expectedDonor, "Owner of the expected badge should be this contract");
    }

    // The id of the badge that will be used for testing
    uint expectedId = 8;

    //The expected owner of badge is this contract
    address expectedDonor = address(this);
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    function testUserCanAdoptPet() public {
        uint returnedId = adoption.adopt(8);

        Assert.equal(returnedId, expectedPetId, "Adoption of pet ID 8 should be recorded.");
    }

    function testGetAdopterAddressByPetId() public {
        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of pet ID 8 should be recorded.");
    }

    uint expectedPetId = 8;

    address expectedAdopter = address(this);

}

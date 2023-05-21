const StringContract = artifacts.require("StringContract");

module.exports = function(deployer) {
  deployer.deploy(StringContract, "Hello, world!");
};

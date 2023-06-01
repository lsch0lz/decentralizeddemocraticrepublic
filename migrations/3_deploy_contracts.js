const SchoolHierarchy = artifacts.require("School");

module.exports = function (deployer) {
  deployer.deploy(SchoolHierarchy);
};
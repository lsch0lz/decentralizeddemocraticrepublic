const Web3 = require('web3');
const contract = require('truffle-contract');
const schoolsContractJson = require('../build/contracts/Schools.json');

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

// Create a contract instance
const SchoolsContract = contract(schoolsContractJson);
SchoolsContract.setProvider(provider);

async function createSchool(name, fromAccount) {
    try {
      const instance = await SchoolsContract.deployed();
      const result = await instance.createSchool(name, { from: fromAccount });
  
      console.log('School created successfully!');
      console.log('Transaction hash:', result.tx);
  
      // Check if logs were emitted during the transaction
      if (result.logs && result.logs.length > 0) {
        console.log('School address:', result.logs[0].args.principal);
      } else {
        console.log('No logs found.');
      }
    } catch (error) {
      console.error('Error creating school:', error);
    }
  }
  

// Usage example
const schoolName = "Hogwarts";
const account = "0x0A699F38486C8AEd050e530F35a0a442cB386a44";

createSchool(schoolName, account);

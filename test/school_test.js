const Web3 = require('web3');
const contract = require('truffle-contract');
const expect = require('chai').expect

let schoolsContractJson;
try{
  schoolsContractJson = require('../build/contracts/Schools.json');
}catch (e) {
  schoolsContractJson = require('C:\\Users\\koenigf\\IdeaProjects\\decentralizeddemocraticrepublic\\build\\contracts\\School.json');
}

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

// Create a contract instance
const SchoolsContract = contract(schoolsContractJson);
SchoolsContract.setProvider(provider);

async function createSchoolTest(name, fromAccount) {
  try {
    const instance = await SchoolsContract.deployed();
    const result = await instance.createSchool(name, { from: fromAccount });
    // Code would break here and jump to "catch"

    console.log('School created successfully!');
    console.log('Transaction hash:', result.tx);

    // Check if logs were emitted during the transaction
    if (result.logs && result.logs.length > 0) {
      console.log('School address:', result.logs[0].args.principal);
    } else {
      console.log('No logs found.');
    }
    return true; // Everything worked
  } catch (error) {
    console.error('Error creating school:', error);
    return false; // Oh boy, we got a problem here!
  }
}

async function getSchoolTest(fromAccount){
  const instance = await SchoolsContract.deployed();
  const result = await instance.getSchoolName(fromAccount); // TODO Hier Bug

  return result;
}
  

// Usage example
const schoolName = "sdfsdf";
const account = "0x993D35AB34ac41D6c836f25BB40c3FAB4cEEbecb";

describe('School creating (And Reading) Test', function (){
  it('Create School', function (){
    let res = false;
    createSchoolTest(schoolName, account).then((result) => {
      res = result;
    }).catch((error) => {
      console.error(error);
    });
    expect(res).to.be.true;
  });

  it('Check for School on Blockchain', function () {
    let res = 0;
    getSchoolTest(account).then((result) => {
      res = result;
    }).catch((error) => {
      console.error(error);
    });
    expect(res).to.equal(schoolName)
  });
});




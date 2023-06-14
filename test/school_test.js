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
  const instance = await SchoolsContract.deployed();
  const result = await instance.createSchool(name, { from: fromAccount });
  // Code would break here

  console.log('School created successfully!');
  console.log('Transaction hash:', result.tx);

  // Check if logs were emitted during the transaction
  if (result.logs && result.logs.length > 0) {
    console.log('School address:', result.logs[0].args.principal);
  } else {
    console.log('No logs found.');
  }
}

async function getSchoolTest(fromAccount){
  const instance = await SchoolsContract.deployed();
  const result = await instance.getSchoolName({from: fromAccount });

  return result;
}
  

// Usage example
const schoolName = "Hogwarts";
const account = "0x648bCC2d8725EE8c79AE29a836eF5321DDBfbF9b";

describe('[Test] Create and Read School', function (){
  it('Create School', async function (){
    await createSchoolTest(schoolName, account)
  });

  it('Check for School on Blockchain', async function () {
    const res = await getSchoolTest(account);
    expect(res).to.equal(schoolName)
  });
});




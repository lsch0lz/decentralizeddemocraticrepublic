const Web3 = require('web3');
const contract = require('truffle-contract');
// const {context} = require("@truffle/contract/webpack.config");
const expect = require('chai').expect

schoolsContractJson = require('./../build/contracts/School.json');

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

// Create a contract instance
const SchoolsContract = contract(schoolsContractJson);
SchoolsContract.setProvider(provider);

// Your Account
const account = "0x34e5BEF5788F6e109FA8990792769e1F5A9FE456";

describe('Tests for School Contract\n'
    + '(Creation is only possible the first time)', () => {
  const schoolName = "Hauptschulä";

  context('[Test] School', () => {
    it('Create School', async () => {
      const instance = await SchoolsContract.deployed();
      const result = await instance.createSchool(schoolName, { from: account });
    });
  });


  context('[Test] Class', () =>{
    const class_name = '8a';
    it('Create Class', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.createClass(class_name, schoolName, {from: account });
      await instance.createClass("Q12", schoolName, {from: account });
    });

    it('Read Class', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.getClassDetails(class_name, schoolName, {from: account });
    });

    it('Read Class List', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.getAllClasses(schoolName, {from: account });
      expect(res).to.be.an('array');
      expect(res).to.contain("Q12");
      expect(res).to.contain(class_name)
    });

    // it('Read List of all classes', async () => {
    //   const instance = await SchoolsContract.deployed();
    //   const res = await instance.getAllClassNames({from: account });
    //   expect(res[0]).to.be.an('array');
    //   expect(res[0]).to.include(class_name)
    // });
  });

  context('[Test] Election', () => {
    const election_id = 420;
    const election_name = "Presidential election"
    const election_options = ["Lukas", "Henry", "Moritz", "Ferdinand"]

    it('Create Election', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.createElection(election_id, election_name, election_options, schoolName, {from: account });
    });

    it('Vote (Create)', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.vote(election_id, election_options[0], schoolName, {from: account});
      await instance.vote(election_id, election_options[1], schoolName, {from: account});
      await instance.vote(election_id, election_options[0], schoolName, {from: account});
      await instance.vote(election_id, election_options[2], schoolName, {from: account});
      await instance.vote(election_id, election_options[3], schoolName, {from: account});
    });

    it('get election result', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.getWinner(election_id, schoolName, {from: account});

      expect(res[0]).to.equal(election_options[0]); // res[0] is the winner (string)
      expect(res[1]['words'][0]).to.equal(2); // res[1]['words'][0] (int) is number of votes (Here two, originated from test above)
    });

    it('get election name', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.getElectionName(election_id, schoolName, {from: account});

      expect(res).to.equal(election_name);
    });
  });

  // context('[Test] Teacher', () => {
  //   it('Create Teacher', async () => {
  //     const instance = await SchoolsContract.deployed();
  //     await instance.addTeacherToClass(class_id, teacher_name,{from: account })
  //   });
  // });
});



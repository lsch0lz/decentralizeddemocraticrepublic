const Web3 = require('web3');
const contract = require('truffle-contract');
// const {context} = require("@truffle/contract/webpack.config");
const expect = require('chai').expect

schoolsContractJson = require('./../build/contracts/School.json');

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

// Create a contract instance
const SchoolsContract = contract(schoolsContractJson);
SchoolsContract.setProvider(provider);

// Your Account
const account = "0x5E6549598606eF80633d0374EE80928c8Ef68e24";

describe('Tests for School Contract\n'
    + '(Creation is only possible the first time)', () => {
  const schoolName = "Hauptschulä";
  const password = "top_secret"

  context('[Test] School', () => {
    it('Create School', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.createSchool(schoolName, { from: account });
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
  });

  context('[Test] Election', () => {
    const election_id = "420";
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

  context('[Test] Members', () => {
    const member_class = "43c";

    it('Create Class, Students, and Teacher', async () => {
      const instance = await SchoolsContract.deployed();

      await instance.createClass(member_class, schoolName, {from: account});

      await instance.addTeacherToClass("Heinrich Faustus", password, member_class,
          schoolName, {from: account});
      await instance.addTeacherToClass("Henry Baiker", password, member_class,
          schoolName, {from: account});

      await instance.addStudentToClass("Ferdinand Koenig", password, member_class,
          schoolName, {from: account});
      await instance.addStudentToClass("Moritz Lindner", password, member_class,
          schoolName, {from: account});
      await instance.addStudentToClass("Lukas Scholz", password, member_class,
          schoolName, {from: account});

    });

    it('Read Class and check number of assigned members', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.getClassDetails(member_class, schoolName, {from: account });

      expect(res[0]['words'][0]).to.equal(2); // Are there 2 teachers?
      expect(res[1]['words'][0]).to.equal(3); // Are there 3 students?
    });
  });

  context('[Test] Login\n'
      + '(execute Members test before)', async () => {
    it('Login success student', async () => {
      const instance = await SchoolsContract.deployed();
      const res= await instance.logIn("Ferdinand Koenig", password,  schoolName, {from: account});
      expect(res[0]).to.be.true;
      expect(res[1]).to.equal("student");
    });

    it('Login success teacher', async () => {
      const instance = await SchoolsContract.deployed();
      const res= await instance.logIn("Heinrich Faustus", password,  schoolName, {from: account});
      expect(res[0]).to.be.true;
      expect(res[1]).to.equal("teacher");
    });

    it('Login fail', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.logIn("Ferdinand Koenig", "123",  schoolName, {from: account});
      expect(res[0]).to.be.false;
    });
  });
});



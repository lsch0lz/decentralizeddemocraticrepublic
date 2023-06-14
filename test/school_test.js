const Web3 = require('web3');
const contract = require('truffle-contract');
// const {context} = require("@truffle/contract/webpack.config");
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
  

// Your Account
const account = "0xB3e64C2a561cDBc146332991ccBAf92F5519fFa7";

describe('Tests for School Contract', () => {
  const schoolName = "Hauptschulä";
  const class_name = '8a';
  const class_id = 420;

  context('[Test] School', () => {
    it('Create School (Is only possible the first time)', async () => {
      await createSchoolTest(schoolName, account)
    });

    it('Read School from Blockchain', async () => {
      const res = await getSchoolTest(account);
      expect(res).to.equal(schoolName)
    });
  });


  context('[Test] Class', () =>{
    it('Create Class', async () => {
      const instance = await SchoolsContract.deployed();
      await instance.createClass(class_id, class_name, {from: account });
    });

    it('Read Class from Blockchain', async () => {
      const instance = await SchoolsContract.deployed();
      const res = await instance.getClassDetails(class_id, {from: account });
      // See note below to understand the returned object
      expect(res[0]).to.equal(class_name);
    });

    // it('Read List of all classes', async () => {
    //   const instance = await SchoolsContract.deployed();
    //   const res = await instance.getAllClassNames({from: account });
    //   expect(res[0]).to.be.an('array');
    //   expect(res[0]).to.include(class_name)
    // });
  });

  // context('[Test] Teacher', () => {
  //   it('Create Teacher', async () => {
  //     const instance = await SchoolsContract.deployed();
  //     await instance.addTeacherToClass(class_id, teacher_name,{from: account })
  //   });
  // });
});



// Note: Result from
// const res = await instance.getClassDetails(0, {from: account });
// console.log(res)
//
// Result {
//   '0': '7a',
//       '1': BN {
//     negative: 0,
//         words: [ 0, <1 empty item> ],
//     length: 1,
//         red: null
//   },
//   '2': BN {
//     negative: 0,
//         words: [ 0, <1 empty item> ],
//     length: 1,
//         red: null
//   }
// }


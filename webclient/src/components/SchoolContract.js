const Web3 = require('web3');
const contract = require('truffle-contract');

const SchoolsContractJson = require('../contracts/School.json');

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

// Create a contract instance
const SchoolsContract = contract(SchoolsContractJson);
SchoolsContract.setProvider(provider);

// TODO: Set your account address here
const account = '0x49D89eEAcB3951288937C862982d0e67fF020847';

// Helper function to get deployed contract instance
async function getSchoolsContractInstance() {
    const instance = await SchoolsContract.deployed();
    return instance;
}

// Function to create a school
async function createSchool(schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.createSchool(schoolName, { from: account });
}

// Function to create a class
async function createClass(className, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.createClass(className, schoolName, { from: account });
}

// Function to read class details
async function getClassDetails(className, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.getClassDetails(className, schoolName, { from: account });
}

// Function to get all classes
async function getAllClasses(schoolName) {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getAllClasses(schoolName, { from: account });
    return res;
}

// Function to create an election
async function createElection(electionId, electionName, electionOptions, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.createElection(electionId, electionName, electionOptions, schoolName, { from: account });
}

// Function to vote in an election
async function voteInElection(electionId, option, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.vote(electionId, option, schoolName, { from: account });
}

// Function to get the winner of an election
async function getElectionWinner(electionId, schoolName) {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getWinner(electionId, schoolName, { from: account });
    return res;
}

// Function to get the name of an election
async function getElectionName(electionId, schoolName) {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getElectionName(electionId, schoolName, { from: account });
    return res;
}

// Function to add a teacher to a class
async function addTeacherToClass(teacherName, password, className, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.addTeacherToClass(teacherName, password, className, schoolName, { from: account });
}

// Function to add a student to a class
async function addStudentToClass(studentName, password, className, schoolName) {
    const instance = await getSchoolsContractInstance();
    await instance.addStudentToClass(studentName, password, className, schoolName, { from: account });
}

// Function to log in and check credentials
async function login(username, password, schoolName) {
    const instance = await getSchoolsContractInstance();
    const res = await instance.logIn(username, password, schoolName, { from: account });
    return res;
}

module.exports = {
    createSchool,
    createClass,
    getClassDetails,
    getAllClasses,
    createElection,
    voteInElection,
    getElectionWinner,
    getElectionName,
    addTeacherToClass,
    addStudentToClass,
    login,
};

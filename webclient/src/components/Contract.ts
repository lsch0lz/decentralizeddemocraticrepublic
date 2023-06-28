import Web3 from 'web3';
// @ts-ignore
import contract from 'truffle-contract';

import SchoolsContractJson from '../contracts/School.json';

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

// Create a contract instance
const SchoolsContract = contract(SchoolsContractJson);
SchoolsContract.setProvider(provider);

// TODO: Set your account address here
const account = '0xB94cE570657628412FC4776E81b9cb06dE9417c3';

// Helper function to get deployed contract instance
async function getSchoolsContractInstance(): Promise<any> {
    const instance = await SchoolsContract.deployed();
    return instance;
}

// Function to create a school
async function createSchool(schoolName: string): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.createSchool(schoolName, { from: account });
}

// Function to create a class
async function createClass(className: string, schoolName: string): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.createClass(className, schoolName, { from: account });
}

// Function to read class details
async function getClassDetails(className: string, schoolName: string): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.getClassDetails(className, schoolName, { from: account });
}

// Function to get all classes
async function getAllClasses(schoolName: string): Promise<any> {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getAllClasses(schoolName, { from: account });
    return res;
}

// Function to create an election
async function createElection(
    electionId: string,
    electionName: string,
    electionOptions: string[],
    schoolName: string
): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.createElection(electionId, electionName, electionOptions, schoolName, { from: account });
}

// Function to vote in an election
async function voteInElection(electionId: string, option: string, schoolName: string): Promise<any> {
    const instance = await getSchoolsContractInstance();
    await instance.vote(electionId, option, schoolName, { from: account });
}

// Function to get the winner of an election
async function getElectionWinner(electionId: string, schoolName: string): Promise<any> {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getWinner(electionId, schoolName, { from: account });
    return res;
}

// Function to get the name of an election
async function getElectionName(electionId: string, schoolName: string): Promise<string> {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getElectionName(electionId, schoolName, { from: account });
    return res;
}

// Function to get all ElectionIDs
async function getAllElectionIDs(schoolName: string): Promise<string[]> {
    const instance = await getSchoolsContractInstance();
    return await instance.getAllElectionIDs(schoolName, {from: account}) as Promise<string[]>;
}

// Function to get Options of an Election
async function getOptionsFromElection(electionId: string, schoolName: string): Promise<any> {
    const instance = await getSchoolsContractInstance();
    const res = await instance.getOptionsFromElection(electionId, schoolName, {from: account});
    console.log("Options: ", res)
    return res;
}

// Function to add a teacher to a class
async function addTeacherToClass(
    teacherName: string,
    password: string,
    className: string,
    schoolName: string
): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.addTeacherToClass(teacherName, password, className, schoolName, { from: account });
}

// Function to add a student to a class
async function addStudentToClass(
    studentName: string,
    password: string,
    className: string,
    schoolName: string
): Promise<void> {
    const instance = await getSchoolsContractInstance();
    await instance.addStudentToClass(studentName, password, className, schoolName, { from: account });
}

// Function to log in and check credentials
async function login(username: string, password: string, schoolName: string): Promise<any> {
    const instance = await getSchoolsContractInstance();
    console.log(instance)
    const res = await instance.logIn(username, password, schoolName, { from: account });
    return res;
}

export {
    getAllElectionIDs,
    getOptionsFromElection,
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

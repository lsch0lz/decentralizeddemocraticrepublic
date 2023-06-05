import React, {useState} from 'react';
import './SchoolCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";

const contractABI = schoolContract.abi;
const contractAddress = '0x73542BC7E1925ce59Fa149DdF06111b49D6982FA'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const createSchool = async (name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        const result = await contractInstance.methods.createSchool(name).send({from: accounts[0]});
        console.log('School created:', result);
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

function SchoolCreation() {
    const [schoolName, setSchoolName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };

    const saveToChain = () => {
        createSchool(schoolName).then(() => {
            console.log('School created');
        })
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <label>
                    School Name
                    <input type="text" value={schoolName} onChange={handleNameChange}/>
                </label>
                <button type="submit">Create School</button>
            </form>
        </div>
    );
}

export default SchoolCreation;

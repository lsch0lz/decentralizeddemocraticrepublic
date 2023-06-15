import React, {useState} from 'react';
import './SchoolCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";
import {CustomFormLabel} from "../customInput/CustomFormLabel";

const contractABI = schoolContract.abi;
const contractAddress = '0x1935f22D4803f78A01A0B5E5aBf6BaC7719effD7'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const createSchool = async (name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.createSchool(name).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

function SchoolCreation() {
    const [schoolName, setSchoolName] = useState('');

    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };

    const saveToChain = () => {
        createSchool(schoolName).then(() => {
            console.log('School created');
        }).catch(e => {
                console.log('Failed to create school:', e)
            }
        )
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"School Name"}
                    type="text"
                    value={schoolName}
                    onChange={handleSchoolNameChange}
                />

                <button type="submit">Create School</button>
            </form>
        </div>
    );
}

export default SchoolCreation;

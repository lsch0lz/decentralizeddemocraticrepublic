import React, {useState} from 'react';
import './SchoolCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";
import {CustomFormLabel} from "../customInput/CustomFormLabel";

const contractABI = schoolContract.abi;
const contractAddress = '0x7112c42D966F53cA0Ffe3e565AcD4361F83F1e38'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const createSchool = async (name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.createSchool(name).send({ from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B" });
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

const getSchool = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.getSchoolName().call({ from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B" });
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
        const school = getSchool()
        console.log('school:', school)
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

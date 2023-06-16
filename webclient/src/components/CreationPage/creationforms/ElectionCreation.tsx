import React, {useState} from 'react';
import {CustomFormLabel} from '../customInput/CustomFormLabel';
import './ElectionCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";

const contract = require('truffle-contract'); // TODO: This creates an error!!
const contractABI = schoolContract.abi;
const contractAddress = '0x7112c42D966F53cA0Ffe3e565AcD4361F83F1e38'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

interface OptionsFormProps {
    onSubmit: (options: string[]) => void;
}


const createElection = async (electionName: string, optionsList: string[]) => {
    const accounts = await web3.eth.getAccounts();
    try {
        return await contractInstance.methods.createElection(2, electionName, optionsList).send({from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B"});
    } catch (error) {
        console.error('Failed to create election:', error);
    }
}

export function ElectionCreation() {
    const [electionName, setElectionName] = useState('');

    const handleElectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setElectionName(e.target.value);
    };

    const [option, setOption] = useState('');
    const [optionsList, setOptionsList] = useState<string[]>([]);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value);
    };

    const handleRemoveOption = (index: number) => {
        const updatedOptions = optionsList.filter((_, i) => i !== index);
        setOptionsList(updatedOptions);
    };

    const handleAddOption = () => {
        if (option.trim() !== '') {
            setOptionsList([...optionsList, option]);
            setOption('');
        }
    };

    const saveToChain = async (e: React.FormEvent) => {
        e.preventDefault();

        // await createElection(electionName, optionsList);

        const accounts = await web3.eth.getAccounts();
        await contractInstance.methods.vote(2, optionsList[0]).send({from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B"});
        await contractInstance.methods.vote(2, optionsList[0]).send({from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B"});
        await contractInstance.methods.vote(2, optionsList[1]).send({from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B"});

        const res = await contractInstance.methods.getWinner(2).call({from: "0x0a4C43990D300dBD1D15931bb62DD7BBB4C3D29B"});
        console.log(res);
    };

        return (
            <div className="ElectionCreation">
                <form onSubmit={saveToChain}>
                    <CustomFormLabel
                        label="Election Name"
                        type="text"
                        value={electionName}
                        onChange={handleElectionNameChange}
                    />
                    <CustomFormLabel
                        label="Add Option"
                        type="text"
                        value={option}
                        onChange={handleOptionChange}
                    />
                    <button type="button" onClick={handleAddOption}>
                        Add Option
                    </button>
                    <ul>
                        {optionsList.map((opt, index) => (
                            <li key={index}>
                                {opt}
                                <button type="button" onClick={() => handleRemoveOption(index)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Create Election</button>
                </form>
            </div>
        );
    }
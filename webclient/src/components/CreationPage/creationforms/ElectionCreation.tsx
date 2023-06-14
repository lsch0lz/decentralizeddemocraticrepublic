import React, {useState} from 'react';
import {CustomFormLabel} from '../customInput/CustomFormLabel';
import './ElectionCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";


const contractABI = schoolContract.abi;
const contractAddress = '0x1935f22D4803f78A01A0B5E5aBf6BaC7719effD7'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);


interface OptionsFormProps {
    onSubmit: (options: string[]) => void;
}

const createElection = async (electionName: string, options: string[]) => {
    const accounts = await web3.eth.getAccounts();
    try {
        console.log('Creating election with name:', electionName)
        console.log('Creating election with options:', options)
        return await contractInstance.methods.createElection(electionName, options).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create election:', error);
    }
}

const getElection = async (electionName: string) => {
    try {
        console.log('Getting election with name:', electionName)
        const result = await contractInstance.methods.getElection(electionName).call()
        return result;
    } catch (error) {
        console.error('Failed to get election:', error);
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
        // TODO: Save to chain
        console.log('Saving election to chain with name:', electionName)
        console.log('Saving election to chain with options:', optionsList)

        await createElection(electionName, optionsList);
        console.log("Saved election to chain", electionName)
        console.log("Getting election from chain", electionName)
        const result = await getElection(electionName);
        if (result && result[0]) {
            console.log('Got election from chain', result);
        } else {
            console.log('Election not found');
        }
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

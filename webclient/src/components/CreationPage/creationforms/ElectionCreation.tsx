import React, {useState} from 'react';
import {CustomFormLabel} from '../customInput/CustomFormLabel';
import './ElectionCreation.css';
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";


const contractABI = schoolContract.abi;
const contractAddress = '0x958e2120F66C70179dbDe3f1B8Fb60bCEa31AD1E'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);


interface OptionsFormProps {
    onSubmit: (options: string[]) => void;
}

const createElection = async (electionName: string) => {
    const accounts = await web3.eth.getAccounts();
    try {
        console.log('Creating election with name:', electionName)
        return await contractInstance.methods.createElection(electionName).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create election:', error);
    }
}

const getVotes = async (electionID: number) => {
    try {
        console.log('Getting votes for election with ID:', electionID)
        const result = await contractInstance.methods.getVotes(electionID).call()
        return result;
    } catch (error) {
        console.error('Failed to get votes:', error);
    }
}

const vote = async (electionID: number) => {
    try {
        console.log('Voting for election with ID:', electionID)
        const result = await contractInstance.methods.vote(electionID).call()
        return result;
    } catch (error) {
        console.error('Failed to vote:', error);
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

        await createElection(electionName);
        console.log("Saved election to chain", electionName)
        console.log("Getting election from chain", electionName)
        await vote(1);
        const result = await getVotes(1);
        console.log("Got election from chain", result)
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
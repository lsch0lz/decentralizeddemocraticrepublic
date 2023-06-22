import React, {useState} from 'react';
import {CustomFormLabel} from '../customInput/CustomFormLabel';
import './ElectionCreation.css';
import createElection from "../../../blockchain/SchoolContract";
import getWinner from "../../../blockchain/SchoolContract"
import vote from "../../../blockchain/SchoolContract"

interface OptionsFormProps {
    onSubmit: (options: string[]) => void;
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

        // TODO: Fill with correct values
        await createElection(1, electionName, optionsList, "");
        console.log("Saved election to chain", electionName)
        console.log("Getting election from chain", electionName)

        // TODO: Fill with correct values
        await vote(1, "1", "")

        // TODO: Fill with correct values
        const result = await getWinner(1, "");
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

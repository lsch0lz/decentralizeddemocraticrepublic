import React, {useState} from 'react';
import {CustomFormLabel} from '../customInput/CustomFormLabel';
import './ElectionCreation.css';
import {createElection, getElectionWinner, voteInElection} from "../../Contract";


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
        // // TODO: Save to chain
        await createElection("2", electionName, optionsList, "JMG");
        console.log('Saving election to chain with name:', electionName)
        console.log('Saving election to chain with options:', optionsList)
        //
        // // TODO: Fill with correct values
        await voteInElection("2", optionsList[0], "JMG").then((e:any) => {
            console.log('Voted in election', e);
        })
        await voteInElection("2", optionsList[0], "JMG").then((e:any) => {
            console.log('Voted in election', e);
        })
        await voteInElection("2", optionsList[1], "JMG").then((e:any) => {
            console.log('Voted in election', e);
        })

        // // TODO: Fill with correct values
        await getElectionWinner("2", "JMG").then((e:any) => {
            console.log('Got election winner', e[0]);
        })
        // const result = await getWinner(1, "");
        // console.log("Got election from chain", result)
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

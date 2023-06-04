import React, {useState} from "react";

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
    const saveToChain = () => {
        // TODO: Save to chain
        console.log('Saving to chain! Need to be implemented');
    }

    return (
        <div className="ElectionCreation">
            <form onSubmit={saveToChain}>
                <label>
                    Election Name:
                    <input type="text" value={electionName} onChange={handleElectionNameChange}/>
                </label>
                <label>
                    Add Option:
                    <input type="text" value={option} onChange={handleOptionChange} />
                </label>
                <button type="button" onClick={handleAddOption}>
                    Add
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

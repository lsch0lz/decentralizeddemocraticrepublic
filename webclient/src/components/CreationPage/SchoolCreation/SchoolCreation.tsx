import React, {useState} from 'react';
import './SchoolCreation.css';

interface SchoolCreationProps {
}

function SchoolCreation() {
    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        setName('');
    };

    const saveToChain = () => {
        // TODO: Save to chain
        console.log('Saving to chain! Need to be implemented');
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={handleSave}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange}/>
                </label>
                <button onClick={saveToChain} type="submit">Save to Chain</button>
            </form>
        </div>
    );
}

export default SchoolCreation;

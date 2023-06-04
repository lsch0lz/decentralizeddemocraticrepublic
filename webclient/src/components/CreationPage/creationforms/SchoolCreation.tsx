import React, {useState} from 'react';
import './SchoolCreation.css';

function SchoolCreation() {
    const [schoolName, setSchoolName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };

    const saveToChain = () => {
        // TODO: Save to chain
        console.log('Saving to chain! Need to be implemented');
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

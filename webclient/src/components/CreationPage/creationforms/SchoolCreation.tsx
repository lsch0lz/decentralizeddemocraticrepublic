import React, {useState} from 'react';
import './SchoolCreation.css';
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import createSchool from '../../../blockchain/SchoolContract';

function SchoolCreation() {
    const [schoolName, setSchoolName] = useState('');

    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };

    const saveToChain = () => {
        createSchool(schoolName)
            .then(() => {
                console.log('School created');
            })
            .catch((error: any) => {
                console.error('Failed to create school:', error);
            });
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

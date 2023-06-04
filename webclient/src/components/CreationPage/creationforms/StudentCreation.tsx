import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export function StudentCreation() {
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentPassword(e.target.value);
    };

    const saveToChain = () => {
        // TODO: Save to chain
        const studentId = uuidv4()
        // TODO: hash password
        const hashedPassword = studentPassword
        console.log('Saving to chain! Need to be implemented');
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <label>
                    Student Name:
                    <input type="text" value={studentName} onChange={handleNameChange}/>
                </label>
                <label>
                    Student Password:
                    <input type="text" value={studentPassword} onChange={handlePasswordChange}/>
                </label>
                <button type="submit">Add Student to School</button>
            </form>
        </div>
    );

}

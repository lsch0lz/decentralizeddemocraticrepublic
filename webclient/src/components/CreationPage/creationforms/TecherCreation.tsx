import React, {useState} from "react"
import { v4 as uuidv4 } from 'uuid';

export function TeacherCreation() {
    const [teacherName, setTeacherName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherName(e.target.value);
    };

    const saveToChain = () => {
        // TODO: Save to chain
        const teacherId = uuidv4()
        console.log('Saving to chain! Need to be implemented');
    }

    return (
        <div className="TecherCreation">
            <form onSubmit={saveToChain}>
                <label>
                    Teacher Name:
                    <input type="text" value={teacherName} onChange={handleNameChange}/>
                </label>
                <button type="submit">Create School</button>
            </form>
        </div>
    );
}

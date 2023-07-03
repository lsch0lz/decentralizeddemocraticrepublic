import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";

export function StudentCreation() {
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [classId, setClassId] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentPassword(e.target.value);
    };

    const handleClassIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassId(event.target.value);
    };

    const saveToChain = () => {
        // TODO: Save to chain
        const studentId = 1
        // TODO: hash password
        // TODO: call function
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Student Name"}
                    type="text"
                    value={studentName}
                    onChange={handleNameChange}
                />
                <CustomFormLabel
                    label={"Student Password"}
                    type="text"
                    value={studentPassword}
                    onChange={handlePasswordChange}
                />
                <CustomFormLabel
                    label={"Class ID (TODO: Render class info here)"} // TODO
                    type="text"
                    value={classId}
                    onChange={handleClassIdChange}
                />
                <button type="submit">Add Student to School</button>
            </form>
        </div>
    );

}

import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import {addStudentToClass} from "../../Contract";

export function StudentCreation() {
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [className, setClassName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentPassword(e.target.value);
    };

    const handleClassIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    };

    const saveToChain = async (e: React.FormEvent) => {
        e.preventDefault();
        await addStudentToClass(
            studentName,
            studentPassword,
            className,
            "JMG"
        )
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Schüler Name"}
                    type="text"
                    value={studentName}
                    onChange={handleNameChange}
                />
                <CustomFormLabel
                    label={"Schüler Passwort"}
                    type="password"
                    value={studentPassword}
                    onChange={handlePasswordChange}
                />
                <CustomFormLabel
                    label={"Klassenname"}
                    type="text"
                    value={className}
                    onChange={handleClassIdChange}
                />
                <button type="submit">Add Student to School</button>
            </form>
        </div>
    );

}

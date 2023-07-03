import React, {useContext, useState} from "react"
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import {addTeacherToClass} from "../../Contract";

export function TeacherCreation() {
    const [teacherName, setTeacherName] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [className, setClassName] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherName(event.target.value);
    };

    const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    };

    const saveToChain = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addTeacherToClass(
            teacherName,
            teacherPassword,
            className,
            "JMG"
        )
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTeacherPassword(event.target.value);
    }

    return (
        <div className="TecherCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Lehrer Name"}
                    type="text"
                    value={teacherName}
                    onChange={handleNameChange}
                />
                <CustomFormLabel
                    label={"Lehrer Passwort"}
                    type="password"
                    value={teacherPassword}
                    onChange={handlePasswordChange}
                />
                <CustomFormLabel
                    label={"Klasse"}
                    type="text"
                    value={className}
                    onChange={handleClassNameChange}
                />
                <button type="submit">Add Teacher to Class</button>
            </form>
        </div>
    );
}

import React, {useContext, useState} from "react"
import {CustomFormLabel} from "../customInput/CustomFormLabel";

export function TeacherCreation() {
    const [teacherName, setTeacherName] = useState('');
    const [classId, setClassId] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherName(event.target.value);
    };

    const handleClassIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassId(event.target.value);
    };

    const saveToChain = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Save to chain
        const teacherId = 1

        // TODO: call function
    }

    return (
        <div className="TecherCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Teacher Name"}
                    type="text"
                    value={teacherName}
                    onChange={handleNameChange}
                />
                <CustomFormLabel
                    label={"Class ID (TODO: Render class info here)"} // TODO
                    type="text"
                    value={classId}
                    onChange={handleClassIdChange}
                />
                <button type="submit">Add Teacher to Class</button>
            </form>
        </div>
    );
}

import React, {useContext, useState} from "react"
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import Web3 from "web3";
import ServiceContext from "../../../ServiceContext";
import {Contract} from "web3-eth-contract";


const createTeacher = async (web3: Web3, constract: Contract, classId: number, teacherName: string, teacherId: number) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await constract.methods.addTeacherToClass(
            classId,
            teacherName,
            teacherId
        ).send({from: accounts[0]})
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

export function TeacherCreation() {
    const [teacherName, setTeacherName] = useState('');
    const [classId, setClassId] = useState('');
    const web3Service = useContext(ServiceContext);
    const [web3, contract] = web3Service.getSchoolContract();

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

        createTeacher(
            web3,
            contract,
            Number(classId),
            teacherName,
            teacherId
        ).then(r =>
            console.log('Teacher created:', r)
        ).catch(e =>
            console.log('Failed to create teacher:', e)
        )
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

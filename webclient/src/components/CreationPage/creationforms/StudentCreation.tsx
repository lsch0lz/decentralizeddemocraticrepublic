import React, {useContext, useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";
import ServiceContext from "../../../ServiceContext";
import {Contract} from "web3-eth-contract";

const createStudent = async (web3: Web3, constract: Contract, classId: number, studentName: string, studentId: number, studentPassword: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await constract.methods.addStudentToClass(
            classId,
            studentName,
            studentId,
            studentPassword
        ).send({from: accounts[0]})
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

export function StudentCreation() {
    const [studentName, setStudentName] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [classId, setClassId] = useState('');
    const web3Service = useContext(ServiceContext);
    const [web3, contract] = web3Service.getSchoolContract();

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
        createStudent(
            web3,
            contract,
            Number(classId),
            studentName,
            studentId,
            studentPassword
        ).then(r =>
            console.log('Student created:', r)
        ).catch(e =>
            console.log('Failed to create student:', e)
        )
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

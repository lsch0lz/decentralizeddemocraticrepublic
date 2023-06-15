import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import schoolContract from "../../../contracts/School.json";
import Web3 from "web3";

const contractABI = schoolContract.abi;
const contractAddress = '0x3fbC84CC8cc5366a218a2aB865cE4e0437c1B90b'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const createStudent = async (classId: number, studentName: string, studentId: number, studentPassword: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.addStudentToClass(
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

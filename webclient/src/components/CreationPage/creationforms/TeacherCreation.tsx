import React, {useState} from "react"
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

const createTeacher = async (classId: number, teacherName: string, teacherId: number) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.addTeacherToClass(
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

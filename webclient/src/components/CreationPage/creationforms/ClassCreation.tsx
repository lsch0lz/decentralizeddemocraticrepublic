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


const createClass = async (classId: number, name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await contractInstance.methods.createClass(classId, name).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

export function ClassCreation() {
    const [className, setClassName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(e.target.value);
    };

    const saveToChain = () => {
        // const classId = uuidv4()
        // TODO: change to uuidv4
        const classId = 1
        createClass(classId, className).then(() => {
            console.log('Class created');
        }).catch(e => {
            console.log('Failed to create class:', e)
        })
    }

    return (
        <div className="ClassCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Class Name"}
                    type="text"
                    value={className}
                    onChange={handleNameChange}
                />
                <button type="submit">Create Class</button>
            </form>
        </div>
    );

}

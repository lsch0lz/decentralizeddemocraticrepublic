import React, {useContext, useState} from "react";
import {CustomFormLabelVoting} from "../customInput/CustomFormLabelVoting";
import Web3 from "web3";
import ServiceContext from "../../../ServiceContext";
import {Contract} from "web3-eth-contract";

const createClass = async (web3: Web3, constract: Contract, classId: number, name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await constract.methods.createClass(classId, name).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

export function Voting() {
    const [className, setClassName] = useState('');
    const web3Service = useContext(ServiceContext);
    let [web3, contract] = web3Service.getSchoolContract();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(e.target.value);
    };

    const saveToChain = () => {
        // const classId = uuidv4()
        // TODO: change to uuidv4
        const classId = 1
        createClass(web3, contract, classId, className).then(() => {
            console.log('Class created');
        }).catch(e => {
            console.log('Failed to create class:', e)
        })
    }

    return (
        <div className="ClassCreation">
            <form onSubmit={saveToChain}>
                <button type="submit">Vote</button>
            </form>
        </div>
    );

}

export default Voting;
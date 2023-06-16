import React, {useContext, useState} from 'react';
import './SchoolCreation.css';
import Web3 from "web3";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import ServiceContext from "../../../ServiceContext";
import {Contract} from "web3-eth-contract";


const createSchool = async (web3: Web3, constract: Contract, name: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts:', accounts)
        return await constract.methods.createSchool(name).send({from: accounts[0]});
    } catch (error) {
        console.error('Failed to create school:', error);
    }
};

function SchoolCreation() {
    const [schoolName, setSchoolName] = useState('');
    const web3Service = useContext(ServiceContext);
    const [web3, contract] = web3Service.getSchoolContract();

    const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };

    const saveToChain = () => {
        createSchool(web3, contract, schoolName).then(() => {
            console.log('School created');
        }).catch(e => {
                console.log('Failed to create school:', e)
            }
        )
    }

    return (
        <div className="SchoolCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"School Name"}
                    type="text"
                    value={schoolName}
                    onChange={handleSchoolNameChange}
                />

                <button type="submit">Create School</button>
            </form>
        </div>
    );
}

export default SchoolCreation;

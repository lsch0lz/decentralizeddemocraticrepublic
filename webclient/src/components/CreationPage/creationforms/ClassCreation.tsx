import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import createClass from "../../../blockchain/SchoolContract";

// const createClass = async (web3: Web3, constract: Contract, classId: number, name: string) => {
//     try {
//         const accounts = await web3.eth.getAccounts();
//         console.log('accounts:', accounts)
//         return await constract.methods.createClass(classId, name).send({from: accounts[0]});
//     } catch (error) {
//         console.error('Failed to create school:', error);
//     }
// };

export function ClassCreation() {
    const [className, setClassName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(e.target.value);
    };


    const saveToChain = () => {
        // TODO: ClassId?, Woher Schoolname?
        createClass(
            "Name",
            "schoolname"
        ).then(() => {
            console.log('Class created');
        });
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

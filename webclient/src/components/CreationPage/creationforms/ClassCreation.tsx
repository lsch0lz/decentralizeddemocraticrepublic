import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";
import {addStudentToClass, createClass} from "../../Contract";


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

    const saveToChain = async (e: React.FormEvent) => {
        e.preventDefault();
        await createClass(
            className,
            "JMG"
        )
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

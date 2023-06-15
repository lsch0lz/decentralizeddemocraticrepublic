import React, {useState} from 'react';
import lorenIpsumContract from "../contracts/StringContract.json";
import Web3 from "web3";


const contractABI = lorenIpsumContract.abi;
const contractAddress = '0x4e8b372587a940F90402b89D28940eB43C1CcE22'; // Replace with your contract address

const web3 = new Web3(Web3.givenProvider);
// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

function Home() {
    let [value, setValue] = useState<String>()

    contractInstance.methods.getString().call()
        .then((result: any) => {
            setValue(result)
        })
        .catch((error: any) => {
            setValue("error: ${error}")
            console.error(error);
        });
    return (
        <div>
            <h1>Home</h1>
            <p>Home page body content</p>
            <p>Contract value: {value}</p>
        </div>
    );
}

export default Home;

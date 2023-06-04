import React, {useState} from 'react';
import lorenIpsumContract from "../contracts/StringContract.json";
import Web3 from "web3";


const contractABI = lorenIpsumContract.abi;
const contractAddress = '0xd1AC383418Dd8c17577b647dBDbEd4E473E7bf49'; // Replace with your contract address

const web3 = new Web3(Web3.givenProvider);
// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
const Home: React.FC = () => {
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
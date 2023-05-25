import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import lorenIpsumContract from './contracts/StringContract.json';
import Web3 from 'web3';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';


const contractABI = lorenIpsumContract.abi;
const contractAddress = '0xD174e0f4c2FaD1cae33eE5C0aA9B014421C519f2'; // Replace with your contract address

const web3 = new Web3(Web3.givenProvider);
// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);


function App() {

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
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Value from contract: {value}</p>
                    <h1>{value}</h1>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"></a>
                </header>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
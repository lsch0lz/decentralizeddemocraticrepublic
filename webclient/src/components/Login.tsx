import React, { useState } from 'react';
import Web3 from "web3";
import schoolContract from "../contracts/School.json";


const contractABI = schoolContract.abi;
const contractAddress = '0x0dde0876D952Ac08c019D5529C8616c800537Aa8'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);


const log_in = async (studentName: string, password: string) => {
    try {
        return await contractInstance.methods.log_in(
            studentName,
            password
        ).call()
    } catch (error) {
        console.error('Failed to log in:', error);
    }
};

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = () => {
        // Check if username and password match the value from App.tsx
        log_in(username, password).then((value) => {
            console.log('value:', value)
        }).catch(e => {
            console.log('Failed to log in:', e)
        })
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {loginError && <p style={{ color: 'red' }}>Invalid username or password</p>}

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;

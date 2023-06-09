import React, { useState } from 'react';
import Web3 from "web3";
import schoolContract from "./../contracts/School.json";

const contractABI = schoolContract.abi;
const contractAddress = '0xcC61571394147db42501b6B450d64EBC2A04BDff'; // Replace with your contract address

const ganacheUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const log_in = async (studentName: string, password: string) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("log in", studentName, password)
        console.log("accounts", accounts);
        return await contractInstance.methods
            .log_in(studentName, password)
            .send({ from: accounts[0] })
            .then(function(result: any){
                console.log("result", result);
        });
    } catch (error) {
        console.error('Failed to get login data:', error);
        throw error;
    }
};
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async () => {
        try {
            const [success, role] = await log_in(username, password);
            console.log("results", success, role);
            if (success) {
                // User logged in successfully
                console.log('Login successful. Role:', role);
            } else {
                // Invalid username or password
                console.log('Invalid username or password');
                setLoginError(true);
            }
        } catch (error) {
            console.log('Failed to log in:', error);
        }
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

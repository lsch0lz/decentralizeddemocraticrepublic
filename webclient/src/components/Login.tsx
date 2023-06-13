import React, { useState } from 'react';
import Web3 from "web3";
import { useCookies } from "react-cookie";
import schoolContract from "../contracts/School.json";


const contractABI = schoolContract.abi;
const contractAddress = '0x3fbC84CC8cc5366a218a2aB865cE4e0437c1B90b'; // Replace with your contract address

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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [cookies, setCookie] = useCookies(['username', 'password', 'role']);

    const handleLogin = () => {
        // Check if username and password match the value from App.tsx
        if (username === 'example' && password === 'password') {
            // Successful login
            console.log('Login successful');
            setShowSuccessMessage(true);
            setLoginError(false);
            // Perform additional actions or redirect to another page
            // Set the session cookie with the "username" and "password" values
            setCookie('username', username, { path: '/' });
            setCookie('password', password, { path: '/' });
            setCookie('role', 'student', { path: '/' });
        } else {
            // Failed login
            console.log('Login failed');
            setLoginError(true);
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
            {showSuccessMessage && (
                <div style={{ color: 'green' }}>
                    <p>Correct Password</p>
                    <p>Username: {cookies.username}</p>
                    <p>Role: {cookies.password}</p>
                    <p>Role: {cookies.role}</p>
                </div>
            )}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;

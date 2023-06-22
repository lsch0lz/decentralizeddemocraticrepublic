import React, {useContext, useState} from 'react';
import Web3 from "web3";
import schoolContract from "../contracts/School.json";
import RoleContext, {Role} from "./RoleContext";
import './LoginPage.css';

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

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {currentRole, setCurrentRole} = useContext(RoleContext);


    const handleLogin = () => {
        // Check if username and password match the value from App.tsx
        if (username === 'example' && password === 'password') {
            // Successful login
            console.log('Login successful');
            setShowSuccessMessage(true);
            setLoginError(false);
            setCurrentRole(Role.Principal)
        } else {
            // Failed login
            console.log('Login failed');
            setLoginError(true);
        }
    };

    return (
        <div className="login-container"> {/* Apply the container class */}
            <h2>Login</h2>
            <div className="input-group"> {/* Apply the input group class */}
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-group"> {/* Apply the input group class */}
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {loginError && <p className="error-message">Invalid username or password</p>}
            {showSuccessMessage && (
                <div className="success-message">
                    <p>Correct Password</p>
                    <p>Role: {currentRole}</p>
                </div>
            )}
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;

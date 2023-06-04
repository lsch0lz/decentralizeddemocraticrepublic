import React, { useState } from 'react';
import lorenIpsumContract from "../contracts/StringContract.json";
import Web3 from "web3";
import { useCookies} from "react-cookie";


const contractABI = lorenIpsumContract.abi;
const contractAddress = '0xd1AC383418Dd8c17577b647dBDbEd4E473E7bf49'; // Replace with your contract address

const web3 = new Web3(Web3.givenProvider);
// @ts-ignore
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // get password from contract
    let [value, setValue] = useState<String>()

    contractInstance.methods.getString().call()
        .then((result: any) => {
            setValue(result)
        })
        .catch((error: any) => {
            setValue("error: ${error}")
            console.error(error);
        });

    const [cookies, setCookie] = useCookies(['username', 'password']);

    const handleLogin = () => {
        // Check if username and password match the value from App.tsx
        if (username === 'example' && password === value) {
            // Successful login
            console.log('Login successful');
            setShowSuccessMessage(true);
            setLoginError(false);
            // Perform additional actions or redirect to another page
            // Set the session cookie with the "username" and "password" values
            setCookie('username', username, { path: '/' });
            setCookie('password', password, { path: '/' });
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
                    <p>Password: {cookies.password}</p>
                </div>
            )}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;

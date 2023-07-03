import React, {useContext, useState} from 'react';
import RoleContext, {Role} from "./RoleContext";
import './LoginPage.css';
import {login} from "./Contract";


export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {currentRole, setCurrentRole} = useContext(RoleContext);

    const handleLogin = () => {

        if (username === 'example' && password === 'password') {
            // Successful login
            console.log('Login successful');
            setShowSuccessMessage(true);
            setLoginError(false);
            setCurrentRole(Role.Principal)
        } else {
            // Failed login
            login(username, password, "JMG")
                .then(r => {
                    console.log(r[0])
                    if (r[0] == true) {
                        console.log('Login successful');
                        setShowSuccessMessage(true);
                        setLoginError(false);

                        if (r[1] == "student") {
                            setCurrentRole(Role.Student)
                        } else {
                            setCurrentRole(Role.Teacher)
                        }
                    }
                })
                .catch(e => {
                    setLoginError(true)
                    console.log(e)
                })


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
}

export default LoginPage;

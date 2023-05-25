import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = () => {
        // Check if username and password match the value from App.tsx
        if (username === 'example' && password === 'password') {
            // Successful login
            console.log('Login successful');
            setLoginError(false);
            // Perform additional actions or redirect to another page
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;

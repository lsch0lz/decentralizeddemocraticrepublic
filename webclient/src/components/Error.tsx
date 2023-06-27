import React from 'react';
import './Error.css';

const Error = () => {
    return (
        <div className="error-container">
            <p className="error-message">Error: Page does not exist!</p>
            <button className="go-home-btn" onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
    );
}

export default Error;

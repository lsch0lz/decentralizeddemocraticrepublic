import React from 'react';

const Error = () => {
    return (
        <div>
            <p>Error: Page does not exist!</p>
            <button onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
    );
}

export default Error;

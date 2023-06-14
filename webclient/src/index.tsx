import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MyContextProvider} from "./components/RoleContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <MyContextProvider>
        <App/>
    </MyContextProvider>,
    rootElement
);

reportWebVitals();

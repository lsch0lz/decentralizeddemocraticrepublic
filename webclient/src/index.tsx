import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RoleContextProvider} from "./components/RoleContext";
import {Web3ServiceImpl} from "./Web3Service";
import ServiceContext from './ServiceContext';

const rootElement = document.getElementById("root");
const web3Service = new Web3ServiceImpl();

ReactDOM.render(
    <ServiceContext.Provider value={web3Service}>
        <RoleContextProvider>
            <App/>
        </RoleContextProvider>
    </ServiceContext.Provider>,
    rootElement
);

reportWebVitals();

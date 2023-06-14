import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RoleContextProvider} from "./components/RoleContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <RoleContextProvider>
        <App/>
    </RoleContextProvider>,
    rootElement
);

reportWebVitals();

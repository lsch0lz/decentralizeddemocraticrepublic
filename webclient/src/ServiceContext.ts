import React from 'react';
import {Web3Service, Web3ServiceImpl} from "./Web3Service";

const ServiceContext = React.createContext<Web3Service>(new Web3ServiceImpl());

export default ServiceContext;

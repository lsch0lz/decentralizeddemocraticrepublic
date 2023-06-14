import React from 'react';
import {Web3Service} from "./Web3Service";

const ServiceContext = React.createContext<Web3Service | undefined>(undefined);

export default ServiceContext;

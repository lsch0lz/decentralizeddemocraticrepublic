import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import schoolContract from "./contracts/School.json";
import lorenIpsumContract from "./contracts/StringContract.json";

export interface Web3Service {
    getSchoolContract(): [Web3, Contract];

    getHelloWorldContract(): [Web3, Contract];
}

export class Web3ServiceImpl implements Web3Service {

    getHelloWorldContract(): [Web3, Contract] {
        const contractABI = schoolContract.abi;
        // TODO: Replace with your contract address
        const contractAddress = '0x0dde0876D952Ac08c019D5529C8616c800537Aa8'; // Replace with your contract address
        const web3 = new Web3(Web3.givenProvider);
        // @ts-ignore
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        return [web3, contract];
    }

    getSchoolContract(): [Web3, Contract] {
        const contractABI = lorenIpsumContract.abi;
        // TODO: Replace with your contract address
        const contractAddress = '0xd1AC383418Dd8c17577b647dBDbEd4E473E7bf49'; // Replace with your contract address
        const web3 = new Web3(Web3.givenProvider);
        // @ts-ignore
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        return [web3, contract];
    }
}

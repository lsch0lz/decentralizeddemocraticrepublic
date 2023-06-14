import Web3 from "web3";
import schoolContract from "./contracts/School.json";
import lorenIpsumContract from "./contracts/StringContract.json";

export interface Web3Service {
    getSchool(): Web3;
    getHelloWorld(): Web3;
}

export class Web3ServiceImpl implements Web3Service {

    getHelloWorld(): Web3 {
        const contractABI = schoolContract.abi;
        const contractAddress = '0x0dde0876D952Ac08c019D5529C8616c800537Aa8'; // Replace with your contract address
        const web3 = new Web3(Web3.givenProvider);
        // @ts-ignore
        return new web3.eth.Contract(contractABI, contractAddress);
    }

    getSchool(): Web3 {
        const contractABI = lorenIpsumContract.abi;
        const contractAddress = '0xd1AC383418Dd8c17577b647dBDbEd4E473E7bf49'; // Replace with your contract address
        const web3 = new Web3(Web3.givenProvider);
        // @ts-ignore
        return new web3.eth.Contract(contractABI, contractAddress);
    }
}

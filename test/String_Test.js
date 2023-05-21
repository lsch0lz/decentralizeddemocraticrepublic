const Web3 = require('web3');
const StringContract = require('../build/contracts/StringContract.json');

// Set up a connection to your Ganache network
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

async function test() {
  try {
    // Get the deployed contract instance
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = StringContract.networks[networkId];
    const deployedContract = new web3.eth.Contract(
      StringContract.abi,
      deployedNetwork.address
    );

    // Get the string value
    const result = await deployedContract.methods.getString().call();
    console.log('Initial value:', result);

    // Set a new string value
    const accounts = await web3.eth.getAccounts();
    await deployedContract.methods.setString('\n Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.').send({
      from: accounts[0],
      gas: 2000000,
    });

    // Get the updated string value
    const updatedResult = await deployedContract.methods.getString().call();
    console.log('Updated value:', updatedResult);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();

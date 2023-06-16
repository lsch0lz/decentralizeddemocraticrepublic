import React, {useContext, useState} from 'react';
import ServiceContext from "../ServiceContext";


function Home() {
    let [value, setValue] = useState<String>()

    const web3Service = useContext(ServiceContext);
    const [, contract] = web3Service.getHelloWorldContract();

    console.log('contract', contract)

    contract.methods.getString().call()
        .then((result: any) => {
            setValue(result)
        })
        .catch((error: any) => {
            setValue("error: ${error}")
            console.error(error);
        });
    return (
        <div>
            <h1>Home</h1>
            <p>Home page body content</p>
            <p>Contract value: {value}</p>
        </div>
    );
}

export default Home;

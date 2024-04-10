'use client';
import { ConnectButton, useApi } from 'arweave-wallet-kit';
const { message, createDataItemSigner, connect, dryrun, result } = require('@permaweb/aoconnect');
// import { message, createDataItemSigner, connect, dryrun, result } from '@permaweb/aoconnect';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const api = useApi();
    const [data, setData] = useState(null);
    // setData("ab")

    async function getDry() {
        let pub = await window.arweaveWallet.getActiveAddress();
        console.log('pub: ' + pub);
        // const result = await dryrun({
        //     process: 'Fhm5tFTmN3EXBji6EngRhu1g22DgM7SGi7uQBopZMlc',
        //     tags: [{ name: 'Action', value: 'Eval' }],
        //     data: "require('json').encode(myName)",
        //     Owner: 'b8FjTeLN55rWw9M-Vt6fpUhD1OMsXbdD8g2ta2L9Woo',
        // });
        // console.log(result);
        // console.log(result.Output.data.output);
        // return result.Output.data.output;

        return await dryrun({
            process: 'Fhm5tFTmN3EXBji6EngRhu1g22DgM7SGi7uQBopZMlc',
            tags: [{ name: 'Action', value: 'Eval' }],
            data: "require('json').encode(myName)",
            Owner: 'b8FjTeLN55rWw9M-Vt6fpUhD1OMsXbdD8g2ta2L9Woo',
        });
    }

    useEffect(() => {
        getDry().then((result) => {
            setData(result.Output.data.output);
        });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // const wallet = new ArweaveWebWallet();
    // wallet.setUrl('arweave.app');
    // function App() {
    //     // wallet.setState(useState(wallet.state))
    //     return (
    //         <div>
    //             <p onClick={() => wallet.connect()}>Connect</p>
    //             <p>{wallet.address}</p>
    //         </div>
    //     );
    // }

    async function sendMessage() {
        // const { wallet } = useWallet();
        let pub = await window.arweaveWallet.getActiveAddress();
        console.log('pub: ' + pub);

        const messageId = await message({
            process: 'Fhm5tFTmN3EXBji6EngRhu1g22DgM7SGi7uQBopZMlc',
            tags: [
                { name: 'Your-Tag-Name-Here', value: 'your-tag-value' },
                { name: 'Another-Tag', value: 'another-value' },
            ],
            // A signer function used to build the message "signature"
            signer: createDataItemSigner(window.arweaveWallet),
            //   signer: window.arweaveWallet.signDataItem(),
            data: 'ping',
        });

        console.log('messageId: ' + messageId);
        let {
            Messages: messages,
            Spawns,
            Output,
            Error,
        } = await result({
            message: messageId,
            process: 'Fhm5tFTmN3EXBji6EngRhu1g22DgM7SGi7uQBopZMlc',
        });
        console.log(messages);
        console.log(Output);
    }

    return (
        <main>
            <div>
                <h1>首页</h1>
                {data && (
                    <div>
                        <p>{data}</p>
                    </div>
                )}
            </div>
            <ConnectButton showBalance={true} showProfilePicture={true} />
            <button onClick={() => getDry()}>Dry</button>
            <button onClick={() => sendMessage()}>Message</button>
        </main>
    );
};

export default Home;
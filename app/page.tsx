'use client';
const { message, createDataItemSigner, connect, dryrun, result } = require('@permaweb/aoconnect');
// import { message, createDataItemSigner, connect, dryrun, result } from '@permaweb/aoconnect';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState(null);

    async function getDry() {
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
            <button onClick={() => getDry()}>Dry</button>
        </main>
    );
};

export default Home;

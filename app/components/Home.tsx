import { useEffect, useState } from 'react';
const { dryrun } = require('@permaweb/aoconnect');


const MEME = "-a4T7XLMDGTcu8_preKXdUT6__4sJkMhYLEJZkXUYd0"
const INITIAL_FRAME = "J_6eJSA-NZ8BnmdZVtb3vTTd1_LDVBi4_c4grV7mWGc"

function Home () {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const getWebsite = async () => {
          try {
            const result = await dryrun({
              process: MEME,
              tags: [{ name: 'Action', value: "Get-Frame" }]
            });
            if (result) {
              return result.Messages[0].Data;
            } else {
              console.log("Got no response from dryrun!")
              return INITIAL_FRAME
            }
          } catch (e) {
            console.log(e);
          }
        };
    
        const setupIframe = async () => {
          const processResponse = await getWebsite();
          const url = `https://arweave.net/${processResponse}`;
          setIframeSrc(url);
        };
    
        setupIframe();
      }, []);
    return (
        <div>
            <div>
                <iframe title="Meme-Ception" className="w-full h-screen" src={iframeSrc} />
            </div>
        </div>
	);
}

export default Home;

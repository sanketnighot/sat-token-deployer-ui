# SAT Token Deployer Documentation

# Project Description

SAT's stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos blockchain that transforms the relationship between artists and their collectors. SAT's operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.

# Smart Contracts

- **Folder Name:** single-asset-fungible-fa2
- **Main Contract:** single-asset-fungible-fa2/contracts/token_contract.py
- **Test Contract:** single-asset-fungible-fa2/contracts/token_contract.py
- **Library Contract:** single-asset-fungible-fa2/contracts/utilities/fa2_lib.py
- **Compiled Contract:** single-asset-fungible-fa2/artifacts/token_contract.tz

Note: There is no modifications Needed in this smart contracts.

# Frontend

- **Folder Name:** sat-token-deployer

## Explaining Folder Structure

- pages folder:
  - index.js

    This is the file where Home Page code is written.
    To add more items to accordion use following template

    ```jsx
    <AccordionItem title="Your Question Here">
      <p className="text-sm md:text-lg font-seven mb-4 px-2">
        Your Answer Here
      </p>
    </AccordionItem>
    ```

    At line 126, You need add link to your social media in href tag.

    ```jsx
    <div className="flex-row justify-center pt-5 text-3xl mx-auto text-center mt-5 mb-10">
        <h3>Co-created by <a className="text-extrabold underline" href="https://x.com/YourUsernameHere" target="_blank">Natived</a> and <a href="https://x.com/YourUsernameHere" target="_blank" className="text-extrabold underline">The Grand Quackster</a></h3>
    </div>
    ```

  - Collection.js
    This is the page where we have form to collect Collection Name, Collection Admin, Collection Description.

- components folder
  - Token.js
    This is the page where we have form to collect Token Details.

  - Accordion.js
    This is code for styling FAQ Dropdown

  - Loader.js
    Its just coin Image used as loader that plays till Colleciton page loads and opens

- styles Folder
  - Code for styling sheets is here.
- utils folder
  - config.js

    This is file where Main Wallet connection Configuration is Done

    ```jsx
    // This is network to connect wallet to for Mainnet use "mainnet"
    export const NETWORK = 'ghostnet';
    
    // RPC URL is used to connect to blockchain 
    // for mainnet use "https://mainnet.ecadinfra.com"
    // Also get more RPC URL here - "https://tezostaquito.io/docs/rpc_nodes/"
    export const RPC = 'https://ghostnet.ecadinfra.com'; 
    ```

  - contract_code.json

    This is code that will be deployed.

  - walletconnection.js

    Here is all logic for blockchain integration, wallet connection.

    At line 16, you can edit this according to your project details

    ```jsx
    const dAppInfo = {
                name: "SAT Token Deployer",
                iconUrl: "/assets/logo.png",
                preferredNetwork: NETWORK,
                colorMode: ColorMode.DARK,
                appUrl: "https://example.com",
                featuredWallets: ['temple', 'naan', 'kukai', 'trust'],
            };
    ```

  - origination.js

    Here, is the code to deploy the contract.

    At line 10, you can update FEE, FEE_RECIPENT, DECIMAL

    ```jsx
    // Wallet Address where all fees will be transfered to
    const FEE_RECIPIENT = 'tz1gPGbygTTqXPt3saqpnPW5YviLUGSB36rx';
    
    // Amount of Tez you want to charge
    const FEE = 2;
    
    // Decimals used for token contract
    const DECIMAL = 6;
    ```

    At line 36, You can update contract details here

    ```jsx
    let metadata = MichelsonMap.fromLiteral({
            "": Buffer("tezos-storage:contents", "ascii").toString("hex"),
            contents: Buffer(
                JSON.stringify({
                    version: "v0.0.1",       // Your Project Version
                    name: collectionName,                // Don't change this
                    description: collectionDescription,  // Don't change this
                    authors: ["SAT Token Deployer"], // Authors of Project
                    source: {
                        tools: ["Smartpy"],      // Don't change this
                    },
                    interfaces: ["TZIP-012", "TZIP-016"], // Don't change this
                }),
                "ascii"
            ).toString("hex"),
        });
    ```

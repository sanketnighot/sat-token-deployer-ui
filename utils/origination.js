import { dappClient } from './walletconnect';
import { char2Bytes } from "@taquito/utils";
import { MichelsonMap } from '@taquito/michelson-encoder';
import { DEPLOYER_CONTRACT_ADDRESS, FEE, DECIMAL } from './config';
import axios from 'axios';


export const deployContract = async (
    collectionData,
    setShowSuccess,
    setTransactionUrl,
    setIsLoading,
    setTxnMessage,
    setSuccessMessage,
    setErrorMessage,
    setShowError
) => {
    try {
        setIsLoading(true);
        setTxnMessage('Connecting Wallet ...');
        await dappClient().connectAccount();
        const metadata = MichelsonMap.fromLiteral({
            "": Buffer("tezos-storage:contents", "ascii").toString("hex"),
            contents: Buffer(
                JSON.stringify({
                    version: "v0.0.1",
                    name: collectionData.collectionName,
                    description: collectionData.collectionDescription,
                    authors: ["Deeployer < https://x.com/tzdeeployer >"],
                    source: {
                        tools: ["Smartpy"],
                    },
                    interfaces: ["TZIP-012", "TZIP-016"],
                }),
                "ascii"
            ).toString("hex"),
        });
        const tokenMetadata = {
            symbol: collectionData.tokenSymbol,
            name: collectionData.tokenName,
            decimals: DECIMAL,
            shouldPreferSymbol: "true",
            description: collectionData.tokenDescription,
            thumbnailUri: collectionData.tokenUrl
        }
        setTxnMessage('Uploading Metadata to IPFS...');
        const res = await axios.post("/api/ipfs", { data: tokenMetadata })
        console.log(res.data.hash, res.data.hash)
        if (res.data.status === "error") {
            return false
        }
        setTxnMessage('Waiting for you to sign Transaction ...');
        const tezos = await dappClient().tezos();
        const transaction = await tezos.wallet
            .at(DEPLOYER_CONTRACT_ADDRESS)
            .then((contract) => {
                return contract.methods.deploy_contract(
                    collectionData.collectionAdmin,
                    metadata,
                    collectionData.tokenSupply * (10 ** DECIMAL),
                    { "": char2Bytes(`ipfs://${res.data.hash}`) }
                )
                    .send({ amount: FEE * 1000000, mutez: true });
            });
        setTxnMessage('Waiting for Confirmation ...');
        await transaction.confirmation();
        await dappClient().disconnectWallet()
        setIsLoading(false);
        setTxnMessage();
        setShowSuccess(true);
        setSuccessMessage('Contract deployed successfully!');
        setTransactionUrl(`https://tzkt.io/${transaction.opHash}`);

    } catch (error) {
        await dappClient().disconnectWallet()
        console.log(error);
        setIsLoading(false);
        setShowError(true);
        setErrorMessage(error.message);
    }
}

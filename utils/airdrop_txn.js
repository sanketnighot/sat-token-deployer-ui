import { dappClient } from './walletconnect';
import { BigNumber } from 'bignumber.js';
import { FEE, DECIMAL, FEE_RECIPIENT, EXPLORER } from './config';

BigNumber.config({ DECIMAL_PLACES: DECIMAL })

export const sendAirdrop = async (
    jsonData,
    setTransactionUrl,
    setIsLoading,
    setTxnMessage,
    setSuccessMessage,
    setErrorMessage,
    setShowError,
    setShowSuccess
) => {
    try {
        setIsLoading(true);
        setTxnMessage('Connecting Wallet ...');
        await dappClient().CheckIfWalletConnected()
        setTxnMessage('Preparing Airdrop ...');
        const tezos = await dappClient().tezos();
        const batch = tezos.wallet.batch();
        batch.withTransfer({ to: FEE_RECIPIENT, amount: FEE });
        for (const data of jsonData) {
            const tokenContract = await tezos.wallet.at(data["Contract Address"]);
            batch.withContractCall(
                tokenContract.methods.transfer([
                    {
                        from_: data["Sender Address"],
                        txs: [
                            {
                                to_: data["Recepient Address"],
                                token_id: Number(data["Token ID"]),
                                amount: Number(data["Amount"]),
                            },
                        ],
                    },
                ])
            );
        }
        setTxnMessage('Please Sign the Transaction ...');
        const batchOperation = await batch.send();
        setTxnMessage('Airdropping your Tokens ...');
        await batchOperation.confirmation();
        await dappClient().disconnectWallet()
        setIsLoading(false);
        setTxnMessage();
        setShowSuccess(true);
        setSuccessMessage('Tokens Airdropped successfully!');
        setTransactionUrl(`${EXPLORER}/${batchOperation.opHash}`);
    } catch (error) {
        await dappClient().disconnectWallet()
        console.log(error);
        setIsLoading(false);
        setErrorMessage(error.message);
        setShowError(true);
    }
}

const createJsonData = (senderAddress, contractAddress, tokenId, amount, recepientAddress) => {
    // Split the recepientAddress string into an array of addresses
    const recepientAddresses = recepientAddress.split(',').map(address => address.trim());

    // Initialize an empty array to hold the list of objects
    const jsonDataList = [];

    // Loop through each recepient address
    recepientAddresses.forEach(address => {
        // Create a new object for each address
        const jsonData = {
            "Sender Address": senderAddress,
            "Contract Address": contractAddress,
            "Token ID": tokenId,
            "Recepient Address": address,
            "Amount": amount
        };

        // Add the object to the list
        jsonDataList.push(jsonData);
    });
    return jsonDataList;
};

export const sendAirdropCopyPaste = async (
    contractAddress,
    tokenId,
    amount,
    recepientAddress,
    setTransactionUrl,
    setIsLoading,
    setTxnMessage,
    setSuccessMessage,
    setErrorMessage,
    setShowError,
    setShowSuccess
) => {
    try {
        setIsLoading(true);
        setTxnMessage('Connecting Wallet ...');
        await dappClient().CheckIfWalletConnected()
        setTxnMessage('Preparing Airdrop ...');
        const senderAddress = (await dappClient().getAccount()).account.address;
        const jsonData = await createJsonData(senderAddress, contractAddress, tokenId, amount, recepientAddress);
        const tezos = await dappClient().tezos();
        const batch = tezos.wallet.batch();
        batch.withTransfer({ to: FEE_RECIPIENT, amount: FEE });
        for (const data of jsonData) {
            const tokenContract = await tezos.wallet.at(data["Contract Address"]);
            batch.withContractCall(
                tokenContract.methods.transfer([
                    {
                        from_: data["Sender Address"],
                        txs: [
                            {
                                to_: data["Recepient Address"],
                                token_id: Number(data["Token ID"]),
                                amount: Number(data["Amount"]),
                            },
                        ],
                    },
                ])
            );
        }
        setTxnMessage('Please Sign the Transaction ...');
        const batchOperation = await batch.send();
        setTxnMessage('Airdropping your Tokens ...');
        await batchOperation.confirmation();
        await dappClient().disconnectWallet()
        setIsLoading(false);
        setTxnMessage();
        setShowSuccess(true);
        setSuccessMessage('Tokens Airdropped successfully!');
        setTransactionUrl(`${EXPLORER}/${batchOperation.opHash}`);
    } catch (error) {
        await dappClient().disconnectWallet()
        console.log(error);
        setIsLoading(false);
        setErrorMessage(error.message);
        setShowError(true);
    }
}
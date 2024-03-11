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
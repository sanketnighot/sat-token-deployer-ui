import { dappClient } from "./walletconnect"
import { BigNumber } from "bignumber.js"
import { AIRDROP_FEE, DECIMAL, FEE_RECIPIENT, EXPLORER } from "./config"

BigNumber.config({ DECIMAL_PLACES: DECIMAL })

export const sendAirdrop = async (
  jsonData,
  contractAddress,
  tokenId,
  amount,
  decimal,
  setTransactionUrl,
  setIsLoading,
  setTxnMessage,
  setSuccessMessage,
  setErrorMessage,
  setShowError,
  setShowSuccess
) => {
  try {
    setIsLoading(true)
    setTxnMessage("Connecting Wallet ...")
    await dappClient().CheckIfWalletConnected()
    const account = await (await dappClient().getAccount()).account.address
    setTxnMessage("Preparing Airdrop ...")
    const tezos = await dappClient().tezos()
    const batch = tezos.wallet.batch()
    batch.withTransfer({ to: FEE_RECIPIENT, amount: AIRDROP_FEE })
    let transferData = []
    jsonData.map(async (data) => {
      transferData.push({
        to_: data,
        token_id: Number(tokenId),
        amount: (Number(amount) * 10 ** decimal).toFixed(),
      })
    })
    const tokenContract = await tezos.wallet.at(contractAddress)

    batch.withContractCall(
      tokenContract.methods.transfer([
        {
          from_: account,
          txs: transferData,
        },
      ])
    )
    setTxnMessage("Please Sign the Transaction ...")
    const batchOperation = await batch.send()
    setTxnMessage("Airdropping your Tokens ...")
    await batchOperation.confirmation()
    setIsLoading(false)
    setTxnMessage()
    setShowSuccess(true)
    setSuccessMessage("Tokens Airdropped successfully!")
    setTransactionUrl(`${EXPLORER}/${batchOperation.opHash}`)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

const createJsonData = (recepientAddress) => {
  const recepientAddresses = recepientAddress
    .split(",")
    .map((address) => address.trim())

  const addressList = []

  recepientAddresses.forEach((address) => {
    addressList.push(address)
  })

  return addressList
}

export const sendAirdropCopyPaste = async (
  contractAddress,
  tokenId,
  amount,
  decimal,
  recepientAddress,
  setTransactionUrl,
  setIsLoading,
  setTxnMessage,
  setSuccessMessage,
  setErrorMessage,
  setShowError,
  setShowSuccess
) => {
  const jsonData = await createJsonData(recepientAddress)
  await sendAirdrop(
    jsonData,
    contractAddress,
    tokenId,
    amount,
    decimal,
    setTransactionUrl,
    setIsLoading,
    setTxnMessage,
    setSuccessMessage,
    setErrorMessage,
    setShowError,
    setShowSuccess
  )
}

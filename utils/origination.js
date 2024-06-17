import { dappClient } from "./walletconnect"
import contractCode from "./contract_code.json"
import { MichelsonMap } from "@taquito/michelson-encoder"
import { BigNumber } from "bignumber.js"
import { FEE, DECIMAL, FEE_RECIPIENT } from "./config"

BigNumber.config({ DECIMAL_PLACES: DECIMAL })

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
    setIsLoading(true)
    setTxnMessage("Connecting Wallet ...")
    await dappClient().CheckIfWalletConnected()
    setTxnMessage("Preparing Metadata ...")
    let metadata = MichelsonMap.fromLiteral({
      "": Buffer("tezos-storage:contents", "ascii").toString("hex"),
      contents: Buffer(
        JSON.stringify({
          version: "v0.0.1",
          name: collectionData.collectionName,
          description: collectionData.collectionDescription,
          authors: ["SAT Token Deployer"],
          source: {
            tools: ["Smartpy"],
          },
          interfaces: ["TZIP-012", "TZIP-016"],
        }),
        "ascii"
      ).toString("hex"),
    })
    const tokenMetadata = MichelsonMap.fromLiteral({
      0: {
        token_id: 0,
        token_info: MichelsonMap.fromLiteral({
          symbol: Buffer(collectionData.tokenSymbol, "ascii").toString("hex"),
          name: Buffer(collectionData.tokenName, "ascii").toString("hex"),
          decimals: Buffer(DECIMAL.toString(), "ascii").toString("hex"),
          shouldPreferSymbol: Buffer("true", "ascii").toString("hex"),
          description: Buffer(
            collectionData.tokenDescription,
            "ascii"
          ).toString("hex"),
          thumbnailUri: Buffer(collectionData.tokenUrl, "ascii").toString(
            "hex"
          ),
        }),
      },
    })
    setTxnMessage("Setting up Storage ...")
    let storage = {
      administrator: collectionData.collectionAdmin,
      last_token_id: 1,
      ledger: MichelsonMap.fromLiteral({}),
      metadata: metadata,
      operators: {},
      supply: collectionData.tokenSupply * 1000000,
      token_metadata: tokenMetadata,
    }
    storage.ledger.set(
      collectionData.collectionAdmin,
      collectionData.tokenSupply * 1000000
    )
    setTxnMessage("Waiting for you to sign Transaction ...")
    const tezos = await dappClient().tezos()
    const batch = await tezos.wallet
      .batch()
      // .withTransfer({ to: FEE_RECIPIENT, amount: FEE })
      .withOrigination({
        code: contractCode,
        storage: storage,
      })
      .send()
    setTxnMessage("Waiting for Confirmation ...")
    await batch.confirmation()
    setIsLoading(false)
    setTxnMessage()
    setShowSuccess(true)
    setSuccessMessage("Contract deployed successfully!")
    setTransactionUrl(`https://tzkt.io/${batch.opHash}`)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

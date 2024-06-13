import { dappClient } from "./walletconnect"
import { UnitValue } from "@taquito/taquito"
import { BigNumber } from "bignumber.js"
import {
  FEE,
  DECIMAL,
  FEE_RECIPIENT,
  EXPLORER,
  FARMING_CONTRACT,
} from "./config"

BigNumber.config({ DECIMAL_PLACES: DECIMAL })

export const createFarm = async (
  farmDetails,
  setTransactionUrl,
  setIsLoading,
  setTxnMessage,
  setSuccessMessage,
  setErrorMessage,
  setShowError,
  setShowSuccess
) => {
  console.log(farmDetails)
  try {
    // --
    const startTime = new Date(farmDetails.farmStartTime).getTime() / 1000
    const endTime = new Date(farmDetails.farmEndTime).getTime() / 1000
    if (endTime < startTime) {
      console.log("End time should be greater than start time")
      throw new Error("End time should be greater than start time")
    }
    setIsLoading(true)
    setTxnMessage("Connecting Wallet ...")
    await dappClient().CheckIfWalletConnected()
    setTxnMessage("Creating Farm ...")
    const tezos = await dappClient().tezos()
    const farming_contract = await tezos.wallet.at(FARMING_CONTRACT)
    const pool_token_contract = await tezos.wallet.at(
      farmDetails.poolTokenAddress
    )
    const reward_token_contract = await tezos.wallet.at(
      farmDetails.rewardTokenAddress
    )
    const myAddress = await dappClient().getAccount()
    const batch = await tezos.wallet
      .batch()
      .withTransfer({ to: FEE_RECIPIENT, amount: FEE })
      .withContractCall(
        pool_token_contract.methods.update_operators([
          {
            add_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: farmDetails.poolTokenId,
            },
          },
        ])
      )
      .withContractCall(
        reward_token_contract.methods.update_operators([
          {
            add_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: farmDetails.rewardTokenId,
            },
          },
        ])
      )
      .withContractCall(
        farming_contract.methodsObject.createFarm({
          bonuses: [],
          end_time: new Date(farmDetails.farmEndTime).toISOString(),
          lock_duration: 0,
          pool_token: {
            address: farmDetails.poolTokenAddress,
            token_id: parseInt(farmDetails.poolTokenId),
            token_type: {
              fa2: null,
            },
          },
          reward_supply: parseInt(farmDetails.totalRewards) * 10 ** DECIMAL,
          reward_token: {
            address: farmDetails.rewardTokenAddress,
            token_id: parseInt(farmDetails.rewardTokenId),
            token_type: {
              fa2: null,
            },
          },
          start_time: new Date(farmDetails.farmStartTime).toISOString(),
        })
      )
      .withContractCall(
        pool_token_contract.methods.update_operators([
          {
            remove_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: farmDetails.poolTokenId,
            },
          },
        ])
      )
      .withContractCall(
        reward_token_contract.methods.update_operators([
          {
            remove_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: farmDetails.rewardTokenId,
            },
          },
        ])
      )
      .send()

    await batch.confirmation()
    console.log(batch.opHash)
    setIsLoading(false)
    setSuccessMessage("Farm Created successfully!")
    setTransactionUrl(`${EXPLORER}/${batch.opHash}`)
    setShowSuccess(true)
    // --
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

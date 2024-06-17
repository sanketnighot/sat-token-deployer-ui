import { dappClient } from "./walletconnect"
import axios from "axios"
import { BigNumber } from "bignumber.js"
import {
  FEE,
  DECIMAL,
  FEE_RECIPIENT,
  EXPLORER,
  FARMING_CONTRACT,
  API,
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

export const harvestFarm = async (
  farm_id,
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
    setTxnMessage("Harvesting Rewards ...")
    const tezos = await dappClient().tezos()
    const farming_contract = await tezos.wallet.at(FARMING_CONTRACT)
    const contract_call = await farming_contract.methods.harvest(farm_id).send()
    await contract_call.confirmation()
    setIsLoading(false)
    setSuccessMessage("Rewards Harvested successfully!")
    setTransactionUrl(`${EXPLORER}/${contract_call.opHash}`)
    setShowSuccess(true)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

export const depositTokens = async (
  farmId,
  depositAmount,
  poolTokenAddress,
  poolTokenId,
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
    setTxnMessage("Depositing Tokens ...")
    const tezos = await dappClient().tezos()
    const farming_contract = await tezos.wallet.at(FARMING_CONTRACT)
    const pool_token_contract = await tezos.wallet.at(poolTokenAddress)
    const myAddress = await dappClient().getAccount()
    const batch = await tezos.wallet
      .batch()
      .withContractCall(
        pool_token_contract.methods.update_operators([
          {
            add_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: poolTokenId,
            },
          },
        ])
      )
      .withContractCall(
        farming_contract.methodsObject.deposit({
          farm_id: farmId,
          token_amount: depositAmount,
        })
      )
      .withContractCall(
        pool_token_contract.methods.update_operators([
          {
            remove_operator: {
              owner: myAddress.account.address,
              operator: FARMING_CONTRACT,
              token_id: poolTokenId,
            },
          },
        ])
      )
      .send()

    await batch.confirmation()
    setIsLoading(false)
    setSuccessMessage("Tokens Deposited successfully!")
    setTransactionUrl(`${EXPLORER}/${batch.opHash}`)
    setShowSuccess(true)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

export const withdrawTokens = async (
  farmId,
  withdrawAmount,
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
    setTxnMessage("Withdrawing Tokens ...")
    const tezos = await dappClient().tezos()
    const farming_contract = await tezos.wallet.at(FARMING_CONTRACT)
    const contract_call = await farming_contract.methodsObject
      .withdraw({
        farm_id: farmId,
        token_amount: withdrawAmount,
      })
      .send()
    await contract_call.confirmation()
    setIsLoading(false)
    setSuccessMessage("Tokens Withdrawn successfully!")
    setTransactionUrl(`${EXPLORER}/${contract_call.opHash}`)
    setShowSuccess(true)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
    setErrorMessage(error.message)
    setShowError(true)
  }
}

export const getFarmContractStorage = async () => {
  try {
    const contract_storage = await axios.get(
      `${API}/v1/contracts/${FARMING_CONTRACT}/storage`
    )
    return contract_storage.data
  } catch (error) {
    console.log(error)
  }
}

export const getUserDetailsForFarm = async (ledger_bigmap_id, farm_id) => {
  const user = await dappClient().getAccount()
  const user_address = user.account.address
  let user_farm_amount = 0
  const user_farm = await axios
    .get(
      `${API}/v1/bigmaps/${ledger_bigmap_id}/keys/{"address":"${user_address}","nat":"${farm_id}"}`
    )
    .then((res) => {
      user_farm_amount = res.data.value.amount
    })
    .catch((err) => {
      console.log(err)
    })
  return user_farm_amount
}

export const calculatePendingRewards = async () => {}

export const getFarms = async (setFarms) => {
  try {
    const farming_contract_storage = await getFarmContractStorage()
    const farms_bigmap_id = farming_contract_storage.farms
    const ledger_bigmap_id = farming_contract_storage.ledger
    const total_farms = parseInt(farming_contract_storage.next_farm_id)
    const farms = await axios.get(`${API}/v1/bigmaps/${farms_bigmap_id}/keys`)
    await setFarms([])
    const all_farms = []
    for (let i = 0; i < total_farms; i++) {
      const farm = farms.data[i]
      const farm_data = farm.value
      console.log(farm_data)
      const farm_id = parseInt(farm.key)
      const pool_token = farm_data.pool_token.address
      const reward_token = farm_data.reward_token.address
      const reward_earned = farm_data.reward_paid
      const apr =
        new Date(farm_data.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? (
              (parseInt(farm_data.reward_per_second) * 31536000) /
              (parseInt(farm_data.pool_balance) * 10 ** DECIMAL)
            ).toPrecision(5)
          : 0
      const farm_ends =
        new Date(farm_data.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? new Date(farm_data.end_time).toLocaleString()
          : "Farm Ended"
      const user_data = await getUserDetailsForFarm(ledger_bigmap_id, farm_id)
      let tokens_staked = 0
      tokens_staked = parseInt(user_data)
      all_farms.push({
        pool_token,
        reward_token,
        tokens_staked,
        reward_earned,
        apr,
        farm_id,
        farm_ends,
      })
    }
    setFarms(all_farms)
  } catch (error) {
    console.log(error)
  }
}

export const getFarmDetails = async (farm_id) => {
  try {
    const farming_contract_storage = await getFarmContractStorage()
    const farms_bigmap_id = farming_contract_storage.farms
    const ledger_bigmap_id = farming_contract_storage.ledger
    const total_farms = parseInt(farming_contract_storage.next_farm_id)
    const farms = await axios.get(
      `${API}/v1/bigmaps/${farms_bigmap_id}/keys/${farm_id}`
    )
    const farm_data = {
      pool_token: farms.data.value.pool_token.address,
      pool_token_id: farms.data.value.pool_token.token_id,
      reward_token: farms.data.value.reward_token.address,
      reward_earned: farms.data.value.reward_paid,
      apr:
        new Date(farms.data.value.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? (
              (parseInt(farms.data.value.reward_per_second) * 31536000) /
              (parseInt(farms.data.value.pool_balance) * 10 ** DECIMAL)
            ).toPrecision(5)
          : 0,
      farm_ends:
        new Date(farms.data.value.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? new Date(farms.data.value.end_time).toLocaleString()
          : "Farm Ended",
      tokens_staked: await getUserDetailsForFarm(ledger_bigmap_id, farm_id),
    }
    return farm_data
  } catch (error) {
    console.log(error)
  }
}

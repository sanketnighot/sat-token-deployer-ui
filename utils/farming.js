import { dappClient } from "./walletconnect"
import axios from "axios"
import { BigNumber } from "bignumber.js"
import {
  FARMING_FEE,
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
      .withTransfer({ to: FEE_RECIPIENT, amount: FARMING_FEE })
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
          reward_supply:
            parseInt(farmDetails.totalRewards) *
            10 ** farmDetails.rewardTokenDecimals,
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
  poolTokenDecimals,
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
          token_amount: (depositAmount * 10 ** poolTokenDecimals).toFixed(0),
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
  poolTokenDecimals,
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
        token_amount: (withdrawAmount * 10 ** poolTokenDecimals).toFixed(0),
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
  let user_farm_amount = 0
  if (user.account !== undefined) {
    const user_address = user.account.address
    const user_farm = await axios
      .get(
        `${API}/v1/bigmaps/${ledger_bigmap_id}/keys/{"address":"${user_address}","nat":"${farm_id}"}`
      )
      .then((res) => {
        if (res.data.active) {
          user_farm_amount = res.data.value.amount
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return user_farm_amount
}

export const getContraceDetails = async (contract_address) => {
  try {
    const contract_storage = await axios.get(
      `${API}/v1/tokens?contract=${contract_address}&select=contract,metadata`
    )
    return contract_storage.data
  } catch (error) {
    console.log(error)
  }
}

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
      const pool_token_details = await getContraceDetails(
        farm_data.pool_token.address
      )
      const reward_token_details = await getContraceDetails(
        farm_data.reward_token.address
      )
      const farm_id = parseInt(farm.key)
      const pool_token = farm_data.pool_token.address
      const pool_token_symbol = pool_token_details[0].metadata.symbol
      const reward_token_symbol = reward_token_details[0].metadata.symbol
      const pool_token_decimals = pool_token_details[0].metadata.decimals
      const reward_token_decimals = reward_token_details[0].metadata.decimals
      const reward_token = farm_data.reward_token.address
      let pending_rewards = await getPendingRewards(farm_id)
      pending_rewards =
        parseInt(pending_rewards) /
        10 ** pool_token_details[0].metadata.decimals
      const reward_earned = (
        farm_data.reward_paid /
        10 ** parseInt(reward_token_decimals)
      ).toFixed(6)
      const apr =
        (new Date(farm_data.end_time).getTime() / 1000 >=
          new Date().getTime() / 1000) &
        (parseInt(farm_data.pool_balance) > 0)
          ? (
              (parseInt(farm_data.reward_per_second) * 31536000 * 100) /
              (parseInt(farm_data.pool_balance) *
                10 ** parseInt(reward_token_details[0].metadata.decimals))
            ).toFixed(4)
          : 0
      const farm_ends =
        new Date(farm_data.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? new Date(farm_data.end_time).toLocaleString()
          : "Farm Ended"
      const user_data = await getUserDetailsForFarm(ledger_bigmap_id, farm_id)
      let tokens_staked = 0
      tokens_staked = (
        parseInt(user_data) /
        10 ** parseInt(pool_token_decimals)
      ).toFixed(6)
      all_farms.push({
        pool_token,
        pool_token_symbol,
        pool_token_decimals,
        pending_rewards,
        reward_token,
        reward_token_symbol,
        reward_token_decimals,
        tokens_staked,
        reward_earned,
        apr,
        farm_id,
        farm_ends,
      })
    }
    const sorted_farms = await all_farms.sort(
      (a, b) => b.tokens_staked - a.tokens_staked
    )
    setFarms(sorted_farms)
  } catch (error) {
    console.log(error)
  }
}

export const getFarmDetails = async (farm_id, user_address) => {
  try {
    const farming_contract_storage = await getFarmContractStorage()
    const farms_bigmap_id = farming_contract_storage.farms
    const ledger_bigmap_id = farming_contract_storage.ledger
    const farms = await axios.get(
      `${API}/v1/bigmaps/${farms_bigmap_id}/keys/${farm_id}`
    )
    const pool_token_details = await getContraceDetails(
      farms.data.value.pool_token.address
    )
    const reward_token_details = await getContraceDetails(
      farms.data.value.reward_token.address
    )
    const pending_rewards = await getPendingRewards(farm_id)
    const farm_data = {
      pool_token: farms.data.value.pool_token.address,
      pool_token_symbol: pool_token_details[0].metadata.symbol,
      pool_token_id: farms.data.value.pool_token.token_id,
      pool_token_decimals: pool_token_details[0].metadata.decimals,
      pending_rewards:
        pending_rewards / 10 ** pool_token_details[0].metadata.decimals,
      reward_token: farms.data.value.reward_token.address,
      reward_token_symbol: reward_token_details[0].metadata.symbol,
      reward_token_decimals: reward_token_details[0].metadata.decimals,
      reward_token_id: farms.data.value.reward_token.token_id,
      reward_earned: (
        parseInt(farms.data.value.reward_paid) /
        10 ** parseInt(reward_token_details[0].metadata.decimals)
      ).toFixed(6),
      apr:
        (new Date(farms.data.value.end_time).getTime() / 1000 >=
          new Date().getTime() / 1000) &
        (parseInt(farms.data.value.pool_balance) > 0)
          ? (
              (parseInt(farms.data.value.reward_per_second) * 31536000 * 100) /
              (parseInt(farms.data.value.pool_balance) *
                10 ** parseInt(reward_token_details[0].metadata.decimals))
            ).toFixed(4)
          : 0,
      farm_ends:
        new Date(farms.data.value.end_time).getTime() / 1000 >=
        new Date().getTime() / 1000
          ? new Date(farms.data.value.end_time).toLocaleString()
          : "Farm Ended",
      tokens_staked: (
        parseInt(await getUserDetailsForFarm(ledger_bigmap_id, farm_id)) /
        10 ** parseInt(pool_token_details[0].metadata.decimals)
      ).toFixed(6),
    }
    return farm_data
  } catch (error) {
    console.log(error)
  }
}

export const getTokenSearchResults = async (searchQuery) => {
  let search_results = []
  await axios
    .get(
      `${API}/v1/tokens?metadata.symbol.as=${searchQuery}*&select=contract,metadata,tokenId&limit=10`
    )
    .then((res) => {
      search_results.push(...res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  await axios
    .get(
      `${API}/v1/tokens?metadata.name.as=${searchQuery}*&select=contract,metadata,tokenId&limit=20`
    )
    .then((res) => {
      search_results.push(...res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  await axios
    .get(
      `${API}/v1/tokens?contract=${searchQuery}&select=contract,metadata,tokenId&limit=40`
    )
    .then((res) => {
      search_results.push(...res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  return search_results
}

export const getPendingRewards = async (farm_id) => {
  try {
    await dappClient().CheckIfWalletConnected()
    const user_account = await dappClient().getAccount()
    if (user_account.success) {
      const tezos = await dappClient().tezos()
      const farming_contract = await tezos.wallet.at(FARMING_CONTRACT)
      const pending_rewards = await farming_contract.contractViews
        .getPendingReward({
          address: user_account.account?.address,
          farm_id: farm_id,
        })
        .executeView({ viewCaller: FARMING_CONTRACT })
      return pending_rewards.c[0]
    } else {
      return 0
    }
  } catch (error) {
    console.log(error)
    return 0
  }
}

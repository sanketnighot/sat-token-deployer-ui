import React, { useEffect, useState } from "react"
import ListInfo, { ListInfoItem } from "./Assets/ListInfo"
import { getFarms } from "../utils/farming"
import { dappClient } from "../utils/walletconnect"

const FarmsList = () => {
  const [farms, setFarms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const user_account = dappClient().getAccount()

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        setIsLoading(true)
        await getFarms(setFarms)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFarmDetails()
  }, [user_account.account?.address])

  return (
    <>
      <div className="m-4">
        {farms.length === 0 && !isLoading && (
          <p className="font-mono italic text-base">No Farms Found</p>
        )}
        {isLoading && (
          <p className="font-mono italic text-base">Loading Farms ...</p>
        )}
        <ListInfo>
          {farms.map(
            (
              {
                pool_token_symbol,
                reward_token_symbol,
                tokens_staked,
                pending_rewards,
                apr,
                farm_id,
                farm_ends,
              },
              index
            ) => {
              return (
                <ListInfoItem
                  title={`${farm_id}. ${pool_token_symbol} ▸▸▸ ${reward_token_symbol} - [${apr}% APR]`}
                  tokens_staked={tokens_staked}
                  key={index}
                >
                  <table className="min-w-full divide-y-2 divide-x-reverse divide-green-900 mb-5 font-mono">
                    <thead className="bg-[#136033] sticky top-0 ">
                      <tr>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Pool Token
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Reward Token
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Tokens Staked
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Reward Earned
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          APR
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Farm Ends
                        </th>
                        <th className="px-6 py-3 text-center text-sm text-green-500 font-bold tracking-wider font-mono">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="justify-center items-center bg-transparent divide-y divide-green-700">
                      <tr className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-500">
                        <td className="border border-green-300 font-mono px-2">
                          ${`${pool_token_symbol}`}
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          ${`${reward_token_symbol}`}
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          {tokens_staked}
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          {pending_rewards}
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          {apr}% APR
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          {farm_ends}
                        </td>
                        <td className="border border-green-300 font-mono px-2">
                          <a href={`/farms/farmDetails/${farm_id}`}>
                            <button className="text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg m-2 px-2 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
                              Details
                            </button>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ListInfoItem>
              )
            }
          )}
        </ListInfo>
      </div>
    </>
  )
}

export default FarmsList

import React from "react"
import ListInfo, { ListInfoItem } from "./Assets/ListInfo"

const farmData = [
  {
    pool_token: "KT1ADNS...JSKLK",
    reward_token: "KT1ADNS...JSKLK",
    tokens_staked: 1244,
    reward_earned: 12.02,
    apy: 180,
    farm_id: 0,
    farm_ends: "21st June, 2025 07:00 PM",
  },
  {
    pool_token: "KT1FJDA...ADNDA",
    reward_token: "KT1FJDA...ADNDA",
    tokens_staked: 0,
    reward_earned: 0,
    apy: 120,
    farm_id: 1,
    farm_ends: "14th July, 2024 11:15 AM",
  },
  {
    pool_token: "KT1KSND...DJSHF",
    reward_token: "KT1SKWF...SKWQZ",
    tokens_staked: 5421.24,
    reward_earned: 343.43,
    apy: 180,
    farm_id: 2,
    farm_ends: "27th July, 2024 10:00 AM",
  },
  {
    pool_token: "KT1FSJS...DNWRG",
    reward_token: "KT1GWOD...SJRNW",
    tokens_staked: 0,
    reward_earned: 0,
    apy: 167,
    farm_id: 3,
    farm_ends: "24th June, 2024 12:00 PM",
  },
]

const FarmsList = () => {
  return (
    <>
      <div className="my-4 mx-2">
        <ListInfo>
          {farmData.map(
            ({
              pool_token,
              reward_token,
              tokens_staked,
              reward_earned,
              apy,
              farm_id,
              farm_ends,
            }) => {
              return (
                <ListInfoItem
                  title={`${farm_id}. ${pool_token} / ${reward_token} - [${apy}% APY]`}
                  tokens_staked={tokens_staked}
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
                          APY
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
                        <td className="border border-green-300 font-mono">
                          {pool_token}
                        </td>
                        <td className="border border-green-300 font-mono">
                          {reward_token}
                        </td>
                        <td className="border border-green-300 font-mono">
                          {tokens_staked}
                        </td>
                        <td className="border border-green-300 font-mono">
                          {reward_earned}
                        </td>
                        <td className="border border-green-300 font-mono">
                          {apy} % APY
                        </td>
                        <td className="border border-green-300 font-mono">
                          {farm_ends}
                        </td>
                        <td className="border border-green-300 font-mono">
                          <a href={`/farms/farmDetails/${farm_id}`}>
                            <button className="text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto m-2 px-2 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
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

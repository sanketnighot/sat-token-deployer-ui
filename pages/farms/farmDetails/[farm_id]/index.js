import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

const FarmDetails = () => {
  const router = useRouter()
  const { farm_id } = router.query

  // Now you can use farm_id in your component logic
  // For demonstration, let's just log it to the console
  useEffect(() => {
    console.log(farm_id)
  }, [farm_id])
  return (
    <>
      <Head>
        <title>Farm {farm_id} | SATs Token Deployer</title>
        <meta
          property="og:title"
          content={`Farm ${farm_id} | SAT Token Deployer`}
        />
        <meta
          property="og:description"
          content="Social Appreciation Token for Tezos Artist"
        />
        <meta
          property="og:site_name"
          content={`Farm ${farm_id} | SAT Token Deployer`}
        />
        <meta property="og:image" content={"/logo1.png"} />
        <meta property="og:url" content="https://deeployer.xyz" />
      </Head>
      <div className="flex mx-auto h-[80vh] md:h-[70vh] w-[70%] mt-10 items-center justify-center text-[#00ff00]">
        <div className="container w-5/6 mx-auto my-2 py-2">
          <div className="flex flex-row justify-between items-center mx-2">
            <h1 className="text-center text-3xl md:text-5xl mb-2">
              Farm Details
            </h1>
          </div>
          <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg font-mono justify-center items-center text-xl w-full p-4">
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="font-semibold leading-7 text-2xl text-green-400">
                  Farm Id : {farm_id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-green-600 ">
                  KT1ADNS...JSKLK &nbsp; {">"} &nbsp; KT1ADNS...JSKLK &nbsp;
                  <span className="text-bold text-green-400 text-lg">
                    [180% APY]
                  </span>
                </p>
              </div>
              <div className="mt-6 border-t border-[#00ff00]">
                <dl className="divide-y divide-[#1e851e]">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Total Staked
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      1244
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Rewards Earned
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      12.02
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Farm Ends
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      21st June, 2025 07:00 PM
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Deposite Tokens
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-4/6">
                        <input
                          id="totalRewards"
                          className="md:text-left text-sm md:text-lg font-monocode mb-4 border-2 border-green-500 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-500  md:w-full px-2"
                          placeholder="Amount to Deposite"
                          type="number"
                          // value={farmDetails.totalRewards}
                          required
                          // onChange={(e) => {
                          //   setFarmDetails({
                          //     ...farmDetails,
                          //     totalRewards: e.target.value,
                          //   })
                          // }}
                        />
                        <button className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
                          Deposite
                        </button>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Withdraw Tokens
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-4/6">
                        <input
                          id="totalRewards"
                          className="md:text-left text-sm md:text-lg font-monocode mb-4 border-2 border-green-500 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-500  md:w-full px-2"
                          placeholder="Amount to Withdraw"
                          type="number"
                          // value={farmDetails.totalRewards}
                          required
                          // onChange={(e) => {
                          //   setFarmDetails({
                          //     ...farmDetails,
                          //     totalRewards: e.target.value,
                          //   })
                          // }}
                        />
                        <button className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
                          Withdraw
                        </button>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Harvest Rewards
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-4/6">
                        <button className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-0 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
                          Harvest
                        </button>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FarmDetails

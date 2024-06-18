import React from "react"
import Head from "next/head"
import FarmCreator from "../../../components/FarmCreator"

const createFarm = () => {
  return (
    <>
      <Head>
        <title>Create Farm | SATs Token Deployer</title>
        <meta property="og:title" content="Create Farm | SAT Token Deployer" />
        <meta
          property="og:description"
          content="Social Appreciation Token for Tezos Artist"
        />
        <meta property="og:site_name" content="Farms | SAT Token Deployer" />
        <meta property="og:image" content={"/logo1.png"} />
        <meta property="og:url" content="https://deeployer.xyz" />
      </Head>
      <div className="flex mx-auto h-[80vh] md:h-[70vh] md:w-[80%] mt-10 items-center justify-center text-[#00ff00]">
        <div className="container w-5/6 mx-auto my-2 py-2">
          <h1 className="text-center text-3xl md:text-5xl mb-2">
            Create New Farm
          </h1>
          <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg">
            <FarmCreator />
          </div>
        </div>
      </div>
    </>
  )
}

export default createFarm

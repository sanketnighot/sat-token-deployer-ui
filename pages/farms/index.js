import React from "react"
import Head from "next/head"
import FarmsList from "../../components/FarmsList"

const farms = () => {
  return (
    <>
      <Head>
        <title>Farms | SATs Token Deployer</title>
        <meta property="og:title" content="Farms | SAT Token Deployer" />
        <meta
          property="og:description"
          content="Social Appreciation Token for Tezos Artist"
        />
        <meta property="og:site_name" content="Farms | SAT Token Deployer" />
        <meta property="og:image" content={"/logo1.png"} />
        <meta property="og:url" content="https://deeployer.xyz" />
      </Head>
      <div className="flex mx-auto  h-max-[80vh] md:h-max-[70vh] overflow-y-auto w-[90%] mt-10 justify-center text-[#00ff00]">
        <div className="container w-5/6 mx-auto my-2 py-2">
          <div className="flex flex-row justify-between items-center mx-2">
            <h1 className="text-center text-3xl md:text-5xl mb-2">All Farms</h1>
            <a
              href="/farms/createFarm"
              className="text-extrabold underline hover:italic hover:decoration-dotted"
            >
              <h1 className="text-center text-xl md:text-2xl mb-2">
                Create Farm
              </h1>
            </a>
          </div>
          <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg">
            <FarmsList />
          </div>
        </div>
      </div>
    </>
  )
}

export default farms

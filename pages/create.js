import React from "react"
import Head from "next/head"
import CollectionData from "../components/CollectionData"
import logo1 from "../public/logo1.png"

const Create = () => {
  return (
    <>
      <Head>
        <title>Create Token | SATs Token Deployer</title>
        <meta property="og:title" content="Create Token | SAT Token Deployer" />
        <meta
          property="og:description"
          content="Social Appreciation Token for Tezos Artist"
        />
        <meta
          property="og:site_name"
          content="Create Token | SAT Token Deployer"
        />
        <meta property="og:image" content={"/logo1.png"} />
        <meta property="og:url" content="https://deeployer.xyz" />
      </Head>
      <div className="md:h-[50rem] flex items-center justify-center text-[#00ff00]">
        <div className="container w-5/6 md:w-4/6">
          <div className="mb-4">
            <h1 className="text-center text-3xl md:text-5xl mb-2">
              Create your own SAT
            </h1>
            {/* <h2 className="text-center text-xl md:text-3xl mb-2">
              {"<"} For the great Artists of Tezos {">"}
            </h2> */}
          </div>
          <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg">
            <CollectionData />
          </div>
        </div>
      </div>
    </>
  )
}

export default Create

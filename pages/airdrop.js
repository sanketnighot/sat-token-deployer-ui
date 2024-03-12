import React from 'react'
import Head from 'next/head';
import logo1 from '../public/logo1.png';
import AirdropDeeployer from '../components/AirdropDeeployer';

const airdrop = () => {
    return (
        <>
            <Head>
                <title>Airdrop | SATs Token Deployer</title>
                <meta property="og:title" content="Airdrop | SAT Token Deployer" />
                <meta property="og:description" content="Social Appreciation Token for Tezos Artist" />
                <meta property="og:site_name" content="Airdrop | SAT Token Deployer" />
                <meta property="og:image" content={logo1} />
                <meta property="og:url" content="https://deeployer.xyz" />
            </Head>
            <div className="md:h-[45rem] flex items-center justify-center text-[#00ff00]">
                <div className="container w-5/6 md:w-3/6">
                    <div className="mb-4">
                        <h1 className="text-center text-3xl md:text-5xl mb-2">Social Appreciation Tokens</h1>
                        <h2 className="text-center text-xl md:text-3xl mb-2">{'<'} For the great Artists of Tezos {'>'}</h2>
                    </div>
                    <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg m-5">
                        <AirdropDeeployer />
                    </div>
                </div>
            </div>
        </>
    )
}


export default airdrop
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Loader from '../components/Loader';
import Head from 'next/head'

export default function Home() {
    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    const handleNavigate = () => {
        setIsAnimating(true);
        setTimeout(() => {
            router.push('/Collection');
        }, 500); // Duration should match the CSS animation
    };
    return (
        <>
            <Head>
                <title>SATs Token Deployer</title>
                <meta property="og:title" content="SAT Token Deployer" />
                <meta property="og:description" content="Special Appreciation Token for Tezos Artist" />
                <meta property="og:site_name" content="SAT Token Deployer" />
            </Head>
            <div className="flex flex-wrap justify-center items-center min-h-screen">
                <div className="container min-h-24 w-4/6 p-8">
                    <h1 className="text-center text-3xl md:text-6xl mb-2">Social Appreciation Token</h1>
                    <h2 className="text-center text-xl md:text-4xl mb-6">{'<'} for the great Artists of Tezos {'>'}</h2>
                    <p className="text-center text-sm md:text-xl font-seven mb-4">SAT's stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos blockchain that transforms the relationship between artists and their collectors. SAT's operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.</p>
                    <Image
                        className="cursor-pointer mx-auto"
                        src="/coin.webp"
                        width={250}
                        height={250}
                        alt="token image"
                        onClick={handleNavigate}
                    />
                    {isAnimating && (
                        <div className="fixed top-0 left-0 z-10 w-full h-full bg-[#1b1b1b] circle-animation">
                            <div><Loader /></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

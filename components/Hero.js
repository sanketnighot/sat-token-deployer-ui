import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from "next/image"

const Hero = () => {

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl md:text-6xl mb-2">Social Appreciation Tokens</h1>
                <h2 className="text-lg md:text-4xl mb-2">{'<'} For the great Artists of Tezos {'>'}</h2>
                <p className="text-md md:text-3xl font-seven mb-2">SAT's stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos blockchain that transforms the relationship between artists and their collectors. SAT's operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.</p>
                <Image
                    className="cursor-pointer mx-auto"
                    src="/coin.webp"
                    width={175}
                    height={175}
                    alt="token image"
                />
                <h2 className="text-md md:text-2xl mb-2">Click coin to create your own collection</h2>
            </div>
        </div>
    )
}

export default Hero
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Mask from '../components/Assets/Mask';

const Hero = () => {
    const [isAnimating, setIsAnimating] = useState(true);
    const [isClient, setIsClient] = useState(false); // New state to track if we're on the client
    const router = useRouter();

    useEffect(() => {
        // This code runs only on the client
        setIsClient(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 100); // Duration should match the CSS animation
    }, []);

    const handleNavigate = () => {
        setIsAnimating(true);
        setTimeout(() => {
            router.push('/create');
        }, 500); // Duration should match the CSS animation
    };

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
                    onClick={handleNavigate}
                />
                <h2 className="text-md md:text-2xl mb-2">Click coin to create your own collection</h2>
            </div>
            {isClient && isAnimating && (
                <motion.div
                    className="fixed top-0 left-0 z-10 w-full h-full bg-[#1b1b1b] circle-animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <div><Mask /></div>
                </motion.div>
            )}
        </div>
    )
}

export default Hero
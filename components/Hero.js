import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Loader from '../components/Assets/Loader';

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
            router.push('/Collection');
        }, 500); // Duration should match the CSS animation
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl md:text-6xl mb-2">Social Appreciation Tokens</h1>
                <h2 className="text-xl md:text-4xl mb-6">{'<'} For the great Artists of Tezos {'>'}</h2>
                <p className="text-sm md:text-xl font-seven mb-4">SAT's stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos blockchain that transforms the relationship between artists and their collectors. SAT's operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.</p>
                <Image
                    className="cursor-pointer mx-auto"
                    src="/coin.webp"
                    width={200}
                    height={200}
                    alt="token image"
                    onClick={handleNavigate}
                />
            </div>
            {isClient && isAnimating && (
                <motion.div
                    className="fixed top-0 left-0 z-10 w-full h-full bg-[#1b1b1b] circle-animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <div><Loader /></div>
                </motion.div>
            )}
        </div>
    )
}

export default Hero
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Loader from '../components/Loader';
import Head from 'next/head'
import Accordion, { AccordionItem } from '../components/Accordion';

export default function Home() {
    const [isAnimating, setIsAnimating] = useState(true);
    const [isClient, setIsClient] = useState(false); // New state to track if we're on the client
    const router = useRouter();

    useEffect(() => {
        // This code runs only on the client
        setIsClient(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Duration should match the CSS animation
    }, []);

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
            <div className="flex flex-wrap justify-center items-center min-h-screen md:mt-40 mt-10">
                <div className="container min-h-24 md:w-4/6 w-6/6 p-8">
                    <h1 className="text-center text-3xl md:text-6xl mb-2">Social Appreciation Tokens</h1>
                    <h2 className="text-center text-xl md:text-4xl mb-6">{'<'} For the great Artists of Tezos {'>'}</h2>
                    <p className="text-center text-sm md:text-xl font-seven mb-4">SAT's stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos blockchain that transforms the relationship between artists and their collectors. SAT's operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.</p>
                    <Image
                        className="cursor-pointer mx-auto"
                        src="/coin.webp"
                        width={200}
                        height={200}
                        alt="token image"
                        onClick={handleNavigate}
                    />
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


                    <div className="md:mt-40 mt-10">
                        <h2 className="text-center text-xl md:text-4xl mb-6">Frequently Asked Questions</h2>
                        <Accordion>
                            <AccordionItem title="What is SAT (Social Appreciation Tokens) on Tezos ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">SAT stands for Social Appreciation Tokens, a revolutionary tokenization system on the Tezos network that transforms the relationship between artists and their supporters. SATs operate on the principle of decentralized promotion and ownership, creating a symbiotic ecosystem that benefits both artists and token holders.</p>
                            </AccordionItem>
                            <AccordionItem title={`How are SATs different from Friend.tech on Ethereum ?`}>
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">SATs distinguish themselves by offering a unique approach to supporting artists in the digital age. Unlike Friend.tech on Ethereum, SATs leverage the Tezos blockchain, allowing users to acquire shares of their favorite artists directly. The decentralized promotion by token holders across social media platforms forms the core of SATs, creating a dynamic and mutually beneficial relationship.</p>
                            </AccordionItem>
                            <AccordionItem title="How do SATs work in promoting artists ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">SATs operate on the principle of continuous promotion by token holders across various social media channels. This decentralized approach leverages the collective power of the community, enabling artists to tap into new audiences and gain exposure. Token holders become stakeholders in the success of the artist, contributing to a decentralized ecosystem of artistic appreciation.</p>
                            </AccordionItem>
                            <AccordionItem title="What role does SAT play in decentralized finance (DeFi) ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">SATs integrate seamlessly with the decentralized finance (DeFi) landscape by offering art in exchange for tokens. This adds an additional layer of utility to SATs, allowing token holders to explore new avenues for leveraging their assets. The integration of SATs into DeFi not only diversifies their utility but also establishes a tangible connection between artistic output and the financial aspects of decentralized finance.</p>
                            </AccordionItem>
                            <AccordionItem title="What is admin control for FA2 token ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">Admin control allows the token administrator to perform various functions, including updating admin details, pausing transfers, token approvals, as well as creating, minting, and burning tokens. For increased flexibility, the Granular version enables the pausing/unpausing of assets separately.</p>
                            </AccordionItem>
                            <AccordionItem title="What are token decimals in the context of FA2 tokens ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">Token decimals refer to the unit used for displaying the token amount to users. It determines the maximum number of places after the dot in the token's amount representation. For instance, if SATs have 2 decimals, the smallest amount that can be represented is 0.01 SATs.</p>
                            </AccordionItem>
                            <AccordionItem title="How can I link an image with a URL for my FA2 token ?">
                                <p className="text-sm md:text-lg font-seven mb-4 px-2">To link an image with a URL, consider uploading the image to a storage service or IPFS. Once uploaded, use the URL of the image when updating the token contract information. This ensures that the image associated with your FA2 token is accessible and visible.</p>
                            </AccordionItem>
                            <AccordionItem title="How do I update contract and token information on TZKT profiles ?">
                                <div className="text-sm md:text-lg font-seven mb-4 px-2">
                                    <strong>
                                        To update contract and token information on TZKT profiles:
                                    </strong>
                                    <ul>
                                        <li className="m-2">-{'>'} For Contract Information: Visit the TZKT Explorer, search for your smart contract address, locate the "Manage Contract" option, and follow the provided instructions.
                                        </li>
                                        <li className="m-2">-{'>'} For Token Information: After updating your smart contract, navigate to the specific token, find the "Manage Token" option, and update token information, including name, symbol, and associated image URL.
                                        </li>
                                    </ul>
                                </div>
                            </AccordionItem>
                            <AccordionItem title="How can I route my FA2 token to an exchange via 3route ?">
                                <div className="text-sm md:text-lg font-seven mb-4 px-2">
                                    <strong>
                                        To route your FA2 token to an exchange using 3route:
                                    </strong>
                                    <ul>
                                        <li className="m-2">-{'>'} Ensure your token adheres to FA2 standards.
                                        </li>
                                        <li className="m-2">-{'>'} Contact the exchange, submit the necessary information, and utilize 3route or follow the exchange's specified process to facilitate the listing of your FA2 token.
                                        </li>
                                    </ul>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="flex-row justify-center pt-5 text-3xl mx-auto my-10">
                        <h2 className="text-center text-xl md:text-4xl mb-6"> Team behind behind the development of the Draw-to-Mint and SATs Deployer projects</h2>
                        <div className="text-sm md:text-lg font-seven mb-4 px-2">
                            <p className="text-center">
                                Dive into the collaborative efforts of our dynamic team within the Tezos ecosystem — Natived, an accomplished artist, and the one and only Grand Quackster.
                            </p>
                            <div className="my-4"><strong>Natived:</strong></div>
                            <ul>
                                <li className="m-2">-{'>'} Role: The artistic genius driving the creation of the Draw-to-Mint concept.
                                </li>
                                <li className="m-2">-{'>'} Expertise: Crafting unique and imaginative artworks that transcend traditional boundaries.
                                </li>
                                <li className="m-2">-{'>'} Fun Fact: Natived finds inspiration in the intersection of art and technology.
                                </li>
                            </ul>
                            <div className="my-4"><strong>Grand Quackster:</strong></div>
                            <ul>
                                <li className="m-2">-{'>'} Role: The technical architect propelling projects on Tezos.
                                </li>
                                <li className="m-2">-{'>'} Expertise: Tezos smart contract development and innovative blockchain solutions.
                                </li>
                                <li className="m-2">-{'>'} Fun Fact: Grand Quackster is passionate about pushing the boundaries of technology in the blockchain space.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-row justify-center pt-5 text-3xl mx-auto text-center mt-5 mb-10">
                    <h3>Co-created by <a className="text-extrabold underline" href="#" target="_blank">Natived</a> and <a href="#" target="_blank" className="text-extrabold underline">The Grand Quackster</a></h3>
                </div>

            </div>
        </>
    )
}

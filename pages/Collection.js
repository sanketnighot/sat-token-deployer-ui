import React, { useState } from 'react';
import Token from '../components/Token';
import Head from 'next/head';

const Collection = () => {
    const [showToken, setShowToken] = useState(false);
    const [collectionName, setCollectionName] = useState();
    const [collectionAdmin, setCollectionAdmin] = useState();
    const [collectionDescription, setCollectionDescription] = useState();

    return (
        <div className="flex flex-wrap justify-center items-center min-h-screen">
            <Head>
                <title>SATs Token Deployer</title>
                <meta property="og:title" content="SAT Token Deployer" />
                <meta property="og:description" content="Special Appreciation Token for Tezos Artist" />
                <meta property="og:site_name" content="SAT Token Deployer" />
            </Head>
            <div className="container min-h-24 w-full md:w-3/6 p-8">
                <div className="mb-8">
                    <h1 className="text-center text-3xl md:text-5xl mb-2">Soical Appreciation Tokens</h1>
                    <h2 className="text-center text-xl md:text-3xl mb-2">{'<'} For the great Artists of Tezos {'>'}</h2>
                </div>
                <form
                    className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg"
                    onSubmit={(e) => { e.preventDefault(); setShowToken(true) }}>
                    <h3 className="text-center text-2xl md:text-4xl mb-2 text-[#26fb26]">Create your own SAT Token</h3>
                    <div className="flex-row justify-center md:flex text-center">
                        <p className="md:text-left md:ml-4 text-sm md:text-xl mb-6 font-seven md:w-2/6 m-1">Define your collection name</p>
                        <input
                            className="md:text-left md:mr-4 text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-4/6 md:w-full px-2"
                            required
                            placeholder="Enter Collection Name ..."
                            value={collectionName}
                            onChange={
                                (event) => {
                                    setCollectionName(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <p className="md:text-left md:ml-4 text-sm md:text-xl font-seven mb-4 md:w-2/6 m-1">Enter token Admin address</p>
                        <input
                            className="md:text-left md:mr-4 text-center text-sm  md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-4/6 md:w-full px-2"
                            placeholder="Enter Admin Address ..."
                            value={collectionAdmin}
                            required
                            onChange={
                                (event) => {
                                    setCollectionAdmin(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <p className="md:text-left md:ml-4 text-sm md:text-xl font-seven mb-4 md:w-2/6 m-1">Describe your token in few words</p>
                        <textarea
                            className="text-left md:mr-4 text-sm md:text-xl font-seven mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-4/6 md:w-full p-2"
                            placeholder="Describe Collection here ..."
                            value={collectionDescription}
                            required
                            onChange={
                                (event) => {
                                    setCollectionDescription(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex align-center">
                        <button className="mx-auto text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-40 px-4 py-1 bg-green-900 hover:bg-[#a2ff00] text-[#a2ff00] hover:text-green-900">
                            Next
                        </button>

                    </div>
                </form>
                {showToken && <Token collectionName={collectionName} collectionAdmin={collectionAdmin} collectionDescription={collectionDescription} setShowToken={setShowToken} />}
            </div>
        </div>
    );
}


export default Collection;
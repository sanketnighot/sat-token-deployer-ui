import React, { useState } from 'react';

const Token = ({ setShowToken }) => {
    const [tokenName, setTokenName] = useState();
    const [tokenSymbol, setTokenSymbol] = useState();
    const [tokenSupply, setTokenSupply] = useState();
    const [tokenDecimal, setTokenDecimal] = useState();
    const [tokenDescription, setTokenDescription] = useState();

    return (
        <div className="flex flex-col items-center sm:justify-center md:jstify-center fixed inset-y-12 lg:top-10 left-0 z-10 w-full h-full  bg-[#1b1b1b]">
            <div className="container min-h-24 w-full md:w-3/6 p-8">
                <div className="mb-8">
                    <h1 className="text-center text-3xl md:text-5xl mb-2">Special Appreciation Token</h1>
                    <h2 className="text-center text-xl md:text-3xl mb-2">{'<'} for the great Artists of Tezos {'>'}</h2>
                </div>
                <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg p-5">
                    <h3 className="text-center text-2xl md:text-4xl">Enter Token Details</h3>
                    <div className="flex-row justify-center md:flex text-center">
                        <input
                            className="md:text-left md:mx-2 text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full"
                            placeholder="Enter Token Name"
                            value={tokenName}
                            onChange={
                                (event) => {
                                    setTokenName(event.target.value)
                                }
                            }
                        />
                        <input
                            className="md:text-left md:mx-2 text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full"
                            placeholder="Enter Token Symbol"
                            value={tokenSymbol}
                            onChange={
                                (event) => {
                                    setTokenSymbol(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <input
                            className="md:text-left md:mx-2 text-center text-sm  md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full"
                            placeholder="Enter Token Supply"
                            value={tokenSupply}
                            onChange={
                                (event) => {
                                    setTokenSupply(event.target.value)
                                }
                            }
                        />
                        <input
                            className="md:text-left md:mx-2 text-center text-sm  md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full"
                            placeholder="Enter Token Decimals"
                            value={tokenDecimal}
                            onChange={
                                (event) => {
                                    setTokenDecimal(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <textarea
                            className="text-left md:mx-2 w-5/6 text-sm md:text-xl font-seven mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 md:w-full"
                            placeholder="Describe Token here ..."
                            value={tokenDescription}
                            onChange={
                                (event) => {
                                    setTokenDescription(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <button
                            className="mx-auto text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-auto w-5/6 px-4 py-1 bg-green-900 hover:bg-green-500"
                            onClick={() => { setShowToken(false) }}>
                            Previous
                        </button>
                        <button className="mx-auto text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-auto w-5/6 px-4 py-1 bg-green-900 hover:bg-green-500">
                            Create SAT Token
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Token;
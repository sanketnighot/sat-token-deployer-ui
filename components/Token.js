import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deployContract } from '../utils/origination';

const Token = ({ collectionName, collectionAdmin, collectionDescription, setShowToken }) => {
    const [tokenName, setTokenName] = useState();
    const [tokenSymbol, setTokenSymbol] = useState();
    const [tokenSupply, setTokenSupply] = useState();
    const [tokenUrl, setTokenUrl] = useState();
    const [tokenDescription, setTokenDescription] = useState();
    const [transactionUrl, setTransactionUrl] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error Message");
    const [successMessage, setSuccessMessage] = useState("Sucess Message");
    const [isLoading, setIsLoading] = useState(false);
    const [txnMessage, setTxnMessage] = useState(false);

    const createCollection = async () => {
        try {
            deployContract(
                collectionName,
                collectionAdmin,
                collectionDescription,
                tokenName,
                tokenDescription,
                tokenSymbol,
                tokenSupply,
                tokenUrl,
                setShowSuccess,
                setTransactionUrl,
                setIsLoading,
                setTxnMessage,
                setSuccessMessage,
            )
        } catch (error) {
            setIsLoading(false);
            setShowError(true);
            setErrorMessage("An Error Occured");
            console.log(error);
        }
    }


    return (
        <div className="flex flex-col items-center sm:justify-center md:jstify-center fixed inset-y-12 lg:top-10 left-0 z-10 w-full h-full  bg-[#1b1b1b] overflow-y-auto">
            <div className="container min-h-24 w-full md:w-3/6 p-8">
                <div className="mb-8">
                    <h1 className="text-center text-3xl md:text-5xl mb-2">Social Appreciation Tokens</h1>
                    <h2 className="text-center text-xl md:text-3xl mb-2">{'<'} For the great Artists of Tezos {'>'}</h2>
                </div>
                <form className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg p-5"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setShowToken(true)
                        await createCollection();
                    }}>
                    <h3 className="text-center text-xl md:text-3xl font-seven mb-4">Enter Token Details</h3>
                    <div className="flex-row justify-center md:flex text-center">
                        <input
                            className="md:text-left md:mx-2 text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                            placeholder="Enter Token Name"
                            value={tokenName}
                            required
                            onChange={
                                (event) => {
                                    setTokenName(event.target.value)
                                }
                            }
                        />
                        <input
                            className="md:text-left md:mx-2 text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                            placeholder="Enter Token Symbol"
                            value={tokenSymbol}
                            required
                            onChange={
                                (event) => {
                                    setTokenSymbol(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <input
                            className="md:text-left md:mx-2 text-center text-sm  md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-4/6 bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                            placeholder="Enter Token Supply"
                            value={tokenSupply}
                            required
                            onChange={
                                (event) => {
                                    setTokenSupply(event.target.value)
                                }
                            }
                        />
                        <input
                            className="md:text-left md:mx-2 text-center text-sm  md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                            placeholder="Enter Token Icon URL"
                            value={tokenUrl}
                            required
                            onChange={
                                (event) => {
                                    setTokenUrl(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row justify-center md:flex text-center mb-4">
                        <textarea
                            required
                            className="text-left md:mx-2 w-5/6 text-sm md:text-xl font-seven mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 md:w-full px-2"
                            placeholder="Describe Token here ..."
                            value={tokenDescription}
                            onChange={
                                (event) => {
                                    setTokenDescription(event.target.value)
                                }
                            }
                        />
                    </div>
                    <div className="flex-row md:flex my-2 mx-4 ">
                        <h3 className="text-xl font-seven ml-auto">Transaction Fees: 5 TEZ</h3>
                    </div>
                    <div className="flex-row justify-center md:flex text-center">
                        <button
                            className="text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-full w-5/6 px-4 mx-2 py-1 bg-green-900 hover:text-green-900 text-[#a2ff00] hover:bg-[#a2ff00]"
                            onClick={() => { setShowToken(false) }}>
                            Previous
                        </button>
                        <button
                            className="text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-full w-full mx-2 px-4 py-1 bg-green-900 hover:bg-[#a2ff00] text-[#a2ff00] hover:text-green-900"
                        >
                            Create SAT Token
                        </button>
                        <SuccessPopup showSuccess={showSuccess} setShowSuccess={setShowSuccess} successMessage={successMessage} transactionUrl={transactionUrl} />
                        <ErrorPopup showError={showError} setShowError={setShowError} errorMessage={errorMessage} />
                        <LoaderPopup isLoading={isLoading} setIsLoading={setIsLoading} txnMessage={txnMessage} />
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Token;

const PopupContainer = ({ children, onOutsideClick }) => (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={onOutsideClick}>
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        {children}
    </div>
);

const Popup = ({ title, message, onClose, bgColor, textColor, url }) => {
    const router = useRouter();

    const handleClick = () => {
        if (url) {
            window.open(url, "_blank");
        }
        onClose();
    };

    return (
        <div className="relative bg-gray-900 rounded-sm shadow-lg p-6 w-full max-w-md mx-auto border-2 border-[#39FF14] ring-2 ring-${bgColor}">
            <h3 className={`text-5xl font-semibold ${textColor}`}>{title}</h3>
            <p className="mt-4 text-2xl text-gray-300">{message}</p>
            <div className="mt-6 flex justify-end space-x-2">

                <button
                    className={`text-sm md:text-xl font-seven border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-full w-full mx-2 px-4 py-1 bg-{green}-900 hover:bg-[#a2ff00] text-[#a2ff00] hover:text-green-900`}
                    onClick={handleClick}>
                    {url ? "Open Transaction" : "Close"}
                </button>
            </div>
        </div>
    );
};


const SuccessPopup = ({ showSuccess, setShowSuccess, successMessage, transactionUrl }) => {
    return (
        showSuccess && (
            <PopupContainer onOutsideClick={() => setShowSuccess(false)}>
                <Popup
                    title="Success"
                    message={successMessage}
                    onClose={() => setShowSuccess(false)}
                    bgColor="green"
                    textColor="text-green-400"
                    url={transactionUrl}
                />
            </PopupContainer>
        )
    );
};


const ErrorPopup = ({ showError, setShowError, errorMessage }) => {
    return (
        showError && (
            <PopupContainer onOutsideClick={() => setShowError(false)}>
                <Popup
                    title="Error"
                    message={errorMessage}
                    onClose={() => setShowError(false)}
                    bgColor="red"
                    textColor="text-red-400"
                    btnTxt="Close"
                />
            </PopupContainer>
        )
    );
};

const LoaderPopup = ({ isLoading, setIsLoading, txnMessage }) => {
    return (
        isLoading && (
            <PopupContainer onOutsideClick={() => { setIsLoading(false) }}>
                <Popup
                    title="Loading"
                    message={txnMessage}
                    onClose={() => { setIsLoading(false) }}
                    bgColor="blue"
                    textColor="text-white"
                />
            </PopupContainer>
        )
    );
};

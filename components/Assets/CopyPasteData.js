import React, { useState, useRef, useEffect } from 'react'
import { sendAirdropCopyPaste } from '../../utils/airdrop_txn'
import { useRouter } from 'next/router';
import { FEE } from '../../utils/config';

const CopyPasteData = () => {
    const [contractAddress, setContractAddress] = useState()
    const [tokenId, setTokenId] = useState()
    const [amount, setAmount] = useState()
    const [recepientAddress, setRecepientAddress] = useState()
    const [transactionUrl, setTransactionUrl] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error Message");
    const [successMessage, setSuccessMessage] = useState("Sucess Message");
    const [isLoading, setIsLoading] = useState(false);
    const [txnMessage, setTxnMessage] = useState(false);

    const inputRef = useRef(null);


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <form className="w-11/12 mx-5 my-2"
            onSubmit={async (e) => {
                e.preventDefault();
                await sendAirdropCopyPaste(
                    contractAddress,
                    tokenId,
                    amount,
                    recepientAddress,
                    setTransactionUrl,
                    setIsLoading,
                    setTxnMessage,
                    setSuccessMessage,
                    setErrorMessage,
                    setShowError,
                    setShowSuccess
                );
            }}>
            <div className="flex-row justify-center md:flex text-center">
                <input
                    ref={inputRef}

                    className="md:text-left md:mx-2 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                    placeholder="My Contract Address"
                    value={contractAddress}
                    required
                    onChange={
                        (event) => { setContractAddress(event.target.value) }
                    }
                />
            </div>
            <div className="flex-row justify-center md:flex text-center">
                <input
                    type="number"
                    className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                    placeholder="My tokenId"
                    value={tokenId}
                    required
                    onChange={
                        (event) => { setTokenId(event.target.value) }
                    }
                />
                <input
                    className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                    placeholder="Token Amount (Amount x Decimal)"
                    value={amount}
                    required
                    onChange={
                        (event) => { setAmount(event.target.value) }
                    }
                />
            </div>
            <div className="flex-row justify-center md:flex text-center">
                
            </div>
            <div className="flex-row justify-center md:flex text-center">
                <textarea
                    required
                    className="text-left md:mx-2 w-5/6 text-sm md:text-lg font-monocode mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 md:w-full px-2"
                    placeholder="Your recepient address seperated with commas"
                    value={recepientAddress}
                    onChange={
                        (event) => { setRecepientAddress(event.target.value) }
                    }
                />
            </div>
            <div className="flex-row md:flex mx-4 mb-2">
                <h3 className="text-xl font-monocode ml-auto">Transaction Fees: {`${FEE}`} TEZ</h3>
            </div>
            <div className="flex-row justify-center md:flex text-center">
                <button
                    className="text-sm md:text-xl font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-7 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900 w-auto"
                >
                    Send Airdrop
                </button>
                <SuccessPopup showSuccess={showSuccess} setShowSuccess={setShowSuccess} successMessage={successMessage} transactionUrl={transactionUrl} />
                <ErrorPopup showError={showError} setShowError={setShowError} errorMessage={errorMessage} />
                <LoaderPopup isLoading={isLoading} setIsLoading={setIsLoading} txnMessage={txnMessage} />
            </div>
        </form>
    )
}

export default CopyPasteData

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
            <p className="mt-4 text-xl text-gray-300 font-monocode">{message}</p>
            <div className="mt-6 flex justify-end space-x-2">

                <button
                    className={`text-sm md:text-xl font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-full w-full mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900`}
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
            <PopupContainer>
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
            <PopupContainer>
                <Popup
                    title="Loading ..."
                    message={txnMessage}
                    onClose={() => { setIsLoading(false) }}
                    bgColor="blue"
                    textColor="text-white"
                />
            </PopupContainer>
        )
    );
};

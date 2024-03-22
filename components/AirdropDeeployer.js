import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import FileUpload from "./Assets/FileUpload"
import { convertCsvToJson } from "../utils/helpers"
import DataTable from "./Assets/DataTable"
import { sendAirdrop } from "../utils/airdrop_txn"
import { FEE } from "../utils/config"
import ManualDataEntry from "./Assets/ManualDataEntry"
import { Tzip12Module, tzip12 } from "@taquito/tzip12"
import { dappClient } from "../utils/walletconnect"

const AirdropDeeployer = ({}) => {
  const [csv_file, setCsvFile] = useState()
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [jsonData, setJsonData] = useState([])
  const [duplicateEntries, setDuplicateEntries] = useState([])
  const [transactionUrl, setTransactionUrl] = useState("")
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error Message")
  const [successMessage, setSuccessMessage] = useState("Sucess Message")
  const [isLoading, setIsLoading] = useState(false)
  const [txnMessage, setTxnMessage] = useState(false)
  const [showCopyPaste, setShowCopyPaste] = useState(false)
  const [contractAddress, setContractAddress] = useState()
  const [tokenId, setTokenId] = useState()
  const [amount, setAmount] = useState()
  const [decimal, setDecimal] = useState()
  const [isFetchingToken, setIsFetchingToken] = useState(false)
  const [isFetchingTokenError, setIsFetchingTokenError] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const identifyDuplicates = () => {
    const duplicates = jsonData.filter(
      (item, index) => jsonData.indexOf(item) !== index
    )
    setDuplicateEntries(duplicates)
  }

  const removeDuplicates = () => {
    const uniqueData = jsonData.filter(
      (item, index) => jsonData.indexOf(item) === index
    )
    setJsonData(uniqueData) // Update the jsonData state with the unique entries
  }

  const setDecimalValue = async () => {
    try {
      setIsFetchingToken(true)
      setIsFetchingTokenError(false)
      console.log("Setting Decimal Value")
      const tezos = await dappClient().tezos()
      await tezos.addExtension(new Tzip12Module())
      const contract = await tezos.contract.at(contractAddress, tzip12)
      const metadata = await contract.tzip12().getTokenMetadata(tokenId)
      console.log(metadata.decimals)
      setDecimal(metadata.decimals)
      setIsFetchingToken(false)
    } catch (err) {
      setIsFetchingToken(false)
      console.log(err)
      setDecimal(0)
      setIsFetchingTokenError(true)
    }
  }

  useEffect(() => {
    if (contractAddress && tokenId) {
      setDecimalValue()
    }
  }, [contractAddress, tokenId])

  useEffect(() => {
    if (jsonData.length > 0) {
      identifyDuplicates()
    }
  }, [jsonData])

  useEffect(() => {
    if (csv_file && csv_file.name.endsWith(".csv")) {
      convertCsvToJson(csv_file)
        .then((data) => {
          setJsonData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setCsvFile()
      setIsFileUploaded(false)
      setJsonData([])
    }
  }, [csv_file])

  const onResetData = () => {
    setCsvFile()
    setIsFileUploaded(false)
    setJsonData([])
  }

  const onSubmitAirdrop = async () => {
    await sendAirdrop(
      jsonData,
      contractAddress,
      tokenId,
      amount,
      decimal,
      setTransactionUrl,
      setIsLoading,
      setTxnMessage,
      setSuccessMessage,
      setErrorMessage,
      setShowError,
      setShowSuccess
    )
  }

  return (
    <div>
      {!showCopyPaste && (
        <>
          <div className="flex-row justify-center md:flex text-center md:mx-2 mt-4">
            <input
              ref={inputRef}
              className="md:text-left md:mx-2 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="My Contract Address"
              value={contractAddress}
              required
              onChange={(event) => {
                setContractAddress(event.target.value)
              }}
            />
          </div>
          <div className="flex-row justify-center md:flex text-center md:mx-2">
            <input
              type="number"
              className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="My tokenId"
              value={tokenId}
              required
              onChange={(event) => {
                setTokenId(event.target.value)
              }}
            />
            <input
              className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="Token Amount per user"
              value={amount}
              required
              onChange={(event) => {
                setAmount(event.target.value)
              }}
            />
          </div>
          {isFetchingToken && (
            <div className="flex-row md:flex text-left md:ml-4 font-monocode">
              Fetching Token Details, Please wait ...
            </div>
          )}
          {isFetchingTokenError && (
            <>
              <div className="flex-row md:flex text-left md:mx-2 font-monocode">
                Unable to fetch Token Details. Add it manually
              </div>
              <input
                className="md:text-left md:mx-2 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
                placeholder="Token Decimal"
                value={decimal}
                required
                onChange={(event) => {
                  setDecimal(Number(event.target.value))
                }}
              />
            </>
          )}
        </>
      )}

      {isFileUploaded ? (
        <>
          <div className="flex-row justify-center md:flex text-center px-2 mt-4">
            <div className="overflow-x-auto max-h-96 text-center justify-center items-center w-full mx-2">
              {jsonData.length > 0 && (
                <DataTable
                  data={jsonData}
                  duplicateEntries={duplicateEntries}
                />
              )}
            </div>
          </div>
          <div className="flex-row md:flex my-2 mx-4 ">
            {duplicateEntries.length > 0 && (
              <h3
                className="text-md md:text-xl font-monocode mr-auto underline hover:italic hover:decoration-dotted cursor-pointer"
                onClick={removeDuplicates}
              >
                Remove Duplicates
              </h3>
            )}
            <h3 className="text-md md:text-xl font-monocode ml-auto">
              Transaction Fees: {`${FEE}`} TEZ
            </h3>
          </div>
          <div className="flex-row justify-center md:flex text-center mt-5">
            <button
              className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-5/6 mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
              onClick={onResetData}
            >
              Reset
            </button>
            <button
              className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-5/6 mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
              onClick={onSubmitAirdrop}
            >
              Send Airdrop
            </button>
          </div>
        </>
      ) : !showCopyPaste ? (
        <>
          <div className="flex-row justify-center md:flex text-center">
            <FileUpload
              csv_file={csv_file}
              setCsvFile={setCsvFile}
              setIsFileUploaded={setIsFileUploaded}
            />
          </div>
          <div className="flex-row md:flex my-2 mx-4 text-center">
            <a
              className="text-md md:text-xl font-monocode mr-auto underline hover:italic hover:decoration-dotted"
              href="/deeployer_airdrop_template.csv"
              download
            >
              Download Template
            </a>
            <h3 className="text-md md:text-xl font-monocode ml-auto">
              Transaction Fees: {`${FEE}`} TEZ
            </h3>
          </div>
          <div className="flex-row justify-center md:flex text-center text-xl font-mono">
            OR
          </div>
          <div className="flex-row md:flex my-2 mx-4 text-center justify-center items-center">
            <button
              className="text-sm md:text-xl font-monocode my-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-auto mx-auto md:mx-2 px-10 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
              onClick={() => setShowCopyPaste(true)}
            >
              Enter Data Manually
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-row justify-center md:flex text-center mt-4">
            <ManualDataEntry />
          </div>
          <div className="flex-row justify-center md:flex text-center text-xl font-mono">
            OR
          </div>
          <div className="flex-row md:flex mx-6 my-2 text-center justify-center items-center">
            <button
              className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-auto mx-auto md:mx-2 px-10 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
              onClick={() => setShowCopyPaste(false)}
            >
              Upload CSV File
            </button>
          </div>
        </>
      )}

      <SuccessPopup
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        successMessage={successMessage}
        transactionUrl={transactionUrl}
      />
      <ErrorPopup
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
      />
      <LoaderPopup
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        txnMessage={txnMessage}
      />
    </div>
  )
}

export default AirdropDeeployer

const PopupContainer = ({ children, onOutsideClick }) => (
  <div
    className="fixed inset-0 z-40 flex items-center justify-center p-4"
    onClick={onOutsideClick}
  >
    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    {children}
  </div>
)

const Popup = ({ title, message, onClose, bgColor, textColor, url }) => {
  const router = useRouter()

  const handleClick = () => {
    if (url) {
      window.open(url, "_blank")
    }
    onClose()
  }

  return (
    <div className="relative bg-gray-900 rounded-sm shadow-lg p-6 w-full max-w-md mx-auto border-2 border-[#39FF14] ring-2 ring-${bgColor}">
      <h3 className={`text-5xl font-semibold ${textColor}`}>{title}</h3>
      <p className="mt-4 text-xl text-gray-300 font-monocode">{message}</p>
      <div className="mt-6 flex justify-end space-x-2">
        <button
          className={`text-sm md:text-xl font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg md:w-full w-full mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900`}
          onClick={handleClick}
        >
          {url ? "Open Transaction" : "Close"}
        </button>
      </div>
    </div>
  )
}

const SuccessPopup = ({
  showSuccess,
  setShowSuccess,
  successMessage,
  transactionUrl,
}) => {
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
  )
}

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
  )
}

const LoaderPopup = ({ isLoading, setIsLoading, txnMessage }) => {
  return (
    isLoading && (
      <PopupContainer>
        <Popup
          title="Loading ..."
          message={txnMessage}
          onClose={() => {
            setIsLoading(false)
          }}
          bgColor="blue"
          textColor="text-white"
        />
      </PopupContainer>
    )
  )
}

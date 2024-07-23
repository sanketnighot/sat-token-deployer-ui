import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { deployContract } from "../utils/origination"
import { FEE } from "../utils/config"
import axios from "axios"

const CollectionData = () => {
  const [showToken, setShowToken] = useState(false)
  const [transactionUrl, setTransactionUrl] = useState("")
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error Message")
  const [successMessage, setSuccessMessage] = useState("Sucess Message")
  const [isLoading, setIsLoading] = useState(false)
  const [txnMessage, setTxnMessage] = useState(false)
  const [collectionData, setCollectionData] = useState({
    collectionName: "",
    collectionAdmin: "",
    collectionDescription: "",
    tokenName: "",
    tokenSymbol: "",
    tokenSupply: "",
    tokenUrl: "",
    tokenDescription: "",
  })
  const [tokenImage, setTokenImage] = useState()
  const [cid, setCid] = useState("")
  const [uploading, setUploading] = useState(false)

  const inputRef = useRef(null)
  const tokenNameInputRef = useRef(null)

  useEffect(() => {
    if (showToken) {
      if (tokenNameInputRef.current) {
        tokenNameInputRef.current.focus()
      }
    } else {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [showToken])

  const createCollection = async () => {
    deployContract(
      collectionData,
      setShowSuccess,
      setTransactionUrl,
      setIsLoading,
      setTxnMessage,
      setSuccessMessage,
      setErrorMessage,
      setShowError
    )
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0] // Access the first file from the FileList object
    setTokenImage(file) // Update state with the selected file
  }

  const handleIpfsSubmit = async (e) => {
    e.preventDefault()

    if (!tokenImage) {
      alert("Please select a file to upload.")
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", tokenImage, { filename: tokenImage.name })
      formData.append("fileName", tokenImage.name)
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      })
      const ipfsHash = await res.text()
      setCid(ipfsHash)
      setCollectionData((collectionData) => ({
        ...collectionData,
        tokenUrl: `ipfs://${ipfsHash}`,
      }))
      setUploading(false)
    } catch (e) {
      console.log(e)
      setUploading(false)
      alert("Trouble uploading file")
    }
  }

  if (!showToken) {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setShowToken(true)
          }}
        >
          {/* <h3 className="text-center text-2xl md:text-4xl mb-2 text-[#26fb26]">
            Create your own SAT
          </h3> */}
          <div className="flex-row justify-center md:flex text-center mt-4">
            <p className="md:text-left md:ml-4 text-sm md:text-xl md:mb-6 font-monocode md:w-2/6 m-1">
              Enter collection name
            </p>
            <input
              ref={inputRef}
              className="md:text-left md:mr-4 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-4/6 md:w-full px-2"
              required
              placeholder="Eg. My Token Deeployer"
              value={collectionData.collectionName}
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  collectionName: event.target.value,
                }))
              }}
            />
          </div>
          <div className="flex-row justify-center md:flex text-center">
            <p className="md:text-left md:ml-4 text-sm md:text-xl font-monocode md:mb-4 md:w-2/6 m-1">
              Enter token Admin address
            </p>
            <input
              className="md:text-left md:mr-4 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-4/6 md:w-full px-2"
              placeholder="Eg. tz1yourTezosWalletAddressHere"
              value={collectionData.collectionAdmin}
              required
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  collectionAdmin: event.target.value,
                }))
              }}
            />
          </div>
          <div className="flex-row justify-center md:flex text-center">
            <p className="md:text-left md:ml-4 text-sm md:text-xl font-monocode md:mb-4 md:w-2/6 m-1">
              Describe your token in few words
            </p>
            <textarea
              className="text-left md:mr-4 text-sm md:text-lg font-monocode mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-4/6 md:w-full p-2"
              placeholder="The Purpose of my SAT Token is ..."
              value={collectionData.collectionDescription}
              required
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  collectionDescription: event.target.value,
                }))
              }}
            />
          </div>
          <div className="flex align-center">
            <button className="mx-auto text-center text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-40 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
              Next
            </button>
          </div>
        </form>
      </>
    )
  } else if (showToken) {
    return (
      <>
        <form
          className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg p-5"
          onSubmit={async (e) => {
            e.preventDefault()
            setShowToken(true)
            await createCollection()
          }}
        >
          <h3 className="text-center text-xl md:text-3xl font-monocode mb-4">
            Enter Token Details
          </h3>
          <div className="flex-row justify-center md:flex text-center">
            <input
              ref={tokenNameInputRef}
              className="md:text-left md:mx-2 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="My Token Name"
              value={collectionData.tokenName}
              required
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  tokenName: event.target.value,
                }))
              }}
            />
            <input
              className="md:text-left md:mx-2 text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="My Token Symbol"
              value={collectionData.tokenSymbol}
              required
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  tokenSymbol: event.target.value,
                }))
              }}
            />
          </div>
          <div className="flex-row justify-center md:flex text-center">
            <input
              type="number"
              className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full px-2"
              placeholder="Total tokens I want"
              value={collectionData.tokenSupply}
              required
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  tokenSupply: event.target.value,
                }))
              }}
            />
            <div className="flex flex-col md:text-left md:mx-2 mx-auto text-center text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full p-1 justify-center">
              <label htmlFor="fileInput" className="custom-file-input">
                {tokenImage ? tokenImage.name : "Select Token Image File"}
              </label>
              <input
                id="fileInput"
                type="File"
                className="hidden-input"
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e)
                }}
              />
            </div>
          </div>
          {tokenImage && (
            <>
              <div
                className="flex flex-col justify-center md:flex text-center mb-4 items-center
          md:text-left mx-auto md:mx-0 text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 md:w-full"
              >
                <img
                  src={URL.createObjectURL(tokenImage)}
                  alt="Preview"
                  className="w-[150px] h-[150px] md:mx-2 mx-auto my-2 md:my-0 p-1"
                />
                <div className="flex flex-row">
                  <button
                    className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900 w-auto"
                    onClick={(e) => {
                      handleIpfsSubmit(e)
                    }}
                  >
                    {!uploading ? "Upload to IPFS" : "Uploading ..."}
                  </button>
                  <button
                    className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900 w-auto"
                    onClick={() => {
                      setTokenImage()
                      setCollectionData((collectionData) => ({
                        ...collectionData,
                        tokenUrl: "",
                      }))
                    }}
                  >
                    Clear
                  </button>
                </div>

                {collectionData.tokenUrl !== "" && (
                  <input
                    className="md:text-left md:mx-2 text-center text-sm  md:text-lg font-monocode m-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 w-5/6 px-2"
                    // placeholder="My token Image URL is"
                    value={collectionData.tokenUrl}
                    required
                    disabled={cid ? true : false}
                    // onChange={(event) => {
                    //   setCollectionData((collectionData) => ({
                    //     ...collectionData,
                    //     tokenUrl: event.target.value,
                    //   }))
                    // }}
                  />
                )}
              </div>
            </>
          )}
          <div className="flex-row justify-center md:flex text-center mb-4">
            <textarea
              required
              className="text-left md:mx-2 w-5/6 text-sm md:text-lg font-monocode mb-4 h-40 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 md:w-full px-2"
              placeholder="This token will be used as ..."
              value={collectionData.tokenDescription}
              onChange={(event) => {
                setCollectionData((collectionData) => ({
                  ...collectionData,
                  tokenDescription: event.target.value,
                }))
              }}
            />
          </div>
          <div className="flex-row md:flex my-2 mx-4 ">
            {/* <h3 className="text-xl font-monocode ml-auto">Transaction Fees: {`${FEE}`} TEZ</h3> */}
          </div>
          <div className="flex-row justify-center md:flex text-center">
            <button
              className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-5/6 mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
              onClick={() => {
                setShowToken(false)
              }}
            >
              Previous
            </button>
            <button className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-5/6 mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900">
              Create SAT Token
            </button>
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
        </form>
      </>
    )
  }
}

export default CollectionData

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
    <div
      className={`relative bg-gray-900 rounded-sm shadow-lg p-6 w-full max-w-md mx-auto border-2 border-[#39FF14] ring-2 ring-${bgColor}`}
    >
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
          bgColor="green"
          textColor="text-white"
        />
      </PopupContainer>
    )
  )
}

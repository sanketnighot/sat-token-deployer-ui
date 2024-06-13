import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { createFarm } from "../utils/farming"

const FarmCreator = () => {
  const [transactionUrl, setTransactionUrl] = useState("")
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error Message")
  const [successMessage, setSuccessMessage] = useState("Sucess Message")
  const [isLoading, setIsLoading] = useState(false)
  const [txnMessage, setTxnMessage] = useState(false)
  const [farmDetails, setFarmDetails] = useState({
    poolTokenAddress: "",
    poolTokenId: "",
    rewardTokenAddress: "",
    rewardTokenId: "",
    farmStartTime: "",
    farmEndTime: "",
    totalRewards: "",
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await createFarm(
            farmDetails,
            setTransactionUrl,
            setIsLoading,
            setTxnMessage,
            setSuccessMessage,
            setErrorMessage,
            setShowError,
            setShowSuccess
          )
        }}
      >
        <div className="flex-row justify-center md:flex md:mx-2 mt-4">
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Pool Token Address
            </label>
            <input
              ref={inputRef}
              className="md:text-left text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300  md:w-full px-2"
              placeholder="Ex. KT1..."
              value={farmDetails.poolTokenAddress}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  poolTokenAddress: e.target.value,
                })
              }}
            />
          </div>
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Pool Token Id
            </label>
            <input
              className="md:text-left text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300  md:w-full px-2"
              type="number"
              placeholder="Ex. 0"
              value={farmDetails.poolTokenId}
              required
              onChange={(e) => {
                setFarmDetails({ ...farmDetails, poolTokenId: e.target.value })
              }}
            />
          </div>
        </div>
        <div className="flex-row justify-center md:flex md:mx-2">
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Reward Token Address
            </label>
            <input
              className="md:text-left text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300  md:w-full px-2"
              placeholder="Ex. KT1..."
              value={farmDetails.rewardTokenAddress}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  rewardTokenAddress: e.target.value,
                })
              }}
            />
          </div>
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Reward Token Id
            </label>
            <input
              className="md:text-left text-sm  md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300  md:w-full px-2"
              type="number"
              placeholder="Ex. 0"
              value={farmDetails.rewardTokenId}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  rewardTokenId: e.target.value,
                })
              }}
            />
          </div>
        </div>
        <div className="flex-row justify-center  md:flex md:mx-2 custom-datetime-input mb-4">
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Farm Start Time
            </label>
            <input
              type="datetime-local"
              className="md:text-left text-sm  md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 px-2"
              placeholder="Farm Start Time"
              value={farmDetails.farmStartTime}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  farmStartTime: e.target.value,
                })
              }}
            />
          </div>
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Farm End Time
            </label>
            <input
              type="datetime-local"
              className="md:text-left text-sm  md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300 px-2"
              placeholder="Farm End Time"
              value={farmDetails.farmEndTime}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  farmEndTime: e.target.value,
                })
              }}
            />
          </div>
        </div>
        <div className="flex-row justify-center md:flex text-left md:mx-2">
          <div className="flex-col justify-center  flex text-left w-full px-2 mb-4">
            <label className="font-monocode text-green-300 text-left">
              Reward Token Amount
            </label>
            <input
              id="totalRewards"
              className="md:text-left text-sm md:text-lg font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-300  md:w-full px-2"
              placeholder="Ex. 1000"
              type="number"
              value={farmDetails.totalRewards}
              required
              onChange={(e) => {
                setFarmDetails({
                  ...farmDetails,
                  totalRewards: e.target.value,
                })
              }}
            />
          </div>
        </div>

        <div className="flex-row justify-center md:flex text-center">
          <button
            className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
            type="submit"
          >
            Create Farm
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

export default FarmCreator

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
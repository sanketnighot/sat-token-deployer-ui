import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  getFarmDetails,
  harvestFarm,
  depositTokens,
  withdrawTokens,
  getPendingRewards,
} from "../../../../utils/farming"
import { dappClient } from "../../../../utils/walletconnect"

const FarmDetails = () => {
  const [farmDetails, setFarmDetails] = useState({})
  const [transactionUrl, setTransactionUrl] = useState("")
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Error Message")
  const [successMessage, setSuccessMessage] = useState("Sucess Message")
  const [isLoading, setIsLoading] = useState(false)
  const [txnMessage, setTxnMessage] = useState(false)
  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const user_account = dappClient().getAccount()

  const router = useRouter()
  const { farm_id } = router.query

  const HarvestFarm = async () => {
    await harvestFarm(
      farm_id,
      setTransactionUrl,
      setIsLoading,
      setTxnMessage,
      setSuccessMessage,
      setErrorMessage,
      setShowError,
      setShowSuccess
    )
  }

  const DepositTokens = async () => {
    await depositTokens(
      farm_id,
      depositAmount,
      farmDetails.pool_token_decimals,
      farmDetails.pool_token,
      farmDetails.pool_token_id,
      setTransactionUrl,
      setIsLoading,
      setTxnMessage,
      setSuccessMessage,
      setErrorMessage,
      setShowError,
      setShowSuccess
    )
  }

  const WithdrawTokens = async () => {
    await withdrawTokens(
      farm_id,
      withdrawAmount,
      farmDetails.pool_token_decimals,
      setTransactionUrl,
      setIsLoading,
      setTxnMessage,
      setSuccessMessage,
      setErrorMessage,
      setShowError,
      setShowSuccess
    )
  }

  useEffect(() => {
    const getDetails = async () => {
      try {
        const acc_address = await dappClient().getAccount()
        const farm_details = await getFarmDetails(
          farm_id,
          acc_address.account?.address
        )
        setFarmDetails(farm_details)
      } catch (error) {
        console.log(error)
      }
    }
    getDetails()
  }, [farm_id, user_account.account?.address])

  return (
    <>
      <Head>
        <title>Farm {farm_id} | SATs Token Deployer</title>
        <meta
          property="og:title"
          content={`Farm ${farm_id} | SAT Token Deployer`}
        />
        <meta
          property="og:description"
          content="Social Appreciation Token for Tezos Artist"
        />
        <meta
          property="og:site_name"
          content={`Farm ${farm_id} | SAT Token Deployer`}
        />
        <meta property="og:image" content={"/logo1.png"} />
        <meta property="og:url" content="https://deeployer.xyz" />
      </Head>
      <div className="flex mx-auto h-[80vh] md:h-[70vh] w-[70%] mt-10 items-center justify-center text-[#00ff00]">
        <div className="container w-5/6 mx-auto my-2 py-2">
          <div className="flex flex-row justify-between items-center mx-2">
            <h1 className="text-center text-3xl md:text-5xl mb-2">
              Farm Details
            </h1>
          </div>
          <div className="border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg font-mono justify-center items-center text-xl w-full p-4">
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="font-semibold leading-7 text-2xl text-green-400">
                  Farm Id : {farm_id}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-green-600 ">
                  ${farmDetails?.pool_token_symbol} {" ▶▶▶ "} $
                  {farmDetails?.reward_token_symbol}{" "}
                  <span className="text-bold text-green-400 text-lg">
                    [{farmDetails?.apr}% APR]
                  </span>
                </p>
              </div>
              <div className="mt-6 border-t border-[#00ff00]">
                <dl className="divide-y divide-[#1e851e]">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Total Staked
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      {farmDetails?.tokens_staked} $
                      {farmDetails?.pool_token_symbol}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Pending Rewards
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      {farmDetails?.pending_rewards} $
                      {farmDetails?.reward_token_symbol}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Farm Ends
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      {farmDetails?.farm_ends}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Deposit Tokens
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-5/6">
                        <input
                          id="totalRewards"
                          className="md:text-left text-sm md:text-lg font-monocode mb-4 border-2 border-green-500 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-500  md:w-full px-2"
                          placeholder="Amount to Deposit"
                          type="number"
                          value={depositAmount}
                          required
                          onChange={(e) => {
                            setDepositAmount(e.target.value)
                          }}
                        />
                        <button
                          className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
                          onClick={DepositTokens}
                        >
                          Deposit
                        </button>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Withdraw Tokens
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-5/6">
                        <input
                          id="totalRewards"
                          className="md:text-left text-sm md:text-lg font-monocode mb-4 border-2 border-green-500 ring-2 ring-green-700 shadow-lg bg-transparent placeholder-green-500  md:w-full px-2"
                          placeholder="Amount to Withdraw"
                          type="number"
                          value={withdrawAmount}
                          required
                          onChange={(e) => {
                            setWithdrawAmount(e.target.value)
                          }}
                        />
                        <button
                          className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-2 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
                          onClick={WithdrawTokens}
                        >
                          Withdraw
                        </button>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-green-300">
                      Harvest Rewards
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-green-500 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-row md:w-4/6">
                        <button
                          className="text-sm md:text-xl font-monocode mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg mx-auto md:mx-0 px-4 py-1 bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
                          onClick={HarvestFarm}
                        >
                          Harvest
                        </button>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
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
    </>
  )
}

export default FarmDetails

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

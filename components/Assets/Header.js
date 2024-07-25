import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { dappClient } from "../../utils/walletconnect"

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [account, setAccount] = useState(false)

  const router = useRouter()

  const handleNavigate = (link) => {
    setIsMenuOpen(false)
    if (link === "Home") {
      router.push("/")
    } else if (link === "create") {
      router.push("/create")
    } else if (link === "FAQ") {
      router.push("/#faq")
    } else if (link === "airdrop") {
      router.push("/airdrop")
    } else if (link === "farms") {
      router.push("/farms")
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    ;(async () => {
      const accounts = await dappClient().getAccount()
      setAccount(accounts.account)
    })()
  }, [])

  const onConnectWallet = async () => {
    await dappClient().connectAccount()
    const accounts = await dappClient().getAccount()
    setAccount(accounts.account)
  }

  const onDisconnectWallet = async () => {
    await dappClient().disconnectWallet()
    setAccount(false)
  }

  return (
    <nav className="sticky top-0 drop-shadow-xl z-40 w-full bg-[#1b1b1b] border-1 border-[#39FF14] ring-1 ring-[#39FF14] shadow-lg">
      <div className="flex justify-between md:mr-10">
        <div className="flex">
          {/* Website Logo */}
          <a href="/" className="flex items-center py-4 px-2">
            <Image
              className="cursor-pointer mx-auto"
              src="/logo.png"
              width={150}
              height={100}
              alt="token image"
              onClick={handleNavigate}
            />
          </a>
        </div>
        <div className="hidden md:flex text-2xl items-center py-4 space-x-4">
          <Link
            href="/"
            className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
          >
            <span className="flex text-center">Home</span>
          </Link>
          <Link
            href="/create"
            className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
          >
            <span className="flex text-center">Create_Token</span>
          </Link>
          <Link
            href="/airdrop"
            className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
          >
            <span className="flex text-center">Airdrop</span>
          </Link>
          <Link
            href="/farms"
            className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
          >
            <span className="flex text-center">Farms</span>
          </Link>
          <Link
            href="/#faq"
            className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
          >
            <span className="flex text-center">FAQ</span>
          </Link>
          {/* <div className="group">
            <button
              className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="flex text-center">Features[Soon]</span>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 mr-10 rounded-md shadow-lg bg-transparent ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                <div
                  className="mt-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    href="#"
                    className="font-semibold transition duration-300 w-full hover:cursor-not-allowed"
                  >
                    <span className="px-2 flex text-center">Draw_2_Mint</span>
                  </Link>
                </div>
              </div>
            )}
          </div> */}
          <button
            className="w-full py-2 px-4 focus:outline-none mx-auto text-center text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
            onClick={!account ? onConnectWallet : onDisconnectWallet}
          >
            {!account ? "Sync" : "Disconnect"}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center mr-5">
          <button
            className="outline-none mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              x-show="!showMenu"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="#a2ff00"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} drop-shadow-xl`}
      >
        <button
          className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
          onClick={() => {
            handleNavigate("Home")
          }}
        >
          <span className="flex text-center">Home</span>
        </button>
        <button
          className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
          onClick={() => {
            handleNavigate("create")
          }}
        >
          <span className="flex text-center">Create_Token</span>
        </button>
        <button
          className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
          onClick={() => {
            handleNavigate("airdrop")
          }}
        >
          <span className="flex text-center">Airdrop</span>
        </button>
        <button
          className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
          onClick={() => {
            handleNavigate("farms")
          }}
        >
          <span className="flex text-center">Farms</span>
        </button>
        <button
          className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
          onClick={() => {
            handleNavigate("FAQ")
          }}
        >
          <span className="flex text-center">FAQ</span>
        </button>
        {/* <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900">
          <span className="flex text-center">Draw2Mint_[Soon]</span>
        </button> */}
        <button
          className="w-full py-2 px-4 focus:outline-none mx-auto text-center text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
          onClick={!account ? onConnectWallet : onDisconnectWallet}
        >
          {!account ? "Sync" : "Disconnect"}
        </button>
      </div>
    </nav>
  )
}

export default Header

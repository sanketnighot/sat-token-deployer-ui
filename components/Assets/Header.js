import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { dappClient } from "@/utils/walletconnect";
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [account, setAccount] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            // TODO 5.b - Get the active account
            const accounts = await dappClient().getAccount();
            setAccount(accounts.account?.address);
        })();
    }, []);

    const handleNavigate = (link) => {
        setIsMenuOpen(false);
        if (link === "Home") {
            router.push('/');
        } else if (link === "Collection") {
            router.push('/Collection');
        } else if (link === "FAQ") {
            router.push('/#faq');
        }
    };

    const onConnectWallet = async () => {
        console.log("connect wallet");
        await dappClient().connectAccount();
        const accounts = await dappClient().getAccount();
        setAccount(accounts.account);
    };

    const onDisconnectWallet = async () => {
        await dappClient().disconnectWallet();
        setAccount(false);
    };

    return (
        <nav className="sticky top-0 drop-shadow-xl z-40 fixed w-full bg-[#1b1b1b] border-1 border-[#39FF14] ring-1 ring-[#39FF14] shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            {/* Website Logo */}
                            <a href="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-White-500 font-black text-2xl md:text-3xl">SAT Token Deployer</span>
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-1 text-2xl">
                        <Link href="/" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                Home
                            </span></Link>
                        <Link href="/Collection" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                Collection
                            </span>
                        </Link>
                        <Link href="/#faq" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                FAQ
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="w-6 h-6"
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="#a2ff00">
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} drop-shadow-xl`}>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
                    onClick={() => { handleNavigate("Home") }}>
                    <span className="flex text-center">
                        Home
                    </span>
                </button>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
                    onClick={() => { handleNavigate("Collection") }}>
                    <span className="flex text-center">
                        Collection
                    </span>
                </button>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
                    onClick={() => { handleNavigate("FAQ") }}>
                    <span className="flex text-center">
                        FAQ
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Header;

import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (link) => {
        setIsMenuOpen(false);
        if (link === "Home") {
            router.push('/');
        } else if (link === "create") {
            router.push('/create');
        } else if (link === "FAQ") {
            router.push('/#faq');
        }
    };

    return (
        <nav className="sticky top-0 drop-shadow-xl z-40 w-full bg-[#1b1b1b] border-1 border-[#39FF14] ring-1 ring-[#39FF14] shadow-lg">
            <div className="max-w-6xl">
                <div className="flex justify-between">
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
                        <Link href="/" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                Home
                            </span>
                        </Link>
                        <Link href="/create" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                Create_Token
                            </span>
                        </Link>
                        <Link href="/#faq" className="py-4 px-2 font-semibold transition duration-300 hover:text-green-900">
                            <span className="flex text-center">
                                FAQ
                            </span>
                        </Link>
                        <Link href="#" className="py-4 px-2 font-semibold transition duration-300">
                            <span className="flex text-center hover:cursor-not-allowed">
                                Draw2Mint[Soon]
                            </span>
                        </Link>
                        <Link href="#" className="py-4 px-2 font-semibold transition duration-300">
                            <span className="flex text-center hover:cursor-not-allowed">
                                Airdrop_Deployer[Soon]
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center mr-5">
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
                    onClick={() => { handleNavigate("create") }}>
                    <span className="flex text-center">
                        Create_Token
                    </span>
                </button>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900"
                    onClick={() => { handleNavigate("FAQ") }}>
                    <span className="flex text-center">
                        FAQ
                    </span>
                </button>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900">
                    <span className="flex text-center">
                        Draw2Mint_[Soon]
                    </span>
                </button>
                <button className="block py-2 px-4 text-xl transition duration-300 w-full hover:text-green-900">
                    <span className="flex text-center">
                        Airdrop_Deployer_[Soon]
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Header;

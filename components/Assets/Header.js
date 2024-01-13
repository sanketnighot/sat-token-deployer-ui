import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex items-center fixed w-full justify-between p-6 bg-[#1b1b1b] border-2 border-[#39FF14] ring-2 ring-[#39FF14] shadow-lg">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-2xl lg:flex-grow">
                    <Link href="/">
                        <span className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Home</span>
                    </Link>
                    <Link href="/Collection">
                        <span className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Collection</span>
                    </Link>
                    <Link href="/#faq">
                        <span className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">FAQ</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
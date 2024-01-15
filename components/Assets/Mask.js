import React from 'react';
import Image from "next/image"

export default function Mask() {
    return (
        <>
            <div className="flex flex-wrap justify-center items-center min-h-screen bg-[#131215]">
                <div className="container min-h-24 w-4/6 p-8">
                    <Image
                        className="mx-auto"
                        src="/loader.webp"
                        width={500}
                        height={500}
                        alt="token image"
                    />
                </div>
            </div>
        </>
    )
}

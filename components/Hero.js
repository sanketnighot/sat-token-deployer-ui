import React from "react"
import Link from "next/link"
const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl md:text-6xl mb-2">
          Social Appreciation Tokens
        </h1>
        <h2 className="text-lg md:text-4xl mb-8">
          {"<"} For the great Artists of Tezos {">"}
        </h2>
        <p className="text-md md:text-2xl font-monocode mb-2">
          SATs stands for Social Appreciation Tokens, a revolutionary
          tokenization system on the Tezos blockchain that transforms the
          relationship between artists and their collectors. SAT's operate on
          the principle of decentralized promotion and ownership, creating a
          symbiotic ecosystem that benefits both artists and token holders.
        </p>
        <Link href="/create">
          <img
            className="cursor-pointer w-auto mx-auto"
            src="/coin.webp"
            width={175}
            height={175}
            alt="token image"
          />
        </Link>

        <h2 className="text-md md:text-3xl mb-2">
          Click coin to create your own collection
        </h2>
      </div>
    </div>
  )
}

export default Hero

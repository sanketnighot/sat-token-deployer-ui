import React, { useEffect, useState } from "react"

export const ListInfoItem = ({ title, tokens_staked, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (tokens_staked > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [])

  return (
    <>
      <div className="mb-4 w-max-5/6 overflow-x-auto">
        <button
          className="w-full py-2 px-4 focus:outline-none mx-auto text-center text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title} {isOpen ? "▲" : "▼"}
        </button>
        {isOpen && <div>{children}</div>}
      </div>
      <div className="mt-6 border-t border-[#00ff00] w-48 justify-center mx-auto"></div>
    </>
  )
}

export default function ListInfo({ children }) {
  return <div className="space-y-4">{children}</div>
}

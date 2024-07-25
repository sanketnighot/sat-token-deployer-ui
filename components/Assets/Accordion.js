import React, { useState } from "react"

export const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        className="w-full py-2 px-4 focus:outline-none mx-auto text-center text-sm md:text-lg font-monocode border-2 border-green-300 ring-2 ring-green-700 shadow-lg bg-[#1B3635] hover:bg-[#a2ff00a8] text-[#a2ff00] hover:text-green-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  )
}

export default function Accordion({ children }) {
  return <div className="space-y-4">{children}</div>
}

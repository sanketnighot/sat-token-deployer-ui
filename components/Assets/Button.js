import React from 'react'

const Button = ({ text }) => {
    return (
        <button className="mx-auto text-center text-sm md:text-xl font-seven mb-4 border-2 border-green-300 ring-2 ring-green-700 shadow-lg w-40 px-4 py-1 bg-green-900 hover:bg-[#a2ff00] text-[#a2ff00] hover:text-green-900">
            {text}
        </button>
    )
}

export default Button
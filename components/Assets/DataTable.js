import React from "react"

const DataTable = ({ data, duplicateEntries }) => {
  return (
    <div className="overflow-y-auto max-h-[400px]">
      <table className="min-w-full divide-y-2 divide-x-reverse divide-green-900 mb-5 font-mono">
        <thead className="bg-[#136033] sticky top-0 ">
          <tr>
            <th className="px-6 py-3 text-center text-sm text-green-500 font-bold uppercase tracking-wider ">
              Sr. No.
            </th>
            <th className="px-6 py-3 text-center text-sm text-green-500 font-bold uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-green-700">
          {data.map((address, index) => (
            <tr
              key={index}
              className={`px-6 py-4 whitespace-nowrap text-center text-sm text-green-500 ${duplicateEntries.includes(address) ? "bg-[#9dff8a68]" : ""}`}
            >
              <td>{index + 1}</td>
              <td>{address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable

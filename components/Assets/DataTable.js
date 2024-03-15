import React from "react"

const DataTable = ({ data }) => {
  return (
    <div className="overflow-y-auto max-h-[400px]">
      {" "}
      {/* Adjust max-h-[400px] as needed */}
      <table className="min-w-5/6 divide-y-2 divide-x-reverse divide-green-900 mb-5 font-mono">
        <thead className="bg-[#136033] sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-sm text-green-500 font-bold uppercase tracking-wider">
              Sr. No.
            </th>
            {Object.keys(data[0]).map((key, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm text-green-500 font-bold uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-green-700">
          {data.map((row, index) => (
            <tr
              key={index}
              className="px-6 py-4 whitespace-nowrap text-sm text-green-500"
            >
              {index < data.length ? <td>{index + 1}</td> : null}
              {Object.values(row).map((value, index) => (
                <td
                  key={index}
                  className="px-6 py-4 whitespace-nowrap text-sm text-green-500"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable

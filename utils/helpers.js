import Papa from "papaparse"

export const convertCsvToJson = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const filteredData = results.data.filter((row) =>
          Object.values(row).some((value) => value !== "")
        )
        resolve(filteredData)
      },
      error: (err) => {
        reject(err)
      },
    })
  })
}

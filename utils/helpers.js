import Papa from "papaparse"

export const convertCsvToJson = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const addresses = results.data.map((row) => row[0])
        resolve(addresses)
      },
      error: (err) => {
        reject(err)
      },
    })
  })
}

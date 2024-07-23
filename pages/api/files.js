import formidable from "formidable"
import fs from "fs"
import FormData from "form-data"
const pinataSDK = require("@pinata/sdk")
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT })

export const config = {
  api: {
    bodyParser: false,
  },
}

const saveFile = async (file, fileName) => {
  try {
    const stream = fs.createReadStream(file.filepath)
    const options = {
      pinataMetadata: {
        name: fileName,
      },
    }
    const response = await pinata.pinFileToIPFS(stream, options)
    fs.unlinkSync(file.filepath)

    return response
  } catch (error) {
    throw error
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm()
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log({ err })
          return res.status(500).send("Upload Error")
        }
        const response = await saveFile(files.file, fields.fileName)
        const { IpfsHash } = response

        return res.send(IpfsHash)
      })
    } catch (e) {
      console.log(e)
      res.status(500).send("Server Error")
    }
  } else if (req.method === "GET") {
    try {
      const response = await pinata.pinList(
        { pinataJWTKey: process.env.PINATA_JWT },
        {
          pageLimit: 1,
        }
      )
      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
      res.status(500).send("Server Error")
    }
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pinataSDK from "@pinata/sdk"

const pinata = new pinataSDK(
  process.env.NEXT_PUBLIC_API_KEY,
  process.env.NEXT_PUBLIC_API_SECRET
)

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const options = {
      pinataMetadata: {
        name: req.body.data.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }
    try {
      const result = await pinata.pinJSONToIPFS(req.body.data, options)
      return res.send({ hash: result.IpfsHash, status: "success" })
    } catch (err) {
      console.log(err)
      return res.send({ status: "error" })
    }
  }
}

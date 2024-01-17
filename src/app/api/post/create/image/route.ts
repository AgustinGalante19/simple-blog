import { UploadApiResponse, v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<string | undefined>>> {
  try {
    const data = await request.formData()
    const image = data.get("file") as File
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const imageResponse: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (err, res) => {
              if (err) {
                console.log("error cloudinary", err)
                return reject("error cloudinary")
              }
              resolve(res)
            })
            .end(buffer)
        }
      )
      return NextResponse.json({
        data: [imageResponse?.secure_url],
        error: [],
        result: "ok",
      })
    }
    return NextResponse.json(
      { data: [], error: [], result: "error" },
      {
        status: 400,
      }
    )
  } catch (err) {
    return NextResponse.json({
      error: ["Unexpected error"],
      data: [],
      result: "error",
    })
  }
}

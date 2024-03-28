import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps, useState } from "react"
import { Input } from "@/components/ui/input"
import { Crop } from "@/components/ui/crop"

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default function Component() {
  const [gifSrc, setGifSrc] = useState("")
  const [gifUrl, setGifUrl] = useState("")
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)
      setGifSrc(imageDataUrl)
    }
  }
  //TODO: get name and set a input to change the name

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card key="1" className="w-full max-w-lg mx-auto ">
        <CardHeader>
          <CardTitle className="text-center">Upload Meme</CardTitle>
          <CardDescription className="text-center">Only Gifs supported</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full center">
            <Input id="picture" type="file" onChange={onFileChange} accept="image/*" />
          </div>
          <div className="flex w-full items-center space-x-2">
            <Input onChange={e => setGifUrl(e.target.value)} type="url" placeholder="Input gif url" />
            <Button onClick={e => setGifSrc(gifUrl)} type="submit">Go</Button>
          </div>
          {gifSrc.length ? <>
            <Crop path={gifSrc} />
            <Button className="w-full" variant="outline">
              <ImageIcon className="mr-2 h-4 w-4" />
              Preview Meme
            </Button>
            <Button className="w-full">Save Meme</Button>
          </> : <></>}

        </CardContent>
      </Card>
      </div>
  )
}

function ImageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


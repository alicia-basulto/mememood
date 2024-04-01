/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eu4NeLLnTy3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import useSWR from "swr";
import { JSX, SVGProps } from "react";
import { Progress } from "@/components/ui/progress";
import { DataStorage } from "./api/memoryStorage";
const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export default function Component() {

    const { data, error, isLoading } = useSWR(
        "/api/hello",
        fetcher
    );

    const { data: dataStorage, error: errorStorage, isLoading: isLoadingStorage } = useSWR(
      "/api/memoryStorage", fetcher);

    if (error) return "An error has occurred.";
    if (errorStorage) return "An error has occurred.";
    if (isLoading) return "Loading...";
    if (isLoadingStorage) return "Loading Storage...";

    let memes : string[]= data;
    let capacityStorage : DataStorage = dataStorage;
    let memes_jsx = memes.map((item)=>(
        <div className="relative group overflow-hidden rounded-lg aspect-[1/1] border dark:border-gray-800">
            <img
              alt="Photo 1"
              className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform"
              src={item}
            />
            <Button
              className="absolute top-2 left-2 rounded-full translate-x-0.5 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"
              size="icon"
              variant="ghost"
            >
              <PlayIcon className="w-4 h-4" />
              <span className="sr-only">Play</span>
            </Button>
            <Checkbox
              className="absolute top-2 right-2 translate-x-0.5 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"
              id="photo1"
            />
          </div>
    ))
  return (
    
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-14 border-b px-4 gap-4">
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="w-4 h-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Button className="rounded-full w-8 h-8" size="icon" variant="outline">
          <UploadIcon className="w-4 h-4" />
          <span className="sr-only">Upload</span>
        </Button>
        <div className="grid gap-2">
          <div className="text-sm flex items-center gap-2">
            <ActivityIcon className="w-4 h-4" />
            <span className="font-semibold">{capacityStorage.usageStorage}GB used</span>
            <span className="ml-auto font-semibold">{capacityStorage.totalStorage}GB</span>
          </div>
          <Progress  value={capacityStorage.usageStorage * 100 / capacityStorage.totalStorage} />
        </div>
        <Button size="sm">Mode</Button>
        <Button size="sm" variant="outline">
          Logout
        </Button>
      </header>
      <main className="flex-1 grid p-4 gap-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 xl:grid-cols-3">
          {memes_jsx}
        </div>
      </main>
    </div>
  )
}

function ActivityIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  }

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PlayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
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

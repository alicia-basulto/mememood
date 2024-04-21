
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import useSWR from "swr";
import { JSX, SVGProps, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { DataStorage } from "./api/memoryStorage";
import { Toggle } from "@/components/ui/toggle";

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export default function Component() {
  const { data: dataMemes, error, isLoading } = useSWR(
    "/api/listMemes",
    fetcher
  );
  const [checked, setChecked] = useState<boolean[]>([]);
  const [loop, setLoop] = useState(false);

  const { data: dataStorage, error: error2, isLoading: isLoading2 } = useSWR(
    "/api/memoryStorage", fetcher);

  useEffect(() => {
    if (dataMemes) {
      setChecked(new Array(dataMemes.length).fill(false));
    }
  }, [dataMemes]);



  if (error || error2) return "An error has occurred.";
  if (isLoading || isLoading2) return "Loading...";
  let memes: string[] = dataMemes;
  let capacityStorage: DataStorage = dataStorage;

  const handleCheckboxChange = (position: number) => {
    const updatedChecked = checked ? [...checked] : [];
    updatedChecked[position] = !updatedChecked[position];
    console.log(updatedChecked)
    setChecked(updatedChecked);
  }


  // TODO: We could refactor this but maybe it is not even worth it
  const handlePlayMeme = async () => {
    const selectedGifPaths = memes.filter((_, i) => checked[i]);
    await playMeme(selectedGifPaths);
  };


  const handleDeleteMeme = async () => {
    const selectedGifPaths = memes.filter((_, i) => checked[i]);
    await deleteMeme(selectedGifPaths);
  };

  const playMeme = async (gifPaths: string[]) => {
    const params = new URLSearchParams();
    gifPaths.forEach((path: string) => params.append('gifs', path));
    params.append('loop', loop?'true':'false');
    await fetch('/api/playMeme?' + params.toString());
  };


  const clearDisplay = async () => {
    await fetch("/api/clearDisplay");
  };

  const deleteMeme = async (gifPaths: string[]) => {
    const params = new URLSearchParams();
    gifPaths.forEach((path: string) => params.append('gifs', path));
    await fetch('/api/removeMeme?' + params.toString());
  };


  let memes_jsx = memes.map((item, i) => (
    <div key={item} className="relative group overflow-hidden rounded-lg aspect-[1/1] border dark:border-gray-800">
      <img
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
        src={item}
      />
      <Checkbox className="absolute top-4 right-4 "
        onClick={() => handleCheckboxChange(i)} />
    </div>
  ))
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-14 border-b px-4 gap-4">
        <div className="flex-1 flex items-center justify-center gap-4">
          <Link href="/upload">
            <Button className="rounded-full w-8 h-8" size="icon" variant="outline">
              <UploadIcon className="w-4 h-4" />
              <span className="sr-only">Upload</span>
            </Button>
          </Link>
          <div className="grid gap-2 w-full max-w-[50vw]">
            <div className="text-sm flex items-center gap-2">
              <ActivityIcon className="w-4 h-4" />
              <span className="font-semibold">{capacityStorage.usageStorage}GB used</span>
              <span className="ml-auto font-semibold">{capacityStorage.totalStorage}GB</span>
            </div>
            <Progress value={capacityStorage.usageStorage * 100 / capacityStorage.totalStorage} />
          </div>
        </div>
      </header>
      <main className="flex-1 grid p-4 gap-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 xl:grid-cols-3">
          {memes_jsx}
        </div>
        <div className="flex justify-center  items-center gap-4">
         
          <Button onClick={handlePlayMeme} disabled={!checked.some(Boolean)} variant="outline">
            <PlayIcon className="w-4 h-4" />
          </Button>
          <Button disabled={!checked.some(Boolean)} variant="outline" onClick={()=> setLoop(!loop)}>
            <CircleIcon className="w-4 h-4"  fill={loop ? 'none' : ''}/>
          </Button>
          <Button onClick={handleDeleteMeme}  disabled={!checked.some(Boolean)} variant="outline">
            <TrashIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={clearDisplay}>
            <EraserIcon className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}


function CircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}


function EraserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 9 9" />
    </svg>
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


function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
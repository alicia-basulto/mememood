
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import useSWR from "swr";
import { JSX, SVGProps, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export default function Component() {
  const { data, error, isLoading } = useSWR(
    "/api/listMemes",
    fetcher
  );
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (data) {
      setChecked(new Array(data.length).fill(false));
    }
  }, [data]);


  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  let memes: string[] = data;

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

  const handlePlaySingleMeme = async (meme:number) => {
    const selectedGifPaths =  [memes[meme]];
    await playMeme(selectedGifPaths);
  };



  const handleDeleteMeme = async () => {
    const selectedGifPaths = memes.filter((_, i) => checked[i]);
    await deleteMeme(selectedGifPaths);
  };


  const playMeme = async (gifPaths: string[]) => {
    const params = new URLSearchParams();
    gifPaths.forEach((path: string) => params.append('gifs', path));
    await fetch('/api/playMeme?' + params.toString());
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
      <Button
        onClick={() => handlePlaySingleMeme(i)}
        className="absolute top-2 left-2 rounded-full"
        size="icon"
        variant="ghost"
      >
        <PlayIcon className="w-4 h-4" />
        <span className="sr-only">Play</span>
      </Button>
      <Checkbox className="absolute top-4 right-4 "
        onClick={() => handleCheckboxChange(i)} />
    </div>
  ))
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-14 border-b px-4 gap-4">
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="w-4 h-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Link href="/upload">
          <Button className="rounded-full w-8 h-8" size="icon" variant="outline">
            <UploadIcon className="w-4 h-4" />
            <span className="sr-only">Upload</span>
          </Button>
        </Link>
        <div className="grid gap-2">
          <div className="text-sm flex items-center gap-2">
            <ActivityIcon className="w-4 h-4" />
            <span className="font-semibold">32GB used</span>
            <span className="ml-auto font-semibold">128GB</span>
          </div>
          <Progress value={25} />
        </div>
      </header>
      <main className="flex-1 grid p-4 gap-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 xl:grid-cols-3">
          {memes_jsx}
        </div>
        <div className="flex justify-center gap-4">
          {checked.some(Boolean) && <Button onClick={handleDeleteMeme} size="lg" variant="outline">
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </Button>}
          {checked.filter(Boolean).length >= 2 && <Button onClick={handlePlayMeme} size="lg" variant="outline">
            <PlayIcon className="w-4 h-4 mr-2" />
            Play
          </Button>}
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
'use client'
import React from "react";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/1",
    fetcher
  );
  console.dir(data)

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div>
      <h1>hi</h1>
    </div>
  );
}

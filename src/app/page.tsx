'use client'

import Image from "next/image";
import { BASEURL } from "../const/const";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ListData {
  sequence: number;
  title: string;
  route: string;
  icon: string;
}

export default function Home() {
  const [list, setList] = useState<ListData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const resp = await fetch(`${BASEURL}/api/list`);
        if (!resp.ok) {
          throw new Error(`Failed to fetch list: ${resp.status}`);
        }
        const data = await resp.json();
        setList(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="text-xl text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
      {list.map((obj: ListData) => (
        <Link
          href={`${obj.route}`}
        key={obj.sequence}
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer active:scale-95"
        >
        <h1 className="text-2xl font-bold text-center mb-4">{obj.title}</h1>
        <Image
          src={obj.icon}
          height={300}
          width={300}
          alt={obj.title}
          className="rounded-lg hover:brightness-110 transition-all duration-300"
        />
        </Link>
      ))}
      </div>
    </main>
  );
}
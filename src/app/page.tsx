'use client'

import Image from "next/image";
import { BASEURL } from "../const/const";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";

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
        // Add minimum loading time to prevent flicker
        const startTime = Date.now();

        const resp = await fetch(`${BASEURL}/api/list`);
        if (!resp.ok) {
          throw new Error(`Failed to fetch list: ${resp.status}`);
        }
        const data = await resp.json();
        setList(data.data);

        // Ensure minimum loading time of 800ms to prevent flicker
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 800 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  if (loading || list.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
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
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Welcome to Learning Hub
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Master modern web technologies with interactive lessons
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {list.map((obj: ListData, index: number) => (
            <Link
              href={`${obj.route}`}
              key={obj.sequence}
              className="group relative overflow-hidden bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer active:scale-95 border border-gray-800 hover:border-blue-500/50"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={obj.icon}
                    height={80}
                    width={80}
                    alt={obj.title}
                    className="rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {obj.title}
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
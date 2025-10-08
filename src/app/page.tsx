import Image from "next/image";
import { BASEURL } from "../const/const";
import Link from "next/link";

interface ListData {
  sequence: number;
  title: string;
  route: string;
  icon: string;
}

// Force dynamic rendering to avoid build-time fetch errors
export const dynamic = 'force-dynamic';

export default async function Home() {

  const resp = await fetch(`${BASEURL}/api/list`);
  const list = await resp.json();    

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
      {list.data.map((obj: ListData) => (
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

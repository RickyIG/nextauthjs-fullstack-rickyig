// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === 'loading') return <p>Loading...</p>;

//   if (!session) {
//     router.push('/signin');
//     return null;
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        // <div className="mb-6">
        //   <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        //   <p className="text-gray-600">
        //     Logged in as: <span className="font-medium text-blue-600">{session.user?.email}</span>
        //   </p>
        // </div>
        // <button 
        //   onClick={() => signOut({ callbackUrl: '/login' })}
        //   className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        // >
        //   Sign Out
        // </button>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Article = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-6 text-muted-foreground">Selamat datang, {session?.user?.name}</p>
      <Link href="/dashboard/new"><Button>Tambah Artikel</Button></Link>
      <Link href="/"><Button>Home</Button></Link>
      <div className="mt-6 space-y-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{article.title}</h3>
            <Link href={`/article/${article.slug}`} className="text-blue-600 text-sm">Lihat</Link>
          </div>
        ))}
      </div>
        <div className="mb-6">
          <p className="text-gray-600">
            Logged in as: <span className="font-medium text-blue-600">{session?.user?.email}</span>
          </p>
        </div>
      <button 
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Sign Out
      </button>
    </div>
  );
}

// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/articles")
//       .then(res => res.json())
//       .then(data => setArticles(data))
//       .finally(() => setIsLoading(false));
//   }, []);

//   return (
//     <main className="max-w-2xl mx-auto py-10 space-y-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Portal Artikel</h1>
//       </div>

//       {isLoading ? (
//         <p className="text-center text-muted-foreground">Loading artikel...</p>
//       ) : (
//         <div className="space-y-4">
//           {articles.map((article) => (
//             <Link key={article.id} href={`/article/${article.slug}`}>
//               <div className="border rounded-xl p-4 hover:shadow transition">
//                 <h2 className="text-xl font-semibold">{article.title}</h2>
//                 <p className="text-sm text-muted-foreground">by {article.author?.name ?? 'Unknown'}</p>
//                 <p className="line-clamp-2">{article.content}</p>
//               </div>
//             </Link>
//           ))}
//           {articles.length === 0 && (
//             <p className="text-center text-muted-foreground">Belum ada artikel.</p>
//           )}
//         </div>
//       )}

//       <div>
//         {session?.user ? (
//           <div className="text-sm text-right text-muted-foreground">
//             <p>
//               Login as: <strong>{session.user.name}</strong> - {session.user.email}
//             </p>
//             <button
//               onClick={() => signOut({ callbackUrl: '/' })}
//               className="mt-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
//             >
//               Sign Out
//             </button>
//             <Link
//             href="/dashboard"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm items-center justify-center flex mx-auto"
//           >
//             Menuju ke Dashboard
//           </Link>
//           </div>
//         ) : (
//           <div>
//             <p className="text-sm text-center text-muted-foreground mb-2">
//               Silakan login untuk mengelola artikel.
//             </p>
//             <Link
//             href="/signin"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm items-center justify-center flex mx-auto"
//           >
//             Login
//           </Link>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/articles")
//       .then(res => res.json())
//       .then(data => setArticles(data))
//       .finally(() => setIsLoading(false));
//   }, []);

//   return (
//     <main className="max-w-2xl mx-auto py-10 space-y-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Portal Artikel</h1>
//       </div>

//       {isLoading ? (
//         <p className="text-center text-muted-foreground">Loading artikel...</p>
//       ) : (
//         <div className="space-y-6 mt-3 mb-3">
//           {articles.map((article) => (
//             <Link key={article.id} href={`/article/${article.slug}`}>
//               <div className="border rounded-xl p-4 hover:shadow transition mt-3 mb-3">
//                 <h2 className="text-xl font-semibold">{article.title}</h2>
//                 <p className="text-sm text-muted-foreground">by {article.author?.name ?? 'Unknown'}</p>
//                 <p className="line-clamp-2">{article.content}</p>
//               </div>
//             </Link>
//           ))}
//           {articles.length === 0 && (
//             <p className="text-center text-muted-foreground">Belum ada artikel.</p>
//           )}
//         </div>
//       )}

//       <div>
//         {session?.user ? (
//           <div className="text-sm text-right text-muted-foreground">
//             <p>
//               Login as: <strong>{session.user.name}</strong> - {session.user.email}
//             </p>
//             <button
//               onClick={() => signOut({ callbackUrl: '/' })}
//               className="mt-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
//             >
//               Sign Out
//             </button>
//             <Link
//               href="/dashboard"
//               className="mt-4 block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm text-center"
//             >
//               Menuju ke Dashboard
//             </Link>
//           </div>
//         ) : (
//           <div>
//             <p className="text-sm text-center text-muted-foreground mb-2">
//               Silakan login untuk mengelola artikel.
//             </p>
//             <Link
//               href="/signin"
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm items-center justify-center flex mx-auto"
//             >
//               Login
//             </Link>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author?: {
    name?: string;
  };
};


export default function Home() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Portal Artikel</h1>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading artikel...</p>
      ) : (
        <div className="space-y-6 mt-3 mb-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <div className="border rounded-xl p-4 hover:shadow transition mt-3 mb-3">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-sm text-muted-foreground">by {article.author?.name ?? 'Unknown'}</p>
                <p className="line-clamp-2">{article.content}</p>
              </div>
            </Link>
          ))}
          {articles.length === 0 && (
            <p className="text-center text-muted-foreground">Belum ada artikel.</p>
          )}
        </div>
      )}

      <div>
        {session?.user ? (
          <div className="text-sm text-right text-muted-foreground">
            <p>
              Login as: <strong>{session.user.name}</strong> - {session.user.email}
            </p>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="mt-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
            >
              Sign Out
            </button>
            <Link
              href="/dashboard"
              className="mt-4 block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm text-center"
            >
              Menuju ke Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-center text-muted-foreground mb-2">
              Silakan login untuk mengelola artikel.
            </p>
            <Link
              href="/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm items-center justify-center flex mx-auto"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

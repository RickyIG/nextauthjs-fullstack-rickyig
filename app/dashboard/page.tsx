// "use client";

// import { useEffect, useState } from "react";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// import { Dialog } from "@/components/ui/dialog";
// import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// import { toast } from "sonner";

// // Type for article
// type Article = {
//   id: string;
//   title: string;
//   slug: string;
//   createdAt: string;
// };

// export default function DashboardPage() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     fetch("/api/articles/user")
//       .then(res => res.json())
//       .then(data => setArticles(data));
//   }, []);

//   const handleDelete = async () => {
//     if (!articleToDelete) return;

//     try {
//       const res = await fetch(`/api/articles/${articleToDelete}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Gagal menghapus artikel");

//       setArticles(prev => prev.filter(article => article.id !== articleToDelete));
//       toast.success("Artikel berhasil dihapus");
//     } catch (err) {
//       toast.error("Terjadi kesalahan saat menghapus artikel");
//     } finally {
//       setShowConfirm(false);
//       setArticleToDelete(null);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
//       <p className="mb-6 text-muted-foreground">Selamat datang, {session?.user?.name}</p>
//       <div className="flex gap-2">
//         <Link href="/dashboard/new"><Button>Tambah Artikel</Button></Link>
//         <Link href="/"><Button variant="outline">Home</Button></Link>
//       </div>
//       <div className="mt-6 space-y-4">
//         {articles.map(article => (
//           <div key={article.id} className="border p-4 rounded-lg">
//             <h3 className="font-semibold text-lg">{article.title}</h3>
//             <div className="flex gap-2 mt-2">
//               <Link href={`/article/${article.slug}`} className="text-blue-600 text-sm">Lihat</Link>
//               <Link href={`/dashboard/edit/${article.id}`} className="text-yellow-600 text-sm">Edit</Link>
//               <button
//                 onClick={() => {
//                   setArticleToDelete(article.id);
//                   setShowConfirm(true);
//                 }}
//                 className="text-red-600 text-sm"
//               >Hapus</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mb-6 mt-8">
//         <p className="text-gray-600">
//           Logged in as: <span className="font-medium text-blue-600">{session?.user?.email}</span>
//         </p>
//       </div>
//       <button 
//         onClick={() => signOut({ callbackUrl: '/signin' })}
//         className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
//       >
//         Sign Out
//       </button>

//       <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Yakin ingin menghapus artikel ini?</DialogTitle>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="ghost" onClick={() => setShowConfirm(false)}>Batal</Button>
//             <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { toast } from "sonner";

type Article = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles/user");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        toast.error("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      const res = await fetch(`/api/articles/${articleToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus artikel");

      setArticles(prev => prev.filter(article => article.id !== articleToDelete));
      toast.success("Artikel berhasil dihapus");
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus artikel");
    } finally {
      setShowConfirm(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-6 text-muted-foreground">Selamat datang, {session?.user?.name}</p>
      <div className="flex gap-2">
        <Link href="/dashboard/new"><Button>Tambah Artikel</Button></Link>
        <Link href="/"><Button variant="outline">Home</Button></Link>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-gray-500 italic">Loading artikel...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada artikel.</p>
        ) : (
          articles.map(article => (
            <div key={article.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <div className="flex gap-2 mt-2">
                <Link href={`/article/${article.slug}`} className="text-blue-600 text-sm">Lihat</Link>
                <Link href={`/dashboard/edit/${article.id}`} className="text-yellow-600 text-sm">Edit</Link>
                <button
                  onClick={() => {
                    setArticleToDelete(article.id);
                    setShowConfirm(true);
                  }}
                  className="text-red-600 text-sm"
                >Hapus</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mb-6 mt-8">
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

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yakin ingin menghapus artikel ini?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

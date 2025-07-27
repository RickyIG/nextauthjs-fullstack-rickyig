'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function EditArticlePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${id}`);
      const data = await res.json();

      // Optional: Lindungi agar hanya bisa mengedit artikelnya sendiri
      if (data.author?.email !== session?.user?.email) {
        alert("Kamu tidak berhak mengedit artikel ini.");
        return router.push('/dashboard');
      }

      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };

    if (session) fetchArticle();
  }, [id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Gagal mengupdate artikel.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Edit Artikel</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Judul artikel"
      />
      <Textarea
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder="Isi artikel"
      />
      <Button type="submit">Simpan Perubahan</Button>
    </form>
    </div>
  );
}

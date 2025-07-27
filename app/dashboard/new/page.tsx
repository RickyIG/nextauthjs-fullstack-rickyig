'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content }), // ⛔ tanpa excerpt
    });

    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Gagal menyimpan artikel.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Tulis Artikel Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Slug (misal: judul-artikel)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Konten artikel"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2 rounded h-40"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Menyimpan...' : 'Simpan Artikel'}
        </button>
      </form>
      <Link href="/dashboard">
        <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 mt-5">
          Kembali ke Dashboard
        </button>
      </Link>
    </main>
  );
}

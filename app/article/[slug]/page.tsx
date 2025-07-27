import { PrismaClient } from "@/app/generated/prisma";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function ArticlePage(
  {
    children,
    params,
  }: Readonly<{
    children?: ReactNode; // optional karena biasanya page tidak punya children
    params: { slug: string };
  }>
) {
  const prisma = new PrismaClient();

  // Tidak perlu pakai await untuk params
  const { slug } = await params;

  const article = await prisma.articles.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!article) return notFound();

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-muted-foreground">by {article.author.name}</p>
      <div className="prose">{article.content}</div>
      {children}
    </main>
  );
}

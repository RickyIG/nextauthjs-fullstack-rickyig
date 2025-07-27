import { PrismaClient } from "@/app/generated/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const prisma = new PrismaClient()
  const article = await prisma.articles.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  });

  if (!article) return notFound();

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-muted-foreground">by {article.author.name}</p>
      <div className="prose">{article.content}</div>
    </main>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/app/generated/prisma';
import { PrismaClient } from "@/app/generated/prisma";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient()
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, content } = body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newArticle = await prisma.articles.create({
      data: {
        title,
        slug,
        content,
        authorId: user.id,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

// app/api/articles/route.ts


export async function GET() {
  const prisma = new PrismaClient()
  try {
    const articles = await prisma.articles.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

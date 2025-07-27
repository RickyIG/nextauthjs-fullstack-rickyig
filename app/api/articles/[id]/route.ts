// import { PrismaClient } from "@/app/generated/prisma";
// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
//   const article = await prisma.articles.findUnique({
//     where: { id: params.id },
//     include: { author: true },
//   });

//   if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   return NextResponse.json(article);
// }

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const token = await getToken({ req });
//   const body = await req.json();

//   if (!token?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const article = await prisma.articles.findUnique({
//     where: { id: params.id },
//     include: { author: true },
//   });

//   if (!article || article.author.email !== token.email) {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//   }

//   const updated = await prisma.articles.update({
//     where: { id: params.id },
//     data: {
//       title: body.title,
//       content: body.content,
//     },
//   });

//   return NextResponse.json(updated);
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   const token = await getToken({ req });

//   if (!token?.email) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const article = await prisma.articles.findUnique({
//     where: { id: params.id },
//     include: { author: true },
//   });

//   if (!article || article.author.email !== token.email) {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//   }

//   await prisma.articles.delete({
//     where: { id: params.id },
//   });

//   return NextResponse.json({ success: true });
// }


// import { PrismaClient } from "@/app/generated/prisma";
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   const { id } = context.params;

//   const article = await prisma.articles.findUnique({
//     where: { id },
//     include: { author: true },
//   });

//   if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
//   return NextResponse.json(article);
// }

// export async function PUT(req: NextRequest, context: { params: { id: string } }) {
//   const { id } = context.params;
//   const token = await getToken({ req });
//   const body = await req.json();

//   if (!token?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const article = await prisma.articles.findUnique({
//     where: { id },
//     include: { author: true },
//   });

//   if (!article || article.author.email !== token.email) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   const updated = await prisma.articles.update({
//     where: { id },
//     data: {
//       title: body.title,
//       content: body.content,
//     },
//   });

//   return NextResponse.json(updated);
// }

// export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
//   const { id } = context.params;
//   const token = await getToken({ req });

//   if (!token?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const article = await prisma.articles.findUnique({
//     where: { id },
//     include: { author: true },
//   });

//   if (!article || article.author.email !== token.email) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   await prisma.articles.delete({
//     where: { id },
//   });

//   return NextResponse.json({ success: true });
// }


import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

function extractIdFromPath(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1] || null;
}

export async function GET(req: NextRequest) {
  const id = extractIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const article = await prisma.articles.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest) {
  const id = extractIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const token = await getToken({ req });
  const body = await req.json();

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const article = await prisma.articles.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!article || article.author.email !== token.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.articles.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = extractIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const article = await prisma.articles.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!article || article.author.email !== token.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.articles.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

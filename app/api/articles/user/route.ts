import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json([], { status: 200 }); // atau status: 401
  }

  try {
    const articles = await prisma.articles.findMany({
      where: {
        author: {
          email: token.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

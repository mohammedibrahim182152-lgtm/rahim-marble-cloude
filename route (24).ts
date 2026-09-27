import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  alt: z.string().min(2).max(200),
  category: z.string().min(2).max(100),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const images = await prisma.galleryImage.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = schema.parse(body);
  const image = await prisma.galleryImage.create({ data });
  return NextResponse.json(image);
}

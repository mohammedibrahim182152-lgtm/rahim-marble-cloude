import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  description: z.string().min(10).max(2000),
  image: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = schema.parse(body);
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}

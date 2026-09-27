import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(2000),
  product: z.string().optional(),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = schema.parse(body);
  const t = await prisma.testimonial.create({ data });
  return NextResponse.json(t);
}

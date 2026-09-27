import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuotationEmail } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  product: z.string().min(2).max(200),
  quantity: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const quotation = await prisma.quotation.create({ data });
    await sendQuotationEmail(data).catch(console.error);
    return NextResponse.json({ success: true, id: quotation.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const quotations = await prisma.quotation.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(quotations);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

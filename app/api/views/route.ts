import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST() {
  const count = await kv.incr("portfolio:views");
  return NextResponse.json({ count });
}

import { createClient } from "redis";
import { NextResponse } from "next/server";

/**
 * Keep Redis client alive across hot reloads & requests
 * (important for serverless / edge)
 */
declare global {
  // eslint-disable-next-line no-var
  var redis: ReturnType<typeof createClient> | undefined;
}

let client: ReturnType<typeof createClient>;

if (!globalThis.redis) {
  globalThis.redis = createClient({
    url: process.env.REDIS_URL,
  });

  globalThis.redis.connect();
}

client = globalThis.redis;

export async function POST() {
  const count = await client.incr("portfolio:views");
  return NextResponse.json({ count });
}

export async function GET() {
  const count = await client.get("portfolio:views");
  return NextResponse.json({ count: Number(count ?? 0) });
}

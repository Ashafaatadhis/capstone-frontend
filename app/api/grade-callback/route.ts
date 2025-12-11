import { NextRequest, NextResponse } from "next/server";

import { createClient } from "redis";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("job_id");

  if (!jobId) {
    return NextResponse.json({ error: "Missing job_id" }, { status: 400 });
  }

  const data = await redis
    .get(jobId)
    .then((res) => (res ? JSON.parse(res) : null));

  if (!data) {
    return NextResponse.json(
      { error: "Result not found for this job" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.job_id) {
      return NextResponse.json({ error: "Missing job_id" }, { status: 400 });
    }

    await redis.set(body.job_id, JSON.stringify(body), { EX: 60 * 60 * 24 }); // Simpan di Redis selama 24 jam
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to store callback" },
      { status: 500 }
    );
  }
}

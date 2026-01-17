import { NextResponse } from 'next/server';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const apiKey = process.env.CLOUDINARY_API_KEY as string;
const apiSecret = process.env.CLOUDINARY_API_SECRET as string;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'image';
    const prefix = url.searchParams.get('prefix') || '';
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/${type}?max_results=50&prefix=${encodeURIComponent(prefix)}`, {
      headers: { Authorization: `Basic ${auth}` },
      cache: 'no-store',
    });
    const json = await res.json();
    if (!res.ok) return NextResponse.json(json, { status: res.status });
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: 'list_failed' }, { status: 500 });
  }
}

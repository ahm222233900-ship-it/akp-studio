import { NextResponse } from 'next/server';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const apiKey = process.env.CLOUDINARY_API_KEY as string;
const apiSecret = process.env.CLOUDINARY_API_SECRET as string;

export async function POST(req: Request) {
  try {
    const { public_id, resource_type = 'image' } = await req.json();
    if (!public_id) return NextResponse.json({ error: 'missing_public_id' }, { status: 400 });
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const form = new URLSearchParams();
    form.set('public_id', public_id);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/destroy`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });
    const json = await res.json();
    if (!res.ok) return NextResponse.json(json, { status: res.status });
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: 'delete_failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import crypto from 'crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const apiKey = process.env.CLOUDINARY_API_KEY as string;
const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

export async function POST(req: Request) {
  if (!cloudName || !apiKey || !apiSecret || !uploadPreset) {
    return NextResponse.json({ error: 'env_missing' }, { status: 500 });
  }
  const body = await req.json();
  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string> = {
    timestamp: String(timestamp),
    upload_preset: uploadPreset,
  };
  if (body.folder) params.folder = body.folder;
  if (body.tags && Array.isArray(body.tags)) params.tags = body.tags.join(',');
  if (body.context && typeof body.context === 'object') {
    const ctx = Object.entries(body.context)
      .map(([k, v]) => `${k}=${String(v)}`)
      .join('|');
    if (ctx) params.context = ctx;
  }
  if (body.resource_type === 'video') params.resource_type = 'video';
  if (body.categorization) params.categorization = body.categorization;
  if (body.auto_tagging) params.auto_tagging = String(body.auto_tagging);
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  const signature = crypto
    .createHash('sha1')
    .update(toSign + apiSecret)
    .digest('hex');
  return NextResponse.json({
    cloudName,
    apiKey,
    signature,
    timestamp,
    uploadPreset,
    params,
  });
}

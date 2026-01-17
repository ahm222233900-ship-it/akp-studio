'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UploadsPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const onUpload = async () => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok && json.url) {
        urls.push(json.url as string);
      }
    }
    setResults((prev) => [...prev, ...urls]);
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl md:text-3xl font-serif mb-6">Uploads</h1>
        <div className="flex items-center gap-4 mb-8">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onSelect}
            className="text-white"
          />
          <button
            onClick={onUpload}
            disabled={uploading || !files || files.length === 0}
            className="px-6 py-2 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:text-[#d9c78a] disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((url) => (
              <div key={url} className="relative w-full aspect-[4/3] border border-white/10 rounded">
                <Image src={url} alt={url} fill className="object-cover rounded" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1">
                  {url}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

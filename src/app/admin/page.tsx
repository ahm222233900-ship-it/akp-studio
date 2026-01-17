'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

type UploadItem = {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  url?: string;
  public_id?: string;
  resource_type?: 'image' | 'video';
};

export default function AdminDashboard() {
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [simplePreview, setSimplePreview] = useState<{ url: string } | null>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  type CloudinaryResource = {
    public_id: string;
    secure_url: string;
    context?: { title?: string };
    resource_type?: 'image' | 'video';
  };
  const [gallery, setGallery] = useState<CloudinaryResource[]>([]);
  const [filterType, setFilterType] = useState<'image' | 'video'>('image');
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = useMemo(() => {
    const base = [];
    if (category) base.push(category);
    if (clientName) base.push(clientName.replace(/\s+/g, '_'));
    return base;
  }, [clientName, category]);

  const context = useMemo(() => {
    const ctx: Record<string, string> = {};
    if (clientName) ctx.client = clientName;
    if (eventDate) ctx.date = eventDate;
    if (category) ctx.category = category;
    return ctx;
  }, [clientName, eventDate, category]);

  const loadGallery = async (type: 'image' | 'video') => {
    const res = await fetch(`/api/cloudinary/list?type=${type}`);
    const json = await res.json();
    if (res.ok && Array.isArray(json.resources)) setGallery(json.resources);
  };

  const pickFiles = () => inputRef.current?.click();

  const onChooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const next: UploadItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      next.push({ file: f, progress: 0, status: 'pending' });
    }
    setItems((prev) => [...prev, ...next]);
    e.target.value = '';
  };

  const signParams = async (resource_type: 'image' | 'video') => {
    const res = await fetch('/api/cloudinary/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        folder: 'akp_studio',
        tags,
        context,
        resource_type,
        categorization: 'google_tagging',
        auto_tagging: 0.6,
      }),
    });
    return await res.json();
  };

  const uploadOne = async (idx: number) => {
    const item = items[idx];
    if (!item) return;
    const resourceType: 'image' | 'video' = item.file.type.startsWith('video') ? 'video' : 'image';
    setItems((prev) => {
      const cp = [...prev];
      cp[idx] = { ...cp[idx], status: 'uploading', resource_type: resourceType, progress: 0 };
      return cp;
    });
    const sig = await signParams(resourceType);
    const cloudName = sig.cloudName;
    const apiKey = sig.apiKey;
    const timestamp = sig.timestamp;
    const signature = sig.signature;
    const uploadPreset = sig.uploadPreset;
    const form = new FormData();
    form.append('file', item.file);
    form.append('api_key', apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('upload_preset', uploadPreset);
    if (sig.params.folder) form.append('folder', sig.params.folder);
    if (sig.params.tags) form.append('tags', sig.params.tags);
    if (sig.params.context) form.append('context', sig.params.context);
    if (sig.params.categorization) form.append('categorization', sig.params.categorization);
    if (sig.params.auto_tagging) form.append('auto_tagging', String(sig.params.auto_tagging));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          const p = Math.round((evt.loaded / evt.total) * 100);
          setItems((prev) => {
            const cp = [...prev];
            cp[idx] = { ...cp[idx], progress: p };
            return cp;
          });
        }
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            const json = JSON.parse(xhr.responseText);
            setItems((prev) => {
              const cp = [...prev];
              cp[idx] = {
                ...cp[idx],
                status: 'done',
                url: json.secure_url,
                public_id: json.public_id,
              };
              return cp;
            });
            resolve();
            loadGallery(filterType);
          } else {
            setItems((prev) => {
              const cp = [...prev];
              cp[idx] = { ...cp[idx], status: 'error' };
              return cp;
            });
            resolve();
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(form);
    });
  };

  const uploadAll = async () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].status === 'pending') await uploadOne(i);
    }
  };

  const copyLink = (url: string) => navigator.clipboard.writeText(url);

  const posterUrl = (publicId: string) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    return `https://res.cloudinary.com/${cloudName}/video/upload/so_2/e_blur:200/f_jpg/${publicId}.jpg`;
  };

  const deleteItem = async (public_id: string, resource_type: 'image' | 'video') => {
    const res = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id, resource_type }),
    });
    if (res.ok) loadGallery(filterType);
  };

  const updateItem = async (public_id: string, title: string) => {
    await fetch('/api/cloudinary/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id, resource_type: filterType, context: { title } }),
    });
    loadGallery(filterType);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project Title" className="px-4 py-2 bg.white/5 border border-white/10 rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded">
            <option value="">Select Category</option>
            <option value="Films">Films</option>
            <option value="Stills">Stills</option>
          </select>
          <div className="flex items-center">
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{
                folder: 'akp_studio',
                tags: [category || 'General', projectTitle ? projectTitle.replace(/\s+/g, '_') : 'Untitled'],
                context: { title: projectTitle || '', category: category || '' },
                sources: ['local', 'url', 'camera'],
              }}
              onUpload={(result) => {
                const info = result?.info as { secure_url?: string } | undefined;
                if (info?.secure_url) setSimplePreview({ url: info.secure_url });
              }}
            >
              {({ open }) => (
                <button onClick={() => open()} className="px-6 py-2 border border-white/20 rounded-full uppercase tracking-widest">Upload</button>
              )}
            </CldUploadWidget>
          </div>
        </div>
        {simplePreview && (
          <div className="mb-10">
            <div className="relative w-full max-w-xl aspect-[4/3] mx-auto border border-white/10 rounded">
              <Image src={simplePreview.url} alt={projectTitle || 'Uploaded'} fill className="object-cover rounded" />
            </div>
            <div className="mt-3 text-center text-sm">{simplePreview.url}</div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" className="px-4 py-2 bg-white/5 border border-white/10 rounded" />
          <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="Event Date" className="px-4 py-2 bg-white/5 border border-white/10 rounded" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="px-4 py-2 bg-white/5 border border-white/10 rounded" />
        </div>
        <div className="mb-6 flex items-center gap-4">
          <button onClick={pickFiles} className="px-6 py-2 border border-white/20 rounded-full uppercase tracking-widest">Choose Files</button>
          <button onClick={uploadAll} className="px-6 py-2 border border-white/20 rounded-full uppercase tracking-widest">Upload</button>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={onChooseFiles} />
        </div>
        {items.length > 0 && (
          <div className="space-y-4 mb-12">
            {items.map((it, i) => (
              <div key={i} className="border border-white/10 rounded p-4 flex items-center gap-4">
                <div className="w-24 h-16 relative bg-white/5 rounded overflow-hidden">
                  {it.status !== 'pending' && it.url ? (
                    <Image src={it.resource_type === 'video' && it.public_id ? posterUrl(it.public_id) : it.url} alt="" fill className="object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded">
                    <div className="h-2 bg-white rounded" style={{ width: `${it.progress}%` }} />
                  </div>
                  <div className="mt-2 text-sm">
                    {it.status === 'done' && it.url ? (
                      <button onClick={() => copyLink(it.url!)} className="text-white/80 hover:text-[#d9c78a]">Copy Link</button>
                    ) : (
                      <span className="text-white/60">{it.status}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif">Manage Gallery</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFilterType('image');
                loadGallery('image');
              }}
              className={`px-4 py-2 rounded ${filterType === 'image' ? 'bg-white text-black' : 'border border-white/20'}`}
            >
              Images
            </button>
            <button
              onClick={() => {
                setFilterType('video');
                loadGallery('video');
              }}
              className={`px-4 py-2 rounded ${filterType === 'video' ? 'bg-white text-black' : 'border border-white/20'}`}
            >
              Videos
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((res) => (
            <div key={res.public_id} className="border border-white/10 rounded p-3">
              <div className="relative w-full aspect-[4/3]">
                {filterType === 'video' ? (
                  <Image src={posterUrl(res.public_id)} alt="" fill className="object-cover rounded" />
                ) : (
                  <Image src={res.secure_url} alt="" fill className="object-cover rounded" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button onClick={() => deleteItem(res.public_id, filterType)} className="text-red-400">Delete</button>
                <input
                  defaultValue={res.context?.title || ''}
                  onBlur={(e) => updateItem(res.public_id, e.target.value)}
                  placeholder="Title"
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FloatingSidebar from '../../../components/FloatingSidebar';
import { DASHBOARD_BG_URL } from '../../../constants/assets';

const sectorData = {
  sanitation: {
    title: 'Sanitation & Waste Management',
    category: 'Sanitation & Garbage',
    defaultOrg: 'Bhopal Municipal Corporation - Sanitation Division',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Garbage accumulation near Square 3, uncollected waste for 3 days...',
  },
  infrastructure: {
    title: 'Roads & Infrastructure',
    category: 'Roads & Potholes',
    defaultOrg: 'Public Works Department (PWD)',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Deep pothole causing traffic hazards near Main Market road...',
  },
  electricity: {
    title: 'Electricity & Street Lighting',
    category: 'Streetlights & Electricity',
    defaultOrg: 'State Electricity Distribution Board',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Non-functioning streetlights along Sector B residential lane...',
  },
  water: {
    title: 'Water Supply & Sewage',
    category: 'Water Supply & Leaks',
    defaultOrg: 'Jal Nigam / Municipal Water Works',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Main pipeline leak causing water logging and low pressure...',
  },
  healthcare: {
    title: 'Healthcare & Environment',
    category: 'Healthcare & Pollution',
    defaultOrg: 'Chief Medical & Health Office (CMHO)',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Industrial smoke emission or hygiene issues in public clinic...',
  },
  transit: {
    title: 'Public Transit & Safety',
    category: 'Transit & Emergency',
    defaultOrg: 'City Transport & Traffic Authority',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop',
    placeholder: 'e.g. Broken bus shelter seat or missing safety signage...',
  },
};

export default function SectorReportPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const sectorKey = resolvedParams.sector?.toLowerCase() || 'sanitation';
  const config = sectorData[sectorKey] || sectorData.sanitation;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    organization: config.defaultOrg,
    description: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    // Save or read user email for history tracking
    const userEmail = form.email || localStorage.getItem('userEmail') || 'user@civicfix.com';
    localStorage.setItem('userEmail', userEmail);

    try {
      const payload = {
        category: config.category,
        location: form.location,
        organization: form.organization,
        fullName: form.fullName,
        phone: form.phone,
        description: form.description,
        imageUrl: form.imageUrl,
        userEmail: userEmail,
      };

      // Uses live Vercel config URL or falls back to localhost for local testing
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const res = await fetch(`${API_URL}/api/issues/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: '✅ Complaint registered in database & official email dispatched to authorities!',
        });
        setTimeout(() => {
          router.push('/history');
        }, 2000);
      } else {
        setStatusMessage({
          type: 'error',
          text: `❌ ${data.error || 'Failed to submit grievance. Please try again.'}`,
        });
      }
    } catch (err) {
      console.error('Network Error:', err);
      setStatusMessage({
        type: 'error',
        text: '❌ Unable to connect to backend server. Ensure Express backend is online.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed font-sans text-slate-100"
      style={{ backgroundImage: `url('${DASHBOARD_BG_URL}')` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <FloatingSidebar />

      <div className="relative z-10 flex min-h-screen flex-col pl-16 md:pl-20">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl md:px-12">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-black tracking-tight text-white">
              Civic<span className="text-blue-400">Fix</span>
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white hover:text-black"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Form Main Area */}
        <main className="mx-auto w-full max-w-4xl px-6 py-10 md:px-12">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-black/50 backdrop-blur-xl shadow-2xl">
            {/* Header Image Overlay */}
            <div
              className="relative h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${config.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  {config.category}
                </span>
                <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Report {config.title} Issue
                </h1>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-10 space-y-6">
              {statusMessage.text && (
                <div
                  className={`rounded-xl border p-4 text-xs font-medium ${
                    statusMessage.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-red-500/30 bg-red-500/10 text-red-300'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Complainant Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address (For History Sync) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Target Municipal Authority
                    </label>
                    <input
                      type="text"
                      required
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Exact Location / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near City Hospital Gate 2, MP Nagar"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Photo Evidence URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Detailed Problem Description *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder={config.placeholder}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/20 bg-white py-3 text-xs font-bold text-black transition hover:bg-slate-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'Saving & Dispatching Email...' : 'Submit Grievance & Dispatch Email >'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
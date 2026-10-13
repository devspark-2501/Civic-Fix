'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DASHBOARD_BG_URL } from '../../constants/assets';

export default function DashboardPage() {
  const [issues, setIssues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Service sector cards with custom Unsplash photography
  const services = [
    {
      title: 'Sanitation & Waste',
      category: 'Sanitation & Garbage',
      desc: 'Garbage dumps, unhygienic spots, and missed doorstep collection.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Roads & Infrastructure',
      category: 'Roads & Potholes',
      desc: 'Damaged roads, hazardous potholes, and broken street pavements.',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Electricity & Lighting',
      category: 'Streetlights & Electricity',
      desc: 'Flickering streetlights, dangling wires, and local power issues.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Water Supply & Sewage',
      category: 'Water Supply & Leaks',
      desc: 'Pipe bursts, contaminated water, and drainage overflow.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Healthcare & Environment',
      category: 'Healthcare & Pollution',
      desc: 'Air & noise pollution, hospital hygiene, and public health risks.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Public Transit & Safety',
      category: 'Transit & Emergency',
      desc: 'Bus stop maintenance, railway amenities, and safety hazards.',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/issues')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setIssues(data);
      })
      .catch((err) => console.error('Failed to load issues:', err));
  }, []);

  const filteredIssues =
    selectedCategory === 'All'
      ? issues
      : issues.filter((item) => item.category === selectedCategory);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed font-sans text-slate-100"
      style={{ backgroundImage: `url('${DASHBOARD_BG_URL}')` }}
    >
      {/* Dark Overlay Filter */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Main Page Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header Bar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl md:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tight text-white">
              Civic<span className="text-blue-400">Fix</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-slate-300 sm:inline-block">
                Authority Network: <strong className="text-emerald-400">Connected</strong>
              </span>
              <Link
                href="/"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-black active:scale-95"
              >
                Log Out
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Body Content */}
        <main className="mx-auto w-full max-w-7xl space-y-12 px-6 py-10 md:px-12">
          
          {/* Welcome Banner Card */}
          <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-8 backdrop-blur-md md:p-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300">
                Municipal Grievance Portal
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Real-Time Civic Care & Resolution
              </h1>
              <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                Inspect local infrastructure categories, view active reported issues, and track municipal updates synced directly from our backend database.
              </p>
            </div>
          </section>

          {/* Section 1: Services Grid */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Public Sectors & Services
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Select a sector to browse category grievances.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCategory(service.category)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-2xl"
                >
                  <div
                    className="h-40 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  <div className="relative -mt-10 p-5 space-y-1.5">
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-blue-400">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Live Database Feed */}
          <section className="space-y-6 border-t border-white/15 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Live Resolved & Active Reports
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  Grievances saved in MongoDB database.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  'All',
                  'Sanitation & Garbage',
                  'Roads & Potholes',
                  'Streetlights & Electricity',
                  'Water Supply & Leaks',
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 bg-black/40 text-slate-300 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Reports List */}
            {filteredIssues.length === 0 ? (
              <div className="rounded-2xl border border-white/15 bg-black/30 p-10 text-center text-slate-400 backdrop-blur-md">
                <p className="text-xs">No active reports found for this sector category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue._id || issue.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md transition hover:border-white/30"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-300">
                          {issue.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-white">
                        {issue.location}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {issue.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                      <span>
                        Target Org: <strong className="text-slate-200">{issue.organization}</strong>
                      </span>
                      <span className="rounded border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-300">
                        {issue.status || 'Emailed & Saved'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}
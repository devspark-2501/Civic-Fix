'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [issues, setIssues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Service categories with high-quality background imagery
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

  // Fetch live reports from backend database on load
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Top Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Civic<span className="text-blue-500">Fix</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-slate-400 sm:inline-block">
              Connected Authority Network: <strong className="text-emerald-400">Active</strong>
            </span>
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              Log Out
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12 space-y-16">
        
        {/* Banner Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 md:p-14 backdrop-blur-md">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-400 border border-blue-500/20 mb-4">
              Citizen Support Network
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Building Cleaner & Safer Communities Together
            </h1>
            <p className="mt-4 text-sm text-slate-300 md:text-base leading-relaxed">
              Explore municipal departments, inspect live city grievance records, and stay updated on ongoing infrastructure fixes directly managed by local authorities.
            </p>
          </div>
        </section>

        {/* Section 1: Services & Categories Grid */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Public Service Sectors
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Automated routing directly dispatches complaints to designated government & municipal emails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCategory(service.category)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Background Card Image */}
                <div
                  className="h-44 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

                {/* Card Text Content */}
                <div className="relative p-6 -mt-12 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
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

        {/* Section 2: Live Database Reports Stream */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Live Resolved & Active Reports
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Real-time grievances synced directly from MongoDB.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Sanitation & Garbage', 'Roads & Potholes', 'Streetlights & Electricity', 'Water Supply & Leaks'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Issues Feed Grid */}
          {filteredIssues.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-12 text-center text-slate-400">
              <p className="text-sm">No complaints found for the selected category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIssues.map((issue) => (
                <div
                  key={issue._id || issue.id}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition hover:border-slate-700"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                        {issue.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100">
                      {issue.location}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                    <span>
                      Authority: <strong className="text-slate-200">{issue.organization}</strong>
                    </span>
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-medium text-emerald-400">
                      {issue.status || 'Emailed & Logged'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
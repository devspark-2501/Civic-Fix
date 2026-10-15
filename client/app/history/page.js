'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingSidebar from '../../components/FloatingSidebar';
import { DASHBOARD_BG_URL } from '../../constants/assets';

export default function HistoryPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail') || '';
    const url = userEmail 
      ? `http://localhost:5000/api/issues?email=${encodeURIComponent(userEmail)}`
      : 'http://localhost:5000/api/issues';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setIssues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load history:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed font-sans text-slate-100"
      style={{ backgroundImage: `url('${DASHBOARD_BG_URL}')` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <FloatingSidebar />

      <div className="relative z-10 flex min-h-screen flex-col pl-16 md:pl-20">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl md:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
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

        <main className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10 md:px-12">
          <div className="rounded-3xl border border-white/15 bg-black/40 p-8 backdrop-blur-md">
            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300">
              Audit & Tracking
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
              Your Registered Grievance History
            </h1>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">
              Review all complaints you have submitted to municipal authorities along with their current status.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-xs">Loading your history records...</div>
          ) : issues.length === 0 ? (
            <div className="rounded-2xl border border-white/15 bg-black/30 p-12 text-center text-slate-400 backdrop-blur-md">
              <p className="text-sm">You have not registered any complaints yet.</p>
              <Link
                href="/dashboard"
                className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-slate-200"
              >
                File Your First Complaint →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-md transition hover:border-white/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                        {issue.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      📍 {issue.location}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {issue.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400 gap-2">
                    <span>
                      Authority: <strong className="text-slate-200">{issue.organization}</strong>
                    </span>
                    <span className="rounded border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300 text-center">
                      {issue.status || 'Dispatched & Saved'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
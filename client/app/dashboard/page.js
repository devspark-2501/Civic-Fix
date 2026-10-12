'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({
    category: 'Sanitation & Garbage',
    location: '',
    organization: 'Bhopal Nagar Nigam',
    description: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch issues from backend on load
  useEffect(() => {
    fetch('http://localhost:5000/api/issues')
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error('Failed to load issues', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/issues/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setIssues([data.issue, ...issues]);
        setMessage('✅ Complaint saved in MongoDB & email sent to authority!');
        setForm({
          category: 'Sanitation & Garbage',
          location: '',
          organization: 'Bhopal Nagar Nigam',
          description: '',
          imageUrl: '',
        });
      } else {
        setMessage(`❌ ${data.error || 'Failed to submit issue'}`);
      }
    } catch (err) {
      setMessage('❌ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Civic<span className="text-blue-500">Fix</span> Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Report local grievances directly to municipal bodies and track fixes in real time.
          </p>
        </div>
        <Link
          href="/"
          className="self-start md:self-auto px-4 py-2 text-xs font-semibold rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 transition"
        >
          Logout
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Form */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Report a New Problem</h2>

          {message && (
            <p className="mb-4 text-xs p-3 rounded bg-slate-800 border border-slate-700 text-slate-200">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option>Sanitation & Garbage</option>
                <option>Roads & Potholes</option>
                <option>Streetlights & Electricity</option>
                <option>Water Supply & Leaks</option>
                <option>Parks & Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Authority</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location Details / Landmark</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="e.g. Near MP Nagar Zone 1 Square"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Photo URL (Optional)</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="Describe the issue clearly..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50"
            >
              {loading ? 'Saving & Emailing...' : 'Submit & Email Authority'}
            </button>
          </form>
        </div>

        {/* Live Database Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">Live Database Complaints Feed</h2>

          {issues.length === 0 ? (
            <p className="text-slate-400 text-sm">No complaints recorded yet. Be the first to report one!</p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {issue.category}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="font-semibold text-slate-100 text-base mb-1">{issue.location}</h3>
                <p className="text-slate-300 text-sm mb-3">{issue.description}</p>

                <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-400">
                  <span>Org: <strong className="text-slate-200">{issue.organization}</strong></span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {issue.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
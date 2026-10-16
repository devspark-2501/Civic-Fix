'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DASHBOARD_BG_URL } from '../../constants/assets';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Reads NEXT_PUBLIC_API_URL from Vercel config, or falls back to localhost for local dev
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user email in localStorage for cross-page session reference
        if (data.email) {
          localStorage.setItem('userEmail', data.email);
        } else {
          localStorage.setItem('userEmail', email);
        }

        router.push('/dashboard');
      } else {
        setErrorMessage(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setErrorMessage('Unable to connect to the backend server. Please verify your Express backend is live.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed font-sans text-slate-100 flex items-center justify-center p-4"
      style={{ backgroundImage: `url('${DASHBOARD_BG_URL}')` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-black/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 text-center">
          <Link href="/" className="text-3xl font-black tracking-tight text-white">
            Civic<span className="text-blue-400">Fix</span>
          </Link>
          <p className="mt-2 text-xs text-slate-400">
            Log in to manage civic reports, check updates, and stay connected with your local council.
          </p>
        </div>

        <h2 className="mb-6 text-xl font-bold text-white">Log In</h2>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. devspark2501@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-white transition"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-white/20 bg-white px-6 py-2.5 text-xs font-bold text-black transition hover:bg-slate-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log In >'}
            </button>

            <Link
              href="/register"
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition"
            >
              Need An Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
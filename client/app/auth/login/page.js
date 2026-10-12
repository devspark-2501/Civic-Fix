'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BRIDGE_IMAGE_URL } from '../../../constants/assets';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
      } else {
        setErrorMessage(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Network Error:', err);
      setErrorMessage(
        'Unable to connect to the backend server. Please verify your Express server is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: `url('${BRIDGE_IMAGE_URL}')` }}
    >
      {/* Background Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 grid min-h-[500px] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl md:grid-cols-2">
        
        {/* Left Side Section */}
        <div className="flex flex-col justify-center border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome Back!
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            Log in to manage your active civic reports, check municipal response status, and stay updated on local progress.
          </p>
        </div>

        {/* Right Side Form Section */}
        <div className="flex flex-col justify-center bg-black/40 p-8 backdrop-blur-xl md:p-12">
          <h3 className="mb-8 text-2xl font-semibold tracking-wide text-white">
            Log In
          </h3>

          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative border-b border-gray-500 pb-2 focus-within:border-white">
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent pr-8 text-sm text-white placeholder-gray-400 outline-none focus:ring-0"
              />
            </div>

            <div className="relative border-b border-gray-500 pb-2 focus-within:border-white">
              <input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent pr-8 text-sm text-white placeholder-gray-400 outline-none focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full border border-gray-400 bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white hover:text-black active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In >'}
              </button>

              <Link
                href="/auth/signup"
                className="text-xs text-gray-300 underline hover:text-white"
              >
                Need An Account?
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
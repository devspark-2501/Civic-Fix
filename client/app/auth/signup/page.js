'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BRIDGE_IMAGE_URL } from '@/constants/assets';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) return alert('Please agree to terms and conditions.');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: `url('${BRIDGE_IMAGE_URL}')` }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 grid min-h-[550px] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl md:grid-cols-2">
        
        {/* Left Info Box */}
        <div className="flex flex-col justify-center border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Don&apos;t Have An Account?
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            Register to access all the features of CivicFix. Report local issues and track resolutions in real time. It&apos;s free!
          </p>
        </div>

        {/* Right Glass Form */}
        <div className="flex flex-col justify-center bg-black/40 p-8 backdrop-blur-xl md:p-12">
          <h3 className="mb-8 text-2xl font-semibold tracking-wide text-white">
            Sign Up
          </h3>

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
                type="text"
                placeholder="Username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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

            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <input
                type="checkbox"
                id="terms"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="rounded border-gray-500 bg-transparent text-blue-500 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I Agree To <span className="font-semibold text-white">Terms</span> And <span className="font-semibold text-white">Conditions</span> Of Service
              </label>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full border border-gray-400 bg-white/10 px-6 py-2 text-sm text-white transition hover:bg-white hover:text-black active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Sign Up >'}
              </button>

              <Link
                href="/auth/login"
                className="text-xs text-gray-300 underline hover:text-white"
              >
                Have An Account?
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
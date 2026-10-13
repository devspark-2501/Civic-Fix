'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingSidebar() {
  const [active, setActive] = useState('dashboard');

  return (
    <aside className="fixed left-6 top-1/2 z-50 -translate-y-1/2">
      {/* Floating White Pill Container */}
      <div className="flex flex-col items-center gap-4 rounded-full bg-white/90 p-3 shadow-2xl backdrop-blur-md border border-white/40">
        
        {/* 1. Dashboard / Grid Icon */}
        <button
          onClick={() => setActive('dashboard')}
          title="Dashboard"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
            active === 'dashboard'
              ? 'bg-slate-950 text-white shadow-md scale-105'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>

        {/* 2. Complaints / Check-Box Icon */}
        <button
          onClick={() => setActive('complaints')}
          title="Complaints & Status"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
            active === 'complaints'
              ? 'bg-slate-950 text-white shadow-md scale-105'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* 3. Logout / Exit Icon */}
        <Link
          href="/"
          title="Logout"
          className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Link>

      </div>
    </aside>
  );
}
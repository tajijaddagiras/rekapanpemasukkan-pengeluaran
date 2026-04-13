"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile, UserProfile } from '@/lib/services/userService';

export const Header = () => {
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prof = await getUserProfile(user.uid);
        setProfile(prof);
      }
    });
    return () => unsub();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  return (
    <header className="h-20 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div>
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {pathname === '/membership/dashboard' ? 'Overview' : 'Reporting'}
        </h2>
        <h1 className="text-xl font-black text-slate-900">
          {{
            '/membership/dashboard': 'Monthly Dashboard',
            '/membership/annual': 'Annual Dashboard',
            '/membership/investment': 'Investment Dashboard',
            '/membership/cards': 'My Cards Dashboard',
            '/membership/transactions/input': 'Daily Transaction Input',
            '/membership/under-development': 'Halaman Sedang Dikembangkan'
          }[pathname] || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 group cursor-pointer hover:bg-white hover:shadow-sm transition-all duration-300">
          <div className="flex flex-col text-right">
            <span className="text-xs font-black text-slate-900 line-clamp-1">{profile?.name || 'Loading...'}</span>
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{profile?.role || 'User'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-white shadow-md flex items-center justify-center text-xs font-black text-white transform group-hover:scale-110 transition-transform">
            {profile ? getInitials(profile.name) : '??'}
          </div>
        </div>
      </div>
    </header>
  );
};

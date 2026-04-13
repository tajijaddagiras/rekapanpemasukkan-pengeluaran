"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Calendar, 
  LayoutDashboard, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const menuItems = [
  { icon: LayoutDashboard, label: 'Bulanan', href: '/membership/dashboard' },
  { icon: Calendar, label: 'Tahunan', href: '/membership/annual' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col fixed h-screen z-40">
      <div className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
            <BarChart3 size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">FinLabs</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 group relative",
                  isActive 
                    ? "text-indigo-600 bg-white shadow-sm font-bold border border-slate-100" 
                    : "text-slate-500 hover:text-indigo-600 hover:bg-slate-100/50"
                )}
              >
                {/* Indicator always exists but hidden when not active */}
                <div className={cn(
                  "absolute left-[-2px] w-1.5 h-6 bg-indigo-600 rounded-full transition-all duration-300 transform origin-left",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )} />
                
                <item.icon size={20} className={isActive ? "text-indigo-600" : "group-hover:text-indigo-600 transition-colors"} />
                <span className="text-sm">{item.label}</span>
                <ChevronRight size={14} className={cn("ml-auto transition-all", isActive ? "opacity-50 translate-x-0" : "opacity-0 -translate-x-2")} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-indigo-500 mb-1 uppercase tracking-wider">Plan</p>
          <p className="text-sm font-extrabold text-slate-900">Pro Member</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-indigo-600 h-1.5 rounded-full w-3/4" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">75% usage of monthly limit</p>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Bot,
  PlusCircle,
  PieChart,
  Banknote,
  Briefcase,
  Wallet,
  ArrowUpDown,
  UserCircle,
  User,
  Settings,
  Target,
  Repeat,
  Globe,
  Headphones,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const menuGroups = [
  {
    label: 'Utama',
    items: [
      { icon: LayoutDashboard, label: 'Bulanan', href: '/membership/dashboard' },
      { icon: Calendar, label: 'Tahunan', href: '/membership/annual' },
    ]
  },
  {
    label: 'Investasi',
    items: [
      { icon: TrendingUp, label: 'Dashboard Investasi', href: '/membership/investment' },
      { icon: Briefcase, label: 'Investasi Saham', href: '/membership/investasi/saham' },
      { icon: Banknote, label: 'Deposito', href: '/membership/investasi/deposito' },
      { icon: PieChart, label: 'Investasi Lainnya', href: '/membership/investasi/lainnya' },
      { icon: Globe, label: 'Data Pasar', href: '/membership/market-data' },
    ]
  },
  {
    label: 'Transaksi',
    items: [
      { icon: PlusCircle, label: 'Input Transaksi', href: '/membership/transactions/input' },
      { icon: ArrowUpDown, label: 'Transaksi Harian', href: '/membership/transactions/daily' },
      { icon: ArrowUpDown, label: 'Top Up & Transfer', href: '/membership/transactions/topup' },
      { icon: Repeat, label: 'Recurring', href: '/membership/recurring' },
    ]
  },
  {
    label: 'Perencanaan',
    items: [
      { icon: Wallet, label: 'Tabungan', href: '/membership/tabungan' },
      { icon: Target, label: 'Budget & Target', href: '/membership/budget' },
      { icon: Banknote, label: 'Hutang & Piutang', href: '/membership/transactions/debt' },
    ]
  },
  {
    label: 'Akun & Profil',
    items: [
      { icon: User, label: 'Profil', href: '/membership/profile' },
      { icon: Settings, label: 'Rekening', href: '/membership/rekening' },
      { icon: UserCircle, label: 'Nama Akun', href: '/membership/nama-akun' },
      { icon: CreditCard, label: 'Kartu Saya', href: '/membership/cards' },
    ]
  },
  {
    label: 'Lainnya',
    items: [
      { icon: Bot, label: 'AI Leosiqra', href: '/membership/ai-leosiqra' },
      { icon: Headphones, label: 'Hubungi Kami', href: '/membership/contact' },
    ]
  }
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openGroups, setOpenGroups] = useState<string[]>(['Utama']);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const isItemActive = (item: { label: string; href: string }) => {
    return pathname === item.href;
  };

  const toggleGroup = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label)
        ? prev.filter(g => g !== label)
        : [...prev, label]
    );
  };

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
      {/* Header / Logo */}
      <div className="p-8 pb-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-6 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
            <BarChart3 size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Leosiqra</span>
        </Link>
      </div>

      {/* Navigation - Scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 custom-scrollbar">
        {menuGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          return (
            <div key={group.label} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hover:text-slate-600 transition-colors"
              >
                {group.label}
                {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>

              {isOpen && (
                <div className="space-y-1 mt-1 transition-all duration-300">
                  {group.items.map((item) => {
                    return (
                      <Link
                        key={item.label + item.href}
                        href={item.href}
                        onClick={() => setSelectedItem(item.label)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                          isItemActive(item)
                            ? "text-indigo-600 font-bold"
                            : "text-slate-500 hover:text-indigo-600 hover:bg-slate-100/50"
                        )}
                      >
                        <item.icon size={18} className={cn(
                          "transition-colors",
                          isItemActive(item) ? "text-indigo-600" : "group-hover:text-indigo-600"
                        )} />
                        <span className="text-[13px]">{item.label}</span>
                        {isItemActive(item) && (
                          <div className="absolute left-0 w-1 h-4 bg-indigo-600 rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer / User Info */}
      <div className="p-6 mt-auto border-t border-slate-200 bg-white/50 shrink-0 space-y-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-indigo-500 mb-1 uppercase tracking-wider">Plan</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-slate-900">Pro Member</p>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-indigo-600 h-1.5 rounded-full w-3/4 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </aside>
  );
};

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile, UserProfile } from '@/lib/services/userService';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
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
    <header className="fixed top-0 right-0 left-0 lg:left-72 h-20 border-b border-slate-200 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Menu size={22} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">
            {pathname === '/membership/dashboard' ? 'Overview' : 'Reporting'}
          </h2>
          <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none truncate max-w-[150px] xs:max-w-[200px] md:max-w-none">
            {{
              '/membership/dashboard': 'Monthly Dashboard',
              '/membership/annual': 'Annual Dashboard',
              '/membership/investment': 'Investment Dashboard',
              '/membership/cards': 'My Cards Dashboard',
              '/membership/transactions/input': 'Daily Transaction Input',
              '/membership/transactions/daily': 'Daily Transaction Log',
              '/membership/investasi/saham': 'Stock Investment Portfolio',
              '/membership/investasi/deposito': 'Time Deposits Portfolio',
              '/membership/investasi/lainnya': 'Other Investments',
              '/membership/tabungan': 'Savings Goals & Balance',
              '/membership/transactions/topup': 'Top Up & Transfer History',
              '/membership/transactions/debt': 'Debt & Receivables tracking',
              '/membership/rekening': 'Manage Accounts & Initial Balance',
              '/membership/nama-akun': 'Account Ledger Strategy',
              '/membership/budget': 'Fiscal Strategy & Budgeting',
              '/membership/recurring': 'Recurring Transactions Automation',
              '/membership/contact': 'Pro Activation & Payment Confirmation',
              '/membership/profile': 'User Identity & Preferences',
              '/membership/ai-leosiqra': 'Ethereal Portfolio Intelligence',
              '/membership/market-data': 'Global Market Intelligence Dashboard'
            }[pathname] || 'Dashboard'}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 md:gap-4 px-3 md:px-4 py-2 rounded-full bg-slate-50 border border-slate-200 group cursor-pointer hover:bg-white hover:shadow-sm transition-all duration-300">
          <div className="hidden xs:flex flex-col text-right">
            <span className="text-xs font-black text-slate-900 line-clamp-1">{profile?.name || 'Loading...'}</span>
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{profile?.role || 'User'}</span>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 border-2 md:border-4 border-white shadow-md flex items-center justify-center text-[10px] md:text-xs font-black text-white transform group-hover:scale-110 transition-transform">
            {profile ? getInitials(profile.name) : '??'}
          </div>
        </div>
      </div>
    </header>
  );
};

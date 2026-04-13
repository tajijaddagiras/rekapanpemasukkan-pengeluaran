"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  Banknote, 
  BarChart3, 
  PiggyBank,
  Briefcase,
  Plus
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { MetricCard } from '@/components/MetricCard';
import { InsightCard } from '@/components/InsightCard';
import { Button } from '@/components/Button';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { subscribeUserProfile, UserProfile, updateUserProfile } from '@/lib/services/userService';
import { subscribeTransactions, Transaction } from '@/lib/services/transactionService';
import { AddTransactionModal } from '@/components/AddTransactionModal';

type TabType = 'pemasukkan' | 'pengeluaran' | 'investasi' | 'tabungan';

export default function MonthlyDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('pemasukkan');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let unsubTrans: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setUser(usr);
        
        // Subscribe to profile
        unsubProfile = subscribeUserProfile(usr.uid, (prof) => {
          if (prof) {
            setProfile(prof);
          } else {
            const newProfile: Partial<UserProfile> = {
              uid: usr.uid,
              name: usr.displayName || 'User',
              email: usr.email || '',
              role: 'user',
              createdAt: new Date().toISOString(),
              totalWealth: 0,
              totalIncome: 0,
              totalExpenses: 0,
              totalSavings: 0,
              totalInvestment: 0,
              creditCardBills: 0,
              otherDebts: 0,
            };
            updateUserProfile(usr.uid, newProfile);
          }
        });

        // Subscribe to transactions
        unsubTrans = subscribeTransactions(usr.uid, (trans) => {
          setTransactions(trans);
          setLoading(false);
        });
      } else {
        // CLEANUP LISTENERS ON LOGOUT
        if (unsubProfile) unsubProfile();
        if (unsubTrans) unsubTrans();
        unsubProfile = null;
        unsubTrans = null;
        
        router.push('/auth/login');
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubProfile) unsubProfile();
      if (unsubTrans) unsubTrans();
    };
  }, [router]);

  const filteredTransactions = transactions.filter(t => t.type === activeTab);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ringkasan Bulan Ini</h2>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full h-12 px-8 shadow-lg shadow-indigo-100 bg-indigo-600 hover:bg-indigo-700">
          <Plus size={20} className="mr-2" /> Tambah Data
        </Button>
      </div>

      <AddTransactionModal 
        userId={user?.uid} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Kekayaan" value={formatCurrency(profile?.totalWealth || 0)} icon={Wallet} />
        <MetricCard title="Tagihan Kartu Kredit" value={formatCurrency(profile?.creditCardBills || 0)} type="negative" icon={CreditCard} />
        <MetricCard title="Hutang Lainnya" value={formatCurrency(profile?.otherDebts || 0)} type="negative" icon={Banknote} />
        <MetricCard title="Pemasukkan Bulanan" value={formatCurrency(profile?.totalIncome || 0)} type="positive" icon={TrendingUp} />
        <MetricCard title="Pengeluaran Bulanan" value={formatCurrency(profile?.totalExpenses || 0)} type="negative" icon={TrendingDown} />
        <MetricCard title="Tabungan Bulanan" value={formatCurrency(profile?.totalSavings || 0)} type="positive" icon={PiggyBank} />
        <MetricCard title="Investasi Bulanan" value={formatCurrency(profile?.totalInvestment || 0)} type="positive" icon={Briefcase} />
      </div>

      {/* Insight Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard 
          title="Kategori Terbesar" 
          value="Gaji Utama" 
          subtitle="Mei 2026 • 85% Kontribusi" 
          icon={TrendingUp} 
          colorClass="bg-emerald-50 text-emerald-600"
        />
        <InsightCard 
          title="Pos Paling Dominan" 
          value="Sewa Properti" 
          subtitle="55% dari total pengeluaran" 
          icon={TrendingDown} 
          colorClass="bg-rose-50 text-rose-600"
        />
        <InsightCard 
          title="Tabungan Utama" 
          value="Mandiri Digital" 
          subtitle="Saldo aktif terdeteksi" 
          icon={Wallet} 
          colorClass="bg-blue-50 text-blue-600"
        />
        <InsightCard 
          title="Aset Terbesar" 
          value="Logam Mulia" 
          subtitle="Value storage terbaik" 
          icon={BarChart3} 
          colorClass="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Tables Section */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-50 bg-slate-50/50">
          {(['pemasukkan', 'pengeluaran', 'investasi', 'tabungan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all relative",
                activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Item</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Budget</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actual</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Selisih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? filteredTransactions.map((row, i) => {
                const selisih = row.actual - row.budget;
                const isOverBudget = activeTab === 'pengeluaran' ? selisih > 0 : selisih < 0;
                
                return (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-900">{row.item}</td>
                    <td className="px-8 py-5 text-right text-slate-500 font-mono text-sm">{formatCurrency(row.budget)}</td>
                    <td className="px-8 py-5 text-right text-slate-900 font-black font-mono">{formatCurrency(row.actual)}</td>
                    <td className={cn(
                      "px-8 py-5 text-right font-black font-mono",
                      selisih === 0 ? "text-slate-300" :
                      isOverBudget ? "text-rose-500" : "text-emerald-500"
                    )}>
                      {selisih > 0 ? '+' : ''}{formatCurrency(selisih)}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic text-sm">
                    Belum ada data untuk kategori ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

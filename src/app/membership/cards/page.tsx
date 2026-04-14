"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  LineChart, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Building2,
  Smartphone,
  Banknote,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { accountService, Account } from '@/lib/services/accountService';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function MyCardsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const unsubAccRef = useRef<(() => void) | null>(null);
  const unsubTrxRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const qAcc = query(collection(db, 'accounts'), where('userId', '==', u.uid));
        if (unsubAccRef.current) unsubAccRef.current();
        unsubAccRef.current = onSnapshot(qAcc, (snap) => {
          setAccounts(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, balance: Number(d.balance) || 0, createdAt: d.createdAt?.toDate?.() ?? new Date() } as Account;
          }));
        }, (err) => console.error(err));

        const qTrx = query(collection(db, 'transactions'), where('userId', '==', u.uid));
        if (unsubTrxRef.current) unsubTrxRef.current();
        unsubTrxRef.current = onSnapshot(qTrx, (snap) => {
          setTransactions(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, amount: Number(d.amount) || 0, date: d.date?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date() } as Transaction;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });

      } else { setAccounts([]); setTransactions([]); setLoading(false); }
    });
    return () => { 
      unsub(); 
      if (unsubAccRef.current) unsubAccRef.current(); 
      if (unsubTrxRef.current) unsubTrxRef.current(); 
    };
  }, []);

  const totalBalance = useMemo(() => accounts.reduce((s, a) => s + a.balance, 0), [accounts]);
  
  const totalIn = useMemo(() => {
    const trxIn = transactions.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.amount, 0);
    const accIn = accounts.reduce((s, a) => s + (a.initialBalance || 0), 0);
    return trxIn + accIn;
  }, [transactions, accounts]);

  const totalOut = useMemo(() => {
    const trxOut = transactions.filter(t => t.type === 'pengeluaran').reduce((s, t) => s + t.amount, 0);
    const accOut = accounts.filter(a => a.type === 'Credit Card').reduce((s, a) => s + (a.balance || 0), 0);
    // For normal accounts, we don't necessarily count balance as 'Out' unless it's a debt.
    // In the user's CardModal, 'Uang Keluar' is saved to 'balance' for a card.
    return trxOut + accOut;
  }, [transactions, accounts]);

  const creditCardStats = useMemo(() => {
    const ccAccounts = accounts.filter(a => a.type === 'Credit Card');
    const totalLimit = ccAccounts.reduce((s, a) => s + (a.initialBalance || 0), 0);
    const totalBill = ccAccounts.reduce((s, a) => s + (a.balance || 0), 0);
    return {
      totalLimit,
      totalBill,
      remainingLimit: Math.max(0, totalLimit - totalBill)
    };
  }, [accounts]);

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bank Account': return <Building2 size={18} />;
      case 'E-Wallet': return <Smartphone size={18} />;
      case 'Cash': return <Banknote size={18} />;
      case 'Investment Account': return <LineChart size={18} />;
      case 'Credit Card': return <CreditCard size={18} />;
      default: return <Wallet size={18} />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'Bank Account': return 'bg-slate-900 text-white';
      case 'E-Wallet': return 'bg-indigo-50 text-indigo-600';
      case 'Cash': return 'bg-emerald-50 text-emerald-600';
      case 'Investment Account': return 'bg-emerald-50 text-emerald-600';
      case 'Credit Card': return 'bg-rose-50 text-rose-500';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const barData = useMemo(() => {
    const last8 = transactions.slice(0, 8).reverse();
    const max = Math.max(...last8.map(t => t.amount), 1);
    return last8.map(t => Math.round((t.amount / max) * 100));
  }, [transactions]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black text-slate-900 tracking-tight">Kartu Saya</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-1 max-w-lg leading-relaxed">
            Pantau arus kas Anda dan kelola rekening melalui menu 'Tambah Cepat' di header.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl px-6 py-3 shadow-sm text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Saldo</p>
          <p className="text-xs font-black text-slate-900">{formatRp(totalBalance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          <div className="relative overflow-hidden bg-indigo-600 rounded-[20px] md:rounded-[32px] p-6 md:p-10 text-white shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10 md:mb-12">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-indigo-100/60 uppercase tracking-[0.2em] mb-2">Total Saldo Gabungan</p>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight">{formatRp(totalBalance)}</h2>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <CreditCard size={20} className="text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
                <div>
                  <p className="text-[8px] md:text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Total Masuk</p>
                  <p className="text-sm md:text-lg font-bold">{formatRp(totalIn)}</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Total Keluar</p>
                  <p className="text-sm md:text-lg font-bold">{formatRp(totalOut)}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-400 opacity-[0.1] rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="bg-white rounded-[20px] md:rounded-[32px] p-5 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-lg font-black text-slate-900">Arus Kas (Cash Flow)</h3>
              <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 tracking-widest uppercase">
                {transactions.length} transaksi
              </div>
            </div>

            <div className="h-[140px] md:h-[180px] bg-slate-50/50 rounded-2xl p-4 md:p-6 flex items-end justify-between gap-2 md:gap-3 mb-6 md:mb-8 border border-slate-50">
              {barData.length > 0 ? barData.map((h, i) => (
                <div key={i} className={cn("flex-1 rounded-md md:rounded-lg transition-all duration-500", i === barData.length - 1 ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "bg-indigo-200/60")}
                  style={{ height: `${Math.max(h, 5)}%` }} />
              )) : [40, 60, 50, 80, 55, 45].map((h, i) => (
                <div key={i} className="flex-1 rounded-md bg-slate-100" style={{ height: `${h}%` }} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/30 rounded-2xl p-6 border border-emerald-50 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                  <ArrowDownCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uang Masuk</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{formatRp(totalIn)}</p>
                </div>
              </div>
              <div className="bg-rose-50/30 rounded-2xl p-6 border border-rose-50 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
                  <ArrowUpCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uang Keluar</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{formatRp(totalOut)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900">Daftar Akun</h3>
          </div>

          {loading ? (
            <div className="p-6 text-center text-sm text-slate-400">Memuat akun...</div>
          ) : accounts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <EmptyState title="Belum ada rekening" description="Tambah rekening bank melalui menu 'Tambah Cepat' di header." icon={<Wallet size={20} />} />
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((acc) => (
                <div key={acc.id} className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${getTypeBg(acc.type)}`}>
                      {getTypeIcon(acc.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] md:text-sm font-bold text-slate-900 truncate">{acc.name}</p>
                      <p className="text-[9px] md:text-[10px] font-medium text-slate-400">{acc.type} • {acc.currency}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-2">
                    <div>
                      <p className={`text-[12px] md:text-sm font-black ${acc.type === 'Credit Card' ? 'text-rose-500' : 'text-slate-900'}`}>
                        {acc.type === 'Credit Card' ? '-' : ''}{formatRp(acc.balance)}
                      </p>
                    </div>
                    <button onClick={async () => {
                                if (acc.id) {
                                  await accountService.deleteAccount(acc.id);
                                }
                              }}
                      className="p-1.5 rounded-lg bg-slate-50 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Card Limit Kartu Kredit */}
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 mt-4 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <CreditCard size={20} />
                </div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Informasi Limit Kartu</h4>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-50 transition-all hover:bg-slate-50">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Limit Kartu</p>
                   <p className="text-xl font-black text-slate-900 leading-tight">{formatRp(creditCardStats.totalLimit)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-50/30 rounded-2xl p-5 border border-rose-50 transition-all hover:bg-rose-50">
                    <p className="text-[9px] font-black text-rose-300 uppercase tracking-widest mb-1">Tagihan Berjalan</p>
                    <p className="text-base font-black text-rose-500 leading-tight">{formatRp(creditCardStats.totalBill)}</p>
                  </div>
                  <div className="bg-emerald-50/30 rounded-2xl p-5 border border-emerald-50 transition-all hover:bg-emerald-50">
                    <p className="text-[9px] font-black text-emerald-300 uppercase tracking-widest mb-1">Sisa Limit</p>
                    <p className="text-base font-black text-emerald-600 leading-tight">{formatRp(creditCardStats.remainingLimit)}</p>
                  </div>
                </div>
              </div>

              {creditCardStats.totalLimit > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-50">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-60">Penggunaan Limit</span>
                     <span className="text-[10px] font-black text-rose-500">{((creditCardStats.totalBill / creditCardStats.totalLimit) * 100).toFixed(0)}%</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (creditCardStats.totalBill / creditCardStats.totalLimit) * 100)}%` }} />
                   </div>
                </div>
              )}
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-slate-50 rounded-full opacity-50 group-hover:scale-125 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

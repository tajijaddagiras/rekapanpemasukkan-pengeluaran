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
  Plus,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bank Account' as Account['type'],
    currency: 'IDR',
    initialBalance: ''
  });

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

  const handleCreate = async () => {
    if (!user || !formData.name || !formData.initialBalance) return;
    try {
      await accountService.createAccount({
        userId: user.uid, name: formData.name, type: formData.type,
        currency: formData.currency,
        balance: parseFloat(formData.initialBalance),
        initialBalance: parseFloat(formData.initialBalance)
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', type: 'Bank Account', currency: 'IDR', initialBalance: '' });
      // onSnapshot akan update otomatis
    } catch (e) { console.error(e); }
  };

  const totalBalance = useMemo(() => accounts.reduce((s, a) => s + a.balance, 0), [accounts]);
  const totalIn = useMemo(() => transactions.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalOut = useMemo(() => transactions.filter(t => t.type === 'pengeluaran').reduce((s, t) => s + t.amount, 0), [transactions]);

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
            Kelola seluruh aset keuangan dan pantau arus kas Anda dalam satu tampilan.
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
            <button onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline underline-offset-4">
              <Plus size={12} /> Tambah
            </button>
          </div>

          {loading ? (
            <div className="p-6 text-center text-sm text-slate-400">Memuat akun...</div>
          ) : accounts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <EmptyState title="Belum ada rekening" description="Tambah rekening bank atau e-wallet Anda." icon={<Wallet size={20} />} />
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
                                  // onSnapshot handle otomatis
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

          {/* Promo */}
          <div className="bg-slate-100/50 rounded-[20px] md:rounded-3xl p-6 md:p-8 border border-white mt-4">
            <h4 className="text-sm font-black text-slate-900 mb-2">Upgrade Portofolio?</h4>
            <p className="text-[11px] md:text-xs font-medium text-slate-500 mb-6 leading-relaxed">
              Dapatkan akses ke instrumen investasi eksklusif dan laporan bulanan mendalam.
            </p>
            <button className="px-5 py-2.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl hover:bg-indigo-100 transition-colors uppercase tracking-widest">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Rekening Baru" maxWidth="max-w-md">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Rekening</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              placeholder="BCA Tabungan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe Akun</label>
            <select value={formData.type} onChange={e => setFormData(p => ({...p, type: e.target.value as Account['type']}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700">
              {['Bank Account', 'E-Wallet', 'Cash', 'Investment Account', 'Credit Card'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Saldo Awal (Rp)</label>
            <input type="number" value={formData.initialBalance} onChange={e => setFormData(p => ({...p, initialBalance: e.target.value}))}
              placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <button onClick={handleCreate} disabled={!formData.name || !formData.initialBalance}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-4 shadow-xl shadow-slate-200">
            Simpan Rekening
          </button>
        </div>
      </Modal>
    </div>
  );
}

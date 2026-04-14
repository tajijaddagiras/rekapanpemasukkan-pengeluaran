"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  PlusCircle, 
  Wallet,
  Target,
  Trash2,
  TrendingUp,
  ChevronDown
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { savingsService, Saving } from '@/lib/services/savingsService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const SAVING_GOALS = ['Dana Darurat', 'Liburan', 'Pendidikan', 'Properti', 'Kendaraan', 'Bisnis', 'Lainnya'];

export default function SavingsPage() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    subCategory: '',
    amount: '',
    category: 'Dana Darurat',
    fromAccount: '',
    toGoal: '',
    date: new Date().toISOString().split('T')[0],
    displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    currency: 'IDR'
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'savings'), where('userId', '==', u.uid));
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          setSavings(snap.docs.map(doc => {
            const d = doc.data();
            return {
              ...d, id: doc.id, amount: Number(d.amount) || 0,
              date: d.date?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date()
            } as Saving;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setSavings([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.description || !formData.amount) return;
    try {
      await savingsService.createSaving({
        userId: user.uid,
        description: formData.description,
        subCategory: formData.subCategory,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        fromAccount: formData.fromAccount,
        toGoal: formData.toGoal || formData.category,
        date: new Date(formData.date),
        displayDate: formData.displayDate
      });
      setIsAddModalOpen(false);
      setFormData({ 
        description: '', subCategory: '', amount: '', category: 'Dana Darurat', fromAccount: '', 
        toGoal: '', date: new Date().toISOString().split('T')[0], 
        displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        currency: 'IDR' 
      });
      // onSnapshot akan handle update otomatis
    } catch (e) { console.error(e); }
  };

  const totalSaldo = useMemo(() => savings.reduce((s, item) => s + item.amount, 0), [savings]);

  const filtered = useMemo(() =>
    searchQuery ? savings.filter(s => s.description.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase())) : savings,
    [savings, searchQuery]
  );

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(n);
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Tabungan</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Kelola dana cadangan dan pantau progres pencapaian target tabungan impian Anda.
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0">
          <PlusCircle size={16} />
          Setoran Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[150px] md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Wallet size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tabungan</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp {formatRp(totalSaldo)}</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">{savings.length} catatan setoran</p>
          </div>
          <TrendingUp size={48} className="absolute -right-2 -bottom-2 text-indigo-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-auto md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distribusi Goal</p>
          </div>
          <div>
            {savings.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {[...new Set(savings.map(s => s.category))].slice(0, 4).map(cat => (
                  <span key={cat} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
                    {cat}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm font-bold text-slate-300 mt-2">Belum ada data</p>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[200px] relative">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari setoran tabungan..."
            className="w-full bg-slate-50/50 border-transparent rounded-xl md:rounded-2xl py-3 md:py-4 pl-5 pr-6 text-sm font-medium focus:ring-0 outline-none transition-all" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat data tabungan...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10">
            <EmptyState title="Belum ada setoran" description="Catat setoran tabungan pertama Anda untuk mulai tracking tujuan keuangan." icon={<Wallet size={24} />} />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px] xl:min-w-0">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal Display</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Mata Uang</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Nominal</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sub Kategori</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Dari</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Ke</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap">
                      <p className="text-sm font-black text-slate-900">{formatDate(item.date)}</p>
                    </td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap font-bold text-slate-500 text-[11px]">{item.displayDate || formatDate(item.date)}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap font-bold text-slate-900 text-sm">{item.description}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap text-center"><span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.currency || 'IDR'}</span></td>
                    <td className="px-4 md:px-6 py-5 text-right whitespace-nowrap font-black text-slate-900 text-sm"> {formatRp(item.amount)}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap">
                       <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase tracking-widest">{item.subCategory || '—'}</span>
                    </td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap font-bold text-slate-600 text-xs">{item.fromAccount || '—'}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap font-bold text-slate-600 text-xs">{item.toGoal || '—'}</td>
                    <td className="px-5 md:px-8 py-5 text-center">
                      <button onClick={async () => { if (item.id) { await savingsService.deleteSaving(item.id); } }}
                        className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && savings.length > 0 && (
          <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-400">{savings.length} catatan tabungan</p>
            <p className="text-[11px] font-black text-slate-600">Total: Rp {formatRp(totalSaldo)}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Catat Setoran Tabungan" maxWidth="max-w-lg">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi</label>
            <input type="text" value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))}
              placeholder="Setoran Dana Darurat..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Goal / Kategori</label>
            <div className="relative">
              <select value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer">
                {SAVING_GOALS.map(g => <option key={g}>{g}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal (Rp)</label>
              <input type="number" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
               <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
                placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
              <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Display</label>
               <input type="text" value={formData.displayDate} onChange={e => setFormData(p => ({...p, displayDate: e.target.value}))}
                placeholder="14 April 2024" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Kategori</label>
              <input type="text" value={formData.subCategory} onChange={e => setFormData(p => ({...p, subCategory: e.target.value}))}
                placeholder="Potongan, Bonus..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Dari Rekening</label>
              <input type="text" value={formData.fromAccount} onChange={e => setFormData(p => ({...p, fromAccount: e.target.value}))}
                placeholder="BCA Tabungan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Ke Goal (Tujuan)</label>
            <input type="text" value={formData.toGoal} onChange={e => setFormData(p => ({...p, toGoal: e.target.value}))}
              placeholder="Dana Darurat, Liburan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <button onClick={handleCreate} disabled={!formData.description || !formData.amount}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-4 shadow-xl shadow-slate-200">
            Simpan Setoran
          </button>
        </div>
      </Modal>
    </div>
  );
}

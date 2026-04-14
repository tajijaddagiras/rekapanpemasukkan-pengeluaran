"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Search, 
  Calendar, 
  ChevronDown, 
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Trash2,
  Copy,
  TrendingUp
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

export default function DailyTransactionLogPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    type: 'pemasukan' as 'pemasukan' | 'pengeluaran',
    category: '',
    subCategory: '',
    currency: 'IDR',
    amount: '',
    accountId: '',
    installmentTenor: '',
    monthlyInterest: '',
    totalInterest: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'transactions'), where('userId', '==', u.uid));
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          setTransactions(snap.docs.map(doc => {
            const d = doc.data();
            return {
              ...d, id: doc.id, amount: Number(d.amount) || 0,
              date: d.date?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date()
            } as Transaction;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setTransactions([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.amount || !formData.category) return;
    try {
      await transactionService.createTransaction({
        userId: user.uid, type: formData.type, amount: parseFloat(formData.amount),
        category: formData.category, accountId: formData.accountId || 'General',
        subCategory: formData.subCategory, currency: formData.currency,
        installmentTenor: parseInt(formData.installmentTenor) || 0,
        monthlyInterest: parseFloat(formData.monthlyInterest) || 0,
        totalInterest: parseFloat(formData.totalInterest) || 0,
        date: new Date(formData.date), note: formData.note, status: 'VERIFIED'
      });
      setIsAddModalOpen(false);
      setFormData({ type: 'pemasukan', category: '', subCategory: '', currency: 'IDR', amount: '', accountId: '', installmentTenor: '', monthlyInterest: '', totalInterest: '', note: '', date: new Date().toISOString().split('T')[0] });
      // onSnapshot update otomatis
    } catch (e) { console.error(e); }
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return transactions;
    return transactions.filter(t =>
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.note || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const totalPemasukan = useMemo(() => transactions.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalPengeluaran = useMemo(() => transactions.filter(t => t.type === 'pengeluaran').reduce((s, t) => s + t.amount, 0), [transactions]);

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }).format(n).replace('Rp', '').trim();
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Transaksi Harian</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Lacak dan kelola aliran keuangan Anda dengan presisi editorial dan kejelasan mutlak.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[12px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <PlusCircle size={16} />
          Tambah Cepat
        </button>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Data</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-slate-900">{loading ? '-' : transactions.length}</span>
            <span className="text-xs font-bold text-slate-400">Transaksi</span>
          </div>
          <div className="h-1 w-full bg-slate-50 rounded-full"><div className="h-full bg-slate-900 rounded-full" style={{ width: transactions.length > 0 ? '60%' : '0%' }} /></div>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pemasukan</p>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Rp {formatRp(totalPemasukan)}</h3>
          </div>
          <ArrowUpRight size={32} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-100 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengeluaran</p>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Rp {formatRp(totalPengeluaran)}</h3>
          </div>
          <ArrowDownRight size={32} className="absolute right-5 top-1/2 -translate-y-1/2 text-rose-100 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saldo Bersih</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-xl md:text-2xl font-black leading-tight ${totalPemasukan - totalPengeluaran >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              Rp {formatRp(totalPemasukan - totalPengeluaran)}
            </h3>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="w-full md:flex-1 relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari kategori atau catatan..." 
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-[16px] md:rounded-2xl py-3.5 pl-12 pr-6 text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat transaksi...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10">
            <EmptyState 
              title="Belum ada transaksi"
              description="Catat pemasukan atau pengeluaran pertama Anda dengan klik tombol Tambah Cepat di atas."
              icon={<TrendingUp size={24} />}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px] xl:min-w-0">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Mata Uang</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Nominal</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sub Kategori</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Tenor Cicilan</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Bunga Perbulan</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Total Bunga</th>
                    <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((trx) => (
                    <tr key={trx.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <p className="text-xs md:text-sm font-black text-slate-900">{formatDate(trx.date)}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <p className="text-xs md:text-sm font-bold text-slate-700">{trx.note || '—'}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded">{trx.currency || 'IDR'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                        <p className={`text-sm font-black tracking-tight ${trx.type === 'pemasukan' ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {trx.type === 'pemasukan' ? '+' : '-'} {formatRp(trx.amount)}
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-600">{trx.subCategory || trx.category || '—'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-600">{trx.accountId || '—'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-600">{trx.installmentTenor ? `${trx.installmentTenor} bln` : '—'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-600">{trx.monthlyInterest ? formatRp(trx.monthlyInterest) : '—'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-600">{trx.totalInterest ? formatRp(trx.totalInterest) : '—'}</span>
                      </td>
                      <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={async () => {
                              if (trx.id) {
                                await transactionService.deleteTransaction(trx.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 md:px-8 py-5 md:py-6 bg-slate-50/30 flex items-center justify-between gap-4 border-t border-slate-50">
              <p className="text-[11px] font-bold text-slate-400">
                Menampilkan {filtered.length} dari {transactions.length} transaksi
              </p>
            </div>
          </>
        )}
      </div>

      {/* Modal Tambah Transaksi */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Transaksi Baru" maxWidth="max-w-lg">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe Transaksi</label>
            <div className="grid grid-cols-2 gap-3">
              {(['pemasukan', 'pengeluaran'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFormData(p => ({...p, type}))}
                  className={`py-3 rounded-xl text-sm font-black capitalize transition-all ${
                    formData.type === type
                      ? type === 'pemasukan' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'bg-rose-500 text-white shadow-lg shadow-rose-100'
                      : 'bg-slate-50 text-slate-500'
                  }`}
                >{type}</button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                <input type="number" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))}
                  placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all" />
              </div>
            </div>
            <div className="space-y-2 w-1/3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
               <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
                placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
              <input type="text" value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                placeholder="Makanan, Gaji..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Kategori</label>
              <input type="text" value={formData.subCategory} onChange={e => setFormData(p => ({...p, subCategory: e.target.value}))}
                placeholder="Makan siang..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening</label>
              <input type="text" value={formData.accountId} onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
                placeholder="BCA, Tunai..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
              <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tenor Cicilan</label>
              <input type="number" value={formData.installmentTenor} onChange={e => setFormData(p => ({...p, installmentTenor: e.target.value}))}
                placeholder="Bulan" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bunga/Bln</label>
              <input type="number" value={formData.monthlyInterest} onChange={e => setFormData(p => ({...p, monthlyInterest: e.target.value}))}
                placeholder="Rp" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Bunga</label>
              <input type="number" value={formData.totalInterest} onChange={e => setFormData(p => ({...p, totalInterest: e.target.value}))}
                placeholder="Rp" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi / Catatan</label>
            <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
              placeholder="Deskripsi..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>

          <button onClick={handleCreate} disabled={!formData.amount || !formData.category}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-slate-200">
            Simpan Transaksi
          </button>
        </div>
      </Modal>
    </div>
  );
}

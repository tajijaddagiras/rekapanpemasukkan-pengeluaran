"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Search,
  ArrowUpDown, 
  CreditCard, 
  Trash2,
  Send,
  Download
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

export default function TopUpPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    type: 'topup' as 'topup' | 'transfer',
    amount: '',
    accountId: '',
    targetAccountId: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', u.uid),
          where('type', 'in', ['topup', 'transfer'])
        );
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          const list = snap.docs.map(doc => {
            const d = doc.data();
            return {
              ...d, id: doc.id, amount: Number(d.amount) || 0,
              date: d.date?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date()
            } as Transaction;
          });
          setTransactions(list.sort((a,b) => b.date.getTime() - a.date.getTime()));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setTransactions([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.amount) return;
    try {
      await transactionService.createTransaction({
        userId: user.uid,
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.type === 'topup' ? 'Top Up' : 'Transfer',
        accountId: formData.accountId || 'General',
        targetAccountId: formData.targetAccountId,
        date: new Date(formData.date),
        note: formData.note,
        status: 'VERIFIED'
      });
      setIsAddModalOpen(false);
      setFormData({ type: 'topup', amount: '', accountId: '', targetAccountId: '', note: '', date: new Date().toISOString().split('T')[0] });
      // onSnapshot update otomatis
    } catch (e) { console.error(e); }
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return transactions;
    return transactions.filter(t =>
      (t.note || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const totalAmount = useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n).replace('Rp', '').trim();
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Top Up & Transfer</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Riwayat lengkap pemindahan dana antar rekening, e-wallet, dan pengisian saldo.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[12px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <PlusCircle size={16} />
          Transfer Baru
        </button>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ArrowUpDown size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Transaksi</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              Rp {formatRp(totalAmount)}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{transactions.length} transfer tercatat</p>
          </div>
          <Send size={48} className="absolute -right-2 -bottom-2 text-blue-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <CreditCard size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biaya Admin</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-rose-500 leading-tight">Rp 0</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1">Kalkulasi otomatis kedepannya</p>
          </div>
        </div>
      </div>

      {/* 3. Filter */}
      <div className="bg-white p-3 rounded-[24px] border border-slate-50 shadow-sm">
        <div className="relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari catatan transfer..."
            className="w-full bg-slate-50/50 border-transparent rounded-[16px] py-3.5 pl-12 pr-6 text-sm font-medium transition-all" />
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat data transfer...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10">
            <EmptyState 
              title="Belum ada riwayat transfer"
              description="Catat top up atau transfer antar rekening Anda di sini."
              icon={<Send size={24} />}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px] xl:min-w-0">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                    <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan</th>
                    <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tipe</th>
                    <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal</th>
                    <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((trx) => (
                    <tr key={trx.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                      <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900">{formatDate(trx.date)}</p>
                      </td>
                      <td className="px-5 md:px-8 py-4 md:py-6">
                        <p className="text-sm font-bold text-slate-700">{trx.note || '—'}</p>
                      </td>
                      <td className="px-5 md:px-8 py-4 md:py-6 text-center whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
                          {trx.type === 'topup' ? 'Top Up' : 'Transfer'}
                        </span>
                      </td>
                      <td className="px-5 md:px-8 py-4 md:py-6 text-right whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900">Rp {formatRp(trx.amount)}</p>
                      </td>
                      <td className="px-5 md:px-8 py-4 md:py-6 text-center">
                        <button onClick={async () => { if (trx.id) { await transactionService.deleteTransaction(trx.id); } }}
                          className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50">
              <p className="text-[11px] font-bold text-slate-400">Menampilkan {filtered.length} dari {transactions.length} transaksi</p>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Transfer / Top Up Baru" maxWidth="max-w-lg">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis</label>
            <div className="grid grid-cols-2 gap-3">
              {(['topup', 'transfer'] as const).map(type => (
                <button key={type} onClick={() => setFormData(p => ({...p, type}))}
                  className={`py-3 rounded-xl text-sm font-black capitalize transition-all ${
                    formData.type === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500'
                  }`}
                >{type === 'topup' ? 'Top Up' : 'Transfer'}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input type="number" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 pl-12 pr-5 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan (Opsional)</label>
            <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
              placeholder="Tujuan transfer..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
            <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>

          <button onClick={handleCreate} disabled={!formData.amount}
            className="w-full bg-blue-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-blue-100">
            Simpan Transfer
          </button>
        </div>
      </Modal>
    </div>
  );
}

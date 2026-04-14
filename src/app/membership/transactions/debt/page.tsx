"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Search,
  AlertCircle,
  Banknote,
  Trash2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

export default function DebtPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    debtType: 'hutang' as 'hutang' | 'piutang',
    amount: '',
    currency: 'IDR',
    lenderName: '',
    note: '',
    accountId: '',
    installmentTenor: '',
    monthlyInterest: '',
    totalInterest: '',
    totalDebt: '',
    date: new Date().toISOString().split('T')[0],
    displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(
          collection(db, 'transactions'), 
          where('userId', '==', u.uid),
          where('type', '==', 'debt')
        );
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
    if (!user || !formData.amount) return;
    try {
      await transactionService.createTransaction({
        userId: user.uid,
        type: 'debt',
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.debtType === 'hutang' ? 'Hutang' : 'Piutang',
        subCategory: formData.debtType === 'hutang' ? 'Hutang' : 'Piutang',
        lenderName: formData.lenderName,
        note: formData.note,
        accountId: formData.accountId || 'General',
        installmentTenor: parseInt(formData.installmentTenor) || 0,
        monthlyInterest: parseFloat(formData.monthlyInterest) || 0,
        totalInterest: parseFloat(formData.totalInterest) || 0,
        totalDebt: parseFloat(formData.totalDebt) || 0,
        date: new Date(formData.date),
        displayDate: formData.displayDate,
        status: 'PENDING'
      });
      setIsAddModalOpen(false);
      setFormData({ 
        debtType: 'hutang', amount: '', currency: 'IDR', lenderName: '', note: '', accountId: '', 
        installmentTenor: '', monthlyInterest: '', totalInterest: '', totalDebt: '', 
        date: new Date().toISOString().split('T')[0],
        displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      });
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

  const totalHutang = useMemo(() => transactions.filter(t => t.category === 'Hutang').reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalPiutang = useMemo(() => transactions.filter(t => t.category === 'Piutang').reduce((s, t) => s + t.amount, 0), [transactions]);

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n).replace('Rp', '').trim();
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Hutang & Piutang</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Lacak kewajiban pembayaran dan dana yang dipinjamkan kepada orang lain secara terorganisir.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[12px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <PlusCircle size={16} />
          Catatan Baru
        </button>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertCircle size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Hutang</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-rose-600 leading-tight">Rp {formatRp(totalHutang)}</h3>
            <p className="text-[10px] font-bold text-rose-400 mt-1 uppercase tracking-wider">Kewajiban Belum Terbayar</p>
          </div>
          <Banknote size={48} className="absolute -right-2 -bottom-2 text-rose-50/60 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Piutang</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-emerald-600 leading-tight">Rp {formatRp(totalPiutang)}</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">Dana Dipinjamkan</p>
          </div>
          <Banknote size={48} className="absolute -right-2 -bottom-2 text-emerald-50/60 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* 3. Filter */}
      <div className="bg-white p-3 rounded-[24px] border border-slate-50 shadow-sm">
        <div className="relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari catatan hutang atau piutang..."
            className="w-full bg-slate-50/50 border-transparent rounded-[16px] py-3.5 pl-12 pr-6 text-sm font-medium transition-all" />
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat data...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10">
            <EmptyState 
              title="Belum ada catatan"
              description="Catat hutang atau piutang Anda untuk tidak ada yang terlewat."
              icon={<Banknote size={24} />}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px] xl:min-w-0">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal Display</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Mata Uang</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Nominal</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tipe</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Pemberi Hutang</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tenor</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Bunga/Bln</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Total Bunga</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Total Hutang</th>
                    <th className="px-4 md:px-6 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((trx) => (
                    <tr key={trx.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                      <td className="px-4 md:px-6 py-4 md:py-6 whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900">{formatDate(trx.date)}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6 whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-500">{trx.displayDate || formatDate(trx.date)}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6">
                        <p className="text-sm font-bold text-slate-700">{trx.note || '—'}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-center whitespace-nowrap">
                        <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded">{trx.currency || 'IDR'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-right whitespace-nowrap">
                        <p className="text-sm font-black text-slate-900"> {formatRp(trx.amount)}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-center whitespace-nowrap">
                        <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${
                          trx.category === 'Hutang' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {trx.category}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-6 whitespace-nowrap text-sm font-bold text-slate-600">{trx.accountId || '—'}</td>
                      <td className="px-4 md:px-6 py-4 md:py-6 whitespace-nowrap text-sm font-bold text-slate-600">{trx.lenderName || '—'}</td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-center whitespace-nowrap text-sm font-bold text-slate-600">{trx.installmentTenor || 0} bln</td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-right whitespace-nowrap text-sm font-bold text-slate-600">{formatRp(trx.monthlyInterest || 0)}</td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-right whitespace-nowrap text-sm font-bold text-slate-600">{formatRp(trx.totalInterest || 0)}</td>
                      <td className="px-4 md:px-6 py-4 md:py-6 text-right whitespace-nowrap font-black text-slate-900 text-sm">{formatRp(trx.totalDebt || 0)}</td>
                      <td className="px-5 md:px-8 py-4 md:py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={async () => { 
                              if (trx.id) { 
                                await transactionService.updateTransaction(trx.id, { status: 'VERIFIED' }); 
                                // onSnapshot otomatis update 
                              }
                            }}
                            title="tandai lunas"
                            className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <button onClick={async () =>{ if (trx.id) { await transactionService.deleteTransaction(trx.id); } }} className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50">
              <p className="text-[11px] font-bold text-slate-400">Menampilkan {filtered.length} dari {transactions.length} catatan</p>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Catat Hutang / Piutang" maxWidth="max-w-lg">
        <div className="space-y-4 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe</label>
            <div className="grid grid-cols-2 gap-3">
              {(['hutang', 'piutang'] as const).map(type => (
                <button key={type} type="button" onClick={() => setFormData(p => ({...p, debtType: type}))}
                  className={`py-3 rounded-xl text-sm font-black capitalize transition-all ${
                    formData.debtType === type
                      ? type === 'hutang' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                      : 'bg-slate-50 text-slate-500'
                  }`}
                >{type}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal Pokok</label>
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Pemberi / Penerima</label>
              <input type="text" value={formData.lenderName} onChange={e => setFormData(p => ({...p, lenderName: e.target.value}))}
                placeholder="Nama orang/bank..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening Terkait</label>
              <input type="text" value={formData.accountId} onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
                placeholder="BCA, Mandiri..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tenor (Bln)</label>
              <input type="number" value={formData.installmentTenor} onChange={e => setFormData(p => ({...p, installmentTenor: e.target.value}))}
                placeholder="12" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bunga / Bln</label>
              <input type="number" value={formData.monthlyInterest} onChange={e => setFormData(p => ({...p, monthlyInterest: e.target.value}))}
                placeholder="100000" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Bunga</label>
              <input type="number" value={formData.totalInterest} onChange={e => setFormData(p => ({...p, totalInterest: e.target.value}))}
                placeholder="1200000" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Hutang</label>
              <input type="number" value={formData.totalDebt} onChange={e => setFormData(p => ({...p, totalDebt: e.target.value}))}
                placeholder="Nominal + Total Bunga" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
              <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Display</label>
               <input type="text" value={formData.displayDate} onChange={e => setFormData(p => ({...p, displayDate: e.target.value}))}
                placeholder="14 April 2024" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi</label>
              <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
                placeholder="Keterangan tambahan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <button onClick={handleCreate} disabled={!formData.amount}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-4 shadow-xl shadow-slate-200">
            Simpan Catatan
          </button>
        </div>
      </Modal>
    </div>
  );
}

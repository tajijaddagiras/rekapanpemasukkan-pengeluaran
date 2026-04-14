"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Save, 
  Calendar as CalendarIcon,
  RefreshCw,
  Trash2,
  Edit2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { recurringService, RecurringTransaction } from '@/lib/services/recurringService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function RecurringPage() {
  const [transactions, setTransactions] = useState<RecurringTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Pengeluaran' as RecurringTransaction['type'],
    category: '',
    accountId: '',
    amount: '',
    interval: 'Bulanan' as RecurringTransaction['interval'],
    nextDate: '',
    note: ''
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'recurring'), where('userId', '==', u.uid));
        if (unsubRef.current) unsubRef.current();
        const unsubSnap = onSnapshot(q, (snap) => {
          setTransactions(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, amount: Number(d.amount) || 0, nextDate: d.nextDate?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date() } as RecurringTransaction;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
        unsubRef.current = unsubSnap;
      } else { setTransactions([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.name || !formData.amount || !formData.nextDate) return;
    try {
      await recurringService.createRecurring({
        userId: user.uid,
        name: formData.name,
        type: formData.type,
        category: formData.category,
        accountId: formData.accountId || 'General',
        amount: parseFloat(formData.amount),
        interval: formData.interval,
        nextDate: new Date(formData.nextDate),
        note: formData.note,
        status: 'ACTIVE'
      });
      setIsAddModalOpen(false);
      setFormData({ 
        name: '', type: 'Pengeluaran', category: '', accountId: '', amount: '', interval: 'Bulanan', nextDate: '', note: '' 
      });
      // onSnapshot otomatis update
    } catch (error) {
      console.error("Error creating recurring:", error);
    }
  };

  const formatRp = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1200px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Transaksi Berulang</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-2">Manage your automated recurring transactions with ease and precision.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#555555] text-white px-4 py-2.5 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl text-[13px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <Plus size={18} />
          Tambah Baru
        </button>
      </div>

      {/* 2. List Transaksi Berulang */}
      <div className="bg-white rounded-[20px] md:rounded-[40px] border border-slate-50 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Daftar Jadwal Otomatis</h2>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="p-10 text-center text-sm font-medium text-slate-400">Memuat data...</div>
          ) : transactions.length === 0 ? (
            <div className="p-10 md:p-16 h-full flex items-center justify-center">
              <EmptyState 
                title="Belum ada transaksi berulang"
                description="Simpan transaksi yang rutin Anda lakukan setiap bulan, minggu, atau tahun untuk pencatatan otomatis."
                icon={<RefreshCw size={24} />}
              />
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[800px] md:min-w-0">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Nama</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Jenis</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kategori</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Nominal</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Interval</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Berikutnya</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Akun</th>
                    <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                      <td className="px-4 md:px-6 py-5">
                        <p className="text-sm font-black text-slate-900">{trx.name}</p>
                      </td>
                      <td className="px-4 md:px-6 py-5 text-center">
                        <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${
                          trx.type === 'Pemasukan' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                        }`}>
                          {trx.type}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-5">
                         <span className="text-xs font-bold text-slate-600">{trx.category || '—'}</span>
                      </td>
                      <td className="px-4 md:px-6 py-5 text-right font-black text-slate-900 text-sm whitespace-nowrap">
                        {formatRp(trx.amount)}
                      </td>
                      <td className="px-4 md:px-6 py-5 text-center">
                        <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded-lg tracking-widest uppercase whitespace-nowrap">
                          {trx.interval}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-5 text-right font-bold text-slate-500 text-xs whitespace-nowrap">
                        {formatDate(trx.nextDate)}
                      </td>
                      <td className="px-4 md:px-6 py-5">
                         <span className="text-xs font-bold text-slate-600">{trx.accountId || '—'}</span>
                      </td>
                      <td className="px-5 md:px-8 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={async () => {
                              if (trx.id) {
                                await recurringService.deleteRecurring(trx.id);
                                // onSnapshot otomatis update
                              }
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Tambah Transaksi Berulang */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Settings Transaksi Berulang"
        maxWidth="max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Transaksi</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Contoh: Langganan Netflix"
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis</label>
            <div className="relative">
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
                className="w-full appearance-none bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
              >
                <option>Pengeluaran</option>
                <option>Pemasukan</option>
                <option>Transfer</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
            <input 
              type="text" 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              placeholder="Hiburan, Listrik, Gaji..."
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input 
                type="number" 
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                placeholder="0"
                className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-12 pr-5 text-sm font-bold text-slate-600 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Interval</label>
            <div className="relative">
              <select 
                value={formData.interval}
                onChange={e => setFormData({...formData, interval: e.target.value as any})}
                className="w-full appearance-none bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
              >
                <option>Harian</option>
                <option>Mingguan</option>
                <option>Bulanan</option>
                <option>Tahunan</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Berikutnya</label>
            <input 
              type="date" 
              value={formData.nextDate}
              onChange={e => setFormData({...formData, nextDate: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Akun / Rekening</label>
            <input 
              type="text" 
              value={formData.accountId}
              onChange={e => setFormData({...formData, accountId: e.target.value})}
              placeholder="BCA, Mandiri, Cash..."
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan</label>
            <textarea 
              rows={2}
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              placeholder="Tambahkan detail tambahan..."
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all resize-none"
            />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={!formData.name || !formData.amount || !formData.nextDate}
          className="w-full bg-[#1a41b8] disabled:bg-slate-300 text-white flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black transition-all mt-8 group"
        >
          <Save size={18} className="transition-transform group-hover:scale-110" />
          Simpan Recurring
        </button>
      </Modal>

    </div>
  );
}

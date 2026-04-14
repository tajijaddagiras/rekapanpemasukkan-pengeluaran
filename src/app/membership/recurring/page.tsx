"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Save, 
  Calendar as CalendarIcon,
  RefreshCw,
  Trash2,
  Edit2,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { recurringService, RecurringTransaction } from '@/lib/services/recurringService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function RecurringPage() {
  const [transactions, setTransactions] = useState<RecurringTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const startOfMonth = new Date(parseInt(selectedYear), selectedMonth, 1);
        const endOfMonth = new Date(parseInt(selectedYear), selectedMonth + 1, 0, 23, 59, 59);

        const q = query(
          collection(db, 'recurring'), 
          where('userId', '==', u.uid),
          where('nextDate', '>=', startOfMonth),
          where('nextDate', '<=', endOfMonth),
          orderBy('nextDate', 'asc')
        );
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          setTransactions(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, amount: Number(d.amount) || 0, nextDate: d.nextDate?.toDate?.() ?? new Date(), createdAt: d.createdAt?.toDate?.() ?? new Date() } as RecurringTransaction;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setTransactions([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, [selectedMonth, selectedYear]);

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
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">Transaksi Berulang</h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Periode {months[selectedMonth]} {selectedYear}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => { setIsMonthDropdownOpen(!isMonthDropdownOpen); setIsYearDropdownOpen(false); }}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-black text-slate-700 flex items-center gap-2 transition-all border border-slate-100 min-w-[120px]"
            >
              {months[selectedMonth]}
              <ChevronDown size={14} className={cn("transition-transform", isMonthDropdownOpen && "rotate-180")} />
            </button>
            {isMonthDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                {months.map((month, idx) => (
                  <button key={month} onClick={() => { setSelectedMonth(idx); setIsMonthDropdownOpen(false); }}
                    className={cn("w-full text-left px-4 py-2 text-xs font-bold transition-colors", selectedMonth === idx ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50")}>
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="relative">
            <button
              onClick={() => { setIsYearDropdownOpen(!isYearDropdownOpen); setIsMonthDropdownOpen(false); }}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-black text-slate-700 flex items-center gap-2 transition-all border border-slate-100"
            >
              {selectedYear}
              <ChevronDown size={14} className={cn("transition-transform", isYearDropdownOpen && "rotate-180")} />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-2">
                {['2024', '2025', '2026'].map(year => (
                  <button key={year} onClick={() => { setSelectedYear(year); setIsYearDropdownOpen(false); }}
                    className={cn("w-full text-left px-4 py-2 text-xs font-bold transition-colors", selectedYear === year ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50")}>
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
}

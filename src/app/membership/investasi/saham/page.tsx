"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Search, 
  TrendingUp, 
  Briefcase, 
  Trash2, 
  BarChart3,
  Edit2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { investmentService, Investment } from '@/lib/services/investmentService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

export default function StockInvestmentPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    amountInvested: '',
    currentValue: '',
    currency: 'IDR',
    dateInvested: new Date().toISOString().split('T')[0]
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(
          collection(db, 'investments'),
          where('userId', '==', u.uid),
          where('type', '==', 'Saham')
        );
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          setInvestments(snap.docs.map(doc => {
            const d = doc.data();
            return {
              ...d, id: doc.id, 
              amountInvested: Number(d.amountInvested) || 0,
              currentValue: Number(d.currentValue) || 0,
              dateInvested: d.dateInvested?.toDate?.() ?? new Date(), 
              createdAt: d.createdAt?.toDate?.() ?? new Date()
            } as Investment;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setInvestments([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.name || !formData.amountInvested) return;
    const invested = parseFloat(formData.amountInvested);
    const current = parseFloat(formData.currentValue) || invested;
    try {
      await investmentService.createInvestment({
        userId: user.uid, name: formData.name, type: 'Saham',
        platform: formData.platform, amountInvested: invested, currentValue: current,
        returnPercentage: ((current - invested) / invested) * 100,
        currency: formData.currency, dateInvested: new Date(formData.dateInvested), status: 'Active'
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', platform: '', amountInvested: '', currentValue: '', currency: 'IDR', dateInvested: new Date().toISOString().split('T')[0] });
      // onSnapshot update otomatis
    } catch (e) { console.error(e); }
  };

  const totalInvested = useMemo(() => investments.reduce((s, i) => s + i.amountInvested, 0), [investments]);
  const totalCurrent = useMemo(() => investments.reduce((s, i) => s + i.currentValue, 0), [investments]);
  const totalReturn = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0;

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n).replace('Rp', '').trim();
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Investasi Saham</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Pantau portofolio saham Anda dengan analisis posisi dan modal secara real-time.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <PlusCircle size={16} />
          Tambah Posisi
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BarChart3 size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nilai Portofolio</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp {formatRp(totalCurrent)}</h3>
            <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${totalReturn >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}% Unrealized {totalReturn >= 0 ? 'Profit' : 'Loss'}
            </p>
          </div>
          <TrendingUp size={48} className="absolute -right-2 -bottom-2 text-emerald-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
              <Briefcase size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Modal</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp {formatRp(totalInvested)}</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{investments.length} posisi aktif</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat portofolio...</div>
        ) : investments.length === 0 ? (
          <div className="p-10">
            <EmptyState title="Portofolio Saham Kosong" description="Tambahkan posisi saham pertama Anda untuk mulai tracking kinerja portofolio." icon={<BarChart3 size={24} />} />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px] xl:min-w-0">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode / Nama</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Modal</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nilai Saat Ini</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Return</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                    <td className="px-5 md:px-8 py-5 whitespace-nowrap">
                      <p className="text-sm font-black text-slate-900">{inv.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{formatDate(inv.dateInvested)}</p>
                    </td>
                    <td className="px-5 md:px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-widest">{inv.platform || '—'}</span>
                    </td>
                    <td className="px-5 md:px-8 py-5 text-right whitespace-nowrap font-black text-slate-900 text-sm">Rp {formatRp(inv.amountInvested)}</td>
                    <td className="px-5 md:px-8 py-5 text-right whitespace-nowrap font-black text-slate-900 text-sm">Rp {formatRp(inv.currentValue)}</td>
                    <td className="px-5 md:px-8 py-5 text-center whitespace-nowrap">
                      <span className={`px-3 py-1 text-[9px] font-black rounded-lg ${inv.returnPercentage >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                        {inv.returnPercentage >= 0 ? '+' : ''}{inv.returnPercentage.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-5 md:px-8 py-5 text-center">
                      <button onClick={async () => { if (inv.id) { await investmentService.deleteInvestment(inv.id); } }}
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
      </div>

      {/* Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Posisi Saham" maxWidth="max-w-lg">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kode / Nama Saham</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              placeholder="BBCA, TLKM..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Platform Broker</label>
            <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
              placeholder="Stockbit, Ajaib, BNI Sekuritas..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Modal (Rp)</label>
              <input type="number" value={formData.amountInvested} onChange={e => setFormData(p => ({...p, amountInvested: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nilai Saat Ini (Rp)</label>
              <input type="number" value={formData.currentValue} onChange={e => setFormData(p => ({...p, currentValue: e.target.value}))}
                placeholder="Sama dgn modal" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Beli</label>
            <input type="date" value={formData.dateInvested} onChange={e => setFormData(p => ({...p, dateInvested: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <button onClick={handleCreate} disabled={!formData.name || !formData.amountInvested}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-slate-200">
            Simpan Posisi Saham
          </button>
        </div>
      </Modal>
    </div>
  );
}

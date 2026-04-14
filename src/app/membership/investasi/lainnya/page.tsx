"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle,
  PieChart,
  Target,
  Trash2,
  Gem,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { investmentService, Investment } from '@/lib/services/investmentService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

const ASSET_TYPES = ['Emas', 'Kripto', 'Properti', 'P2P Lending', 'Obligasi', 'Reksa Dana', 'Lainnya'];

export default function OtherInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    assetType: 'Emas',
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
          where('type', '==', 'Lainnya')
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
        userId: user.uid, name: formData.name, type: 'Lainnya',
        platform: formData.assetType + (formData.platform ? ` - ${formData.platform}` : ''),
        amountInvested: invested, currentValue: current,
        returnPercentage: ((current - invested) / invested) * 100,
        currency: formData.currency, dateInvested: new Date(formData.dateInvested), status: 'Active'
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', assetType: 'Emas', platform: '', amountInvested: '', currentValue: '', currency: 'IDR', dateInvested: new Date().toISOString().split('T')[0] });
      // onSnapshot update otomatis
    } catch (e) { console.error(e); }
  };

  const totalInvested = useMemo(() => investments.reduce((s, i) => s + i.amountInvested, 0), [investments]);
  const totalCurrent = useMemo(() => investments.reduce((s, i) => s + i.currentValue, 0), [investments]);
  const totalReturn = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0;

  const formatRp = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n).replace('Rp', '').trim();
  const formatDate = (d: Date) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);

  const getAssetColor = (platform: string) => {
    if (platform.startsWith('Emas')) return 'bg-yellow-50 text-yellow-600';
    if (platform.startsWith('Kripto')) return 'bg-purple-50 text-purple-600';
    if (platform.startsWith('Properti')) return 'bg-emerald-50 text-emerald-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Investasi Lainnya</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Lacak aset investasi alternatif Anda seperti Emas, Kripto, Properti, dan lainnya dalam satu tempat.
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0"
        >
          <PlusCircle size={16} />
          Tambah Aset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <PieChart size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Nilai Aset</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp {formatRp(totalCurrent)}</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{investments.length} kategori aset</p>
          </div>
          <Gem size={48} className="absolute -right-2 -bottom-2 text-purple-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Return</p>
          </div>
          <div>
            <h3 className={`text-3xl font-black leading-tight ${totalReturn >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
            </h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1">Unrealized Gain / Loss</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm font-medium text-slate-400">Memuat aset...</div>
        ) : investments.length === 0 ? (
          <div className="p-10">
            <EmptyState title="Belum ada aset alternatif" description="Tambahkan aset Emas, Kripto, atau Properti Anda untuk mulai tracking." icon={<Gem size={24} />} />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px] xl:min-w-0">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Aset</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis</th>
                  <th className="px-5 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
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
                    </td>
                    <td className="px-5 md:px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${getAssetColor(inv.platform)}`}>
                        {inv.platform?.split(' - ')[0] || 'Lainnya'}
                      </span>
                    </td>
                    <td className="px-5 md:px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-500">{formatDate(inv.dateInvested)}</td>
                    <td className="px-5 md:px-8 py-5 text-right whitespace-nowrap font-black text-slate-700 text-sm">Rp {formatRp(inv.amountInvested)}</td>
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Aset Investasi" maxWidth="max-w-lg">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis Aset</label>
            <div className="relative">
              <select value={formData.assetType} onChange={e => setFormData(p => ({...p, assetType: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer">
                {ASSET_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Aset</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              placeholder="Emas Antam 50gr, BTC, Rumah..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Platform / Tempat</label>
            <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
              placeholder="Pegadaian, Indodax, Pinhome..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
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
            Simpan Aset Investasi
          </button>
        </div>
      </Modal>
    </div>
  );
}

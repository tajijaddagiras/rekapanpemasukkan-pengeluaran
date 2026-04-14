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
    logoUrl: '',
    currency: 'IDR',
    quantity: '',
    unit: '',
    pricePerUnit: '',
    currentValue: '',
    transactionType: 'Pembelian',
    category: '',
    accountId: '',
    platform: '',
    assetType: 'Emas',
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
    if (!user || !formData.name || !formData.quantity || !formData.pricePerUnit) return;
    const qty = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.pricePerUnit) || 0;
    const invested = qty * price;
    const current = parseFloat(formData.currentValue) || invested;
    try {
      await investmentService.createInvestment({
        userId: user.uid, name: formData.name, type: 'Lainnya',
        platform: formData.platform || formData.assetType,
        amountInvested: invested, currentValue: current,
        returnPercentage: invested > 0 ? ((current - invested) / invested) * 100 : 0,
        currency: formData.currency, 
        logoUrl: formData.logoUrl,
        quantity: qty,
        unit: formData.unit,
        pricePerUnit: price,
        transactionType: formData.transactionType,
        category: formData.category,
        accountId: formData.accountId,
        dateInvested: new Date(formData.dateInvested), status: 'Active'
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', logoUrl: '', currency: 'IDR', quantity: '', unit: '', pricePerUnit: '', currentValue: '', transactionType: 'Pembelian', category: '', accountId: '', platform: '', assetType: 'Emas', dateInvested: new Date().toISOString().split('T')[0] });
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
            <table className="w-full text-left border-collapse min-w-[1200px] xl:min-w-0">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Produk Investasi</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Logo</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Mata Uang</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Kuantitas</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Satuan</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Harga / 1 Satuan</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tipe Transaksi</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kategori</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Platform</th>
                  <th className="px-4 md:px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-b-0">
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-500">{formatDate(inv.dateInvested)}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap"><p className="text-sm font-black text-slate-900">{inv.name}</p></td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap text-center">
                      {inv.logoUrl ? (
                        <img src={inv.logoUrl} alt={inv.name} className="w-6 h-6 rounded-full object-cover mx-auto bg-slate-100" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-[8px] font-black">IMG</div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap text-center"><span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded">{inv.currency || 'IDR'}</span></td>
                    <td className="px-4 md:px-6 py-5 text-right whitespace-nowrap"><span className="text-sm font-bold text-slate-700">{inv.quantity || 0}</span></td>
                    <td className="px-4 md:px-6 py-5 text-center whitespace-nowrap"><span className="text-xs font-bold text-slate-500">{inv.unit || '—'}</span></td>
                    <td className="px-4 md:px-6 py-5 text-right whitespace-nowrap font-black text-slate-900 text-sm">{formatRp(inv.pricePerUnit || 0)}</td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap"><span className="text-xs font-bold text-slate-600">{inv.transactionType || '—'}</span></td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap"><span className="text-xs font-bold text-slate-600">{inv.category || '—'}</span></td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap"><span className="text-xs font-bold text-slate-600">{inv.accountId || '—'}</span></td>
                    <td className="px-4 md:px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${getAssetColor(inv.platform)}`}>
                        {inv.platform || '—'}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-5 text-center">
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
        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Judul / Produk Investasi</label>
              <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                placeholder="Emas Antam 50gr, BTC..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">URL Logo (Opsional)</label>
              <input type="url" value={formData.logoUrl} onChange={e => setFormData(p => ({...p, logoUrl: e.target.value}))}
                placeholder="https://..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
               <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
                placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kuantitas</label>
              <input type="number" value={formData.quantity} onChange={e => setFormData(p => ({...p, quantity: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Satuan</label>
              <input type="text" value={formData.unit} onChange={e => setFormData(p => ({...p, unit: e.target.value}))}
                placeholder="Gram, Lot, Koin..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Harga per 1 Kuantitas</label>
              <input type="number" value={formData.pricePerUnit} onChange={e => setFormData(p => ({...p, pricePerUnit: e.target.value}))}
                placeholder="Rp" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe Transaksi</label>
              <input type="text" value={formData.transactionType} onChange={e => setFormData(p => ({...p, transactionType: e.target.value}))}
                placeholder="Pembelian..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
              <input type="text" value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                placeholder="Emas, Saham luar..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening</label>
              <input type="text" value={formData.accountId} onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
                placeholder="BCA, Tunai..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Platform</label>
              <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
                placeholder="Pegadaian, Indodax, dll" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Estimasi Valuasi (Opsional)</label>
               <input type="number" value={formData.currentValue} onChange={e => setFormData(p => ({...p, currentValue: e.target.value}))}
                 placeholder="Sama dgn Harga Beli x Qty" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
               <input type="date" value={formData.dateInvested} onChange={e => setFormData(p => ({...p, dateInvested: e.target.value}))}
                 className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
             </div>
          </div>

          <button onClick={handleCreate} disabled={!formData.name || !formData.quantity || !formData.pricePerUnit}
            className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-slate-200">
            Simpan Aset Investasi
          </button>
        </div>
      </Modal>
    </div>
  );
}

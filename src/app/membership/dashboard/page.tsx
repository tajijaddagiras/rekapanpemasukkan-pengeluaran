"use client";

import { useState } from 'react';

import { 
  Plus, 
  TrendingUp,
  CreditCard,
  Landmark,
  Circle,
  Lightbulb,
  ShoppingBag,
  Utensils,
  Car,
  Search,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MonthlyDashboard() {
  const [filterType, setFilterType] = useState('Semua Kategori');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const tableData = [
    { kategori: 'Pengeluaran', name: 'Kebutuhan Rumah Tangga', budget: 'Rp5.000.000', actual: 'Rp4.820.000', diff: '+Rp180.000', ok: true },
    { kategori: 'Pengeluaran', name: 'Hiburan & Lifestyle', budget: 'Rp3.000.000', actual: 'Rp3.750.000', diff: '-Rp750.000', ok: false },
    { kategori: 'Investasi', name: 'Pendidikan & Kursus', budget: 'Rp2.000.000', actual: 'Rp2.000.000', diff: 'Rp0', neut: true },
    { kategori: 'Pengeluaran', name: 'Cicilan Kendaraan', budget: 'Rp4.500.000', actual: 'Rp4.500.000', diff: 'Rp0', neut: true },
    { kategori: 'Pemasukan', name: 'Gaji Utama', budget: 'Rp20.000.000', actual: 'Rp20.000.000', diff: 'Rp0', neut: true },
    { kategori: 'Tabungan', name: 'Dana Darurat', budget: 'Rp2.000.000', actual: 'Rp2.000.000', diff: 'Rp0', neut: true },
    { kategori: 'Pengeluaran', name: 'Lain-lain', budget: 'Rp1.500.000', actual: 'Rp1.200.000', diff: '+Rp300.000', ok: true },
  ];

  const filteredData = filterType === 'Semua Kategori' 
    ? tableData.filter(d => ['Kebutuhan Rumah Tangga', 'Hiburan & Lifestyle', 'Pendidikan & Kursus', 'Cicilan Kendaraan', 'Lain-lain'].includes(d.name)) 
    : tableData.filter(d => d.kategori === filterType);

  const parseRp = (val: string) => parseInt(val.replace(/\D/g, ''), 10) || 0;
  
  const parseDiff = (val: string) => {
    const isNegative = val.includes('-');
    const num = parseRp(val);
    return isNegative ? -num : num;
  };

  const totalBudget = filteredData.reduce((acc, row) => acc + parseRp(row.budget), 0);
  const totalActual = filteredData.reduce((acc, row) => acc + parseRp(row.actual), 0);
  const totalDiff = filteredData.reduce((acc, row) => acc + parseDiff(row.diff), 0);

  const formatRp = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const footerLabel = filterType === 'Semua Kategori' ? 'Total Keseluruhan' : `Total ${filterType}`;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1400px]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">Dashboard Bulanan</h2>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-1">Laporan finansial komprehensif untuk periode berjalan.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex items-center justify-center gap-2 bg-black text-white hover:bg-slate-800 px-4 py-2.5 md:px-6 md:py-2.5 rounded-xl md:rounded-lg text-xs font-bold transition-all shadow-md shadow-slate-200 w-full sm:w-auto">
            <Plus size={14} /> Tambah Cepat
          </button>
        </div>
      </div>

      {/* Top Cards (3 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Card 1: Total Kekayaan */}
        <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Kekayaan</p>
          <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">Rp1.450.000.000</h3>
          <div className="flex items-center gap-1.5 text-blue-500 text-[10px] md:text-xs font-bold">
            <TrendingUp size={14} />
            <span>+4.2% bulan ini</span>
          </div>
        </div>

        {/* Card 2: Tagihan Kartu Kredit */}
        <div className="bg-slate-50 rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tagihan Kartu Kredit</p>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded">
              <CreditCard size={14} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-5 tracking-tight">Rp12.450.000</h3>
          <div className="flex items-end gap-3 w-full">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 w-[75%]" />
            </div>
            <span className="text-[9px] font-black text-slate-400 shrink-0 uppercase tracking-wider">75% Limit</span>
          </div>
        </div>

        {/* Card 3: Hutang Lainnya */}
        <div className="bg-slate-50 rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hutang Lainnya</p>
            <div className="text-slate-600 p-1.5 bg-white rounded shadow-sm border border-slate-50">
              <Landmark size={16} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 tracking-tight">Rp45.000.000</h3>
          <div className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500">
            Jatuh Tempo: 15 Nov
          </div>
        </div>
      </div>

      {/* Middle Grid (Pulse + Cashflows) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Pulse Pasar (1/4 width) */}
        <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Pulse Pasar</p>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          </div>
          <div className="space-y-5">
            {[
              { label: 'BTC/USD', sub: 'Bitcoin', val: '$29,450.21', pct: '+1.2%', up: true, img: 'bg-amber-100 text-amber-600' },
              { label: 'ETH/USD', sub: 'Ethereum', val: '$1,842.10', pct: '-0.4%', up: false, img: 'bg-slate-100 text-slate-600' },
              { label: 'USD/IDR', sub: 'Rupiah', val: 'Rp15.742', pct: '0.00%', neut: true, img: 'bg-emerald-100 text-emerald-600' },
              { label: 'XAU/USD', sub: 'Gold', val: '$1,984.50', pct: '+0.8%', up: true, img: 'bg-amber-50 text-amber-500' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", m.img)}>
                    <Circle size={14} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none mb-1">{m.label}</p>
                    <p className="text-[10px] font-medium text-slate-400">{m.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900 leading-none mb-1">{m.val}</p>
                  <p className={cn(
                    "text-[10px] font-bold",
                    m.neut ? "text-slate-300" : m.up ? "text-blue-500" : "text-rose-500"
                  )}>{m.pct}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2x2 Flow Grid (3/4 width) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Pemasukan */}
          <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm relative shadow-sky-500/5">
             <div className="flex justify-between items-center mb-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pemasukan</p>
               <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-500">Sesuai Target</span>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Rp24.500.000</h3>
             <div className="flex justify-between items-end gap-3">
               <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-slate-900 w-[98%]" />
               </div>
               <span className="text-[9px] font-medium text-slate-400 leading-none">Target: Rp25jt</span>
             </div>
          </div>
          {/* Pengeluaran */}
          <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengeluaran</p>
               <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-500">Waspada</span>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Rp18.200.000</h3>
             <div className="flex justify-between items-end gap-3">
               <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-rose-600 w-full" />
               </div>
               <span className="text-[9px] font-medium text-slate-400 leading-none">Limit: Rp15jt</span>
             </div>
          </div>
          {/* Tabungan */}
          <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm relative shadow-blue-500/5">
             <div className="flex justify-between items-center mb-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tabungan</p>
               <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-500">-12% vs Lm</span>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Rp4.500.000</h3>
             <div className="flex justify-between items-end gap-3">
               <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[90%]" />
               </div>
               <span className="text-[9px] font-medium text-slate-400 leading-none">Target: Rp5jt</span>
             </div>
          </div>
          {/* Investasi */}
          <div className="bg-white rounded-[20px] md:rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm relative shadow-slate-500/5">
             <div className="flex justify-between items-center mb-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investasi</p>
               <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-500 uppercase">Aktif</span>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Rp1.800.000</h3>
             <div className="flex justify-between items-end gap-3">
               <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-slate-800 w-[100%]" />
               </div>
               <span className="text-[9px] font-medium text-slate-400 leading-none">Auto-debet</span>
             </div>
          </div>
        </div>
      </div>

      {/* Insight Row */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={14} className="fill-slate-900 text-slate-900" />
          <h4 className="text-[10px] font-black tracking-widest uppercase text-slate-800">Insight: Transaksi Tertinggi</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Item 1 */}
          <div className="bg-white rounded-xl p-3.5 md:p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <ShoppingBag size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Shopping</p>
              <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">IKEA Furniture</p>
              <p className="text-[10px] font-black text-rose-500 mt-1">Rp6.200.000</p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="bg-white rounded-xl p-3.5 md:p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Utensils size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Dining</p>
              <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">Oma Elly Trattoria</p>
              <p className="text-[10px] font-black text-slate-600 mt-1">Rp1.250.000</p>
            </div>
          </div>
          {/* Item 3 */}
          <div className="bg-white rounded-xl p-3.5 md:p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-100 text-indigo-500 flex items-center justify-center shrink-0">
              <Car size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Transport</p>
              <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">Pertamina Shell</p>
              <p className="text-[10px] font-black text-slate-600 mt-1">Rp850.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-[20px] md:rounded-[20px] shadow-sm overflow-hidden mb-10">
        <div className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <h3 className="text-sm md:text-[15px] font-bold text-slate-900">Detail Anggaran & Realisasi</h3>
            <span className="hidden xs:inline text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">(Dalam IDR)</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 relative w-full lg:w-auto">
            <div className="relative w-full sm:flex-1 lg:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari item..." className="w-full pl-9 pr-4 py-2.5 md:py-2 bg-slate-50 border-none rounded-lg text-xs text-slate-600 font-medium focus:ring-0 outline-none" />
            </div>
            <div className="relative w-full sm:w-auto">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 md:h-8 w-full sm:w-[140px] px-3 flex items-center justify-between gap-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold"
              >
                <span className="truncate">{filterType}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-full sm:w-40 bg-white border border-slate-100 rounded-xl shadow-lg shadow-indigo-500/10 z-10 py-2">
                  {['Semua Kategori', 'Pemasukan', 'Pengeluaran', 'Investasi', 'Tabungan'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setFilterType(cat); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px] md:min-w-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-[0.15em] text-slate-400">Kategori / Item</th>
                <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-[0.15em] text-slate-400 text-right">Budget</th>
                <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-[0.15em] text-slate-400 text-right">Aktual</th>
                <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-[0.15em] text-slate-400 text-right w-24">Selisih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 md:px-6 py-4 md:py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="font-bold text-slate-700">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4 md:py-5 text-right font-black text-slate-400">{row.budget}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 text-right font-black text-slate-600">{row.actual}</td>
                    <td className={cn(
                      "px-6 py-5 text-right font-black",
                      row.neut ? "text-slate-300" : row.ok ? "text-blue-500" : "text-rose-500"
                    )}>{row.diff}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium italic text-sm">
                    Belum ada data untuk kategori ini.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-black text-white">
              <tr>
                <td className="px-5 md:px-6 py-4 font-bold text-[10px] uppercase tracking-widest pl-5 md:pl-11 rounded-bl-2xl md:rounded-bl-[20px]">
                  {footerLabel}
                </td>
                <td className="px-5 md:px-6 py-4 font-black text-xs text-right text-slate-400">
                  {formatRp(totalBudget)}
                </td>
                <td className="px-5 md:px-6 py-4 font-black text-xs text-right">
                  {formatRp(totalActual)}
                </td>
                <td className={cn(
                  "px-5 md:px-6 py-4 font-black text-xs text-right rounded-br-2xl md:rounded-br-[20px]",
                  totalDiff < 0 ? "text-rose-400" : totalDiff > 0 ? "text-emerald-400" : "text-slate-400"
                )}>
                  {totalDiff > 0 ? '+' : ''}{formatRp(totalDiff)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

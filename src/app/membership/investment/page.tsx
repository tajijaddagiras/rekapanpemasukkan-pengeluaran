"use client";

import { useState } from 'react';
import { 
  TrendingUp, 
  Plus,
  CheckCircle2,
  Clock,
  Briefcase,
  PieChart,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InvestmentDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('Februari');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Doughnut Chart Simulation Component
  const SimulatedDoughnut = ({ percentage }: { percentage: number }) => {
    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 1.5;
    const circumference = normalizedRadius * 2 * Math.PI;

    return (
      <div className="relative flex items-center justify-center w-32 h-32">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          {/* Gray Background / 10% */}
          <circle
            stroke="#e2e8f0" // slate-200
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* 70% Segment */}
          <circle
            stroke="#064e3b" // emerald-950
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: circumference - (70 / 100) * circumference }}
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          {/* 20% Segment - offset from 70% */}
          <circle
            stroke="#10b981" // emerald-500
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset: circumference - (20 / 100) * circumference,
              rotate: '252deg', // (70/100) * 360
              transformOrigin: '50% 50%'
            }}
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-black text-slate-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1400px]">
      
      {/* 1. Header (Title & Controls) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">Ringkasan Investasi</h1>
          <p className="text-[11px] md:text-xs font-medium text-slate-400 mt-1 max-w-lg leading-relaxed">
            Analisis performa portofolio Anda secara real-time. Data diperbarui berdasarkan penutupan pasar terakhir.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-white border border-slate-100 rounded-lg md:rounded-xl p-1 gap-1 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg whitespace-nowrap">{selectedMonth}</button>
            <button className="flex-1 sm:flex-none px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg whitespace-nowrap">{selectedYear}</button>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#064e3b] text-white px-6 py-3 rounded-xl md:rounded-full text-xs font-black shadow-lg shadow-emerald-900/10 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto">
            <Plus size={14} />
            <span className="whitespace-nowrap">Tambah Investasi</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        
        {/* Total Aset */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Total Aset Investasi</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Building2 size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] md:text-[12px] font-bold text-slate-900">Rp</h3>
            <p className="text-lg md:text-2xl font-black text-slate-900 tracking-tight mt-1 leading-none">1.240.500.000</p>
            <p className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-emerald-500 mt-2 md:mt-3 leading-none">
              <ArrowUpRight size={12} />
              +12.4% ROI
            </p>
          </div>
        </div>

        {/* Total Modal */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Total Modal Investasi</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <Wallet size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] md:text-[12px] font-bold text-slate-900">Rp</h3>
            <p className="text-lg md:text-2xl font-black text-slate-900 tracking-tight mt-1 leading-none">1.100.000.000</p>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 mt-2 md:mt-3 leading-none">
              Selisih: Rp 140.5jt
            </p>
          </div>
        </div>

        {/* Keuntungan Terrealisasi */}
        <div className="bg-[#023326] rounded-[20px] md:rounded-[24px] p-4 md:p-6 border border-emerald-950 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <p className="text-[8px] md:text-[9px] font-black text-emerald-100/50 uppercase tracking-[0.1em]">Keuntungan Terrealisasi</p>
            <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-300">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] md:text-[12px] font-bold text-white">Rp</h3>
            <p className="text-lg md:text-2xl font-black text-white tracking-tight mt-1 leading-none">45.200.000</p>
            <p className="text-[9px] md:text-[10px] font-bold text-emerald-400 mt-2 md:mt-3 leading-none">
              +4.1% bulan ini
            </p>
          </div>
        </div>

        {/* Keuntungan Belum Terrealisasi */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-4 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Keuntungan Belum Terrealisasi</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] md:text-sm font-bold text-slate-900">Rp</h3>
            <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-1">95.300.000</p>
            <p className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-emerald-500 mt-2">
              +8.2% floating
            </p>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid (Allocation Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alokasi Portofolio Tipe */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-[13px] md:text-sm font-bold text-slate-900 mb-4 md:mb-8 tracking-tight">Alokasi Portofolio Tipe</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
            <div className="shrink-0">
              <SimulatedDoughnut percentage={70} />
            </div>
            <div className="space-y-3 md:space-y-4 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#064e3b] shrink-0" />
                <p className="text-[11px] font-bold text-slate-900">Saham (70%)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-[11px] font-bold text-slate-500">Pasar Uang (20%)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-slate-200 shrink-0" />
                <p className="text-[11px] font-bold text-slate-400">Lainnya (10%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alokasi Portofolio Aset */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-[13px] md:text-sm font-bold text-slate-900 mb-4 md:mb-8 tracking-tight">Alokasi Portofolio Aset</h3>
          <div className="space-y-6">
            {[
              { label: 'BBCA', value: 25 },
              { label: 'TLKM', value: 18 },
              { label: 'GOTO', value: 12 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-900 tracking-wider">{item.label}</span>
                  <span className="text-[10px] font-bold text-slate-400">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#064e3b] h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${item.value * 3}%` }} // Scale for visual
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Investasi Sidebar */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-8 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h3 className="text-[13px] md:text-sm font-bold text-slate-900 tracking-tight">Platform Investasi</h3>
            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Lihat Semua</button>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Ajaib Sekuritas', sub: 'Saham & Reksa Dana', value: 'Rp 450M', icon: Building2 },
              { label: 'Indodax', sub: 'Crypto Assets', value: 'Rp 120M', icon: PieChart },
              { label: 'Bibit', sub: 'Obligasi & SBN', value: 'Rp 300M', icon: ShieldCheck },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between group cursor-pointer overflow-hidden">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors shrink-0">
                    <p.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-slate-900 leading-tight truncate">{p.label}</p>
                    <p className="text-[9px] font-medium text-slate-400 truncate">{p.sub}</p>
                  </div>
                </div>
                <span className="text-[11px] font-black text-slate-900 shrink-0 ml-2">{p.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-8 border border-slate-100 shadow-sm">
        <h3 className="text-[13px] md:text-sm font-bold text-slate-900 mb-4 md:mb-6">Return Investasi Tertinggi</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'BBCA', val: '+32.4%' },
            { label: 'BMRI', val: '+28.1%' },
            { label: 'AMRT', val: '+19.5%' },
            { label: 'ICBP', val: '+15.2%' },
          ].map((r) => (
            <div key={r.label} className="bg-emerald-50/30 rounded-xl p-3 md:p-4 border border-emerald-50/50">
              <p className="text-[8px] md:text-[9px] font-black text-emerald-300 uppercase tracking-widest mb-1">{r.label}</p>
              <p className="text-base md:text-lg font-black text-emerald-600 tracking-tight">{r.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Portfolio Tables */}
      <div className="space-y-6">
        
        {/* Table 1: Saham */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 md:p-6 md:px-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-[13px] md:text-[15px] font-bold text-slate-900">Ringkasan Portofolio Saham</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><BarChart2 size={16} /></button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ArrowUpRight size={16} /></button>
            </div>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap min-w-[750px] md:min-w-0">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-5 md:px-8 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Kode Saham</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Lembar</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Harga Rata-Rata</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Harga Saat Ini</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Total Nilai</th>
                  <th className="px-5 md:px-8 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400 text-right">Return (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { code: 'BBCA', shares: '10.000', avg: 'Rp 7.200', current: 'Rp 9.500', total: 'Rp 95.000.000', return: '+31.9%', color: 'text-emerald-500', iconBg: 'bg-emerald-900' },
                  { code: 'TLKM', shares: '50.000', avg: 'Rp 4.100', current: 'Rp 3.950', total: 'Rp 197.500.000', return: '-3.6%', color: 'text-rose-500', iconBg: 'bg-emerald-700' },
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-5 md:px-8 py-4 md:py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black", s.iconBg)}>
                          {s.code[0]}
                        </div>
                        <span className="font-black text-slate-900">{s.code}</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-bold text-slate-500">{s.shares}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-bold text-slate-500">{s.avg}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-black text-slate-900">{s.current}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-black text-slate-900">{s.total}</td>
                    <td className={cn("px-5 md:px-8 py-4 md:py-5 text-right font-black", s.color)}>{s.return}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Others */}
        <div className="bg-white rounded-[20px] md:rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-10">
          <div className="p-4 md:px-8 border-b border-slate-50">
            <h3 className="text-[13px] md:text-[15px] font-bold text-slate-900">Ringkasan Portofolio Investasi Lainnya</h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs whitespace-nowrap min-w-[750px] md:min-w-0">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-5 md:px-8 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400 text-left">Jenis Aset</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Platform</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Modal Pokok</th>
                  <th className="px-5 md:px-6 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400">Nilai Sekarang</th>
                  <th className="px-5 md:px-8 py-4 font-bold text-[9px] uppercase tracking-widest text-slate-400 text-right">Keuntungan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { type: 'SBN (ORI023)', platform: 'Bibit', modal: 'Rp 50.000.000', current: 'Rp 51.250.000', profit: 'Rp 1.250.000' },
                  { type: 'Bitcoin (BTC)', platform: 'Indodax', modal: 'Rp 20.000.000', current: 'Rp 28.400.000', profit: 'Rp 8.400.000' },
                ].map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-5 md:px-8 py-4 md:py-5 font-black text-slate-900">{a.type}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-bold text-slate-400">{a.platform}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-black text-slate-900">{a.modal}</td>
                    <td className="px-5 md:px-6 py-4 md:py-5 font-black text-slate-900">{a.current}</td>
                    <td className="px-5 md:px-8 py-4 md:py-5 text-right font-black text-emerald-600">{a.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

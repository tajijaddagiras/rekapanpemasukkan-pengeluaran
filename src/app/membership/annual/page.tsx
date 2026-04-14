"use client";

import { useState } from 'react';
import { 
  TrendingUp, 
  WalletCards, 
  Landmark, 
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnnualDashboard() {
  const [selectedYear, setSelectedYear] = useState('2026');

  // Circular Progress Helper Component
  const CircularProgress = ({ value, colorClass, strokeClass }: {value: number, colorClass: string, strokeClass: string}) => {
    const radius = 18;
    const stroke = 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          <circle 
            stroke="#f1f5f9" 
            strokeWidth={stroke} 
            fill="transparent" 
            r={normalizedRadius} 
            cx={radius} 
            cy={radius} 
          />
          <circle 
            className={strokeClass}
            strokeDasharray={circumference + ' ' + circumference} 
            style={{ strokeDashoffset }} 
            strokeWidth={stroke} 
            fill="transparent" 
            r={normalizedRadius} 
            cx={radius} 
            cy={radius} 
            strokeLinecap="round"
          />
        </svg>
        <span className={cn("absolute text-[10px] font-bold", colorClass)}>{value}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1400px]">
      
      {/* 1. Header (Top Bar) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">Annual Dashboard</h2>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-1 max-w-sm leading-relaxed">Reviewing your financial performance for the current fiscal year.</p>
        </div>
        
        {/* Year Selectors Pill */}
        <div className="flex items-center bg-white border border-slate-100 rounded-lg md:rounded-xl p-1 shadow-sm w-full md:w-auto">
          {['2024', '2025', '2026'].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all",
                selectedYear === year 
                  ? "bg-slate-900 text-white shadow" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Summary Cards (4 Cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        
        {/* Card 1: Pemasukan */}
        <div className="bg-white rounded-[20px] p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pemasukan</p>
            <CircularProgress value={75} colorClass="text-slate-700" strokeClass="stroke-sky-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs md:text-lg font-bold text-slate-900">Rp</span>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">450.000.000</h3>
            </div>
            <div className="flex justify-between items-center mt-3 md:mt-5">
              <div>
                <p className="text-[9px] text-slate-400 font-medium leading-none mb-1">Target/Budget</p>
                <p className="text-[10px] font-bold text-slate-600 leading-none">Rp500.000.000</p>
              </div>
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-sky-50 text-sky-500 text-[9px] md:text-[10px] font-bold rounded-full">On Track</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pengeluaran */}
        <div className="bg-white rounded-[20px] p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengeluaran</p>
            <CircularProgress value={50} colorClass="text-slate-700" strokeClass="stroke-rose-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs md:text-lg font-bold text-slate-900">Rp</span>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">210.000.000</h3>
            </div>
            <div className="flex justify-between items-center mt-3 md:mt-5">
              <div>
                <p className="text-[9px] text-slate-400 font-medium leading-none mb-1">Target/Budget</p>
                <p className="text-[10px] font-bold text-slate-600 leading-none">Rp420.000.000</p>
              </div>
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-rose-50 text-rose-500 text-[9px] md:text-[10px] font-bold rounded-full">Caution</span>
            </div>
          </div>
        </div>

        {/* Card 3: Tabungan */}
        <div className="bg-white rounded-[20px] p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tabungan</p>
            <CircularProgress value={90} colorClass="text-slate-700" strokeClass="stroke-slate-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs md:text-lg font-bold text-slate-900">Rp</span>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">120.000.000</h3>
            </div>
            <div className="flex justify-between items-center mt-3 md:mt-5">
              <div>
                <p className="text-[9px] text-slate-400 font-medium leading-none mb-1">Target/Budget</p>
                <p className="text-[10px] font-bold text-slate-600 leading-none">Rp133.000.000</p>
              </div>
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-indigo-50 text-indigo-500 text-[9px] md:text-[10px] font-bold rounded-full">Goal Near</span>
            </div>
          </div>
        </div>

        {/* Card 4: Investasi */}
        <div className="bg-white rounded-[20px] p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investasi</p>
            <CircularProgress value={40} colorClass="text-slate-700" strokeClass="stroke-teal-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs md:text-lg font-bold text-slate-900">Rp</span>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">100.000.000</h3>
            </div>
            <div className="flex justify-between items-center mt-3 md:mt-5">
              <div>
                <p className="text-[9px] text-slate-400 font-medium leading-none mb-1">Target/Budget</p>
                <p className="text-[10px] font-bold text-slate-600 leading-none">Rp250.000.000</p>
              </div>
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-100 text-slate-500 text-[9px] md:text-[10px] font-bold rounded-full">Growing</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Area (2/3 Graph + 1/3 Sidebar List) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* GRAPH SECTION (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-8 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 md:mb-10">
            <div>
              <h3 className="text-[14px] md:text-[18px] font-bold text-slate-900 leading-tight">Perbandingan Kategori Tahunan</h3>
              <p className="text-[11px] md:text-xs font-medium text-slate-400 mt-1 max-w-sm">Visual comparison of selected financial metrics across 12 months.</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 bg-slate-50 p-1 md:p-1.5 rounded-lg border border-slate-100 text-[9px] md:text-xs font-bold text-slate-400 w-full md:w-fit overflow-x-auto custom-scrollbar">
              <div className="flex items-center">
                <span className="px-3 py-1.5 bg-white text-slate-700 rounded shadow-sm whitespace-nowrap">Category 1: Salary</span>
                <span className="px-2 italic text-[10px]">VS</span>
                <span className="px-3 py-1.5 text-slate-500 whitespace-nowrap">Category 2: Rent</span>
              </div>
            </div>
          </div>

          {/* Simulated Bar Chart Layout */}
          <div className="bg-slate-50/50 rounded-xl p-3 md:p-4 h-[180px] md:h-[280px] flex items-end justify-between gap-1.5 md:gap-4 relative px-2 md:px-8 border border-slate-50 overflow-x-auto custom-scrollbar">
            {/* Example 12 Months mock bars */}
            {[
              { m: 'JAN', b1: 45, b2: 60 },
              { m: 'FEB', b1: 65, b2: 40 },
              { m: 'MAR', b1: 90, b2: 50 },
              { m: 'APR', b1: 40, b2: 70 },
              { m: 'MAY', b1: 55, b2: 25 },
              { m: 'JUN', b1: 35, b2: 85 },
              { m: 'JUL', b1: 100, b2: 20 },
              { m: 'AUG', b1: 65, b2: 55 },
              { m: 'SEP', b1: 80, b2: 60 },
              { m: 'OCT', b1: 30, b2: 75 },
              { m: 'NOV', b1: 65, b2: 50 },
              { m: 'DEC', b1: 70, b2: 85 },
            ].map((col) => (
              <div key={col.m} className="flex flex-col items-center gap-3 w-full h-full justify-end group">
                <div className="flex items-end gap-1 w-full justify-center h-[200px]">
                  <div 
                    className="w-1/2 max-w-[12px] bg-slate-200 rounded-t-sm group-hover:bg-slate-300 transition-colors" 
                    style={{ height: `${col.b1}%` }}
                  />
                  <div 
                    className="w-1/2 max-w-[12px] bg-slate-600 rounded-t-sm group-hover:bg-slate-700 transition-colors" 
                    style={{ height: `${col.b2}%` }}
                  />
                </div>
                <span className="text-[7px] md:text-[8px] font-bold text-slate-400 tracking-tight md:tracking-widest uppercase">{col.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR SECTION (1/3) */}
        <div className="lg:col-span-1 space-y-4 flex flex-col">
          <h3 className="text-[14px] font-bold text-slate-800 mb-2 mt-2 px-1">Transaksi Tertinggi</h3>
          
          <div className="flex-1 flex flex-col gap-4">
            {/* Transaksi 1 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-sky-500">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Pemasukan</p>
                  <p className="text-xs font-bold text-slate-900">Proyek Korporasi X</p>
                </div>
              </div>
              <span className="text-xs font-black text-sky-500">+Rp 85jt</span>
            </div>

            {/* Transaksi 2 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500">
                  <WalletCards size={16} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Pengeluaran</p>
                  <p className="text-xs font-bold text-slate-900">Sewa Kantor Tahunan</p>
                </div>
              </div>
              <span className="text-xs font-black text-rose-500">-Rp 120jt</span>
            </div>

            {/* Transaksi 3 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <Landmark size={16} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Tabungan</p>
                  <p className="text-xs font-bold text-slate-900">Dana Darurat</p>
                </div>
              </div>
              <span className="text-xs font-black text-slate-900">Rp 40jt</span>
            </div>

            {/* Transaksi 4 */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Investasi</p>
                  <p className="text-xs font-bold text-slate-900">Saham Blue Chip</p>
                </div>
              </div>
              <span className="text-xs font-black text-slate-900">Rp 65jt</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Area Tabel (Rincian Anggaran Tahunan) */}
      <div className="bg-white rounded-[20px] md:rounded-[24px] shadow-sm overflow-hidden mb-10 border border-slate-100">
        <div className="p-4 md:p-6 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
          <h3 className="text-sm md:text-[16px] font-bold text-slate-900">Rincian Anggaran Tahunan</h3>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-3 md:px-4 py-1 md:py-1.5 w-fit">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-300" />
            <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest">Dalam IDR</span>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px] md:min-w-0">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-5 md:px-8 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400">Item</th>
                <th className="px-5 md:px-6 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400">Budget</th>
                <th className="px-5 md:px-6 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400">Aktual</th>
                <th className="px-5 md:px-6 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400">Selisih</th>
                <th className="px-5 md:px-8 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-slate-400 text-right w-28">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { 
                  item: 'Operasional Bisnis', 
                  budget: 'Rp 150.000.000', 
                  actual: 'Rp 142.500.000', 
                  diff: 'Rp 7.500.000', 
                  diffColor: 'text-sky-500',
                  status: 'HEMAT', 
                  statusStyle: 'text-sky-500 border-sky-100 bg-white'
                },
                { 
                  item: 'Marketing & Ads', 
                  budget: 'Rp 45.000.000', 
                  actual: 'Rp 48.200.000', 
                  diff: '-Rp 3.200.000', 
                  diffColor: 'text-rose-500',
                  status: 'OVER', 
                  statusStyle: 'text-rose-500 border-rose-100 bg-white'
                },
                { 
                  item: 'Pengembangan SDM', 
                  budget: 'Rp 30.000.000', 
                  actual: 'Rp 25.000.000', 
                  diff: 'Rp 5.000.000', 
                  diffColor: 'text-sky-500',
                  status: 'HEMAT', 
                  statusStyle: 'text-sky-500 border-sky-100 bg-white'
                },
                { 
                  item: 'Infrastruktur IT', 
                  budget: 'Rp 80.000.000', 
                  actual: 'Rp 80.000.000', 
                  diff: 'Rp 0', 
                  diffColor: 'text-slate-400',
                  status: 'SESUAI', 
                  statusStyle: 'text-slate-400 border-slate-200 bg-white'
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 md:px-8 py-4 md:py-6 font-bold text-slate-800">{row.item}</td>
                  <td className="px-5 md:px-6 py-4 md:py-6 font-bold text-slate-400 tracking-tight">{row.budget}</td>
                  <td className="px-5 md:px-6 py-4 md:py-6 font-black text-slate-800 tracking-tight">{row.actual}</td>
                  <td className={cn("px-5 md:px-6 py-4 md:py-6 font-black tracking-tight", row.diffColor)}>{row.diff}</td>
                  <td className="px-5 md:px-8 py-4 md:py-6 text-right">
                    <span className={cn(
                      "inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest border",
                      row.statusStyle
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  ChevronDown, 
  SlidersHorizontal,
  Wallet,
  Target,
  Minus,
  Copy,
  Trash2,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export default function SavingsPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Tabungan</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Kelola dana cadangan dan pantau progres pencapaian target tabungan impian Anda.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
            <PlusCircle size={16} />
            Setoran Baru
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards (Only 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Saldo */}
        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[150px] md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Wallet size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Saldo</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 12.500.200</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">+ Rp 850.000 Bulan ini</p>
          </div>
          <TrendingUp size={48} className="absolute -right-2 -bottom-2 text-indigo-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        {/* Target Tabungan */}
        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-auto md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Tabungan</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 50.000.000</h3>
            <div className="mt-2 w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100/50">
              <div className="bg-indigo-600 h-full w-[25%] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]" />
            </div>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">25.0% dari target terkumpul</p>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[280px] relative group">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari alokasi tabungan..." 
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex items-center gap-2 md:gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-2.5 md:py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Semua Rekening <ChevronDown size={14} />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1100px] md:min-w-0">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal Display</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mata Uang</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Nominal</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Sub Kategori</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Dari</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Ke</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">14 Feb 2024</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">14/02/2024</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap font-bold text-slate-900 text-sm">Setoran Dana Darurat</td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm uppercase text-center">IDR</td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">500.000</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase tracking-widest">Savings</span>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm">BCA Tabungan</td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm">Dana Darurat</td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">10 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">10/02/2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-900 text-sm">Tabungan Liburan</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm uppercase text-center">IDR</td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">200.000</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">Travel Fund</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">Mandiri Utama</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">Liburan Bali</td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 5. Footer Table */}
        <div className="px-8 py-6 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-[11px] font-bold text-slate-400">2 Rencana tabungan sedang berjalan</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Sebelumnya</button>
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Berikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

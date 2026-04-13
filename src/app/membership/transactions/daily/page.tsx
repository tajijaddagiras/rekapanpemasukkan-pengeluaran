"use client";

import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Calendar, 
  ChevronDown, 
  SlidersHorizontal,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Minus,
  Copy,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DailyTransactionLogPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Transaksi Harian</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Lacak dan kelola aliran keuangan Anda dengan presisi editorial dan kejelasan mutlak.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 md:py-3 rounded-[20px] md:rounded-2xl text-[12px] md:text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto">
            <PlusCircle size={16} />
            Tambah Cepat
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Data */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[140px] md:h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Data</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-slate-900">2</span>
            <span className="text-[10px] md:text-xs font-bold text-slate-400">Transaksi</span>
          </div>
          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-1/3" />
          </div>
        </div>

        {/* Pemasukan */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[140px] md:h-[180px] relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pemasukan</p>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Rp 4.000.000</h3>
            <p className="text-[9px] md:text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">+12.5% vs bulan lalu</p>
          </div>
          <ArrowUpRight size={32} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-100 group-hover:scale-110 transition-transform" />
        </div>

        {/* Pengeluaran */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[140px] md:h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengeluaran</p>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Rp 0</h3>
            <p className="text-[9px] md:text-[10px] font-medium text-slate-400 mt-1">Belum ada pengeluaran</p>
          </div>
          <div className="w-8 h-[2px] bg-slate-100" />
        </div>

        {/* Filter Aktif */}
        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[140px] md:h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Aktif</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-lg uppercase tracking-widest">Februari 2024</span>
            <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-slate-50 text-slate-400 text-[8px] font-black rounded-lg uppercase tracking-widest">All Type</span>
          </div>
          <button className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-left hover:text-rose-500 transition-colors w-fit">Clear All</button>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="w-full md:flex-1 md:w-auto md:min-w-[280px] relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari deskripsi atau nominal..." 
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-[16px] md:rounded-2xl py-3.5 md:py-4 pl-12 md:pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-100 rounded-[14px] md:rounded-2xl px-4 py-3 text-[11px] md:text-xs font-bold text-slate-600">
            <Calendar size={14} className="text-slate-400 hidden xs:block" />
            <span>12/02/2024</span>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-[14px] md:rounded-2xl px-4 py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Feb <span className="hidden xs:inline">ruari</span> <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-[14px] md:rounded-2xl px-4 py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            2024 <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-[14px] md:rounded-2xl px-4 py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Tipe <ChevronDown size={14} className="hidden xs:block" />
          </button>
          <button className="w-[42px] h-[42px] md:w-12 md:h-12 rounded-[14px] md:rounded-2xl bg-slate-50 border border-slate-100 flexitems-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center shrink-0">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1100px] xl:min-w-0">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Mata Uang</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Nominal</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kategori</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tenor</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Bunga/Bln</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Total Bunga</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                  <p className="text-xs md:text-sm font-black text-slate-900">12 Feb 2024</p>
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mt-0.5">14:20 WIB</p>
                </td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                  <p className="text-xs md:text-sm font-bold text-slate-900">Gaji Bulanan</p>
                  <span className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-widest">Income</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">IDR</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-blue-600 tracking-tight">4.000.000,00</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                      <Wallet size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Main Salary</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">
                      BCA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Tabungan Utama</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <Minus size={14} className="mx-auto text-slate-300" />
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">Rp 0</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">Rp 0</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all" title="Duplikat">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all" title="Hapus">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">10 Feb 2024</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">09:15 WIB</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">Bonus Project X</p>
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Income</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">IDR</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-blue-600 tracking-tight">1.500.000,00</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                      <TrendingUp size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Bonus</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">
                      BCA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Tabungan Utama</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <Minus size={14} className="mx-auto text-slate-300" />
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">Rp 0</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">Rp 0</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all" title="Duplikat">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all" title="Hapus">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 5. Footer Table (Pagination) */}
        <div className="px-5 md:px-8 py-5 md:py-6 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-[10px] md:text-[11px] font-bold text-slate-400 text-center md:text-left">Menampilkan 2 dari 2 transaksi</p>
          <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 md:px-5 py-3 md:py-2.5 bg-white border border-slate-100 rounded-[14px] md:rounded-xl text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Habis</button>
            <button className="flex-1 md:flex-none px-4 md:px-5 py-3 md:py-2.5 bg-white border border-slate-100 rounded-[14px] md:rounded-xl text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Lanjut</button>
          </div>
        </div>
      </div>

    </div>
  );
}

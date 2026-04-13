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
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Transaksi Harian</h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Lacak dan kelola aliran keuangan Anda dengan presisi editorial dan kejelasan mutlak.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
            <PlusCircle size={16} />
            Tambah Cepat
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Data */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Data</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">2</span>
            <span className="text-xs font-bold text-slate-400">Transaksi</span>
          </div>
          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-1/3" />
          </div>
        </div>

        {/* Pemasukan */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px] relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pemasukan</p>
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">Rp 4.000.000</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">+12.5% vs bulan lalu</p>
          </div>
          <ArrowUpRight size={32} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-100 group-hover:scale-110 transition-transform" />
        </div>

        {/* Pengeluaran */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengeluaran</p>
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">Rp 0</h3>
            <p className="text-[10px] font-medium text-slate-400 mt-1">Belum ada pengeluaran</p>
          </div>
          <div className="w-8 h-[2px] bg-slate-100" />
        </div>

        {/* Filter Aktif */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Aktif</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-lg uppercase tracking-widest">Februari 2024</span>
            <span className="px-3 py-1.5 bg-slate-50 text-slate-400 text-[8px] font-black rounded-lg uppercase tracking-widest">All Type</span>
          </div>
          <button className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-left hover:text-rose-500 transition-colors">Clear All</button>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[280px] relative group">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari deskripsi atau nominal..." 
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-4 pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>12/02/2024</span>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Februari <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            2024 <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Semua Tipe <ChevronDown size={14} />
          </button>
          <button className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Mata Uang</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Nominal</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kategori</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tenor Cicilan</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Bunga Perbulan</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Total Bunga</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">12 Feb 2024</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">14:20 WIB</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">Gaji Bulanan</p>
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Income</span>
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
        <div className="px-8 py-6 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-[11px] font-bold text-slate-400">Menampilkan 2 dari 2 transaksi</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Sebelumnya</button>
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Berikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

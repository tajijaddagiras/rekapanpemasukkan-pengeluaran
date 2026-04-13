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
  Briefcase,
  Minus,
  Copy,
  Trash2,
  BarChart3
} from 'lucide-react';

export default function StockInvestmentPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Investasi Saham</h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Pantau portofolio saham Anda dengan analisis posisi dan modal secara real-time.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
            <PlusCircle size={16} />
            Tambah Posisi
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards (Only 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Posisi */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BarChart3 size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Posisi</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 25.400.000</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-wider">+4.2% Unrealized Profit</p>
          </div>
          <TrendingUp size={64} className="absolute -right-4 -bottom-4 text-emerald-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        {/* Estimasi Modal */}
        <div className="bg-white p-8 rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
              <Briefcase size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Modal</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 24.350.000</h3>
            <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">Net Investment Value</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[280px] relative group">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari kode saham atau deskripsi..." 
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
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kode Saham</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Icon/Logo</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Kode Bursa</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mata Uang</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Lembar Saham</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Harga Perlembar</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tipe Transaksi</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Kategori</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Platform</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">12 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-blue-600">BBCA</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">B</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600 uppercase">IDX</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600 uppercase">IDR</p>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">5.000</p>
                  <p className="text-[10px] font-bold text-slate-400 lowercase">50 lot</p>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">9.850</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-widest">Buy Order</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">Finance</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">RDN - BCA</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">Stockbit</p>
                </td>
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
              {/* Row 2 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">10 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-emerald-600">TLKM</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-[10px] font-black text-white">T</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600 uppercase">IDX</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600 uppercase">IDR</p>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">10.000</p>
                  <p className="text-[10px] font-bold text-slate-400 lowercase">100 lot</p>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">3.950</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-widest">Buy Order</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-widest">Telco</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">RDN - Mandiri</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">Ajaib</p>
                </td>
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
          <p className="text-[11px] font-bold text-slate-400">Menampilkan 2 aset dalam portofolio</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Sebelumnya</button>
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Berikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

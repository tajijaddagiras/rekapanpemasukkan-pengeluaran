"use client";

import { useState } from 'react';
import {
  PlusCircle,
  Search,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  CreditCard,
  Minus,
  Copy,
  Trash2,
  Send,
  Download
} from 'lucide-react';

export default function TopUpPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Top Up & Transfer</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Riwayat lengkap pemindahan dana antar rekening, e-wallet, dan pengisian saldo.
          </p>
        </div>

        <div className="flex flex-col md:items-end w-full md:w-auto mt-4 md:mt-0">
          <button className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[12px] md:text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto">
            <PlusCircle size={16} />
            Transfer Baru
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards (Only 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Total Transaksi */}
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 md:gap-6 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ArrowUpDown size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Transaksi</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Rp 8.420.000</h3>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Across 12 transfers this month</p>
          </div>
          <Send size={48} className="absolute -right-2 -bottom-2 text-blue-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        {/* Biaya Admin */}
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 md:gap-6 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <CreditCard size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biaya Admin</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-rose-600 leading-tight">Rp 24.500</h3>
            <p className="text-[10px] font-bold text-rose-400 mt-1 uppercase tracking-widest">Accumulated Transaction Fees</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-rose-600 border-t-transparent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="w-full md:flex-1 md:w-auto md:min-w-[280px] relative group">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Cari berita transfer atau nomor..."
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-[16px] md:rounded-2xl py-3.5 md:py-4 pl-12 md:pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-100 rounded-[14px] md:rounded-2xl px-4 py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Februari <ChevronDown size={14} />
          </button>
          <button className="w-[42px] h-[42px] md:w-12 md:h-12 rounded-[14px] md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shrink-0">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px] xl:min-w-0">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal Display</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Deskripsi</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mata Uang</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Nominal</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Dari</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Ke</th>
                <th className="px-5 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">14 Feb 2024</p>
                </td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">14/02/2024</p>
                </td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap font-bold text-slate-900 text-sm">Top Up OVO dari Rekening BCA</td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm uppercase text-center">IDR</td>
                <td className="px-5 md:px-8 py-4 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">500.000</p>
                </td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm">BCA - 098...</td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap font-bold text-slate-600 text-sm">OVO - 081...</td>
                <td className="px-5 md:px-8 py-4 md:py-6 whitespace-nowrap">
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
                  <p className="text-sm font-black text-slate-900">12 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">12/02/2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-900 text-sm">Transfer Antar Bank Mandiri</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm uppercase text-center">IDR</td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">2.000.000</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">BCA - 098...</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">BNI - 122...</td>
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
        <div className="px-5 md:px-8 py-5 md:py-6 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-[10px] md:text-[11px] font-bold text-slate-400 text-center md:text-left">Total 12 transaksi transfer terdeteksi bulan ini</p>
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <button className="px-4 md:px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed w-full">Sebelumnya</button>
            <button className="px-4 md:px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed w-full">Berikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

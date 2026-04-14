"use client";

import { useState } from 'react';
import {
  PlusCircle,
  Search,
  Calendar,
  ChevronDown,
  SlidersHorizontal,
  Banknote,
  Percent,
  Minus,
  Copy,
  Trash2,
  Clock
} from 'lucide-react';

export default function DepositoPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Deposito</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Kelola penempatan dana deposito Anda dan pantau estimasi bunga yang akan diterima.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto mt-4 md:mt-0">
            <PlusCircle size={16} />
            Buka Deposito
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards (Only 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Deposito */}
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 md:gap-8 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Banknote size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Deposito</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 150.000.000</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Across 3 active placements</p>
          </div>
          <Clock size={48} className="absolute -right-2 -bottom-2 text-orange-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        {/* Estimasi Bunga */}
        <div className="bg-white p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col gap-4 md:gap-8 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Percent size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Bunga</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 650.000</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">Expected Monthly Yield</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[280px] relative group">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Cari bank atau nomor bilyet..."
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-2.5 md:py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Semua Bank <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-2.5 md:py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            2024 <ChevronDown size={14} />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1200px] md:min-w-0">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal Buka</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Nama Deposito</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Bank / Institusi</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mata Uang</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Nominal</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Durasi (Bulan)</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Bunga Tahunan</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tipe Transaksi</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Kategori</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">01 Jan 2024</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">Deposito Pendidikan A</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">BCA</div>
                    <p className="text-sm font-bold text-slate-600">Bank BCA</p>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap text-center text-sm font-bold text-slate-600 uppercase">IDR</td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">100.000.000</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[8px] font-black rounded uppercase tracking-widest">12 Bulan</span>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-emerald-600">4.5% p.a</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">Fixed Rate</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase tracking-widest">Investasi</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">BCA - 098...</p>
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
                  <p className="text-sm font-black text-slate-900">15 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">E-Deposito Dana Darurat</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-[8px] font-black text-white">BNI</div>
                    <p className="text-sm font-bold text-slate-600">Bank BNI</p>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-center text-sm font-bold text-slate-600 uppercase">IDR</td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">50.000.000</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[8px] font-black rounded uppercase tracking-widest">6 Bulan</span>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-emerald-600">5.0% p.a</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">Aro</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase tracking-widest">Dana Darurat</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-600">BNI - 122...</p>
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
        <div className="px-5 md:px-8 py-5 md:py-6 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-[11px] font-bold text-slate-400 text-center md:text-left">Menampilkan 2 bilyet deposito aktif</p>
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <button className="px-4 md:px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed w-full">Sblmnya</button>
            <button className="px-4 md:px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed w-full">Brikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

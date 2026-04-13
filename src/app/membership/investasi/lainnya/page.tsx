"use client";

import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  ChevronDown, 
  SlidersHorizontal,
  PieChart,
  Target,
  Minus,
  Copy,
  Trash2,
  Gem,
  Coins
} from 'lucide-react';

export default function OtherInvestmentsPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Investasi Lainnya</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Lacak aset investasi alternatif Anda seperti Emas, Kripto, Properti, dan lainnya dalam satu tempat.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-[11px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
            <PlusCircle size={16} />
            Tambah Aset
          </button>
        </div>
      </div>

      {/* 2. Top Status Cards (Only 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Aset */}
        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[150px] md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <PieChart size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Aset</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Rp 45.800.000</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Across 4 asset categories</p>
          </div>
          <Gem size={48} className="absolute -right-2 -bottom-2 text-purple-50/50 group-hover:scale-110 transition-transform -rotate-12" />
        </div>

        {/* Profit/Loss */}
        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-slate-50 shadow-sm flex flex-col justify-between h-[150px] md:h-[180px] relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Target size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profit / Loss</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-emerald-600 leading-tight">+ Rp 3.200.000</h3>
            <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">+7.5% All-Time Performance</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-3 md:p-2 rounded-[24px] md:rounded-3xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-[280px] relative group">
          <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari nama aset..." 
            className="w-full bg-slate-50/50 border-transparent focus:border-blue-100 focus:bg-white rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-14 pr-6 text-sm font-medium transition-all"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />

        <div className="flex items-center gap-2 md:gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-2.5 md:py-3 text-[11px] md:text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Semua Kategori <ChevronDown size={14} />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 4. Data Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1300px] md:min-w-0">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tanggal</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Produk Investasi</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Logo Produk</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Mata Uang</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Kuantitas</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Satuan</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Harga per 1 Kuantitas</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Tipe Transaksi</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Kategori</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Rekening</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Platform</th>
                <th className="px-4 md:px-8 py-5 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">20 Jan 2024</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">Emas Antam LM</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <Gem size={14} />
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 whitespace-nowrap text-sm font-bold text-slate-600 uppercase">IDR</td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">10.00</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[8px] font-black rounded uppercase tracking-widest">Gram</span>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">1.050.000</p>
                </td>
                <td className="px-4 md:px-8 py-5 md:py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-widest">Buy Order</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-[8px] font-black rounded uppercase tracking-widest">Commodity</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">BCA Tabungan</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">Brankas Antam</td>
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
                  <p className="text-sm font-black text-slate-900">12 Feb 2024</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <p className="text-sm font-bold text-slate-900">Bitcoin (BTC)</p>
                </td>
                <td className="px-8 py-6 whitespace-nowrap flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Coins size={14} />
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-600 uppercase">USDT</td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">0.025</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[8px] font-black rounded uppercase tracking-widest">Token</span>
                </td>
                <td className="px-8 py-6 text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900">52.400</p>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-widest">Buy Order</span>
                </td>
                <td className="px-8 py-6 text-center whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded uppercase tracking-widest">Crypto</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">E-Wallet LinkAja</td>
                <td className="px-8 py-6 whitespace-nowrap font-bold text-slate-600 text-sm">Indodax</td>
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
          <p className="text-[11px] font-bold text-slate-400">Total 2 aset alternatif terdaftar</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Sebelumnya</button>
            <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">Halaman Berikutnya</button>
          </div>
        </div>
      </div>

    </div>
  );
}

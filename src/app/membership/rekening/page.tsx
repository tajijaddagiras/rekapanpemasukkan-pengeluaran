"use client";

import { 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  ChevronDown, 
  CloudUpload, 
  ShieldCheck, 
  BarChart3, 
  ExternalLink,
  Edit2,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RekeningPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Rekening</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-400 mt-2 max-w-xl leading-relaxed">
            Manage your financial accounts and initial balances with editorial precision.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - FORM (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-50 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight">Settings Rekening & Saldo Awal</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* NAMA REKENING */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Rekening</label>
                <input 
                  type="text" 
                  placeholder="Contoh: BCA Personal"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-6 text-sm font-semibold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              {/* JENIS REKENING */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis Rekening</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-6 text-sm font-semibold text-slate-600 transition-all cursor-pointer">
                    <option>Bank Account</option>
                    <option>E-Wallet</option>
                    <option>Investment Account</option>
                    <option>Cash</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                </div>
              </div>

              {/* MATA UANG */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-2xl py-4 px-6 text-sm font-semibold text-slate-600 transition-all cursor-pointer">
                    <option>IDR - Rupiah</option>
                    <option>USD - United States Dollar</option>
                    <option>EUR - Euro</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                </div>
              </div>

              {/* SALDO AWAL */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Saldo Awal</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-300">Rp</span>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-14 pr-6 text-sm font-semibold text-slate-600 placeholder:text-slate-300 transition-all"
                  />
                </div>
              </div>

              {/* URL LOGO BANK */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">URL Logo Bank</label>
                <input 
                  type="text" 
                  placeholder="https://bank-logo.com/image.png"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-2xl py-4 px-6 text-sm font-semibold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              {/* LABEL LOGO */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Label Logo</label>
                <input 
                  type="text" 
                  placeholder="Short label"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-6 text-sm font-semibold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>
            </div>

            {/* DRAG & DROP ZONE */}
            <div className="mt-8">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-3 block">File Logo (Lokal)</label>
              <div className="border-2 border-dashed border-slate-100 rounded-[28px] md:rounded-[32px] p-8 md:p-12 flex flex-col items-center justify-center group hover:border-blue-200 transition-all cursor-pointer bg-slate-50/30">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors mb-4">
                  <CloudUpload size={20} />
                </div>
                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                  Drag & Drop or <span className="text-blue-600 border-b-2 border-blue-600">Browse</span>
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl md:rounded-2xl text-[11px] font-black shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                Tambah Rekening
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR INFO (1/3) */}
        <div className="space-y-8">
          {/* KEAMANAN DATA CARD */}
          <div className="bg-blue-600 rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-100">
            <div className="relative z-10 space-y-3 md:space-y-4">
              <h3 className="text-lg font-black tracking-tight">Keamanan Data</h3>
              <p className="text-[11px] md:text-xs font-medium text-blue-100 leading-relaxed">
                Informasi saldo dan rekening Anda dienkripsi secara end-to-end. Kami tidak menyimpan detail login bank Anda.
              </p>
              <div className="pt-4 border-t border-blue-500/30">
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
            {/* Glossy overlay effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none hidden md:block" />
          </div>

          {/* QUICK STATS CARD */}
          <div className="bg-slate-100/50 rounded-[32px] p-8 border border-white">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Quick Stats</p>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Total Rekening</span>
                <span className="text-sm font-black text-slate-900">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Aktivitas Terakhir</span>
                <span className="text-sm font-black text-slate-900">Hari Ini</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION - TABLE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Daftar Rekening</h2>
          <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-3 transition-all w-fit">
            Lihat Semua Riwayat
            <ExternalLink size={14} />
          </button>
        </div>

        <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[1100px] md:min-w-0">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Logo</th>
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Nama & Jenis</th>
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Mata Uang</th>
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Saldo</th>
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Nilai Base</th>
                  <th className="px-5 md:px-10 py-5 md:py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* Row 1 */}
                <tr className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-5 md:px-10 py-5 md:py-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-5 md:w-6 h-1 bg-white/20 rounded-full" />
                    </div>
                  </td>
                  <td className="px-5 md:px-10 py-5 md:py-8">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">BCA Personal</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">Bank Account</p>
                    </div>
                  </td>
                  <td className="px-5 md:px-10 py-5 md:py-8 text-center">
                    <span className="px-3 py-1.5 bg-slate-100 text-[9px] font-black text-slate-400 rounded-lg tracking-widest uppercase">IDR</span>
                  </td>
                  <td className="px-5 md:px-10 py-5 md:py-8 text-right font-black text-slate-900 text-sm">12,450,000.00</td>
                  <td className="px-5 md:px-10 py-5 md:py-8 text-right font-black text-slate-500 text-sm">12,450,000.00</td>
                  <td className="px-5 md:px-10 py-5 md:py-8">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-10 py-8">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-100">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div>
                      <p className="text-sm font-black text-slate-900">Gopay Primary</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cash / E-Wallet</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="px-3 py-1.5 bg-slate-100 text-[9px] font-black text-slate-400 rounded-lg tracking-widest uppercase">IDR</span>
                  </td>
                  <td className="px-10 py-8 text-right font-black text-slate-900 text-sm">1,200,500.00</td>
                  <td className="px-10 py-8 text-right font-black text-slate-500 text-sm">1,200,500.00</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-10 py-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BarChart3 size={20} className="text-white" />
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div>
                      <p className="text-sm font-black text-slate-900">US Stocks Port</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Investment</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="px-3 py-1.5 bg-blue-50 text-[9px] font-black text-blue-600 rounded-lg tracking-widest uppercase">USD</span>
                  </td>
                  <td className="px-10 py-8 text-right font-black text-slate-900 text-sm">4,250.00</td>
                  <td className="px-10 py-8 text-right font-black text-slate-500 text-sm">65,875,000.00</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

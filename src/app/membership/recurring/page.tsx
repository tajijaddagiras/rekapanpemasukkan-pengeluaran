"use client";

import { 
  Plus, 
  ChevronDown, 
  Save, 
  Calendar as CalendarIcon,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecurringPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1200px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Transaksi Berulang</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-2">Manage your automated recurring transactions with ease and precision.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#555555] text-white px-8 py-3.5 rounded-2xl text-[13px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
          <Plus size={18} />
          Tambah Cepat
        </button>
      </div>

      {/* 2. Main Settings Card */}
      <div className="bg-[#f0f5f7] p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white shadow-sm">
        <div className="mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">Settings Transaksi Berulang</h2>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-3 capitalize">Konfigurasi otomatisasi pembayaran dan pemasukan Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-8">
          
          {/* NAMA TRANSAKSI */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Transaksi</label>
            <input 
              type="text" 
              placeholder="Contoh: Langganan Netflix"
              className="w-full bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all shadow-sm"
            />
          </div>

          {/* JENIS */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer shadow-sm">
                <option>Pengeluaran</option>
                <option>Pemasukan</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* KATEGORI */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
            <input 
              type="text" 
              placeholder="Hiburan, Listrik, Gaji..."
              className="w-full bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all shadow-sm"
            />
          </div>

          {/* AKUN */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Akun</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer shadow-sm">
                <option>Bank Mandiri (Personal)</option>
                <option>BCA (Bisnis)</option>
                <option>Cash / Dompet</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* NOMINAL */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input 
                type="text" 
                placeholder="0"
                className="w-full bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 pl-14 pr-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* INTERVAL & TANGGAL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Interval</label>
              <div className="relative">
                <select className="w-full appearance-none bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-5 md:px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer shadow-sm">
                  <option>Bulanan</option>
                  <option>Mingguan</option>
                  <option>Tahunan</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Berikutnya</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 md:py-4 px-5 md:px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all shadow-sm"
                />
                <CalendarIcon className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* CATATAN */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan</label>
            <textarea 
              rows={4}
              placeholder="Tambahkan detail tambahan di sini..."
              className="w-full bg-white border-none focus:ring-2 focus:ring-blue-100 rounded-2xl py-4 md:py-5 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all shadow-sm resize-none"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="w-full bg-[#1a41b8] flex items-center justify-center gap-3 py-4 md:py-5 rounded-2xl text-[13px] font-black text-white hover:bg-[#153496] transition-all shadow-xl shadow-blue-100 mt-8 md:mt-12 group">
          <Save size={20} className="transition-transform group-hover:scale-110" />
          Simpan Recurring
        </button>
      </div>

    </div>
  );
}

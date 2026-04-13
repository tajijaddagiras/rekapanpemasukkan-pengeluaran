"use client";

import { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  LineChart, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Plus,
  Monitor,
  Smartphone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MyCardsPage() {
  const [activeTab, setActiveTab] = useState('Semua');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header & Status Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-black text-slate-900 tracking-tight">Kartu Saya</h1>
          <p className="text-sm font-medium text-slate-500 mt-1 max-w-lg">
            Kelola seluruh aset keuangan dan pantau arus kas Anda dalam satu tampilan editorial yang bersih.
          </p>
        </div>
        
        <div className="bg-white border border-slate-100 rounded-xl px-6 py-3 shadow-sm text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Keuangan</p>
          <p className="text-xs font-black text-indigo-600">Premium Aman</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* A. The Indigo Hero Card */}
          <div className="relative overflow-hidden bg-indigo-600 rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-indigo-200 group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-[10px] font-black text-indigo-100/60 uppercase tracking-[0.2em] mb-2">Total Limit Gabungan</p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">Rp 125.000.000</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <CreditCard size={24} className="text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Tagihan Berjalan</p>
                  <p className="text-lg font-bold">Rp 12.450.000</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Sisa Limit</p>
                  <p className="text-lg font-bold">Rp 112.550.000</p>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-400 opacity-[0.1] rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* B. Cash Flow Section */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900">Arus Kas (Cash Flow)</h3>
              <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 tracking-widest uppercase">
                Bulan Ini
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-[180px] bg-slate-50/50 rounded-2xl p-6 flex items-end justify-between gap-3 mb-8 border border-slate-50">
              {[40, 60, 50, 80, 100, 70, 55, 45].map((h, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 rounded-lg transition-all duration-500",
                    i === 4 ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "bg-indigo-200/60"
                  )} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/30 rounded-2xl p-6 border border-emerald-50 flex items-center gap-5 group hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                  <ArrowDownCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uang Masuk</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">Rp 45.200.000</p>
                </div>
              </div>

              <div className="bg-rose-50/30 rounded-2xl p-6 border border-rose-50 flex items-center gap-5 group hover:bg-rose-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100 group-hover:scale-110 transition-transform">
                  <ArrowUpCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uang Keluar</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">Rp 28.150.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) - Sidebar List */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900">Daftar Akun</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Lihat Semua</button>
          </div>

          <div className="space-y-4">
            {/* 1. Debit Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Debit Card</p>
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">Bank Central Asia • **** 3021</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-900">Rp 12.500.000</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">+2.4%</p>
              </div>
            </div>

            {/* 2. E-Wallet */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">E-Wallet</p>
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">Gopay • OVO • Dana</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-900">Rp 3.120.000</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">STABLE</p>
              </div>
            </div>

            {/* 3. Savings */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <PiggyBank size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Savings</p>
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">Dana Darurat</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-900">Rp 85.000.000</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">+12.0%</p>
              </div>
            </div>

            {/* 4. RDN */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <LineChart size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">RDN</p>
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">Saham & Reksa Dana</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-900">Rp 245.800.000</p>
                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">-1.5%</p>
              </div>
            </div>

            {/* 5. Credit Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Credit Card</p>
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">Mastercard Platinum</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-rose-500">-Rp 12.450.000</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">DUE IN 3 DAYS</p>
              </div>
            </div>
          </div>

          {/* Promotion Card */}
          <div className="bg-slate-100/50 rounded-3xl p-8 border border-white mt-4 relative">
            <h4 className="text-sm font-black text-slate-900 mb-2">Upgrade Portofolio?</h4>
            <p className="text-xs font-medium text-slate-500 mb-6 leading-relaxed">
              Dapatkan akses ke instrumen investasi eksklusif dan laporan bulanan mendalam.
            </p>
            <button className="px-6 py-2.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl hover:bg-indigo-100 transition-colors uppercase tracking-widest">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

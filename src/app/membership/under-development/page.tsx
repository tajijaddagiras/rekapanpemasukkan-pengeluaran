"use client";

import Link from 'next/link';
import { Construction, ArrowLeft, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        className="max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 bg-indigo-100 rounded-[32px] flex items-center justify-center text-indigo-600 mx-auto shadow-xl shadow-indigo-100/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <Construction size={48} className="animate-bounce" />
        </div>
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-100">
            Stay Tuned
          </div>
          <h1 className="text-3xl font-serif font-black text-slate-900 leading-tight">
            Masih Tahap <br /> Perkembangan
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Halaman ini sedang dalam proses pengerjaan intensif oleh tim kami untuk memberikan pengalaman finansial terbaik bagi Anda.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Rocket size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Rilis</p>
            <p className="text-sm font-black text-slate-900 leading-none mt-1">Coming Soon Q3 2026</p>
          </div>
        </div>

        <Link 
          href="/membership/dashboard" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-navy/20 active:scale-95"
        >
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

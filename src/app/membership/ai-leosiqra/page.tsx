"use client";

import { 
  Plus, 
  ChevronDown, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Sparkles,
  TrendingUp,
  LineChart,
  Target,
  ShieldCheck,
  ChevronLeft,
  Search,
  Zap,
  Layout,
  Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AILeosiqraPage() {
  const strategies = ["Hemat", "Seimbang", "Agresif"];
  
  const bottomInsights = [
    { label: "Cashflow Bulanan", value: "Positif (Rp 4.2jt)", isBold: true },
    { label: "Savings Rate", value: "32.5%", color: "text-blue-600" },
    { label: "Net Worth Growth", value: "+1.8% Bulan Ini", isBold: true },
    { label: "Investasi Teraktif", value: "Indeks Saham AS", isBold: true },
    { label: "Skor Kesehatan Keuangan", value: "88/100", hasBadge: true, badgeText: "PRIMA" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 max-w-[1240px] mb-20">
      
      {/* 1. Header Analysis Section */}
      <div className="bg-white p-10 lg:p-14 rounded-[48px] border border-slate-50 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full w-fit">
               <ChevronLeft size={14} className="opacity-60" />
               <span className="text-[10px] font-black uppercase tracking-widest">AI Intelligence Mode: Aman</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Analisis Portofolio <br />
              <span className="text-indigo-600">Ethereal Anda</span>
            </h1>
            
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Berdasarkan data 30 hari terakhir, efisiensi anggaran Anda meningkat 12.4%. Mari optimalkan instrumen agresif Anda.
            </p>

            <div className="flex items-center gap-3 pt-4">
              {strategies.map((s, i) => (
                <button 
                  key={s} 
                  className={`px-8 py-3 rounded-2xl text-[11px] font-black transition-all ${
                    s === "Seimbang" 
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105" 
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <button className="flex items-center justify-between w-full lg:w-64 bg-indigo-600 text-white px-8 py-4.5 rounded-[24px] text-xs font-black shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">
              <span>Minta Analisis AI</span>
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-3 w-fit lg:w-64 bg-slate-50/50 text-slate-500 px-8 py-4 rounded-[24px] text-xs font-black hover:bg-slate-50 transition-all border border-slate-100">
              <RefreshCw size={16} />
              Segarkan Insight
            </button>
            <button className="flex items-center gap-3 w-fit lg:w-64 bg-slate-50/50 text-slate-500 px-8 py-4 rounded-[24px] text-xs font-black hover:bg-slate-50 transition-all border border-slate-100">
              <Copy size={16} />
              Salin Prompt
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recommendation */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm group hover:translate-y-[-4px] transition-all">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">01</p>
          <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Rekomendasi Cerdas</h3>
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed mb-6">Pindahkan 5% dana kas ke pasar uang untuk yield optimal.</p>
          <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            Lihat Detail
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Emergency Fund */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm group">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">02</p>
          <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Panduan Dana Darurat</h3>
          <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="absolute h-full bg-indigo-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '75%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] font-bold text-slate-400">75% dari target Rp 80jt tercapai</p>
        </div>

        {/* Financial Snapshot */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">03</p>
          <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Snapshot Finansial</h3>
          <p className="text-3xl font-black text-slate-900 tracking-tighter mt-6">Rp 1.42M</p>
        </div>
      </div>

      {/* 3. Middle Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Forecast */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-indigo-50/50 group-hover:text-indigo-100/50 transition-colors">
            <LineChart size={120} />
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">04</p>
          <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Forecast Anggaran</h3>
          <p className="text-xs font-bold text-slate-400 max-w-[70%] leading-relaxed">Estimasi pengeluaran bulan depan stabil di angka Rp 12.5jt.</p>
        </div>

        {/* Portfolio Analysis */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-indigo-50/50 group-hover:text-indigo-100/50 transition-colors">
            <Layout size={120} />
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">05</p>
          <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Analisis Portofolio</h3>
          <p className="text-xs font-bold text-slate-400 max-w-[70%] leading-relaxed">Diversifikasi sektor teknologi Anda memberikan performa +8.2% YoY.</p>
        </div>
      </div>

      {/* 4. Bottom Section: Insights & Prompt */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
        
        {/* Insight Table */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Insight Leosiqra</h2>
          </div>

          <div className="space-y-7 px-2">
            {bottomInsights.map((insight, i) => (
              <div key={i} className="flex items-center justify-between pb-2">
                <p className="text-[13px] font-medium text-slate-400">{insight.label}</p>
                <div className="flex items-center gap-2">
                   {insight.hasBadge && (
                     <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded leading-none mr-2">
                       {insight.badgeText}
                     </span>
                   )}
                   <p className={`text-[13px] tracking-tight ${insight.isBold ? 'font-black text-slate-900' : 'font-bold'} ${insight.color || 'text-slate-900'}`}>
                     {insight.value}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Prompt Card */}
        <div className="lg:col-span-4 bg-[#0a0f1d] p-10 lg:p-14 rounded-[48px] shadow-2xl relative overflow-hidden h-full group">
          <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
            <Terminal size={100} />
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="text-indigo-400">
               <span className="text-2xl font-black">“</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Prompt Eksekutif</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-2 opacity-40">
               <p className="text-[11px] font-mono text-white tracking-widest">// AI Model Engine: Ethereal Analyst v4.0</p>
            </div>
            
            <p className="text-[13px] font-mono text-blue-300/90 leading-relaxed font-bold">
              "Berikan analisis mendalam terhadap alokasi portofolio saat ini dengan fokus pada manajemen risiko asimetris. Pertimbangkan variabel makroekonomi kuartal ini dan buatkan 3 simulasi skenario untuk target FIRE dalam 10 tahun..."
            </p>

            <div className="pt-8">
              <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-2xl text-[11px] font-black border border-white/5 transition-all w-fit group">
                Edit Prompt Khusus
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-10 right-10">
             <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-900/40">
                <Sparkles size={18} />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import { 
  Plus, 
  ChevronDown, 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Save, 
  Zap, 
  Coins, 
  BarChart3, 
  Anchor, 
  CircleDollarSign,
  PlusCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketDataPage() {
  const currencies = [
    { from: "United States Dollar", icon: "→", to: "Indonesian Rupiah", rate: "15,642.50" },
    { from: "Euro", icon: "→", to: "Indonesian Rupiah", rate: "16,920.15" },
    { from: "British Pound", icon: "→", to: "Indonesian Rupiah", rate: "19,845.30" },
  ];

  const forex = [
    { pair: "EUR/USD", label: "Euro / US Dollar", price: "1.0824", change: "-0.06%", isDown: true },
    { pair: "USD/JPY", label: "Dollar / Yen", price: "149.85", change: "+0.12%", isDown: false },
    { pair: "GBP/USD", label: "Pound / Dollar", price: "1.2642", change: "+0.08%", isDown: false },
  ];

  const crypto = [
    { name: "Bitcoin", symbol: "BTC/USD", price: "52,342.10", change: "+2.41%", isDown: false, icon: "B" },
    { name: "Ethereum", symbol: "ETH/USD", price: "2,841.50", change: "+1.85%", isDown: false, icon: "E" },
    { name: "Solana", symbol: "SOL/USD", price: "114.28", change: "-0.92%", isDown: true, icon: "S" },
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1240px] mb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">Dashboard Intelligence</h1>
        <p className="text-[11px] md:text-sm font-medium text-slate-500 mt-2 leading-relaxed">Curated financial data and market whitelists for decisive actions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
        
        {/* LEFT COLUMN: SETTINGS & WHITELISTS (3/12) */}
        <div className="lg:col-span-3 space-y-6 md:space-y-8">
          {/* Settings Card */}
          <div className="bg-white p-6 md:p-6 rounded-[32px] border border-slate-50 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <RefreshCw size={18} />
              </div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">Settings Data Pasar & Kurs</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Dari Mata Uang</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-3.5 px-5 text-[11px] font-bold text-slate-600 cursor-pointer">
                    <option>USD - United States Dollar</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Ke Mata Uang</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-3.5 px-5 text-[11px] font-bold text-slate-600 cursor-pointer">
                    <option>IDR - Indonesian Rupiah</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl text-xs font-black shadow-lg shadow-indigo-100/50 hover:bg-indigo-700 transition-all active:scale-95">
                Simpan Rate
              </button>
            </div>
          </div>

          {/* Whitelists */}
          <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 space-y-5">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest pl-2">Market Whitelists</h3>
            
            <div className="space-y-4">
              {[
                { title: "FX TARGET LIST", tags: "EURUSD, GBPUSD, AUDUSD, USD", action: "Perbarui Sekarang" },
                { title: "CRYPTO WHITELIST", tags: "BTC, ETH, SOL, LINK, DOT", action: "Simpan Whitelist", isBlue: true },
                { title: "SAHAM & EMAS", tags: "XAUUSD, AAPL, MSFT, BBCA.JK", action: "Simpan Whitelist", isBlue: true },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-[24px] shadow-sm border border-white space-y-4">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">{item.title}</p>
                  <div className="bg-slate-50 px-4 py-2.5 rounded-xl text-[10px] font-bold text-slate-600 leading-relaxed font-mono">
                    {item.tags}
                  </div>
                  <button className="flex items-center gap-2 text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline transition-all">
                    {item.isBlue && <Save size={12} />}
                    {!item.isBlue && <RefreshCw size={12} />}
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT AREA: DATA TABLES & GRIDS (9/12) */}
        <div className="lg:col-span-9 space-y-6 md:space-y-8">
          
          {/* Exchange Rate Table */}
          <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 pb-4 flex flex-col xs:flex-row xs:items-center justify-between gap-3 border-b border-slate-50">
              <h2 className="text-sm md:text-base font-black text-slate-900 tracking-tight">Exchange Rate Table</h2>
              <span className="w-fit px-3 py-1 bg-cyan-50 text-cyan-600 text-[9px] font-black rounded-full uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                Live Updates
              </span>
            </div>
            
            <div className="px-5 md:px-8 pb-4 overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[550px] md:min-w-0">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="py-5 font-black">Dari</th>
                    <th className="py-5 font-black text-center">Simbol</th>
                    <th className="py-5 font-black text-center">Ke</th>
                    <th className="py-5 font-black text-right pr-4 md:pr-0">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currencies.map((curr, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 md:py-6 text-[12px] md:text-[13px] font-bold text-slate-900">{curr.from}</td>
                      <td className="py-4 md:py-6 text-center text-indigo-500"><ArrowRight size={14} className="mx-auto" /></td>
                      <td className="py-4 md:py-6 text-center text-[12px] md:text-[13px] font-bold text-slate-900 pr-4 md:pr-12">{curr.to}</td>
                      <td className="py-4 md:py-6 text-right text-[13px] md:text-[14px] font-black text-slate-900 tracking-tight pr-4 md:pr-0">{curr.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Foreign Exchange */}
            <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-50 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-tight">Foreign Exchange</h3>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1.5 shrink-0 ml-4">
                  <Clock size={10} />
                  2m ago
                </span>
              </div>
              <div className="space-y-6">
                {forex.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer min-w-0">
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-black text-slate-900 tracking-tight truncate">{item.pair}</h4>
                      <p className="text-[10px] font-medium text-slate-400 tracking-tight truncate">{item.label}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-black text-slate-900">{item.price}</p>
                      <p className={`text-[10px] font-bold mt-1 ${item.isDown ? 'text-rose-500' : 'text-emerald-500'}`}>{item.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptocurrency */}
            <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-50 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-tight">Cryptocurrency</h3>
                <span className="text-[9px] font-bold text-slate-400 shrink-0 ml-4">Just now</span>
              </div>
              <div className="space-y-6">
                {crypto.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer min-w-0">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-black text-[10px] border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[13px] font-black text-slate-900 tracking-tight truncate">{item.name}</h4>
                        <p className="text-[10px] font-medium text-slate-400 tracking-tight uppercase truncate">{item.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-black text-slate-900">{item.price}</p>
                      <p className={`text-[10px] font-bold mt-1 ${item.isDown ? 'text-rose-500' : 'text-emerald-500'}`}>{item.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commodities & Equities */}
          <div className="bg-white p-6 md:p-8 lg:p-10 rounded-[32px] md:rounded-[40px] border border-slate-50 shadow-sm">
            <div className="flex items-center justify-between mb-10 px-2">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Commodities & Equities</h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                View All Markets
                <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-50">
              {[
                { name: "GOLD (XAU/USD)", price: "2,024.18", change: "+0.45%", isDown: false },
                { name: "APPLE INC (AAPL)", price: "182.31", change: "-1.20%", isDown: true },
                { name: "CRUDE OIL (WTI)", price: "77.42", change: "+0.15%", isDown: false },
              ].map((item, i) => (
                <div key={i} className="p-6 lg:px-10 space-y-4 first:pl-2 last:pr-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.name}</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{item.price}</p>
                  <div className={`flex items-center gap-2 text-[10px] font-black ${item.isDown ? 'text-rose-500' : 'text-indigo-500'}`}>
                    {item.isDown ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    <span>{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

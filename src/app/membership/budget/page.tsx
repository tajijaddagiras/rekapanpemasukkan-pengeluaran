"use client";

import { 
  Plus, 
  ChevronDown, 
  Save, 
  ArrowRight,
  ShoppingCart,
  Plane,
  ShieldPlus,
  Zap,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BudgetPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Budget & Target</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
            Orchestrate your financial future with precision. Set your limits, define your targets, and let our Atelier track the progress of your fiscal journey.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#004d40] text-white px-8 py-3.5 rounded-2xl text-[13px] font-black shadow-xl shadow-green-50 hover:scale-105 active:scale-95 transition-all">
            <Plus size={18} />
            Tambah Cepat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN (1/3) */}
        <div className="space-y-8">
          {/* Settings Card */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-[#004d40] rounded-full" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Settings Budget & Target</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600">Kategori</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-slate-100 rounded-xl py-4 px-6 text-sm font-medium text-slate-600 transition-all cursor-pointer">
                    <option>Select Category</option>
                    <option>Groceries & Living</option>
                    <option>Travel & Discovery</option>
                    <option>Health & Wellness</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600">Limit</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">Rp</span>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-slate-100 rounded-xl py-4 pl-14 pr-6 text-sm font-medium text-slate-600 placeholder:text-slate-300 transition-all"
                  />
                </div>
              </div>

              <button className="w-full bg-[#004d40] flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black text-white hover:bg-[#002f26] transition-all shadow-lg shadow-green-50">
                <Save size={16} />
                Simpan Budget
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white h-full rounded-[40px] border border-slate-50 shadow-sm p-10 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-black text-slate-900">Current Allocations</h2>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#004d40] transition-colors">
                View Detailed Reports
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex-1 space-y-2">
              {/* Category Items */}
              {[
                { icon: ShoppingCart, title: 'Groceries & Living', desc: 'Monthly sustenance budget', amount: '4.500.000', type: 'Fixed Target', bg: 'bg-stone-50', iconColor: 'text-stone-600' },
                { icon: Plane, title: 'Travel & Discovery', desc: 'Leisure and exploration', amount: '8.200.000', type: 'Variable Target', bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
                { icon: ShieldPlus, title: 'Health & Wellness', desc: 'Wellness and vitality', amount: '2.150.000', type: 'Essential Budget', bg: 'bg-blue-50', iconColor: 'text-blue-600' },
                { icon: Zap, title: 'Digital Subscriptions', desc: 'SaaS and content platforms', amount: '750.000', type: 'Auto-deducting', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.iconColor} flex items-center justify-center border border-white shadow-sm`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-slate-900 tracking-tight">{item.title}</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black text-slate-900 tracking-tight">Rp {item.amount}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.type}</p>
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

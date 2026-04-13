"use client";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  ChevronRight,
  Lock,
  Bell,
  Camera,
  AtSign
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const accountStats = [
    { label: "Today's Expense", value: "Rp 1.250.000", icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50", trend: "High" },
    { label: "Total Wealth", value: "Rp 754.200.000", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+12%" },
  ];

  const bankAccounts = [
    { name: "Bank Mandiri", type: "Personal Savings", balance: "420.500.000", icon: "BM", color: "bg-blue-600" },
    { name: "Bank Central Asia", type: "Business Account", balance: "284.700.000", icon: "BCA", color: "bg-indigo-600" },
    { name: "E-Wallet (OVO/GoPay)", type: "Daily Usage", balance: "49.000.000", icon: "EW", color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1240px] mb-20 px-2 lg:px-0">
      
      {/* 1. Profile Identity Header Card */}
      <div className="bg-white rounded-[40px] border border-slate-50 shadow-sm p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="relative group shrink-0">
            <div className="w-40 h-40 rounded-[48px] bg-gradient-to-tr from-indigo-600 to-blue-500 p-1.5 shadow-xl shadow-indigo-100 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-[42px] bg-white flex items-center justify-center text-4xl font-black text-indigo-600">
                JD
              </div>
            </div>
            <button className="absolute bottom-2 right-2 w-11 h-11 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 mb-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">John Doe</h1>
              <div className="flex justify-center lg:justify-start">
                <span className="px-5 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-indigo-100 flex items-center gap-2">
                  <ShieldCheck size={12} />
                  Pro Member
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Personalized financial dashboard and strategy manager. Strategizing wealth since January 2024.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 mt-8 pt-8 border-t border-slate-50">
               {accountStats.map((stat, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-sm border border-white`}>
                     <stat.icon size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                     <p className="text-lg font-black text-slate-900 leading-none">{stat.value}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Settings & Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Account Information Form */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 lg:p-12 rounded-[48px] border border-slate-50 shadow-sm space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Identity Settings</h2>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline underline-offset-4">Reset Defaults</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full bg-slate-50/50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Email Address</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="email" 
                    defaultValue="john.doe@atelier.finance"
                    className="w-full bg-slate-50/50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Username</label>
                <div className="relative group">
                  <AtSign size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    defaultValue="johndoe_pro"
                    className="w-full bg-slate-50/50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Phone Number</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    defaultValue="+62 811 2233 4455"
                    className="w-full bg-slate-50/50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block">Mailing Address</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-6 top-8 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <textarea 
                    rows={3}
                    defaultValue="Jl. Sudirman No. 45, Jakarta Selatan, DKI Jakarta 12190"
                    className="w-full bg-slate-50/50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all placeholder:text-slate-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center gap-6">
              <button className="w-full md:w-fit px-12 py-5 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:translate-y-[-2px] active:translate-y-0">
                Save All Updates
              </button>
              <button className="w-full md:w-fit px-8 py-5 bg-transparent text-slate-400 rounded-2xl text-xs font-black border border-slate-50 hover:bg-slate-50 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Bank Information & Security */}
        <div className="space-y-10">
          
          {/* Bank Accounts Overview */}
          <div className="bg-[#f0f5fa] p-10 rounded-[48px] border border-white shadow-sm space-y-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Banks</h2>
            <div className="space-y-4">
              {bankAccounts.map((bank, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/60 backdrop-blur-sm rounded-[28px] border border-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-2xl ${bank.color} text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-100`}>
                      {bank.icon}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-slate-900 leading-tight">{bank.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{bank.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black text-slate-900">Rp {bank.balance}</p>
                    <ArrowRight size={12} className="text-slate-300 float-right mt-1" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl border-2 border-dashed border-indigo-200 text-indigo-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/50 transition-all">
              + Connect New Bank
            </button>
          </div>

          {/* Security & System Card */}
          <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
              <ShieldCheck size={120} />
            </div>
            
            <h2 className="text-xl font-black text-white tracking-tight relative z-10">Security Center</h2>
            
            <div className="space-y-6 relative z-10">
              <button className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white">
                  <Lock size={18} className="text-indigo-400" />
                  <span className="text-[12px] font-black tracking-tight">Change Password</span>
                </div>
                <ChevronRight size={14} className="text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white">
                  <Bell size={18} className="text-indigo-400" />
                  <span className="text-[12px] font-black tracking-tight">Notification Preferences</span>
                </div>
                <ChevronRight size={14} className="text-white/40" />
              </button>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-white opacity-40 uppercase tracking-widest">Two Factor Auth</p>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

"use client";

import { 
  Check, 
  Copy, 
  Mail, 
  Phone, 
  ArrowRight, 
  ChevronDown,
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("124-00-0987654-1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1200px] mb-12">
      
      {/* 1. Header Section */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Konfirmasi Pembayaran Pro</h1>
        <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
          Selesaikan transaksi Anda untuk membuka fitur eksklusif dan layanan prioritas di platform kami.
        </p>
      </div>

      {/* 2. Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: 1, title: 'Bayar sesuai paket', desc: 'Transfer dana sesuai dengan nominal paket Pro yang Anda pilih.', active: true },
          { step: 2, title: 'Isi referensi pembayaran', desc: 'Lengkapi formulir konfirmasi dengan detail bukti transaksi Anda.', active: false },
          { step: 3, title: 'Tunggu aktivasi admin', desc: 'Tim kami akan memverifikasi dalam waktu maksimal 1x24 jam.', active: false },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm text-center space-y-4">
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-black ${item.active ? 'bg-indigo-600 text-white' : 'bg-slate-500 text-white opacity-60'}`}>
              {item.step}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">{item.title}</h3>
              <p className="text-[10px] font-bold text-slate-400 leading-relaxed px-4">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT COLUMN: Informasi Pembayaran */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#f0f5fa] p-6 md:p-8 rounded-[20px] md:rounded-[40px] border border-white shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-8 right-8 text-slate-200">
              <CreditCard size={48} />
            </div>

            <div>
              <h2 className="text-lg font-black text-indigo-600 tracking-tight mb-6">Informasi Pembayaran</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Harga Pro/Bulan</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">IDR 149.000</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bank Tujuan</p>
                    <p className="text-[13px] font-black text-slate-900 tracking-tight">Bank Mandiri</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Rekening</p>
                    <p className="text-[13px] font-black text-slate-900 tracking-tight leading-snug">PT Ethereal Ledger Indonesia</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nomor Rekening</p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-black text-indigo-600 tracking-tight">124-00-0987654-1</p>
                    <button 
                      onClick={copyToClipboard}
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pembayaran QRIS</p>
                  <div className="bg-white p-4 rounded-3xl w-fit shadow-sm border border-indigo-50">
                    <div className="w-40 h-40 bg-[#1e293b] rounded-2xl flex items-center justify-center">
                      <QrCode size={120} className="text-white/80" />
                    </div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 italic">Scan QRIS di atas melalui aplikasi bank atau e-wallet Anda.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
                <Mail size={16} />
                <span className="text-[11px] font-bold">billing@ethereal-ledger.io</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
                <Phone size={16} />
                <span className="text-[11px] font-bold">+62 811 2233 4455 (WhatsApp)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Card */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 md:p-10 rounded-[20px] md:rounded-[40px] border border-slate-50 shadow-sm space-y-10">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Kirim Konfirmasi Pembayaran</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Sesuai bukti transfer"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Alamat Email</label>
                <input 
                  type="email" 
                  placeholder="user@example.com"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Metode Bayar</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer">
                    <option>Bank Transfer</option>
                    <option>QRIS / E-Wallet</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ID Ref Pembayaran</label>
                <input 
                  type="text" 
                  placeholder="Contoh: REF-98210"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Paket Pro</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer">
                    <option>1 Bulan - Pro Solo</option>
                    <option>6 Bulan - Pro Saver</option>
                    <option>12 Bulan - Pro Annual</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Dibayar (IDR)</label>
                <input 
                  type="text" 
                  placeholder="149000"
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan Tambahan</label>
                <textarea 
                  rows={4}
                  placeholder="Informasi tambahan jika diperlukan..."
                  className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 rounded-2xl py-5 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-300 transition-all resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <button className="w-full bg-[#3b82f6] flex items-center justify-center gap-3 py-5 rounded-2xl text-[13px] font-black text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group">
                Kirim Konfirmasi Aktivasi Pro
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[10px] font-bold text-slate-400 text-center px-4">
                Dengan mengklik tombol di atas, Anda menyetujui Syarat & Ketentuan kami.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import { 
  Plus, 
  ChevronDown, 
  Save, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Landmark,
  TrendingDown,
  PiggyBank
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function NamaAkunPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Nama Akun Transaksi</h1>
        <button className="flex items-center gap-2 bg-[#555555] text-white px-8 py-3.5 rounded-2xl text-[13px] font-black shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all">
          <Plus size={18} />
          Tambah Cepat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (1/3) */}
        <div className="space-y-8">
          {/* Konfigurasi Ledger Card */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-slate-900 rounded-full" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Konfigurasi Ledger</h2>
            </div>

            <div className="space-y-6">
              {/* KATEGORI */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#e9f0f4] border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 transition-all cursor-pointer">
                    <option>Pilih Kategori</option>
                    <option>Makanan</option>
                    <option>Transport</option>
                    <option>Tagihan</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                </div>
              </div>

              {/* SUBKATEGORI */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subkategori</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Belanja Bulanan"
                  className="w-full bg-[#e9f0f4] border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-6 text-sm font-bold text-slate-600 placeholder:text-slate-400 transition-all"
                />
              </div>

              {/* SIMPAN BUTTON */}
              <button className="w-full bg-[#e2e2e2] flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-200 transition-colors mt-4">
                <Save size={18} />
                Simpan Kategori
              </button>
            </div>
          </div>

          {/* Wawasan Mingguan Banner */}
          <div className="relative h-[180px] rounded-[32px] overflow-hidden group shadow-xl shadow-blue-50">
            {/* Background Image/Chart */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611974714658-403482794406?q=80&w=600&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-8 right-8">
              <h3 className="text-lg font-black text-white">Wawasan Mingguan</h3>
              <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest leading-relaxed">Analisis otomatis siap untuk diperiksa.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Daftar Transaksi Aktif</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Filter size={20} />
                </button>
                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#e9eff2]">
                  <tr>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subkategori</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { cat: 'Makanan', sub: 'Makan Siang', status: 'VERIFIED' },
                    { cat: 'Transport', sub: 'Bensin Kendaraan', status: 'VERIFIED' },
                    { cat: 'Tagihan', sub: 'Listrik & Air', status: 'PENDING' },
                    { cat: 'Belanja', sub: 'Kebutuhan Pokok', status: 'VERIFIED' },
                    { cat: 'Hiburan', sub: 'Streaming', status: 'VERIFIED' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-7">
                        <p className="text-sm font-black text-slate-900">{row.cat}</p>
                      </td>
                      <td className="px-10 py-7">
                        <p className="text-sm font-bold text-slate-400 italic font-serif tracking-tight">{row.sub}</p>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black tracking-widest uppercase ${
                          row.status === 'VERIFIED' 
                            ? 'bg-blue-50 text-blue-500' 
                            : 'bg-amber-100 text-amber-600'
                        }`}>
                          {row.status === 'VERIFIED' ? 'Terverifikasi' : 'Tertunda'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
              <p>Menampilkan 5 entri terakhir</p>
              <div className="flex items-center gap-6">
                <button className="hover:text-indigo-600 transition-colors">Sebelumnya</button>
                <button className="hover:text-indigo-600 transition-colors">Selanjutnya</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION - 3 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL SALDO */}
        <div className="bg-[#f0f5f7] p-8 rounded-[28px] border border-white flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400">
            <Landmark size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Saldo</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">Rp 24.500.000</p>
          </div>
        </div>

        {/* PENGELUARAN */}
        <div className="bg-[#f0f5f7] p-8 rounded-[28px] border border-white flex items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-400">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pengeluaran Bulan Ini</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">Rp 4.120.000</p>
          </div>
        </div>

        {/* TARGET TABUNGAN */}
        <div className="bg-[#555555] p-8 rounded-[28px] flex items-center gap-5 shadow-xl shadow-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white/60">
            <PiggyBank size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Target Tabungan</p>
            <p className="text-xl font-black text-white tracking-tight">82% Tercapai</p>
          </div>
        </div>
      </div>

    </div>
  );
}

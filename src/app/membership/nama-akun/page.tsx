"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Save, 
  Filter, 
  Download, 
  Landmark,
  TrendingDown,
  PiggyBank,
  FolderOpen
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { categoryService, Category } from '@/lib/services/categoryService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';

export default function NamaAkunPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'categories'), where('userId', '==', u.uid));
        if (unsubRef.current) unsubRef.current();
        unsubRef.current = onSnapshot(q, (snap) => {
          setCategories(snap.docs.map(doc => {
            const d = doc.data();
            return {
              ...d, id: doc.id,
              createdAt: d.createdAt?.toDate?.() ?? new Date()
            } as Category;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
      } else { setCategories([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.category || !formData.subCategory) return;
    try {
      await categoryService.createCategory({
        userId: user.uid,
        category: formData.category,
        subCategory: formData.subCategory,
        status: 'VERIFIED'
      });
      setIsAddModalOpen(false);
      setFormData({ category: '', subCategory: '' });
      // onSnapshot update otomatis
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Nama Akun Transaksi</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#555555] text-white px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[13px] font-black shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
        >
          <Plus size={18} />
          Tambah Cepat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN (1/4) */}
        <div className="space-y-6">
          {/* Wawasan Mingguan Banner */}
          <div className="relative h-[240px] rounded-[20px] md:rounded-[32px] overflow-hidden group shadow-xl shadow-blue-50">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611974714658-403482794406?q=80&w=600&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-lg font-black text-white">Wawasan Mingguan</h3>
              <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest leading-relaxed">Analisis otomatis siap untuk diperiksa.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (3/4) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[20px] md:rounded-[32px] border border-slate-50 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Daftar Kategori / Subkategori Ledger</h2>
              </div>
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="p-10 text-center text-sm font-medium text-slate-400">Memuat data ledger...</div>
              ) : categories.length === 0 ? (
                <div className="p-6">
                  <EmptyState 
                    title="Ledger masih kosong" 
                    description="Anda belum memiliki kategori khusus. Klik Tambah Cepat untuk membuatnya."
                    icon={<FolderOpen size={24} />}
                  />
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left min-w-[600px] md:min-w-0">
                    <thead className="bg-[#e9eff2]">
                      <tr>
                        <th className="px-5 md:px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                        <th className="px-5 md:px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subkategori</th>
                        <th className="px-5 md:px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {categories.map((row) => (
                        <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 md:px-10 py-5">
                            <p className="text-sm font-black text-slate-900">{row.category}</p>
                          </td>
                          <td className="px-5 md:px-10 py-5">
                            <p className="text-sm font-bold text-slate-500 italic font-serif tracking-tight">{row.subCategory}</p>
                          </td>
                          <td className="px-5 md:px-10 py-5 text-right">
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
              )}
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM SECTION - 3 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f0f5f7] p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-white flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
            <Landmark size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Ledger</p>
            <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{categories.length} Akun</p>
          </div>
        </div>
        <div className="bg-[#f0f5f7] p-5 md:p-8 rounded-[20px] md:rounded-[28px] border border-white flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-400 shrink-0">
            <TrendingDown size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pengeluaran Tersinkron</p>
            <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Rp 0</p>
          </div>
        </div>
        <div className="bg-[#555555] p-5 md:p-8 rounded-[20px] md:rounded-[28px] flex items-center gap-5 shadow-xl shadow-slate-200">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white/60 shrink-0">
            <PiggyBank size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Penggunaan Akun</p>
            <p className="text-lg md:text-xl font-black text-white tracking-tight">System Active</p>
          </div>
        </div>
      </div>

      {/* Modal Tambah Kategori */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Konfigurasi Ledger Baru"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori Utama</label>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full appearance-none bg-[#e9f0f4] border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="">Pilih Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Transport">Transport</option>
                <option value="Tagihan">Tagihan</option>
                <option value="Belanja">Belanja</option>
                <option value="Hiburan">Hiburan</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subkategori Spesifik</label>
            <input 
              type="text" 
              value={formData.subCategory}
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
              placeholder="Contoh: Bensin Kendaraan"
              className="w-full bg-[#e9f0f4] border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
          <button 
            onClick={handleCreate}
            disabled={!formData.category || !formData.subCategory}
            className="w-full bg-slate-900 disabled:bg-slate-300 text-white flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black transition-all mt-6 shadow-xl shadow-slate-200"
          >
            <Save size={16} />
            Simpan Konfigurasi
          </button>
        </div>
      </Modal>

    </div>
  );
}

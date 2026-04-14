"use client";

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { accountService } from '@/lib/services/accountService';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const CardModal = ({ isOpen, onClose, userId }: CardModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Credit Card', // Manual text input, but defaulted to Credit Card
    logoUrl: '',
    uangMasuk: '', // Mapping to initialBalance
    uangKeluar: ''  // Mapping to balance
  });

  const handleCreate = async () => {
    if (!userId || !formData.name) return;
    setLoading(true);
    try {
      await accountService.createAccount({
        userId: userId,
        name: formData.name,
        type: formData.type,
        logoUrl: formData.logoUrl,
        currency: 'IDR',
        initialBalance: parseFloat(formData.uangMasuk) || 0,
        balance: parseFloat(formData.uangKeluar) || (parseFloat(formData.uangMasuk) || 0),
        baseValue: 0
      });
      setFormData({ name: '', type: 'Credit Card', logoUrl: '', uangMasuk: '', uangKeluar: '' });
      onClose();
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Tambah Kartu Baru"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Rekening */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Rekening</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Contoh: BCA Platinum"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-rose-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          {/* Jenis Rekening - MANUAL INPUT */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis Rekening (Manual)</label>
            <input 
              type="text" 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              placeholder="Contoh: Credit Card"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-rose-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          {/* Logo URL */}
          <div className="col-span-full space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Logo URL</label>
            <input 
              type="text" 
              value={formData.logoUrl}
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              placeholder="https://..."
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-rose-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          {/* Uang Masuk */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 text-emerald-500">Uang Masuk</label>
            <input 
              type="number" 
              value={formData.uangMasuk}
              onChange={(e) => setFormData({...formData, uangMasuk: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-emerald-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          {/* Uang Keluar */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 text-rose-500">Uang Keluar</label>
            <input 
              type="number" 
              value={formData.uangKeluar}
              onChange={(e) => setFormData({...formData, uangKeluar: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-rose-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={loading || !formData.name}
          className="w-full bg-rose-600 disabled:bg-slate-300 text-white px-6 py-4 rounded-xl text-xs font-black shadow-lg shadow-rose-100 disabled:shadow-none transition-all mt-6 flex items-center justify-center gap-2"
        >
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={16} />
              Simpan Kartu Baru
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

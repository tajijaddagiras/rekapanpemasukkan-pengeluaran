"use client";

import { useState } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { savingsService } from '@/lib/services/savingsService';

interface SavingsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SAVING_GOALS = ['Dana Darurat', 'Liburan', 'Pendidikan', 'Properti', 'Kendaraan', 'Bisnis', 'Lainnya'];

export const SavingsModal = ({ userId, isOpen, onClose }: SavingsModalProps) => {
  const [formData, setFormData] = useState({
    description: '',
    subCategory: '',
    amount: '',
    category: 'Dana Darurat',
    fromAccount: '',
    toGoal: '',
    date: new Date().toISOString().split('T')[0],
    displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    currency: 'IDR'
  });

  const handleCreate = async () => {
    if (!userId || !formData.description || !formData.amount) return;
    try {
      await savingsService.createSaving({
        userId,
        description: formData.description,
        subCategory: formData.subCategory,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        fromAccount: formData.fromAccount,
        toGoal: formData.toGoal || formData.category,
        date: new Date(formData.date),
        displayDate: formData.displayDate
      });
      onClose();
      setFormData({ 
        description: '', subCategory: '', amount: '', category: 'Dana Darurat', fromAccount: '', 
        toGoal: '', date: new Date().toISOString().split('T')[0], 
        displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        currency: 'IDR' 
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Catat Setoran Tabungan" maxWidth="max-w-lg">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi</label>
          <input type="text" value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))}
            placeholder="Setoran Dana Darurat..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Goal / Kategori</label>
          <div className="relative">
            <select value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}
              className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-4 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer">
              {SAVING_GOALS.map(g => <option key={g}>{g}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal (Rp)</label>
            <input type="number" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))}
              placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
             <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
            <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Display</label>
             <input type="text" value={formData.displayDate} onChange={e => setFormData(p => ({...p, displayDate: e.target.value}))}
              placeholder="14 April 2024" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Kategori</label>
            <input type="text" value={formData.subCategory} onChange={e => setFormData(p => ({...p, subCategory: e.target.value}))}
              placeholder="Potongan, Bonus..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Dari Rekening</label>
            <input type="text" value={formData.fromAccount} onChange={e => setFormData(p => ({...p, fromAccount: e.target.value}))}
              placeholder="BCA Tabungan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Ke Goal (Tujuan)</label>
          <input type="text" value={formData.toGoal} onChange={e => setFormData(p => ({...p, toGoal: e.target.value}))}
            placeholder="Dana Darurat, Liburan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
        </div>
        <button onClick={handleCreate} disabled={!formData.description || !formData.amount}
          className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-4 shadow-xl shadow-slate-200">
          Simpan Setoran
        </button>
      </div>
    </Modal>
  );
};

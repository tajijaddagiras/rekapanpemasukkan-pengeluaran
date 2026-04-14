"use client";

import { useState } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { recurringService, RecurringTransaction } from '@/lib/services/recurringService';

interface RecurringModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RecurringModal = ({ userId, isOpen, onClose }: RecurringModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Pengeluaran' as RecurringTransaction['type'],
    category: '',
    accountId: '',
    amount: '',
    interval: 'Bulanan' as RecurringTransaction['interval'],
    nextDate: '',
    note: ''
  });

  const handleCreate = async () => {
    if (!userId || !formData.name || !formData.amount || !formData.nextDate) return;
    try {
      await recurringService.createRecurring({
        userId,
        name: formData.name,
        type: formData.type,
        category: formData.category,
        accountId: formData.accountId || 'General',
        amount: parseFloat(formData.amount),
        interval: formData.interval,
        nextDate: new Date(formData.nextDate),
        note: formData.note,
        status: 'ACTIVE'
      });
      onClose();
      setFormData({ 
        name: '', type: 'Pengeluaran', category: '', accountId: '', amount: '', interval: 'Bulanan', nextDate: '', note: '' 
      });
    } catch (error) {
      console.error("Error creating recurring:", error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Settings Transaksi Berulang"
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Transaksi</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Contoh: Langganan Netflix"
            className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis</label>
          <div className="relative">
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as any})}
              className="w-full appearance-none bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            >
              <option>Pengeluaran</option>
              <option>Pemasukan</option>
              <option>Transfer</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori</label>
          <input 
            type="text" 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            placeholder="Hiburan, Listrik, Gaji..."
            className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
            <input 
              type="number" 
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-12 pr-5 text-sm font-bold text-slate-600 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Interval</label>
          <div className="relative">
            <select 
              value={formData.interval}
              onChange={e => setFormData({...formData, interval: e.target.value as any})}
              className="w-full appearance-none bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
            >
              <option>Harian</option>
              <option>Mingguan</option>
              <option>Bulanan</option>
              <option>Tahunan</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Berikutnya</label>
          <input 
            type="date" 
            value={formData.nextDate}
            onChange={e => setFormData({...formData, nextDate: e.target.value})}
            className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Akun / Rekening</label>
          <input 
            type="text" 
            value={formData.accountId}
            onChange={e => setFormData({...formData, accountId: e.target.value})}
            placeholder="BCA, Mandiri, Cash..."
            className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catatan</label>
          <textarea 
            rows={2}
            value={formData.note}
            onChange={e => setFormData({...formData, note: e.target.value})}
            placeholder="Tambahkan detail tambahan..."
            className="w-full bg-slate-50/50 border border-slate-100 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-5 text-sm font-bold text-slate-600 transition-all resize-none"
          />
        </div>
      </div>

      <button 
        onClick={handleCreate}
        disabled={!formData.name || !formData.amount || !formData.nextDate}
        className="w-full bg-[#1a41b8] disabled:bg-slate-300 text-white flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black transition-all mt-8 group"
      >
        <Save size={18} className="transition-transform group-hover:scale-110" />
        Simpan Recurring
      </button>
    </Modal>
  );
};

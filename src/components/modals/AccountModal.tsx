"use client";

import { useState } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { accountService, Account } from '@/lib/services/accountService';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const AccountModal = ({ isOpen, onClose, userId }: AccountModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    type: 'Bank Account' as Account['type'],
    currency: 'IDR',
    balance: '',
    initialBalance: '',
    baseValue: ''
  });

  const handleCreate = async () => {
    if (!userId || !formData.name || !formData.initialBalance) return;
    try {
      await accountService.createAccount({
        userId: userId,
        name: formData.name,
        logoUrl: formData.logoUrl,
        type: formData.type,
        currency: formData.currency,
        balance: parseFloat(formData.balance) || parseFloat(formData.initialBalance),
        initialBalance: parseFloat(formData.initialBalance) || 0,
        baseValue: parseFloat(formData.baseValue) || 0
      });
      onClose();
      setFormData({ name: '', logoUrl: '', type: 'Bank Account', currency: 'IDR', balance: '', initialBalance: '', baseValue: '' });
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Tambah Rekening Baru"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Rekening</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Contoh: BCA Personal"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Logo URL</label>
            <input 
              type="text" 
              value={formData.logoUrl}
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              placeholder="https://..."
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis Rekening</label>
            <div className="relative">
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as Account['type']})}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="Bank Account">Bank Account</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Cash">Cash</option>
                <option value="Investment Account">Investment Account</option>
                <option value="Credit Card">Credit Card</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
            <div className="relative">
              <select 
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="IDR">IDR - Rupiah</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Saldo Saat Ini</label>
            <input 
              type="number" 
              value={formData.balance}
              onChange={(e) => setFormData({...formData, balance: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Saldo Awal (Initial)</label>
            <input 
              type="number" 
              value={formData.initialBalance}
              onChange={(e) => setFormData({...formData, initialBalance: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nilai Base</label>
            <input 
              type="number" 
              value={formData.baseValue}
              onChange={(e) => setFormData({...formData, baseValue: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={!formData.name || !formData.initialBalance}
          className="w-full bg-blue-600 disabled:bg-slate-300 text-white px-6 py-4 rounded-xl text-xs font-black shadow-lg shadow-blue-100 disabled:shadow-none transition-all mt-6"
        >
          Simpan Rekening Baru
        </button>
      </div>
    </Modal>
  );
};

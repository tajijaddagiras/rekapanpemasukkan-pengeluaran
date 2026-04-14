"use client";

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { transactionService } from '@/lib/services/transactionService';

interface TopUpModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TopUpModal = ({ userId, isOpen, onClose }: TopUpModalProps) => {
  const [formData, setFormData] = useState({
    type: 'topup' as 'topup' | 'transfer',
    amount: '',
    currency: 'IDR',
    accountId: '',
    targetAccountId: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
    displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  });

  const handleCreate = async () => {
    if (!userId || !formData.amount) return;
    try {
      await transactionService.createTransaction({
        userId,
        type: formData.type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.type === 'topup' ? 'Top Up' : 'Transfer',
        accountId: formData.accountId || 'General',
        targetAccountId: formData.targetAccountId,
        date: new Date(formData.date),
        displayDate: formData.displayDate,
        note: formData.note,
        status: 'VERIFIED'
      });
      onClose();
      setFormData({ 
        type: 'topup', amount: '', currency: 'IDR', accountId: '', targetAccountId: '', note: '', 
        date: new Date().toISOString().split('T')[0],
        displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer / Top Up Baru" maxWidth="max-w-lg">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis</label>
          <div className="grid grid-cols-2 gap-3">
            {(['topup', 'transfer'] as const).map(type => (
              <button key={type} onClick={() => setFormData(p => ({...p, type}))}
                className={`py-3 rounded-xl text-sm font-black capitalize transition-all ${
                  formData.type === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500'
                }`}
              >{type === 'topup' ? 'Top Up' : 'Transfer'}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input type="number" value={formData.amount} onChange={e => setFormData(p => ({...p, amount: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>
          <div className="space-y-2 w-1/3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
             <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Dari (Asal)</label>
            <input type="text" value={formData.accountId} onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
              placeholder="E-Wallet, Bank..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Ke (Tujuan)</label>
            <input type="text" value={formData.targetAccountId} onChange={e => setFormData(p => ({...p, targetAccountId: e.target.value}))}
              placeholder="Bank XYZ..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
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

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi / Catatan</label>
          <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
            placeholder="Tujuan transfer..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
        </div>

        <button onClick={handleCreate} disabled={!formData.amount}
          className="w-full bg-blue-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-blue-100">
          Simpan Transfer
        </button>
      </div>
    </Modal>
  );
};

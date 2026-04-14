"use client";

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { transactionService } from '@/lib/services/transactionService';

interface DebtModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DebtModal = ({ userId, isOpen, onClose }: DebtModalProps) => {
  const [formData, setFormData] = useState({
    debtType: 'hutang' as 'hutang' | 'piutang',
    amount: '',
    currency: 'IDR',
    lenderName: '',
    note: '',
    accountId: '',
    installmentTenor: '',
    monthlyInterest: '',
    totalInterest: '',
    totalDebt: '',
    date: new Date().toISOString().split('T')[0],
    displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  });

  const handleCreate = async () => {
    if (!userId || !formData.amount) return;
    try {
      await transactionService.createTransaction({
        userId,
        type: 'debt',
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.debtType === 'hutang' ? 'Hutang' : 'Piutang',
        subCategory: formData.debtType === 'hutang' ? 'Hutang' : 'Piutang',
        lenderName: formData.lenderName,
        note: formData.note,
        accountId: formData.accountId || 'General',
        installmentTenor: parseInt(formData.installmentTenor) || 0,
        monthlyInterest: parseFloat(formData.monthlyInterest) || 0,
        totalInterest: parseFloat(formData.totalInterest) || 0,
        totalDebt: parseFloat(formData.totalDebt) || 0,
        date: new Date(formData.date),
        displayDate: formData.displayDate,
        status: 'PENDING'
      });
      onClose();
      setFormData({ 
        debtType: 'hutang', amount: '', currency: 'IDR', lenderName: '', note: '', accountId: '', 
        installmentTenor: '', monthlyInterest: '', totalInterest: '', totalDebt: '', 
        date: new Date().toISOString().split('T')[0],
        displayDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Catat Hutang / Piutang" maxWidth="max-w-lg">
      <div className="space-y-4 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe</label>
          <div className="grid grid-cols-2 gap-3">
            {(['hutang', 'piutang'] as const).map(type => (
              <button key={type} type="button" onClick={() => setFormData(p => ({...p, debtType: type}))}
                className={`py-3 rounded-xl text-sm font-black capitalize transition-all ${
                  formData.debtType === type
                    ? type === 'hutang' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >{type}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal Pokok</label>
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Pemberi / Penerima</label>
            <input type="text" value={formData.lenderName} onChange={e => setFormData(p => ({...p, lenderName: e.target.value}))}
              placeholder="Nama orang/bank..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening Terkait</label>
            <input type="text" value={formData.accountId} onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
              placeholder="BCA, Mandiri..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tenor (Bln)</label>
            <input type="number" value={formData.installmentTenor} onChange={e => setFormData(p => ({...p, installmentTenor: e.target.value}))}
              placeholder="12" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bunga / Bln</label>
            <input type="number" value={formData.monthlyInterest} onChange={e => setFormData(p => ({...p, monthlyInterest: e.target.value}))}
              placeholder="100000" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
           <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Bunga</label>
            <input type="number" value={formData.totalInterest} onChange={e => setFormData(p => ({...p, totalInterest: e.target.value}))}
              placeholder="1200000" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Hutang</label>
            <input type="number" value={formData.totalDebt} onChange={e => setFormData(p => ({...p, totalDebt: e.target.value}))}
              placeholder="Nominal + Total Bunga" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
           <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
            <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal Display</label>
             <input type="text" value={formData.displayDate} onChange={e => setFormData(p => ({...p, displayDate: e.target.value}))}
              placeholder="14 April 2024" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi</label>
            <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
              placeholder="Keterangan tambahan..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <button onClick={handleCreate} disabled={!formData.amount}
          className="w-full bg-black disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-4 shadow-xl shadow-slate-200">
          Simpan Catatan
        </button>
      </div>
    </Modal>
  );
};

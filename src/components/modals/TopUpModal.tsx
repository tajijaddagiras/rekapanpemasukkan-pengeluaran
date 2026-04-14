"use client";

import { useState, useEffect } from 'react';
import { Save, ChevronDown } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { transactionService } from '@/lib/services/transactionService';
import { accountService, Account } from '@/lib/services/accountService';

interface TopUpModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TopUpModal = ({ userId, isOpen, onClose }: TopUpModalProps) => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [formData, setFormData] = useState({
    type: 'topup' as 'topup' | 'transfer',
    amount: '',
    currency: 'IDR',
    accountId: '',
    targetAccountId: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && userId) {
      accountService.getUserAccounts(userId).then(setAccounts).catch(console.error);
    }
  }, [isOpen, userId]);

  const handleCreate = async () => {
    if (!userId || !formData.amount) return;
    setLoading(true);
    
    try {
      const selectedDate = new Date(formData.date);
      const displayDate = selectedDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
      
      await transactionService.createTransaction({
        userId,
        type: formData.type,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.type === 'topup' ? 'Top Up' : 'Transfer',
        accountId: formData.accountId || 'General',
        targetAccountId: formData.targetAccountId,
        date: selectedDate,
        displayDate: displayDate,
        note: formData.note,
        status: 'VERIFIED'
      });
      onClose();
      setFormData({ 
        type: 'topup', amount: '', currency: 'IDR', accountId: '', targetAccountId: '', note: '', 
        date: new Date().toISOString().split('T')[0]
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer / Top Up Baru" maxWidth="max-w-lg">
      <div className="space-y-5 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Jenis Layanan</label>
          <div className="grid grid-cols-2 gap-3">
            {(['topup', 'transfer'] as const).map(type => (
              <button key={type} onClick={() => setFormData(p => ({...p, type}))}
                className={`py-3.5 rounded-2xl text-sm font-black capitalize transition-all ${
                  formData.type === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
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
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>
          <div className="space-y-2 w-1/3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
             <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              {formData.type === 'topup' ? 'Rekening Sumber' : 'Dari (Asal)'}
            </label>
            <div className="relative">
              <select 
                value={formData.accountId}
                onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="">Pilih Rekening</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency})</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              {formData.type === 'topup' ? 'Tujuan Top Up' : 'Ke (Tujuan)'}
            </label>
            <div className="relative">
              <select 
                value={formData.targetAccountId}
                onChange={e => setFormData(p => ({...p, targetAccountId: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="">Pilih Tujuan</option>
                <option value="Wallet">Digital Wallet (OVO/Gopay/DANA)</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency})</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
          <input type="date" value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
            className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-700 transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Deskripsi / Catatan</label>
          <input type="text" value={formData.note} onChange={e => setFormData(p => ({...p, note: e.target.value}))}
            placeholder="Tujuan transfer..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-700 transition-all" />
        </div>

        <button onClick={handleCreate} disabled={loading || !formData.amount}
          className="w-full bg-blue-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Transfer
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

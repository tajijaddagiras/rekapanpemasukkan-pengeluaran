"use client";

import { useState, useEffect } from 'react';
import { Save, ChevronDown } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { investmentService } from '@/lib/services/investmentService';
import { accountService, Account } from '@/lib/services/accountService';
import { CategorySelect } from '@/components/CategorySelect';

interface DepositModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ userId, isOpen, onClose }: DepositModalProps) => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    currency: 'IDR',
    amountInvested: '',
    durationMonths: '',
    returnPercentage: '',
    transactionType: 'Penempatan',
    category: '',
    accountId: '',
    dateInvested: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && userId) {
      accountService.getUserAccounts(userId).then(setAccounts).catch(console.error);
    }
  }, [isOpen, userId]);

  const handleCreate = async () => {
    if (!userId || !formData.name || !formData.amountInvested) return;
    setLoading(true);
    
    const invested = parseFloat(formData.amountInvested);
    const rate = parseFloat(formData.returnPercentage) || 0;
    
    try {
      await investmentService.createInvestment({
        userId, name: formData.name, type: 'Deposito',
        platform: formData.platform, amountInvested: invested,
        currentValue: invested * (1 + (rate / 100 / 12) * parseInt(formData.durationMonths || '12')),
        returnPercentage: rate,
        currency: formData.currency, 
        durationMonths: parseInt(formData.durationMonths) || 0,
        transactionType: formData.transactionType,
        category: formData.category,
        accountId: formData.accountId || 'General',
        dateInvested: new Date(formData.dateInvested), status: 'Active'
      });
      onClose();
      setFormData({ name: '', platform: '', currency: 'IDR', amountInvested: '', durationMonths: '', returnPercentage: '', transactionType: 'Penempatan', category: '', accountId: '', dateInvested: new Date().toISOString().split('T')[0] });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buka Deposito Baru" maxWidth="max-w-lg">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nama Deposito</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              placeholder="Deposito Fleksi..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bank / Institusi</label>
            <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
              placeholder="BCA, Mandiri..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input type="number" value={formData.amountInvested} onChange={e => setFormData(p => ({...p, amountInvested: e.target.value}))}
                placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
            <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Durasi (Bulan)</label>
            <input type="number" value={formData.durationMonths} onChange={e => setFormData(p => ({...p, durationMonths: e.target.value}))}
              placeholder="12" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bunga / Thn (%)</label>
            <input type="number" step="0.01" value={formData.returnPercentage} onChange={e => setFormData(p => ({...p, returnPercentage: e.target.value}))}
              placeholder="5.5" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening / Sumber</label>
            <div className="relative">
              <select 
                value={formData.accountId}
                onChange={e => setFormData(p => ({...p, accountId: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all cursor-pointer"
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
            <input type="date" value={formData.dateInvested} onChange={e => setFormData(p => ({...p, dateInvested: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        {/* Kategori */}
        <div className="space-y-2">
          <CategorySelect 
            label="Kategori Deposito"
            value={formData.category}
            type="expense" // Deposito is technically an outflow/allocation, so 'expense' category list or similar
            onChange={(val) => setFormData(p => ({...p, category: val}))}
            showBadge={false}
          />
        </div>

        <button onClick={handleCreate} disabled={loading || !formData.name || !formData.amountInvested}
          className="w-full bg-indigo-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Deposito
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

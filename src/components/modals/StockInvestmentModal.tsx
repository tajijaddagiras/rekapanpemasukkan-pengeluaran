"use client";

import { useState, useEffect } from 'react';
import { Save, ChevronDown } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { investmentService } from '@/lib/services/investmentService';
import { accountService, Account } from '@/lib/services/accountService';

interface StockInvestmentModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StockInvestmentModal = ({ userId, isOpen, onClose }: StockInvestmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [formData, setFormData] = useState({
    stockCode: '',
    logoUrl: '',
    exchangeCode: 'IDX',
    currency: 'IDR',
    sharesCount: '',
    pricePerShare: '',
    currentValue: '',
    transactionType: 'Beli',
    category: 'Saham',
    accountId: '',
    platform: '',
    dateInvested: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && userId) {
      accountService.getUserAccounts(userId).then(setAccounts).catch(console.error);
    }
  }, [isOpen, userId]);

  const handleCreate = async () => {
    if (!userId || !formData.stockCode || !formData.sharesCount || !formData.pricePerShare) return;
    setLoading(true);
    
    const shares = parseFloat(formData.sharesCount) || 0;
    const price = parseFloat(formData.pricePerShare) || 0;
    const invested = shares * price;
    const current = parseFloat(formData.currentValue) || invested;
    
    try {
      await investmentService.createInvestment({
        userId, 
        name: formData.stockCode, 
        type: 'Saham',
        stockCode: formData.stockCode.toUpperCase(),
        exchangeCode: formData.exchangeCode.toUpperCase(),
        logoUrl: formData.logoUrl,
        sharesCount: shares,
        pricePerShare: price,
        transactionType: formData.transactionType,
        category: formData.category,
        accountId: formData.accountId || 'General',
        platform: formData.platform,
        amountInvested: invested, 
        currentValue: current,
        returnPercentage: invested > 0 ? ((current - invested) / invested) * 100 : 0,
        currency: formData.currency, 
        dateInvested: new Date(formData.dateInvested), 
        status: 'Active'
      });
      onClose();
      // Reset form
      setFormData({ 
        stockCode: '', logoUrl: '', exchangeCode: 'IDX', currency: 'IDR', sharesCount: '', 
        pricePerShare: '', currentValue: '', transactionType: 'Beli', category: 'Saham', 
        accountId: '', platform: '', dateInvested: new Date().toISOString().split('T')[0] 
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Posisi Saham" maxWidth="max-w-lg">
      <div className="space-y-4 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kode Saham</label>
            <input type="text" value={formData.stockCode} onChange={e => setFormData(p => ({...p, stockCode: e.target.value.toUpperCase()}))}
              placeholder="BBCA, TLKM..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Icon/Logo (URL)</label>
            <input type="text" value={formData.logoUrl} onChange={e => setFormData(p => ({...p, logoUrl: e.target.value}))}
              placeholder="https://..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kode Bursa</label>
            <input type="text" value={formData.exchangeCode} onChange={e => setFormData(p => ({...p, exchangeCode: e.target.value.toUpperCase()}))}
              placeholder="IDX, NYSE..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
            <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Lembar (Qty)</label>
            <input type="number" value={formData.sharesCount} onChange={e => setFormData(p => ({...p, sharesCount: e.target.value}))}
              placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Harga Beli / Lembar</label>
            <input type="number" value={formData.pricePerShare} onChange={e => setFormData(p => ({...p, pricePerShare: e.target.value}))}
              placeholder="8000" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rekening / RDN</label>
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Platform Broker</label>
            <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
              placeholder="Stockbit, Ajaib..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Valuasi Saat Ini (Estimasi)</label>
            <input type="number" value={formData.currentValue} onChange={e => setFormData(p => ({...p, currentValue: e.target.value}))}
              placeholder="Opsional" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tanggal</label>
            <input type="date" value={formData.dateInvested} onChange={e => setFormData(p => ({...p, dateInvested: e.target.value}))}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <button onClick={handleCreate} disabled={loading || !formData.stockCode || !formData.sharesCount || !formData.pricePerShare}
          className="w-full bg-indigo-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Posisi Saham
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

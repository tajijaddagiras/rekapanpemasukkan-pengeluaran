"use client";

import { useState, useEffect } from 'react';
import { Save, ChevronDown } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { investmentService } from '@/lib/services/investmentService';
import { accountService, Account } from '@/lib/services/accountService';
import { CategorySelect } from '@/components/CategorySelect';

interface OtherInvestmentModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OtherInvestmentModal = ({ userId, isOpen, onClose }: OtherInvestmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    currency: 'IDR',
    quantity: '',
    unit: '',
    pricePerUnit: '',
    currentValue: '',
    transactionType: 'Pembelian',
    category: '',
    accountId: '',
    platform: '',
    assetType: 'Emas',
    dateInvested: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && userId) {
      accountService.getUserAccounts(userId).then(setAccounts).catch(console.error);
    }
  }, [isOpen, userId]);

  const handleCreate = async () => {
    if (!userId || !formData.name || !formData.quantity || !formData.pricePerUnit) return;
    setLoading(true);
    
    const qty = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.pricePerUnit) || 0;
    const invested = qty * price;
    const current = parseFloat(formData.currentValue) || invested;
    
    try {
      await investmentService.createInvestment({
        userId, name: formData.name, type: 'Lainnya',
        platform: formData.platform || formData.assetType,
        amountInvested: invested, currentValue: current,
        returnPercentage: invested > 0 ? ((current - invested) / invested) * 100 : 0,
        currency: formData.currency, 
        logoUrl: formData.logoUrl,
        quantity: qty,
        unit: formData.unit,
        pricePerUnit: price,
        transactionType: formData.transactionType,
        category: formData.category,
        accountId: formData.accountId || 'General',
        dateInvested: new Date(formData.dateInvested), status: 'Active'
      });
      onClose();
      setFormData({ name: '', logoUrl: '', currency: 'IDR', quantity: '', unit: '', pricePerUnit: '', currentValue: '', transactionType: 'Pembelian', category: '', accountId: '', platform: '', assetType: 'Emas', dateInvested: new Date().toISOString().split('T')[0] });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Aset Investasi" maxWidth="max-w-lg">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Judul / Produk Investasi</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              placeholder="Emas Antam 50gr, BTC..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">URL Logo (Opsional)</label>
            <input type="url" value={formData.logoUrl} onChange={e => setFormData(p => ({...p, logoUrl: e.target.value}))}
              placeholder="https://..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kuantitas</label>
            <input type="number" value={formData.quantity} onChange={e => setFormData(p => ({...p, quantity: e.target.value}))}
              placeholder="0" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Satuan</label>
            <input type="text" value={formData.unit} onChange={e => setFormData(p => ({...p, unit: e.target.value}))}
              placeholder="Gram, Lot, Koin..." className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Harga Beli / Satuan</label>
            <input type="number" value={formData.pricePerUnit} onChange={e => setFormData(p => ({...p, pricePerUnit: e.target.value}))}
              placeholder="Rp" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mata Uang</label>
            <input type="text" value={formData.currency} onChange={e => setFormData(p => ({...p, currency: e.target.value.toUpperCase()}))}
              placeholder="IDR" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Platform</label>
            <input type="text" value={formData.platform} onChange={e => setFormData(p => ({...p, platform: e.target.value}))}
              placeholder="Pegadaian, Indodax, dll" className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all" />
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

        {/* Tipe Transaksi & Kategori */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipe Transaksi</label>
            <div className="relative">
              <select 
                value={formData.transactionType}
                onChange={e => setFormData(p => ({...p, transactionType: e.target.value}))}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="Pembelian">Pembelian</option>
                <option value="Penjualan">Penjualan</option>
                <option value="Apresiasi">Apresiasi</option>
                <option value="Dividen">Dividen</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <CategorySelect 
              label="Kategori Investasi"
              value={formData.category}
              type="expense"
              onChange={(val: string) => setFormData(p => ({...p, category: val}))}
              showBadge={false}
            />
          </div>
        </div>

        <button onClick={handleCreate} disabled={loading || !formData.name || !formData.quantity || !formData.pricePerUnit}
          className="w-full bg-indigo-600 disabled:bg-slate-300 text-white py-4 rounded-xl text-sm font-black transition-all mt-6 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Aset Investasi
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

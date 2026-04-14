"use client";

import { useState } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { budgetService, Budget } from '@/lib/services/budgetService';

interface BudgetModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetModal = ({ userId, isOpen, onClose }: BudgetModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly' as Budget['period']
  });

  const handleCreate = async () => {
    if (!userId || !formData.category || !formData.amount) return;
    setLoading(true);
    try {
      await budgetService.createBudget({
        userId,
        category: formData.category,
        amount: parseFloat(formData.amount),
        period: formData.period
      });
      onClose();
      setFormData({ category: '', amount: '', period: 'monthly' });
    } catch (error) {
      console.error("Error creating budget:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Set Budget Limit Baru"
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori Budget</label>
          <div className="relative">
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-6 text-sm font-bold text-slate-700 transition-all cursor-pointer"
            >
              <option value="">Pilih Kategori</option>
              <option value="Groceries & Living">Groceries & Living</option>
              <option value="Travel & Discovery">Travel & Discovery</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Digital Subscriptions">Digital Subscriptions</option>
              <option value="Lainnya">Lainnya...</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nominal Limit</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0"
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Periode</label>
            <div className="relative">
              <select 
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value as 'monthly' | 'yearly'})}
                className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 rounded-xl py-3.5 px-6 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                <option value="monthly">Bulanan</option>
                <option value="yearly">Tahunan</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={loading || !formData.category || !formData.amount}
          className="w-full bg-indigo-600 disabled:bg-slate-300 flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black text-white transition-all shadow-xl shadow-indigo-100 mt-6"
        >
          {loading ? 'Menyimpan...' : (
            <>
              <Save size={18} />
              Simpan Budget
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

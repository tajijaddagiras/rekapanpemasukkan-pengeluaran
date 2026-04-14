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
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly' as Budget['period']
  });

  const handleCreate = async () => {
    if (!userId || !formData.category || !formData.amount) return;
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
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Settings Budget Baru"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600">Kategori</label>
          <div className="relative">
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-[#004d40] focus:outline-none rounded-xl py-4 px-6 text-sm font-bold text-slate-700 transition-all cursor-pointer"
            >
              <option value="">Select Category</option>
              <option value="Groceries & Living">Groceries & Living</option>
              <option value="Travel & Discovery">Travel & Discovery</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Digital Subscriptions">Digital Subscriptions</option>
              <option value="Lainnya">Lainnya...</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600">Limit Budget</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
            <input 
              type="number" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0"
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-[#004d40] focus:outline-none rounded-xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600">Periode</label>
          <div className="relative">
            <select 
              value={formData.period}
              onChange={(e) => setFormData({...formData, period: e.target.value as 'monthly' | 'yearly'})}
              className="w-full appearance-none bg-slate-50 border-none focus:ring-2 focus:ring-[#004d40] focus:outline-none rounded-xl py-4 px-6 text-sm font-bold text-slate-700 transition-all cursor-pointer"
            >
              <option value="monthly">Bulanan (Monthly Target)</option>
              <option value="yearly">Tahunan (Yearly Target)</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          disabled={!formData.category || !formData.amount}
          className="w-full bg-[#004d40] disabled:bg-slate-300 flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black text-white outline-none transition-all shadow-lg shadow-[#004d40]/20 mt-8"
        >
          <Save size={16} />
          Simpan Budget
        </button>
      </div>
    </Modal>
  );
};

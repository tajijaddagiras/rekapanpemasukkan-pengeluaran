"use client";

import { useState } from 'react';
import { X, Save, TrendingUp, TrendingDown, Briefcase, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Input } from './Input';
import { CategorySelect } from './CategorySelect';
import { addTransaction, TransactionType } from '@/lib/services/transactionService';
import { updateMemberTotals } from '@/lib/services/userService';

interface AddTransactionModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ userId, isOpen, onClose }: AddTransactionModalProps) => {
  const [type, setType] = useState<TransactionType>('pemasukkan');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [budget, setBudget] = useState('');
  const [actual, setActual] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTransaction({
        userId,
        type,
        category,
        item,
        budget: Number(budget),
        actual: Number(actual),
        date: new Date(),
      });
      await updateMemberTotals(userId, type, Number(actual));
      onClose();
      // Reset form
      setItem('');
      setBudget('');
      setActual('');
    } catch (err) {
      console.error('Error adding transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  const types = [
    { id: 'pemasukkan', label: 'Income', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'pengeluaran', label: 'Expense', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'investasi', label: 'Investment', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'tabungan', label: 'Savings', icon: PiggyBank, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white border border-slate-100 rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-8 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tambah Transaksi</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Type Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {types.map((t) => {
              const Icon = t.icon;
              const isActive = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id as TransactionType)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all",
                    isActive ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                  )}
                >
                  <Icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-indigo-600" : "text-slate-400")}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategorySelect 
              label="Kategori" 
              value={category} 
              type={type === 'pemasukkan' ? 'income' : 'expense'} 
              onChange={setCategory} 
            />
            <Input 
              label="Nama Item" 
              placeholder="Contoh: Gaji Januari" 
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Budget (Rp)" 
              placeholder="0" 
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
            <Input 
              label="Actual (Rp)" 
              placeholder="0" 
              type="number"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="secondary" className="flex-1 font-bold h-12 rounded-2xl" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button className="flex-1 font-bold h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100" isLoading={loading}>
              <Save size={18} className="mr-2" /> Simpan Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

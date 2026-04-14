"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Save, 
  ArrowRight,
  ShoppingCart,
  Plane,
  ShieldPlus,
  Zap,
  Target,
  Edit2,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { budgetService, Budget } from '@/lib/services/budgetService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly' as Budget['period']
  });

  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'budgets'), where('userId', '==', u.uid));
        if (unsubRef.current) unsubRef.current();
        const unsubSnap = onSnapshot(q, (snap) => {
          setBudgets(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, amount: Number(d.amount) || 0, createdAt: d.createdAt?.toDate?.() ?? new Date() } as Budget;
          }));
          setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
        unsubRef.current = unsubSnap;
      } else { setBudgets([]); setLoading(false); }
    });
    return () => { unsub(); if (unsubRef.current) unsubRef.current(); };
  }, []);

  const handleCreate = async () => {
    if (!user || !formData.category || !formData.amount) return;
    try {
      await budgetService.createBudget({
        userId: user.uid,
        category: formData.category,
        amount: parseFloat(formData.amount),
        period: formData.period
      });
      setIsAddModalOpen(false);
      setFormData({ category: '', amount: '', period: 'monthly' });
      // onSnapshot otomatis update
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const getIconForCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('grocery') || lower.includes('food') || lower.includes('makan')) return <ShoppingCart size={18} />;
    if (lower.includes('travel') || lower.includes('transport')) return <Plane size={18} />;
    if (lower.includes('health') || lower.includes('kesehatan')) return <ShieldPlus size={18} />;
    if (lower.includes('digital') || lower.includes('listrik') || lower.includes('tagihan')) return <Zap size={18} />;
    return <Target size={18} />;
  };

  const getColorsForCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('grocery') || lower.includes('food')) return 'bg-stone-50 text-stone-600 border-stone-200';
    if (lower.includes('travel') || lower.includes('transport')) return 'bg-cyan-50 text-cyan-600 border-cyan-200';
    if (lower.includes('health') || lower.includes('kesehatan')) return 'bg-blue-50 text-blue-600 border-blue-200';
    if (lower.includes('digital') || lower.includes('listrik')) return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    return 'bg-purple-50 text-purple-600 border-purple-200';
  };

  const formatRp = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 max-w-[1400px] mb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Budget & Target</h1>
          <p className="text-[12px] md:text-sm font-medium text-slate-500 mt-2 leading-relaxed">
            Orchestrate your financial future with precision. Set your limits, define your targets, and let our Atelier track the progress of your fiscal journey.
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#004d40] text-white px-4 py-2.5 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl text-[13px] font-black shadow-xl shadow-green-50 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
          >
            <Plus size={18} />
            Tambah Cepat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN (1/3) */}
        <div className="space-y-6">
           {/* Summary Info */}
           <div className="bg-[#004d40] p-6 md:p-10 rounded-[20px] md:rounded-[40px] text-white relative overflow-hidden group shadow-xl shadow-green-100">
            <div className="relative z-10 space-y-3 md:space-y-4">
              <h3 className="text-lg font-black tracking-tight text-white/90">Efficiency Pulse</h3>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">{budgets.length > 0 ? '82%' : '0%'}</span>
                <span className="text-sm font-medium text-white/70 mb-1.5">Optimal</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-medium pt-4 border-t border-white/10">
                Pencatatan yang tersistematis membantu mengurangi pemborosan anggaran hingga 30%.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
          </div>

          <div className="bg-slate-50/50 p-6 rounded-[20px] md:rounded-[32px] border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Target Diset</p>
              <p className="text-xl font-black text-slate-900 tracking-tight">{budgets.length}</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#004d40] shadow-sm border border-slate-100">
               <Target size={20} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-white h-full rounded-[20px] md:rounded-[40px] border border-slate-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#004d40] rounded-full" />
                <h2 className="text-lg font-black text-slate-900">Current Allocations</h2>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#004d40] transition-colors w-fit">
                View Detailed Reports
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="p-10 text-center text-sm font-medium text-slate-400">Memuat budget & target...</div>
              ) : budgets.length === 0 ? (
                <div className="p-6 h-full flex items-center justify-center">
                  <EmptyState 
                    title="Alokasi masih kosong" 
                    description="Anda belum menentukan margin pengeluaran. Set budget untuk mulai mengontrol keuangan."
                    icon={<Target size={24} />}
                  />
                </div>
              ) : (
                <div className="p-6 flex-1 space-y-2">
                  {budgets.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl bg-slate-50/50 border border-slate-50 gap-4 group transition-colors hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl shrink-0 ${getColorsForCategory(item.category)} flex items-center justify-center border shadow-sm`}>
                          {getIconForCategory(item.category)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-black text-slate-900 tracking-tight truncate">{item.category}</h4>
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5 truncate uppercase tracking-widest">{item.period} TARGET</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black text-slate-900 tracking-tight">{formatRp(item.amount)}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-[#004d40] bg-white rounded-lg shadow-sm border border-slate-100">
                             <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={async () => {
                              if(item.id) {
                                await budgetService.deleteBudget(item.id);
                                // onSnapshot otomatis update
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-500 bg-white rounded-lg shadow-sm border border-slate-100">
                             <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Budget */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
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

    </div>
  );
}

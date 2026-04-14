"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

interface CategoryData {
  id: string;
  category: string;
  subCategory: string;
}

export const CategorySelect = ({ label, value, type, onChange, showBadge = true }: { label: string, value: string, type: 'income' | 'expense', onChange: (val: string) => void, showBadge?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'categories'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setCategories(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CategoryData)));
    });

    return () => unsub();
  }, []);

  const options = categories.map(c => ({
    label: `${c.category} - ${c.subCategory}`,
    value: c.id
  }));

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 space-y-2" ref={containerRef}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 flex items-center justify-between transition-all hover:border-slate-300",
            isOpen && "border-indigo-600 bg-white ring-4 ring-indigo-500/5 shadow-lg"
          )}
        >
          <span className={cn("text-sm font-bold", !selectedOption && "text-slate-400")}>
            {selectedOption ? selectedOption.label : 'Pilih Kategori'}
          </span>
          <ChevronDown 
            size={18} 
            className={cn("text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-indigo-600")} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-3 p-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left group",
                    value === opt.value 
                      ? "bg-indigo-50 text-indigo-600 font-black" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-medium"
                  )}
                >
                  {opt.label}
                  {value === opt.value && <Check size={16} className="text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {showBadge && (
        <div className="flex gap-2 p-1">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
            type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {type}
          </span>
        </div>
      )}
    </div>
  );
};

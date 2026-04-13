"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  Calendar, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { YearCard } from '@/components/YearCard';
import { CategorySelect } from '@/components/CategorySelect';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AnnualDashboard() {
  const [cat1, setCat1] = useState('gaji');
  const [cat2, setCat2] = useState('rent');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);
  const [realYears, setRealYears] = useState<{ year: string, income: number, expense: number }[]>([]);
  const [tableData, setTableData] = useState<{ item: string, budget: number, actual: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    let unsubscribeTransactions: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        // Subscribe to real transactions
        const { subscribeTransactions } = require('@/lib/services/transactionService');
        unsubscribeTransactions = subscribeTransactions(usr.uid, (transactions: any[]) => {
          // Process Yearly Data
          const yearMap: Record<string, { income: number, expense: number }> = {};
          const categoryMap: Record<string, { budget: number, actual: number }> = {};
          
          transactions.forEach(t => {
            const y = new Date(t.date).getFullYear().toString();
            if (!yearMap[y]) yearMap[y] = { income: 0, expense: 0 };
            
            if (t.type === 'pemasukkan') yearMap[y].income += t.actual;
            else yearMap[y].expense += t.actual;

            // Process categories for selected year
            if (y === selectedYear) {
              const catLabel = t.category || t.item;
              if (!categoryMap[catLabel]) categoryMap[catLabel] = { budget: 0, actual: 0 };
              categoryMap[catLabel].actual += t.actual;
              categoryMap[catLabel].budget += (t.budget || 0);
            }
          });

          const processedYears = Object.entries(yearMap).map(([year, values]) => ({
            year,
            income: values.income,
            expense: values.expense
          })).sort((a, b) => b.year.localeCompare(a.year));

          const processedTable = Object.entries(categoryMap).map(([item, values]) => ({
            item,
            budget: values.budget,
            actual: values.actual
          }));

          setRealYears(processedYears);
          setTableData(processedTable);
          setLoading(false);
        });
      } else {
        // CLEANUP LISTENERS ON LOGOUT
        if (unsubscribeTransactions) unsubscribeTransactions();
        unsubscribeTransactions = null;
        
        router.push('/auth/login');
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeTransactions) unsubscribeTransactions();
    };
  }, [router, selectedYear]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }


  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Category Filters */}
      <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
            <Filter size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Perbandingan Tahunan</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Analisis data budget antar kategori</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full flex flex-col gap-2">
            <CategorySelect label="Kategori 1" value={cat1} type="income" onChange={setCat1} showBadge={false} />
            <div className="px-1 group">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100/50 group-hover:bg-emerald-100 transition-colors">Income</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center pt-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2">
            <CategorySelect label="Kategori 2" value={cat2} type="expense" onChange={setCat2} showBadge={false} />
            <div className="px-1 group">
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[9px] font-black text-rose-600 uppercase tracking-widest border border-rose-100/50 group-hover:bg-rose-100 transition-colors">Expense</span>
            </div>
          </div>
          
          <div className="md:pt-6">
            <button className="w-full md:w-auto px-10 py-4 mb-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
              <span className="flex items-center gap-2">
                Terapkan Filter
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Year Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {realYears.length > 0 ? (
          realYears.map((y) => (
            <YearCard 
              key={y.year} 
              year={y.year} 
              income={formatCurrency(y.income).replace('Rp ', '')} 
              expense={formatCurrency(y.expense).replace('Rp ', '')} 
              isActive={selectedYear === y.year}
              onClick={() => setSelectedYear(y.year)}
            />
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white border border-slate-100 rounded-[40px] shadow-sm">
            <p className="text-slate-400 font-bold">Belum ada data transaksi tahunan.</p>
          </div>
        )}
      </div>

      {/* Annual Summary Table */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
            <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
            Rekap Data {selectedYear}
          </h3>
          <div className="text-xs text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full">
            Annual Summary
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Item / Kategori</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Annual Budget</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Annual Actual</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Selisih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.length > 0 ? (
                  tableData.map((row, i) => {
                    const selisih = row.actual - row.budget;
                    return (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{row.item}</div>
                        </td>
                        <td className="px-8 py-6 text-right text-slate-500 font-mono text-sm tracking-tight">{formatCurrency(row.budget)}</td>
                        <td className="px-8 py-6 text-right text-slate-900 font-black font-mono tracking-tight">{formatCurrency(row.actual)}</td>
                        <td className={cn(
                          "px-8 py-6 text-right font-black font-mono tracking-tight",
                          selisih >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {selisih > 0 ? '+' : ''}{formatCurrency(selisih)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-medium">
                      Tidak ada data transaksi untuk tahun {selectedYear}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

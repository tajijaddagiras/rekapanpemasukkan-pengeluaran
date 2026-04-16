"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  TrendingDown,
  TrendingUp, 
  ShieldCheck,
  FileSpreadsheet,
  Printer,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { YearPicker } from '@/components/ui/YearPicker';
import { transactionService, Transaction } from '@/lib/services/transactionService';
import { investmentService, Investment } from '@/lib/services/investmentService';
import { accountService, Account } from '@/lib/services/accountService';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function PajakCenterPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubTrx: (() => void) | null = null;
    let unsubInv: (() => void) | null = null;
    let unsubAcc: (() => void) | null = null;

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const startOfYear = new Date(selectedYear, 0, 1);
        const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59);

        const qTrx = query(
          collection(db, 'transactions'),
          where('userId', '==', u.uid),
          where('date', '>=', startOfYear),
          where('date', '<=', endOfYear),
          orderBy('date', 'desc')
        );
        unsubTrx = onSnapshot(qTrx, (snap) => {
          setTransactions(snap.docs.map(doc => {
            const d = doc.data();
            return { ...d, id: doc.id, amount: Number(d.amount) || 0, date: d.date?.toDate?.() ?? new Date() } as Transaction;
          }));
        });

        const qInv = query(collection(db, 'investments'), where('userId', '==', u.uid));
        unsubInv = onSnapshot(qInv, (snap) => {
          setInvestments(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Investment));
        });

        const qAcc = query(collection(db, 'accounts'), where('userId', '==', u.uid));
        unsubAcc = onSnapshot(qAcc, (snap) => {
          setAccounts(snap.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Account));
        });
      }
    });

    return () => {
      unsub();
      if (unsubTrx) unsubTrx();
      if (unsubInv) unsubInv();
      if (unsubAcc) unsubAcc();
    };
  }, [selectedYear]);

  // SPT Specific Aggregations
  const daftarHarta = useMemo(() => {
    return [
      ...accounts.map(acc => ({ name: acc.name, type: acc.type, value: Number(acc.balance) || 0 })),
      ...investments.map(inv => ({ name: inv.name, type: 'Investasi', value: Number(inv.amountInvested) || 0 }))
    ];
  }, [accounts, investments]);

  const daftarUtang = useMemo(() => {
    return accounts.filter(acc => acc.type === 'Kartu Kredit' && acc.balance < 0).map(acc => ({
      name: acc.name,
      value: Math.abs(acc.balance)
    }));
  }, [accounts]);

  const totalHarta = daftarHarta.reduce((s, h) => s + h.value, 0);
  const totalUtang = daftarUtang.reduce((s, u) => s + u.value, 0);

  // New Summary Calculations for PDF
  const totalPemasukan = useMemo(() => transactions.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalPengeluaran = useMemo(() => transactions.filter(t => t.type === 'pengeluaran').reduce((s, t) => s + t.amount, 0), [transactions]);
  const netIncome = totalPemasukan - totalPengeluaran;
  
  const investasiPembelian = useMemo(() => {
    // Assuming transactions with category 'Investasi' or related are investment purchases
    return transactions
      .filter(t => t.type === 'pengeluaran' && (t.category?.toLowerCase().includes('investasi') || t.category === 'Saham' || t.category === 'Deposito'))
      .reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const totalPiutang = useMemo(() => {
    return accounts.filter(acc => acc.type?.toLowerCase().includes('piutang')).reduce((s, a) => s + (Number(a.balance) || 0), 0);
  }, [accounts]);

  const formatIDR = (val: number) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };

  const generatedAt = useMemo(() => {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now.getHours()}.${now.getMinutes().toString().padStart(2, '0')}.${now.getSeconds().toString().padStart(2, '0')}`;
  }, []);

  // Export Funcs
  const handleExportExcel = () => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// ... rest of handleExportExcel ...
    let tableHtml = `
      <table border="1">
        <tr style="background-color: #f1f5f9;">
          <th style="padding: 10px;">Bulan</th>
          <th style="padding: 10px;">Pemasukan</th>
          <th style="padding: 10px;">Pengeluaran</th>
          <th style="padding: 10px;">Net Arus Kas</th>
        </tr>
    `;

    months.forEach((m, idx) => {
      const monthTrx = transactions.filter(t => t.date.getMonth() === idx);
      const inc = monthTrx.filter(t => t.type === 'pemasukan').reduce((s, t) => s + t.amount, 0);
      const exp = monthTrx.filter(t => t.type === 'pengeluaran').reduce((s, t) => s + t.amount, 0);
      tableHtml += `
        <tr>
          <td style="padding: 8px;">${m}</td>
          <td style="padding: 8px; text-align: right;">${inc.toLocaleString()}</td>
          <td style="padding: 8px; text-align: right;">${exp.toLocaleString()}</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">${(inc - exp).toLocaleString()}</td>
        </tr>
      `;
    });

    tableHtml += `</table>`;
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Pajak_${selectedYear}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1400px] print:p-0 print:m-0 print:bg-white print:max-w-none">
      
      {/* 0. Print-Only Minimalist Report (Matches User Image) */}
      <div className="hidden print:block font-sans text-slate-800 p-8 space-y-10">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Draft Ringkasan SPT {selectedYear}</h1>
          <p className="text-[10px] text-slate-400">Generated at {generatedAt}</p>
        </div>

        {/* Ringkasan Total */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold border-b border-slate-100 pb-2">Ringkasan Total</h2>
          <div className="space-y-3">
            {[
              { label: 'Penghasilan', value: formatIDR(totalPemasukan) },
              { label: 'Pengeluaran', value: formatIDR(totalPengeluaran) },
              { label: 'Net Income', value: formatIDR(netIncome) },
              { label: 'Investasi (Pembelian)', value: formatIDR(investasiPembelian) },
              { label: 'Nilai Aset Investasi', value: formatIDR(totalHarta) },
              { label: 'Total Hutang', value: formatIDR(totalUtang) },
              { label: 'Total Piutang', value: formatIDR(totalPiutang) },
              { label: 'Jumlah Transaksi', value: transactions.length },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapping Kategori Pajak */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-bold border-b border-slate-100 pb-2">Mapping Kategori Pajak</h2>
          <div className="space-y-3">
            {[
              { label: 'Penghasilan (bucket)', value: formatIDR(totalPemasukan) },
              { label: 'Biaya (bucket)', value: formatIDR(totalPengeluaran - investasiPembelian) },
              { label: 'Investasi (bucket)', value: formatIDR(investasiPembelian) },
              { label: 'Lainnya (bucket)', value: formatIDR(0) },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Header (Dashboard View) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm print:hidden">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">Pajak Center</h2>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">SPT Annual Assistant - {selectedYear}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all"
          >
            <FileSpreadsheet size={14} />
            Excel
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-200 transition-all"
          >
            <Printer size={14} />
            PDF / Print
          </button>

          <div className="w-px h-6 bg-slate-100 mx-1" />

          <YearPicker 
            value={selectedYear}
            onChange={(y) => setSelectedYear(y)}
          />
        </div>
      </div>

      {/* 2. SPT Assistant Section (Dashboard View) */}
      <div className="p-8 md:p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group print:hidden">
        <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-white/10 transition-colors">
          <ShieldCheck size={180} />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                SPT Tax Assistant
              </div>
              <h3 className="text-3xl font-serif font-black tracking-tight">Kesiapan Laporan Pajak</h3>
              <p className="text-slate-400 font-medium text-sm max-w-md">Data di bawah ini dirangkum untuk membantu Anda mengisi daftar harta dan kewajiban pada SPT Tahunan.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status Ketersediaan Data</p>
              <div className="flex items-center gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-400">Siap Dilaporkan</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Daftar Harta */}
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-500" />
                Daftar Harta (Aset)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {daftarHarta.length === 0 ? (
                  <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-slate-500 italic text-sm">Belum ada aset terdaftar.</div>
                ) : (
                  daftarHarta.map((harta, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group">
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1 truncate">{harta.type}</p>
                        <p className="text-sm font-bold text-white truncate">{harta.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-white">Rp {harta.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Daftar Utang & Kewajiban */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingDown size={14} className="text-rose-500" />
                Daftar Utang
              </h4>
              <div className="space-y-3">
                {daftarUtang.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-slate-500 italic text-sm">Tidak ada kewajiban tercatat.</div>
                ) : (
                  daftarUtang.map((utang, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500/10 transition-all flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">KEWAJIBAN</p>
                        <p className="text-sm font-bold text-white truncate">{utang.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-rose-400">Rp {utang.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Total Harta Bersih</span>
                  <span className="text-lg font-serif font-black text-indigo-400">Rp {(totalHarta - totalUtang).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Catatan Section (Dashboard View) */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-start gap-6 border-l-4 border-l-indigo-600 print:hidden">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <Info size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Catatan Penting</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Data ini dikumpulkan berdasarkan saldo rekening, daftar aset investasi, dan tagihan kartu kredit yang tercatat dalam sistem Leosiqra. 
            Pastikan seluruh data Anda sudah terupdate di menu <strong>Rekening</strong> dan <strong>Investasi</strong> untuk akurasi pelaporan SPT yang maksimal.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden, 
          header, 
          aside, 
          button, 
          .YearPicker {
            display: none !important;
          }
          main {
            margin-left: 0 !important;
            padding: 0 !important;
          }
          .max-w-[1400px] {
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Activity,
  Search,
  Settings,
  Globe,
  Database,
  Lock,
  Save,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  getAppSettings,
  subscribeAppSettings,
  saveAppSettings,
  addAdminLog,
  AppSettings
} from '@/lib/services/adminService';

export default function AdminPengaturanPage() {
  const [userEmail, setUserEmail] = useState('admin@leosiqra.com');
  const [activeTab, setActiveTab] = useState('billing');
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || 'admin@leosiqra.com');
      }
    });

    const unsubSettings = subscribeAppSettings((data) => {
      if (data) setSettings(data);
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubSettings();
    };
  }, []);

  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      await saveAppSettings(settings);
      await addAdminLog({
        adminEmail: userEmail,
        action: 'UPDATE_SETTINGS',
        target: 'global_config',
        note: `Memperbarui konfigurasi sistem di tab ${activeTab}`,
        color: 'emerald'
      });
      alert('Konfigurasi berhasil disimpan!');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan konfigurasi.');
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row gap-12">
        <div className="flex-1 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10">
              <Zap size={10} className="text-indigo-400 fill-indigo-400" />
              Leosiqra Operations Console
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-black text-slate-900 leading-[1.05] tracking-tight">
                Konfigurasi Sistem
              </h1>
              <p className="text-slate-400 font-medium text-base lg:text-lg leading-relaxed max-w-2xl">
                Atur parameter utama aplikasi, kelola integrasi pihak ketiga, dan sesuaikan kebijakan sistem dalam panel kontrol pusat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: 'GENERAL', title: 'Variabel Aplikasi', desc: 'Kelola nama aplikasi, logo, dan pengaturan dasar UI global.', color: 'text-slate-500', bg: 'bg-slate-50/50' },
              { tag: 'INTEGRATION', title: 'Gateway & API', desc: 'Hubungkan sistem dengan Cloudinary, Midtrans, atau pihak ketiga.', color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
              { tag: 'SECURITY', title: 'Kebijakan Akses', desc: 'Atur limitasi pendaftaran, reset password, dan audit log sistem.', color: 'text-rose-500', bg: 'bg-rose-50/50' },
            ].map((card) => (
              <div key={card.tag} className="group p-8 rounded-[40px] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] space-y-5 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-500">
                <div className={cn("inline-flex px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase", card.bg, card.color)}>
                  {card.tag}
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors">{card.title}</h3>
                  <p className="text-slate-400 font-medium text-xs leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full xl:w-[400px]">
          <div className="p-10 rounded-[48px] bg-slate-900 text-white shadow-2xl shadow-indigo-500/10 space-y-10 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Config Console</p>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search system parameters..."
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-[13px] font-medium placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/10 transition-all italic"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operations access</p>
                   <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                     <span className="text-[11px] font-black tracking-wide text-indigo-300">
                       {userEmail.replace(/(.{1}).+@(.{1}).+/, "$1********@$2***.com")}
                     </span>
                     <div className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-[9px] font-black text-indigo-400 border border-indigo-500/30 uppercase tracking-widest">
                       PRO
                     </div>
                   </div>
                </div>

                <div className="p-8 rounded-[36px] bg-gradient-to-br from-slate-700 to-slate-900 text-white border border-white/10 space-y-4 shadow-xl shadow-slate-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <LayoutDashboard size={16} className="text-white" />
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.15em]">System Ready</h4>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    Panel konfigurasi siap menerima perubahan parameter sistem secara instan.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </div>

      {/* TAB SWITCHER */}
      <div className="flex flex-wrap gap-3 p-2 bg-slate-50 border border-slate-100 rounded-[32px] w-fit">
        {[
          { id: 'billing', label: 'Konfigurasi Pembayaran', icon: Database },
          { id: 'account', label: 'Konfigurasi Akun', icon: Lock },
          { id: 'maintenance', label: 'Maintenance Mode', icon: Activity },
          { id: 'market', label: 'Market Control Center', icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all",
              activeTab === tab.id 
                ? "bg-white text-slate-900 shadow-xl shadow-slate-200 ring-1 ring-slate-100 scale-[1.02]" 
                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
            )}
          >
            <tab.icon size={14} className={activeTab === tab.id ? "text-indigo-600" : "text-slate-300"} />
            {tab.label}
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="flex items-center gap-4 p-8 bg-indigo-50 border border-indigo-100 rounded-3xl animate-pulse">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">Sinkronisasi data database...</p>
        </div>
      )}

      {activeTab === 'billing' && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Billing Configuration</p>
              <h3 className="text-3xl font-serif font-black text-slate-900 tracking-tight">Konfigurasi Pembayaran</h3>
            </div>
            <div className="px-5 py-2 rounded-full border border-slate-200 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Revenue Critical
            </div>
          </div>

          <div className="p-10 rounded-[48px] bg-slate-500 text-white/90 space-y-3">
            <h4 className="text-lg font-black tracking-tight">Prioritas pengisian</h4>
            <p className="text-sm font-medium leading-relaxed opacity-80 max-w-2xl">
              Lengkapi kontak, harga, dan rekening utama terlebih dahulu. QRIS dan maintenance dipakai saat alur transaksi dasar sudah stabil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">Email Kontak</label>
              <input 
                type="email" 
                value={settings?.billingEmail || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, billingEmail: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">WhatsApp Kontak</label>
              <input 
                type="text" 
                placeholder="62812xxxx" 
                value={settings?.whatsapp || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, whatsapp: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">Harga Pro / Bulan (IDR)</label>
              <input 
                type="number" 
                value={settings?.proPrice || 0}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, proPrice: Number(e.target.value) }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-bold text-indigo-600" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">Nama Bank</label>
              <input 
                type="text" 
                value={settings?.bankName || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, bankName: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">Atas Nama</label>
              <input 
                type="text" 
                value={settings?.bankAccountName || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, bankAccountName: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">No Rekening</label>
              <input 
                type="text" 
                value={settings?.bankNumber || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, bankNumber: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium" 
              />
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">QRIS Text</label>
              <input 
                type="text" 
                placeholder="opsional" 
                value={settings?.qrisText || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, qrisText: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-900">QRIS Image URL</label>
              <input 
                type="text" 
                placeholder="https://..." 
                value={settings?.qrisURL || ''}
                onChange={(e) => setSettings(prev => ({ ...prev as AppSettings, qrisURL: e.target.value }))}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[14px] font-medium" 
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'account' && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Account Management</p>
            <h3 className="text-3xl font-serif font-black text-slate-900 tracking-tight">Konfigurasi Akun Admin</h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/3 space-y-6">
              <div className="p-10 rounded-[48px] bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[40px] bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${userEmail}&background=6366f1&color=fff&size=128`} alt="Profile" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-slate-900 transition-all border-4 border-white">
                    <Settings size={16} />
                  </button>
                </div>
                <button className="w-full py-4 bg-slate-50 text-slate-500 border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:border-indigo-500 transition-all">
                  Upload Foto Baru
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="p-10 rounded-[48px] bg-white border border-slate-100 shadow-sm space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[13px] font-black text-slate-900">Email Admin Utama</label>
                    <input type="email" defaultValue={userEmail} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[13px] font-black text-slate-900">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-medium" />
                  </div>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10">
                  <Save size={14} /> Perbarui Data Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-8">
            <div className="p-8 lg:p-12 rounded-[40px] bg-white border border-slate-100 shadow-sm flex items-center justify-between gap-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-black text-slate-900 tracking-tight">Maintenance Leosiqra</h4>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">Jika aktif, semua halaman user akan menampilkan layar maintenance Leosiqra yang lebih rapi.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings?.maintenance?.isActive || false}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev as AppSettings, 
                    maintenance: { ...(prev as AppSettings).maintenance!, isActive: e.target.checked } 
                  }))}
                />
                <div className="w-20 h-10 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-10 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:bg-indigo-600 shadow-inner group-hover:ring-4 group-hover:ring-slate-50 transition-all"></div>
              </label>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-900 ml-2">Pesan Maintenance Leosiqra</label>
              <div className="space-y-3">
                <textarea 
                  className="w-full p-8 bg-white border border-slate-100 rounded-[32px] text-base font-medium text-slate-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm min-h-[160px] resize-none"
                  value={settings?.maintenance?.message || ''}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev as AppSettings, 
                    maintenance: { ...(prev as AppSettings).maintenance!, message: e.target.value } 
                  }))}
                />
                <p className="text-xs text-slate-400 font-medium ml-2">Tulis status singkat, estimasi waktu, atau arah kontak yang tetap bisa dihubungi.</p>
              </div>
            </div>

            <button 
              onClick={handleSaveSettings}
              className="w-full py-5 bg-[#2563EB] text-white rounded-[20px] text-sm font-black tracking-wide hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {activeTab === 'market' && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Market Controller Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Market Control</p>
              <h3 className="text-3xl font-serif font-black text-slate-900 tracking-tight">Market Control Center</h3>
              <p className="text-slate-400 font-medium text-xs max-w-xl leading-relaxed">
                Pantau hasil sinkron market seluruh user dan jalankan refresh global saat dibutuhkan tanpa keluar dari ruang konfigurasi.
              </p>
            </div>
            <button className="px-6 py-3 border border-slate-200 rounded-2xl text-[11px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              Refresh Semua User
            </button>
          </div>

          {/* Market Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'USER TER-COVER', value: settings?.marketData?.userCovered || 0 },
              { label: 'FX TER-UPDATE', value: settings?.marketData?.fxUpdate || 0 },
              { label: 'CRYPTO TER-UPDATE', value: settings?.marketData?.cryptoUpdate || 0 },
              { label: 'STOCK/EMAS', value: settings?.marketData?.stockUpdate || 0 },
            ].map((stat) => (
              <div key={stat.label} className="p-8 rounded-[36px] bg-white border border-slate-100 shadow-sm space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-serif font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
            <div className="md:col-span-2 lg:col-span-2 p-8 rounded-[36px] bg-white border border-slate-100 shadow-sm space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UPDATE TERAKHIR</p>
              <p className="text-4xl font-serif font-black text-slate-900 tracking-tight">
                {settings?.marketData?.lastUpdate || '-'}
              </p>
            </div>
          </div>

          {/* FX Table */}
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Pair</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Rate</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">User</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { pair: 'SGD_IDR', rate: '13.513,514', user: '17', updated: '15/4/2026, 18.18.10' },
                    { pair: 'EUR_IDR', rate: '20.408,163', user: '17', updated: '15/4/2026, 18.18.10' },
                    { pair: 'JPY_IDR', rate: '107.875', user: '17', updated: '15/4/2026, 18.18.10' },
                    { pair: 'AUD_IDR', rate: '12.195,122', user: '17', updated: '15/4/2026, 18.18.10' },
                    { pair: 'MYR_IDR', rate: '4.347,826', user: '17', updated: '15/4/2026, 18.18.10' },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-[11px] font-black text-slate-500">{row.pair}</td>
                      <td className="py-4 text-[11px] font-bold text-slate-900">{row.rate}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400">{row.user}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400 font-mono tracking-tight">{row.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Crypto Feed */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">CRYPTO FEED</p>
              <h4 className="text-4xl font-serif font-black text-slate-900/10 tracking-tight -mb-2">Digital Assets</h4>
            </div>
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Crypto</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Price</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">User</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { asset: 'SOL', price: '0,005 IDR', user: '17', updated: '15/4/2026, 18.18.10' },
                    { asset: 'BNB', price: '0,036 IDR', user: '17', updated: '15/4/2026, 18.18.10' },
                    { asset: 'BTC', price: '4,29 IDR', user: '17', updated: '15/4/2026, 18.18.10' },
                    { asset: 'ETH', price: '0,135 IDR', user: '17', updated: '15/4/2026, 18.18.10' },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-[11px] font-black text-slate-500">{row.asset}</td>
                      <td className="py-4 text-[11px] font-bold text-slate-900">{row.price}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400">{row.user}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400 font-mono tracking-tight">{row.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Feed */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">STOCK FEED</p>
              <h4 className="text-4xl font-serif font-black text-slate-900/10 tracking-tight -mb-2">Equity Monitoring</h4>
            </div>
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Aset</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Price</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Source</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">User</th>
                    <th className="pb-4 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { asset: 'XAUUSD=O', price: '82.630.517.241 IDR', source: 'BINANCE:PAXGUSDT', user: '16', updated: '15/4/2026, 18.18.08' },
                    { asset: '^JKSE', price: '7.458.496 IDR', source: 'YAHOO', user: '19', updated: '11/4/2026, 23.53.54' },
                    { asset: 'BBCA.JK', price: '6.700 IDR', source: 'YAHOO', user: '19', updated: '11/4/2026, 23.08.54' },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-[11px] font-black text-slate-500">{row.asset}</td>
                      <td className="py-4 text-[11px] font-bold text-slate-900">{row.price}</td>
                      <td className="py-4 text-[9px] font-black text-indigo-400 uppercase tracking-tighter">{row.source}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400">{row.user}</td>
                      <td className="py-4 text-[11px] font-medium text-slate-400 font-mono tracking-tight">{row.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="pt-12 flex justify-end">
          <button 
            onClick={handleSaveSettings}
            className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[32px] text-[13px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/20 group"
          >
            <Save size={18} className="group-hover:scale-110 transition-transform" />
            Simpan Seluruh Konfigurasi
          </button>
        </div>
      )}
    </div>
  );
}

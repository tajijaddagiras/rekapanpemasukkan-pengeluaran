import { BarChart3, Zap, ShieldCheck, CheckCircle2, Layout, Database, PieChart, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LandingFeatures = () => (
  <section className="py-24 px-6 space-y-32">
    <div className="max-w-7xl mx-auto">
      {/* Visual Intro Section */}
      <div id="produk" className="flex flex-col lg:flex-row items-center gap-16 mb-40 scroll-mt-32">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest">
            Module Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Semua sinyal finansial <br /> penting tampil dalam <br /> layout yang bersih.
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            Lupakan tabel yang membingungkan. Kami mendesain antarmuka yang memprioritaskan kejelasan data agar Anda bisa membuat keputusan lebih cepat.
          </p>
        </div>
        <div className="flex-1 grid gap-6">
          {[
            { icon: Layout, title: 'Analisis kalkulator', desc: 'Perpindahan penghitungan dana yang memudahkan alokasi dana secara langsung di di dashboard.' },
            { icon: BarChart3, title: 'Tren lebih terukur', desc: 'Pengamatan harian hingga bulanan finansial di satu dashboard yang lebih mudah dilihat di mana saja.' },
            { icon: Database, title: 'Satu data satu solusi utama', desc: 'Meminimalkan kesalahan data penganalisisan dengan penyimpanan data penganalisaan yang terstruktur.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 border border-slate-100 shrink-0">
                <item.icon size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-900">{item.title}</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Section */}
      <div id="fitur" className="text-center space-y-6 mb-20 scroll-mt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          Fitur Utama
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Fitur utama bagi member modern.</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Tersedia beragam fitur untuk memaksimalkan performa finansial harian hingga tahunan Anda.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Layout, title: 'Dashboard Analisis Planner', desc: 'Ringkasan rekap pengeluaran & pemasukkan yang terorganisir.' },
          { icon: Database, title: 'Alokasi Dana Instan', desc: 'Pengelompokan kategori yang efisien untuk kontrol dana harian.' },
          { icon: PieChart, title: 'Usul Dashboard', desc: 'Sistem request fitur sesuai kebutuhan member komunitas.' },
          { icon: Shield, title: 'Simpan Aman', desc: 'Enkripsi data berlapis untuk menjaga privasi finansial Anda.' },
          { icon: BarChart3, title: 'SPT Tahunan Otomatis', desc: 'Perhitungan laporan pajak tahunan yang siap unduh kapan saja.' },
          { icon: Zap, title: 'Efisien & Terukur', desc: 'Visualisasi grafis modern untuk memantau tren perkembangan kekayaan.' },
        ].map((feat, i) => (
          <div key={i} className="p-10 rounded-[48px] bg-white border border-slate-100 flex flex-col gap-10 hover:border-indigo-600/30 transition-all group cursor-default shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 duration-500">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white">
              <feat.icon size={28} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 leading-tight tracking-tight">{feat.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* SPT Section */}
    <div id="pajak" className="max-w-7xl mx-auto py-20 px-10 rounded-[64px] bg-white border border-slate-100 flex flex-col lg:flex-row gap-20 items-center scroll-mt-32">
      <div className="flex-1 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest">
          Laporan Pajak
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900">
          Laporan Pajak SPT <br /> Otomatis
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
          Tidak perlu lagi menghitung manual. Sistem kami merangkum seluruh transaksi dalam format yang kompatibel dengan pelaporan pajak tahunan Anda.
        </p>
      </div>
      <div className="flex-1 w-full p-10 rounded-[48px] bg-navy text-white space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">List Fitur SPT</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Paling Populer</span>
        </div>
        <ul className="space-y-6">
          {['Kalkulasi Otomatis', 'Kompatibel Format DJP', 'Export Excel/PDF', 'Audit Track Record', 'Prediksi Pajak'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 font-bold group hover:translate-x-2 transition-transform cursor-pointer">
              <CheckCircle2 size={18} className="text-indigo-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Decision Card */}
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      <div className="flex-1 p-16 rounded-[48px] bg-navy text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8">
          <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest">Growth Mindset</div>
        </div>
        <h3 className="text-4xl font-serif font-black mb-10 leading-tight">
          Lebih sedikit <br /> kebingungan. Lebih <br /> banyak keputusan <br /> yang sabar.
        </h3>
        <p className="text-indigo-200 font-medium mb-12 max-w-sm">
          Fokus pada apa yang penting, biarkan sistem kami yang mengolah data teknis Anda menjadi informasi yang berharga.
        </p>
        <button className="flex items-center gap-2 font-black group-hover:gap-4 transition-all">
          Coba Sekarang <ArrowRight size={20} />
        </button>
      </div>
      <div className="flex-1 grid grid-rows-3 gap-6">
        {[
          { label: 'Analisis Personal', desc: 'Pemetaan pengeluaran yang lebih detail dan akurat.', color: 'emerald' },
          { label: 'Kontrol Kontribusi', desc: 'Monitor dana darurat dan tabungan pensiun Anda.', color: 'indigo' },
          { label: 'Alokasi Bijak', desc: 'Saran alokasi dana sesuai profil risiko member.', color: 'orange' },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[32px] bg-white border border-slate-100 flex flex-col justify-center gap-2 shadow-sm hover:shadow-md transition-all">
            <h4 className="font-black text-slate-900">{item.label}</h4>
            <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

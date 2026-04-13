import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => (
  <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
    <div className="w-full max-w-7xl h-20 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[32px] flex items-center justify-between px-8">
      <a href="#beranda" className="flex items-center gap-3 group shrink-0">
        <div className="w-10 h-10 relative group-hover:rotate-6 transition-transform">
          <Image 
            src="/images/Logo-new.png" 
            alt="Leosiqra Logo" 
            fill 
            sizes="40px"
            className="object-contain"
          />
        </div>
        <span className="font-serif font-black text-2xl tracking-tight text-[#1E293B]">Leosiqra</span>
      </a>
      
      <div className="hidden lg:flex items-center gap-8 mx-4">
        <div className="flex items-center gap-7 text-[13px] font-bold text-slate-500/80 tracking-wide uppercase">
          <a href="#produk" className="hover:text-indigo-600 transition-colors">Produk</a>
          <a href="#fitur" className="hover:text-indigo-600 transition-colors">Fitur</a>
          <a href="#pajak" className="hover:text-indigo-600 transition-colors">Pajak</a>
          <a href="#cara-kerja" className="hover:text-indigo-600 transition-colors">Cara Kerja</a>
          <a href="#harga" className="hover:text-indigo-600 transition-colors">Harga</a>
          <a href="#keamanan" className="hover:text-indigo-600 transition-colors">Keamanan</a>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <Link href="/auth/login" className="px-6 py-2.5 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
          Masuk
        </Link>
        <Link href="/auth/register" className="px-7 py-3 rounded-full bg-[#0F172A] text-white hover:bg-slate-800 transition-all font-bold text-sm shadow-lg shadow-slate-200">
          Daftar Gratis
        </Link>
      </div>
    </div>
  </nav>
);

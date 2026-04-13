import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 relative group-hover:scale-110 transition-transform">
          <Image 
            src="/images/Logo-new.png" 
            alt="Leosigra Logo" 
            fill 
            sizes="36px"
            className="object-contain"
          />
        </div>
        <span className="font-serif font-black text-2xl tracking-tight text-slate-900">Leosigra</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center gap-8 text-[13px] font-bold text-slate-500 uppercase tracking-widest">
          <a href="#layanan" className="hover:text-indigo-600 transition-colors">Layanan</a>
          <a href="#fitur" className="hover:text-indigo-600 transition-colors">Fitur</a>
          <a href="#paket" className="hover:text-indigo-600 transition-colors">Paket</a>
          <a href="#kontak" className="hover:text-indigo-600 transition-colors">Kontak</a>
        </div>
        
        <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
          <Link href="/auth/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Masuk
          </Link>
          <Link href="/auth/register" className="px-6 py-3 rounded-xl bg-navy text-white hover:bg-slate-800 transition-all font-bold text-sm shadow-xl shadow-navy/10">
            Daftar Gratis
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

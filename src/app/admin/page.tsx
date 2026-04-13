import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 p-10 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 animate-pulse">
          <ShieldAlert size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400">Halaman ini sedang dalam pengembangan.</p>
        </div>

        <div className="pt-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}

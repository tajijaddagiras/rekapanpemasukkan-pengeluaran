"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { BarChart3, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/membership/dashboard');
    } catch (err: any) {
      setError(err.message || 'Gagal login. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent">
      <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
        <ArrowLeft size={18} /> Kembali
      </Link>

      <div className="max-w-md w-full space-y-8 p-10 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center mb-6">
            <BarChart3 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Selamat Datang</h1>
          <p className="text-gray-500 mt-2">Masuk ke akun FinLabs Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Email" 
            placeholder="nama@email.com" 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={loading}>
            Masuk Sekarang
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-purple-400 font-bold hover:text-purple-300">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

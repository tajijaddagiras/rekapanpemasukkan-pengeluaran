import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <Header />

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

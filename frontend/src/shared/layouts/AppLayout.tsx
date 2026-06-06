import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/layouts/Header';
import { Sidebar } from '@/shared/layouts/Sidebar';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

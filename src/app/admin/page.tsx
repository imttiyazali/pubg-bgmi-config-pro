'use client';

import { useState } from 'react';
import { AdminLogin } from '@/components/admin-login';
import { AdminDashboard } from '@/components/admin-dashboard';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 lg:p-24 bg-background text-foreground">
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
}

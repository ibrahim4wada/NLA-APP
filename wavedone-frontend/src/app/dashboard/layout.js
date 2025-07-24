// src/app/dashboard/layout.js
'use client'; // This layout needs to be a client component to use AuthContext and useRouter

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'; // Corrected: remove trailing 'from'
import DashboardNav from '@/components/dashboard/DashboardNav'; // Import the DashboardNav

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?message=Please login to access the dashboard.');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading dashboard...</p>
        {/* You could add a spinner component here */}
      </div>
    );
  }

  if (!isAuthenticated) {
    // This will briefly show before redirect effect runs, or if redirect fails.
    // Or, you can return null to prevent flicker, relying on useEffect to redirect.
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg text-gray-700 dark:text-gray-300">Redirecting to login...</p>
        </div>
    );
  }

  // If authenticated, render the dashboard layout
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-800 p-4 md:p-6 shadow-xl md:border-r md:border-gray-200 dark:md:border-slate-700">
        <div className="sticky top-6"> {/* Adjusted sticky top for aesthetic padding */}
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 px-1">
            My Account
          </h2>
          <DashboardNav />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 bg-slate-50 dark:bg-slate-900"> {/* Added distinct bg to content area */}
        <div className="max-w-7xl mx-auto"> {/* Optional: constrain content width within main area */}
          {children}
        </div>
      </main>
    </div>
  );
}

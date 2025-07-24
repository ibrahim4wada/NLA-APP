// src/app/dashboard/profile/page.js
'use client'; // To use hooks like useAuth

import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

// Metadata should ideally be handled by a parent server component or layout if this page is purely client-side.
// For simplicity, we'll keep it here, but be aware of Next.js patterns for metadata with client components.
// export const metadata = { // This won't be picked up directly by Next.js in a 'use client' page component
//   title: "My Profile - Wavedone Dashboard",
//   description: "View and manage your Wavedone profile.",
// };

export default function ProfilePage() {
  const { user, loading } = useAuth(); // Get user from AuthContext

  if (loading) {
    return <p className="text-gray-700 dark:text-gray-300">Loading profile...</p>;
  }

  if (!user) {
    // This case should ideally be handled by the DashboardLayout redirecting,
    // but as a fallback:
    return <p className="text-red-500">Could not load user profile. Please try logging in again.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        My Profile
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
              <p className="mt-1 text-md text-gray-900 dark:text-gray-100">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
              <p className="mt-1 text-md text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
              <p className="mt-1 text-md text-gray-900 dark:text-gray-100 break-all">{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Joined On</label>
              <p className="mt-1 text-md text-gray-900 dark:text-gray-100">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
             {user.roles && user.roles.length > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Roles</label>
                <p className="mt-1 text-md text-gray-900 dark:text-gray-100">
                  {user.roles.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Manage Profile</h2>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={() => alert('Edit Profile functionality coming soon!')}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => alert('Change Password functionality coming soon!')}
            >
              Change Password
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

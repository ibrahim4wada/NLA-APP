// src/app/dashboard/page.js

export const metadata = {
  title: "My Dashboard - Wavedone",
  description: "Your personal Wavedone dashboard.",
};

export default function DashboardOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Dashboard Overview
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          Welcome to your Wavedone dashboard! Here you can manage your profile, orders, and more.
        </p>
        {/* Placeholder content for overview stats or quick links */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">My Orders</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">View your order history and track shipments.</p>
            {/* Link to /dashboard/orders to be added via DashboardNav */}
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">My Profile</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Update your personal information.</p>
            {/* Link to /dashboard/profile to be added via DashboardNav */}
          </div>
        </div>
      </div>
    </div>
  );
}

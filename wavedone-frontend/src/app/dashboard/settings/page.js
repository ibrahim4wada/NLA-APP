// src/app/dashboard/settings/page.js

export const metadata = {
  title: "Account Settings - Wavedone Dashboard",
  description: "Manage your account settings on Wavedone.",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Account Settings
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          Options to manage your account settings (e.g., password change, notification preferences) will be here.
        </p>
        {/* Placeholder for settings form sections */}
      </div>
    </div>
  );
}

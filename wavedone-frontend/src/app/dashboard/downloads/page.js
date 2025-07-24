// src/app/dashboard/downloads/page.js

export const metadata = {
  title: "My Downloads - Wavedone Dashboard",
  description: "Access your purchased digital products and downloads on Wavedone.",
};

export default function DownloadsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        My Downloads
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          Links to your purchased digital products will be available here.
        </p>
        {/* Placeholder for downloadable items list */}
      </div>
    </div>
  );
}

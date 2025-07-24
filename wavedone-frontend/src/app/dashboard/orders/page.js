// src/app/dashboard/orders/page.js

export const metadata = {
  title: "My Orders - Wavedone Dashboard",
  description: "View your order history on Wavedone.",
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        My Orders
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          A list of your past orders and their statuses will be displayed here.
        </p>
        {/* Placeholder for order list table or cards */}
      </div>
    </div>
  );
}

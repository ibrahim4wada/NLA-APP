import Link from 'next/link';
import { getProducts } from '@/services/apiService';
import Button from '@/components/ui/Button'; // Assuming Button is still relevant

// This is now an async Server Component
export default async function ProductListingPage() {
  let products = [];
  let error = null;
  let initialLoading = true; // To manage initial state before fetch attempt

  try {
    const data = await getProducts(); // Fetches data on the server
    products = data.products || []; // Assuming the API returns { count, products }
    initialLoading = false;
  } catch (err) {
    console.error("Failed to fetch products for ProductListingPage:", err);
    error = err.message || 'Failed to load products. Please try again later.';
    initialLoading = false;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8 text-gray-800 dark:text-gray-200">Our Products</h1>

      {/* Search and Filter Bar Placeholder */}
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">Search and filter options will go here.</p>
        {/* Example:
        <input type="text" placeholder="Search products..." className="p-2 border rounded w-full md:w-1/3" />
        <select className="p-2 border rounded ml-2">
          <option value="">All Categories</option>
          <option value="ebooks">eBooks</option>
          <option value="toolkits">Toolkits</option>
        </select>
        */}
      </div>

      {/* Product Grid / List */}
      {initialLoading && <p className="text-center text-gray-600 dark:text-gray-400 py-10">Loading products...</p>}
      {error && <p className="text-center text-red-500 py-10">Error: {error}</p>}

      {!initialLoading && !error && products.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 py-10">No products found at the moment. Check back soon!</p>
      )}

      {!initialLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {/* Placeholder for product image - replace with <Image> from next/image later */}
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Product Image
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 flex-grow">
                  {product.description ? (product.description.length > 100 ? product.description.substring(0, 97) + '...' : product.description) : 'No description available.'}
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                <Link href={`/products/${product.id}`} passHref legacyBehavior>
                  <Button variant="primary" size="md" className="w-full mt-auto">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

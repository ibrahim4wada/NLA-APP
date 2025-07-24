import { getProductById } from '@/services/apiService';
import Button from '@/components/ui/Button';
import Link from 'next/link';
// import Image from 'next/image'; // For optimized images later

// This is an async Server Component
export default async function ProductDetailPage({ params }) {
  const { id } = params; // Get the id from the route parameters
  let product = null;
  let error = null;

  try {
    const data = await getProductById(id); // Fetches data on the server
    product = data.product; // Assuming the API returns { product }
  } catch (err) {
    console.error(`Failed to fetch product ${id} for ProductDetailPage:`, err);
    // If product not found by API (404), that error will be thrown by apiService
    // and caught here. We can customize the message.
    if (err.message && err.message.toLowerCase().includes('not found')) {
        error = `Product with ID ${id} not found.`;
    } else {
        error = err.message || `Failed to load product ${id}. Please try again later.`;
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold my-8 text-red-600 dark:text-red-400">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
        <Link href="/products" passHref legacyBehavior>
          <Button variant="outline" className="mt-8">Back to Products</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    // This case might be redundant if error handling above catches non-existence,
    // but good as a fallback.
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold my-8 text-gray-800 dark:text-gray-200">Product Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">The product you are looking for does not exist or may have been removed.</p>
        <Link href="/products" passHref legacyBehavior>
          <Button variant="outline" className="mt-8">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery Placeholder */}
          <div className="w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded">
            Product Image/Gallery
            {/* Replace with:
            <Image
              src={product.coverImageUrl || '/placeholder-image.jpg'}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
            */}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>

            {product.creator && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                By <Link href={`/creators/${product.creator.id}`} className="text-indigo-600 hover:underline dark:text-indigo-400">{product.creator.name || 'Unknown Creator'}</Link>
              </p>
            )}

            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
              ${parseFloat(product.price).toFixed(2)}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description || 'No description available.'}
              </p>
            </div>

            {product.categories && product.categories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map(category => (
                    <Link key={category.id} href={`/products?category=${category.slug}`} passHref>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* TODO: Add product type specific info (e.g., download button, subscription details) */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type: {product.productType}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Status: {product.status}</p>


            <Button variant="primary" size="lg" className="w-full md:w-auto">
              {/* TODO: Logic based on productType */}
              Add to Cart / Purchase
            </Button>
            {/* Add more actions like "Add to Wishlist" etc. */}
          </div>
        </div>

        {/* TODO: Add sections for Reviews, More from this creator, Related products */}
      </div>
    </div>
  );
}

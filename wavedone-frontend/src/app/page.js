import Link from 'next/link';
import Button from '@/components/ui/Button'; // Assuming Button component is in ui

export default function HomePage() {
  return (
    <div className="text-center">
      <header className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-xl">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Wavedone Digital
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Africa’s #1 platform for AI-powered digital tools, creative products, micro-learning, and service subscriptions.
          </p>
          <Link href="/products" passHref>
            <Button variant="primary" size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
              Explore Products
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10 text-gray-800 dark:text-gray-200">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Categories - these would come from an API */}
            {[
              { name: "AI Toolkits", description: "Boost your productivity.", link: "/products?category=ai-toolkits" },
              { name: "Creative Assets", description: "Graphics, templates, and more.", link: "/products?category=creative-assets" },
              { name: "Mini Courses", description: "Learn new skills, fast.", link: "/products?category=mini-courses" },
            ].map((category) => (
              <div key={category.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                <Link href={category.link} passHref>
                   <Button variant="outline" size="md">View {category.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10 text-gray-800 dark:text-gray-200">Why Choose Wavedone?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Innovative Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">Access cutting-edge AI tools and digital products tailored for the African market and beyond.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Creator Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">A platform designed to empower creators and vendors to reach a wider audience.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Seamless Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">Enjoy a mobile-first, user-friendly platform with secure payment integrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for a call to action for creators */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Become a Creator</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join our platform and start selling your digital products and services today!
          </p>
          <Link href="/register-creator" passHref> {/* This route doesn't exist yet */}
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

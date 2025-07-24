'use client'; // Required for using hooks like useState for form handling

import { useState, useEffect } from 'react'; // Added useEffect
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext'; // Use the hook
import { useRouter, useSearchParams } from 'next/navigation'; // For redirect and reading query params

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authLoading, authError, isAuthenticated } = useAuth(); // Get what's needed
  const router = useRouter();
  const searchParams = useSearchParams(); // To read query params like ?registered=true
  const [registeredMessage, setRegisteredMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // Redirect if already logged in
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setRegisteredMessage('Registration successful! Please sign in.');
      // Optional: remove the query param from URL without reloading
      // router.replace('/login', undefined, { shallow: true }); // This might need Next.js 13.4+ specific handling if issues
    }
  }, [searchParams, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // Navigation is handled inside the login function of AuthContext upon success
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 sm:px-6 lg:px-8 -mt-20"> {/* -mt-20 to offset navbar/main padding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            {authError && (
              <div>
                <p className="text-xs text-red-600 dark:text-red-400 text-center bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                  {authError}
                </p>
              </div>
            )}
            {registeredMessage && !authError && ( // Don't show if there's also a login error
              <div>
                <p className="text-xs text-green-600 dark:text-green-400 text-center bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                  {registeredMessage}
                </p>
              </div>
            )}
            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full flex justify-center" disabled={authLoading}>
                {authLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client'; // Required for useState

import Link from 'next/link';
import Button from '../ui/Button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
// Placeholder for icons, will use SVG or simple text for now
// import { MenuIcon, XIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth(); // Get auth state and functions

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Simple SVG icons for Menu and X
  const MenuIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );

  const XIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );


  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 dark:hover:text-gray-100">
          Wavedone
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/products" className="hover:text-gray-300 dark:hover:text-gray-100">
            Products
          </Link>
          <Link href="/about" className="hover:text-gray-300 dark:hover:text-gray-100">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 dark:hover:text-gray-100">
            Contact
          </Link>

          {/* Auth Links - Desktop */}
          {!loading && isAuthenticated && user ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300 dark:hover:text-gray-100 text-sm px-3 py-2 rounded-md font-medium">
                Dashboard
              </Link>
              <span className="text-sm hidden sm:inline">Hi, {user.name}!</span> {/* Hide name on very small screens if crowded */}
              <Button onClick={logout} variant="outline" size="sm" className="text-sm !px-2 !py-1">Logout</Button>
            </>
          ) : !loading && (
            <>
              <Link href="/login" className="hover:text-gray-300 dark:hover:text-gray-100 text-sm">
                Login
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <a><Button variant="primary" size="md" className="text-sm">Sign Up</Button></a>
              </Link>
            </>
          )}
          {loading && <span className="text-sm">Loading...</span>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {isMobileMenuOpen ? <XIconSvg /> : <MenuIconSvg />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links - Collapsible */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2 pb-3">
          <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-600" onClick={toggleMobileMenu}>
            Products
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-600" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-600" onClick={toggleMobileMenu}>
            Contact
          </Link>
          <hr className="border-gray-700 dark:border-gray-600 my-2"/>

          {/* Auth Links - Mobile */}
          {!loading && isAuthenticated && user ? (
            <>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-600" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
              <span className="block px-3 py-2 text-base font-medium">Hi, {user.name}!</span>
              <Button onClick={() => { logout(); toggleMobileMenu(); }} variant="outline" size="md" className="w-full text-sm mt-1">Logout</Button>
            </>
          ) : !loading && (
            <>
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-600" onClick={toggleMobileMenu}>
                Login
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <a className="block w-full text-left" onClick={toggleMobileMenu}>
                  <Button variant="primary" size="md" className="w-full text-sm mt-1">Sign Up</Button>
                </a>
              </Link>
            </>
          )}
          {loading && <span className="block px-3 py-2 text-base font-medium">Loading...</span>}
        </div>
      )}
    </nav>
  );
}

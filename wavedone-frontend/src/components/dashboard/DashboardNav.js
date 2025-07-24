// src/components/dashboard/DashboardNav.js
'use client'; // If using hooks like usePathname for active link styling

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To highlight active link

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'My Profile', href: '/dashboard/profile' },
  { name: 'My Orders', href: '/dashboard/orders' },
  { name: 'My Downloads', href: '/dashboard/downloads' },
  { name: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              group flex items-center px-3 py-2 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${
                isActive
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }
            `}
          >
            {/* Placeholder for icons if you add them later */}
            {/* <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} aria-hidden="true" /> */}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

// src/app/(dashboard)/layout.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  TableCellsIcon,
  ShoppingCartIcon,
  FireIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const mainNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Menu', href: '/menu', icon: BookOpenIcon },
  { name: 'Tables', href: '/tables', icon: TableCellsIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
];

const operationsNavigation: NavItem[] = [
  { name: 'Kitchen Display', href: '/kitchen', icon: FireIcon },
  { name: 'Staff', href: '/staff', icon: UserGroupIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['owner']}>
      <DashboardContent>{children}</DashboardContent>
    </ProtectedRoute>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`relative z-10 bg-white shadow-sm transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex justify-center w-full">
            <img
              src="/images/logo/table-tap-high-resolution-logo-transparent.png"
              alt="TableTap Logo"
              width={isCollapsed ? 40 : 100}
              height={48}
            />
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-4 bg-white border border-gray-300 rounded-full p-1 shadow-sm"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}

          <h3 className={`mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 ${isCollapsed ? 'hidden' : ''}`}>
            Operations
          </h3>
          {operationsNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">RO</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Restaurant Owner</p>
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
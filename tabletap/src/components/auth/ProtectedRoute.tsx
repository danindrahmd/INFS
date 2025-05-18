// src/components/auth/ProtectedRoute.tsx
'use client';

import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in
        router.push('/');
      } else if (!allowedRoles.includes(userRole as UserRole)) {
        // Not authorized
        if (userRole === 'owner') {
          router.push('/dashboard');
        } else if (userRole === 'staff') {
          router.push('/kitchen');
        } else {
          router.push('/');
        }
      }
    }
  }, [user, userRole, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(userRole as UserRole)) {
    return null;
  }

  return <>{children}</>;
}
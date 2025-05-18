// src/app/register/customer/page.tsx
'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/button';
import RegisterForm from '@/components/auth/RegisterForm';

export default function CustomerRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-black via-gray-900 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-grey-500 hover:text-black flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="/images/logo/table-tap-high-resolution-logo-transparent.png"
            alt="TableTap Logo"
            className="mx-auto h-16 w-auto drop-shadow-md"
          />
          <div className="bg-white shadow-xl rounded-lg p-6 mt-6">
            <RegisterForm 
              role="customer" 
              redirectPath="/" 
              title="Customer Registration" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
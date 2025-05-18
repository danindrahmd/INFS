'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-black via-gray-900 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="text-black border-white hover:bg-grey-500 hover:text-black flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Image
            src="/images/logo/table-tap-high-resolution-logo-transparent.png"
            alt="TableTap Logo"
            className="mx-auto drop-shadow-md"
            width={64}
            height={64}
          />
          <h1 className="mt-4 text-3xl font-extrabold text-white">Sign in to your account</h1>
        </div>

        <div className="mt-4 bg-white shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-200">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-white hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
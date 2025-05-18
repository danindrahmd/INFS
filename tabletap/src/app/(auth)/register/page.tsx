'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
          <img
            src="/images/logo/table-tap-high-resolution-logo-transparent.png"
            alt="TableTap Logo"
            className="mx-auto h-16 w-auto drop-shadow-md"
          />
          <h1 className="mt-4 text-3xl font-extrabold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-gray-200">
            Start modernizing your restaurant's ordering experience
          </p>
        </div>

        <div className="mt-4 bg-white shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: 'restaurantName', label: 'Restaurant name', type: 'text' },
              { id: 'fullName', label: 'Full name', type: 'text' },
              { id: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
              { id: 'password', label: 'Password', type: 'password' },
              { id: 'confirmPassword', label: 'Confirm password', type: 'password' }
            ].map(({ id, label, type, autoComplete }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="mt-1">
                  <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete={autoComplete}
                    required
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create account
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-200">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
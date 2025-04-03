import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold text-blue-600">TableTap</span>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/login">
                <Button variant="outline" size="sm" className="mr-3">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform your restaurant's ordering experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TableTap allows your customers to scan, order, and pay—all from their mobile device. No app downloads required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg">Get started</Button>
              </Link>
              <Link href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How TableTap works</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our simple 3-step process makes digital ordering accessible for any restaurant.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white">1</span>
                  </div>
                  Create your digital menu
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Build your menu with categories, items, prices, and images through our easy-to-use dashboard.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white">2</span>
                  </div>
                  Generate table QR codes
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get unique QR codes for each table that you can print and display for your customers.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white">3</span>
                  </div>
                  Receive and manage orders
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    View incoming orders from your dashboard and track them through preparation to completion.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to streamline ordering
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TableTap provides powerful features to enhance the dining experience for both your staff and customers.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            <div className="pb-6">
              <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                About
              </a>
            </div>
            <div className="pb-6">
              <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                Features
              </a>
            </div>
            <div className="pb-6">
              <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                Pricing
              </a>
            </div>
            <div className="pb-6">
              <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
          </nav>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2025 TableTap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
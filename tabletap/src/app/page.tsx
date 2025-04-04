import Link from 'next/link';
import Button from '@/components/ui/button';
import { Sparkles, QrCode, ClipboardList } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-white text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo/table-tap-high-resolution-logo-transparent.png"
              alt="TableTap Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-800 hover:bg-gray-100">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-black text-white hover:bg-gray-900">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-32 px-4 bg-gradient-to-b from-black via-gray-800 to-white text-white">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Revolutionize Dining with Effortless QR Ordering
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          Say goodbye to paper menus and missed orders. TableTap brings a modern, contactless experience to every table.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              className="border-gray-700 text-gray-800 hover:bg-gray-100"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-100 text-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose TableTap?</h2>
          <p className="text-lg text-gray-700 mb-16">
            From setup to service, TableTap simplifies your operations and enhances your guest experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature icon={<Sparkles size={28} />} title="Instant Setup" desc="Launch your digital menu in minutes—no tech team needed." />
            <Feature icon={<QrCode size={28} />} title="Smart QR Codes" desc="Each table gets a unique code to track and route orders precisely." />
            <Feature icon={<ClipboardList size={28} />} title="Real-Time Orders" desc="Receive and manage orders from your live dashboard instantly." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24 text-black text-center">
        <h2 className="text-3xl font-bold">Join hundreds of modern restaurants using TableTap</h2>
        <p className="mt-4 text-lg text-gray-700">
          It’s fast, secure, and designed to impress your guests. Get started today.
        </p>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg">Create My Menu</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <nav className="flex justify-center gap-6 text-sm mb-6">
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Features</a>
            <a href="#" className="hover:text-gray-300">Pricing</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </nav>
          <p className="text-xs text-gray-400">&copy; 2025 TableTap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-black p-3 text-white">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

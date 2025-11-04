'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Library', href: '/library' },
    { name: 'Tools', href: '/tools' },
    { name: 'Learn', href: '/learn' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <nav className="container mx-auto px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          >
            <Image
              src="/logo.png"
              alt="Dr Peps"
              width={120}
              height={40}
              priority
              className="h-12 w-auto -translate-x-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {navigation.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-dark-700'}
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-700">
            {navigation.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    block px-4 py-3 text-base font-medium rounded-lg mb-2 transition-colors
                    ${isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-dark-700'}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}

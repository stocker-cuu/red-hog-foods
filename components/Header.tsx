'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/providers/CartProvider';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-max">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="#" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Red Hog Salsa — Chihuahua, México"
                width={512}
                height={512}
                priority
                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection('sabores')}
              className="text-gray-700 hover:text-redhog-red transition-colors"
            >
              Sabores
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="text-gray-700 hover:text-redhog-red transition-colors"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection('como-comprar')}
              className="text-gray-700 hover:text-redhog-red transition-colors"
            >
              Cómo comprar
            </button>
          </nav>

          {/* Desktop CTA + Cart Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => scrollToSection('pedido')} className="btn btn-primary">
              Pedir
            </button>
            {cart.totalJars > 0 && (
              <div className="text-sm font-semibold text-redhog-red">{cart.totalJars} en pedido</div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {cart.totalJars > 0 && (
              <div className="text-sm font-semibold text-redhog-red">{cart.totalJars}</div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 py-4 space-y-3 pb-4">
            <button
              onClick={() => scrollToSection('sabores')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Sabores
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection('como-comprar')}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cómo comprar
            </button>
            <button
              onClick={() => scrollToSection('pedido')}
              className="block w-full btn btn-primary"
            >
              Pedir
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

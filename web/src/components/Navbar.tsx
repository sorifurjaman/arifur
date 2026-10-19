'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { artistProfile } from '@/data/artworks';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Works', href: '#works' },
    { label: 'Owner', href: '#owner' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md py-3.5 border-b border-black/5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-serif font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-black">
              {artistProfile.brand}
            </span>
            <span className="text-[8px] tracking-[0.25em] uppercase text-gray-400 font-semibold">
              Contemporary Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-gray-600 hover:text-black transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300 font-medium"
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-black hover:text-gray-600 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-black/10 px-6 py-8 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-gray-800 hover:text-black font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-black/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-6 rounded-full bg-black text-white text-xs uppercase tracking-widest font-semibold text-center"
              >
                Commission & Connect
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

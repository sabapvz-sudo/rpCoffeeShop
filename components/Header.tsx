'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Logo from '@/components/Logo';

export default function Header() {
  const { itemCount, setIsCartOpen, activeTab, setActiveTab } = useCart();

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/95 backdrop-blur-xl border-b border-primary/10 shadow-[0_2px_12px_rgba(44,24,16,0.04)] transition-all">
      <div className="max-w-6xl mx-auto h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div 
          onClick={() => {
            setActiveTab('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 min-w-0 cursor-pointer group"
        >
          <Logo size={42} className="transition-transform group-hover:scale-105" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-xl sm:text-2xl text-primary tracking-tight truncate">
                Velvet Bean Café
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse flex-shrink-0"></span>
              <span className="text-xs text-on-surface-variant font-medium truncate">
                Open Today • 7:00 AM – 9:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container/60 p-1 rounded-full border border-primary/10">
          <button
            onClick={() => {
              setActiveTab('menu');
              document.getElementById('drinks-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'menu'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => {
              setActiveTab('roastery');
              document.getElementById('roastery-info')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'roastery'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Our Roastery
          </button>
          <button
            onClick={() => {
              setActiveTab('order');
              document.getElementById('drinks-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'order'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Order Online
          </button>
          <button
            onClick={() => {
              setActiveTab('visit');
              document.getElementById('visit-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'visit'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Visit Us
          </button>
        </nav>

        {/* Action Buttons: Cart & Profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high border border-primary/10 transition-all active:scale-95 shadow-sm group"
          >
            <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">
              shopping_bag
            </span>
            <span className="hidden sm:inline text-xs font-bold text-on-surface tracking-wide">
              Bag
            </span>
            {itemCount > 0 && (
              <span
                suppressHydrationWarning
                className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center animate-bounce shadow-sm"
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account Button */}
          <div className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 flex items-center justify-center cursor-pointer transition-colors shadow-sm">
            <span className="material-symbols-outlined text-primary text-[19px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}


'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function BottomNav() {
  const { activeTab, setActiveTab, itemCount, setIsCartOpen } = useCart();

  const handleTabClick = (tab: 'menu' | 'roastery' | 'order' | 'visit') => {
    setActiveTab(tab);
    if (tab === 'menu') {
      document.getElementById('drinks-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'roastery') {
      document.getElementById('roastery-info')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'order') {
      setIsCartOpen(true);
    } else if (tab === 'visit') {
      document.getElementById('visit-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-2px_12px_rgba(44,24,16,0.06)] md:hidden"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {/* Menu */}
        <button
          onClick={() => handleTabClick('menu')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] flex-1 py-1 transition-colors ${
            activeTab === 'menu' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">local_cafe</span>
          <span className="text-[11px] mt-0.5">Menu</span>
        </button>

        {/* Our Roastery */}
        <button
          onClick={() => handleTabClick('roastery')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] flex-1 py-1 transition-colors ${
            activeTab === 'roastery' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="text-[11px] mt-0.5">Roastery</span>
        </button>

        {/* Order Online */}
        <button
          onClick={() => handleTabClick('order')}
          className="relative flex flex-col items-center justify-center min-w-[48px] min-h-[48px] flex-1 py-1 transition-colors text-on-surface-variant hover:text-on-surface"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {itemCount > 0 && (
              <span
                suppressHydrationWarning
                className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center"
              >
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5">Order Bag</span>
        </button>

        {/* Visit Us */}
        <button
          onClick={() => handleTabClick('visit')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] flex-1 py-1 transition-colors ${
            activeTab === 'visit' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">location_on</span>
          <span className="text-[11px] mt-0.5">Visit Us</span>
        </button>
      </div>
    </nav>
  );
}


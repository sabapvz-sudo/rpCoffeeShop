'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-inverse-surface text-inverse-on-surface p-3.5 rounded-2xl shadow-2xl z-50 flex items-center justify-between border border-primary-fixed/20 transition-all duration-300 animate-slideUp"
      role="status"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="material-symbols-outlined text-primary-fixed text-[22px] flex-shrink-0">
          check_circle
        </span>
        <span className="text-xs sm:text-sm font-semibold truncate text-inverse-on-surface">
          {toast.message}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-bold text-primary-fixed flex-shrink-0 ml-3">
        {toast.price}
      </span>
    </div>
  );
}


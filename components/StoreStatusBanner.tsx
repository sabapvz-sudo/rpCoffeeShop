'use client';

import React from 'react';

export default function StoreStatusBanner() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-surface-container rounded-2xl p-4 sm:p-5 shadow-warm border border-primary/10 transition-all hover:shadow-warm-hover">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex relative flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping absolute opacity-75"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 relative"></span>
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Open Daily • 7:00 AM – 9:00 PM
              </span>
            </div>
            <h2 className="font-display font-semibold text-lg sm:text-xl text-on-surface truncate">
              Downtown Roastery &amp; Espresso Bar
            </h2>
            <span className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
              <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">pin_drop</span>
              <span>428 Artisan Way, Coffee Quarter • Historic Mill District</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-surface-container-high/60 px-3 py-1.5 rounded-xl border border-primary/10 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
            <span>Free Local Pickup in 10-15 Min</span>
          </div>
        </div>

        {/* Quick Action Pills */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 border-t border-primary/10">
          <a
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface text-on-surface hover:bg-surface-container-high transition-all shadow-sm border border-primary/10 active:scale-95 text-xs font-semibold"
            href="tel:+15552342326"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            <span>Call Us</span>
          </a>
          <button
            onClick={() => scrollTo('roastery-info')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface text-on-surface hover:bg-surface-container-high transition-all shadow-sm border border-primary/10 active:scale-95 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">near_me</span>
            <span>Directions</span>
          </button>
          <button
            onClick={() => scrollTo('drinks-section')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm active:scale-95 text-xs font-semibold group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">bolt</span>
            <span>Order Fast</span>
          </button>
        </div>
      </div>
    </div>
  );
}


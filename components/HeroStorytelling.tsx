'use client';

import React from 'react';

export default function HeroStorytelling() {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high/90 p-6 sm:p-8 shadow-warm border border-primary/10">
        {/* Decorative Watermark Icon */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none text-primary">
          <span className="material-symbols-outlined text-[160px] sm:text-[200px]">local_cafe</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>Ethically Harvested • Small-Batch Roasted</span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3">
            Handcrafted Single-Origin &amp; Specialty Brews
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-5">
            Sourced with deep respect from high-altitude microlots across Yirgacheffe Ethiopia, Antigua Guatemala, and Huila Colombia. Roasted fresh every dawn in our vintage cast iron-drum roaster to bring forth unmatched floral, fruit, and chocolate complexity.
          </p>

          {/* Origin Badges Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-on-surface text-xs font-semibold shadow-sm border border-primary/10 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>Ethiopia • Washed (2,100m)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-on-surface text-xs font-semibold shadow-sm border border-primary/10 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Colombia • Honey (1,850m)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-on-surface text-xs font-semibold shadow-sm border border-primary/10 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Guatemala • Natural (1,650m)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-on-surface text-xs font-semibold shadow-sm border border-primary/10 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Panama • Geisha Reserve</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { MilkOption, ShotOption, TemperatureOption, SweetnessOption } from '@/types/coffee';

const MILKS: MilkOption[] = ['Oat Milk', 'Whole Milk', 'Macadamia Milk', 'Almond Milk', 'Pistachio Milk'];
const SHOTS: ShotOption[] = ['Single Shot', 'Double Shot', 'Triple Shot (+ $1.00)'];
const TEMPS: TemperatureOption[] = ['Hot', 'Iced'];
const SWEETS: SweetnessOption[] = ['Unsweetened (0%)', 'Light (25%)', 'Standard (50%)', 'Sweet (100%)'];

export default function CraftBarPeek() {
  const {
    activeMilk,
    activeShot,
    activeTemp,
    activeSweetness,
    cycleMilk,
    toggleShot,
    setActiveTemp,
    setActiveSweetness,
  } = useCart();

  return (
    <div className="w-full">
      <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-warm border border-primary/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Custom Craft Bar
            </span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            Active Preferences Apply to Add
          </span>
        </div>

        {/* Quick select modifiers grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Milk Selector */}
          <div className="bg-surface rounded-xl p-3 shadow-sm border border-primary/10 flex flex-col justify-between hover:border-primary/30 transition-all">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Milk Choice
            </span>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs sm:text-sm font-bold text-on-surface truncate mr-1">
                {activeMilk}
              </span>
              <button
                onClick={cycleMilk}
                title="Cycle Milk"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-all active:scale-90 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
              </button>
            </div>
          </div>

          {/* Shot Extraction Selector */}
          <div className="bg-surface rounded-xl p-3 shadow-sm border border-primary/10 flex flex-col justify-between hover:border-primary/30 transition-all">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Shot Extraction
            </span>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs sm:text-sm font-bold text-on-surface truncate mr-1">
                {activeShot.includes('Triple') ? 'Triple (+ $1)' : 'Double Shot'}
              </span>
              <button
                onClick={toggleShot}
                title="Toggle Shot"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0 ${
                  activeShot.includes('Triple')
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-primary hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Temperature Selector */}
          <div className="bg-surface rounded-xl p-3 shadow-sm border border-primary/10 flex flex-col justify-between hover:border-primary/30 transition-all">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Serving Temp
            </span>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs sm:text-sm font-bold text-on-surface">
                {activeTemp}
              </span>
              <button
                onClick={() => setActiveTemp(activeTemp === 'Hot' ? 'Iced' : 'Hot')}
                title="Toggle Temperature"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-all active:scale-90 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {activeTemp === 'Hot' ? 'local_fire_department' : 'ac_unit'}
                </span>
              </button>
            </div>
          </div>

          {/* Sweetness Selector */}
          <div className="bg-surface rounded-xl p-3 shadow-sm border border-primary/10 flex flex-col justify-between hover:border-primary/30 transition-all">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Sweetness
            </span>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs sm:text-sm font-bold text-on-surface truncate mr-1">
                {activeSweetness.replace('Sweetness', '')}
              </span>
              <button
                onClick={() => {
                  const idx = SWEETS.indexOf(activeSweetness);
                  const next = SWEETS[(idx + 1) % SWEETS.length];
                  setActiveSweetness(next);
                }}
                title="Change Sweetness"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-all active:scale-90 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">water_drop</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


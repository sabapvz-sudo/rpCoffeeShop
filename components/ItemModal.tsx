'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { MilkOption, ShotOption, SweetnessOption, TemperatureOption } from '@/types/coffee';

const MILKS: MilkOption[] = ['Oat Milk', 'Whole Milk', 'Macadamia Milk', 'Almond Milk', 'Pistachio Milk'];
const SHOTS: ShotOption[] = ['Single Shot', 'Double Shot', 'Triple Shot (+ $1.00)'];
const TEMPS: TemperatureOption[] = ['Hot', 'Iced'];
const SWEETS: SweetnessOption[] = ['Unsweetened (0%)', 'Light (25%)', 'Standard (50%)', 'Sweet (100%)'];

export default function ItemModal() {
  const { selectedItemModal, setSelectedItemModal, addToCart, activeMilk, activeShot, activeTemp, activeSweetness } = useCart();

  const [milk, setMilk] = useState<MilkOption>(activeMilk);
  const [shot, setShot] = useState<ShotOption>(activeShot);
  const [temp, setTemp] = useState<TemperatureOption>(activeTemp);
  const [sweetness, setSweetness] = useState<SweetnessOption>(activeSweetness);
  const [notes, setNotes] = useState('');

  // Sync with global active defaults whenever modal opens
  useEffect(() => {
    if (selectedItemModal) {
      setMilk(activeMilk);
      setShot(activeShot);
      setTemp(activeTemp);
      setSweetness(activeSweetness);
      setNotes('');
    }
  }, [selectedItemModal, activeMilk, activeShot, activeTemp, activeSweetness]);

  if (!selectedItemModal) return null;

  const item = selectedItemModal;
  const isTriple = shot.includes('Triple');
  const totalPrice = item.price + (isTriple ? 1.0 : 0.0);

  const handleAdd = () => {
    addToCart(item, {
      milk,
      shot,
      temp,
      sweetness,
      notes: notes.trim() || undefined,
    });
    setSelectedItemModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-surface rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-warm-modal border border-primary/20 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full bg-surface-container overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30"></div>

          {/* Close button */}
          <button
            onClick={() => setSelectedItemModal(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Badges on Image */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-xs font-bold text-primary shadow-sm">
              {item.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-xs font-semibold shadow-sm">
              {item.roast}
            </span>
            {item.badge && (
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold shadow-sm">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-5">
          <div>
            <h2 className="font-display font-semibold text-2xl text-on-surface">
              {item.name}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Coffee Attributes & Origin Specs */}
          {(item.origin || item.process || item.altitude) && (
            <div className="bg-surface-container rounded-2xl p-4 border border-primary/10 grid grid-cols-2 gap-3 text-xs">
              {item.origin && (
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Origin</span>
                  <span className="font-medium text-on-surface">{item.origin}</span>
                </div>
              )}
              {item.process && (
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Process</span>
                  <span className="font-medium text-on-surface">{item.process}</span>
                </div>
              )}
              {item.altitude && (
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Elevation</span>
                  <span className="font-medium text-on-surface">{item.altitude}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Caffeine</span>
                <span className="font-medium text-on-surface">{item.caffeine}</span>
              </div>
            </div>
          )}

          {/* Tasting Notes */}
          <div>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider block mb-2">
              Tasting Profile
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-medium text-on-surface-variant"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-primary/10" />

          {/* Customization Options */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-base text-on-surface">
              Craft Your Cup
            </h3>

            {/* Milk Option */}
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-2">
                Milk Selection
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MILKS.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilk(m)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                      milk === m
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                        : 'border-primary/15 bg-surface-container hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Shots */}
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-2">
                Espresso Extraction
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SHOTS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShot(s)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      shot === s
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                        : 'border-primary/15 bg-surface-container hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature & Sweetness */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                  Temperature
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {TEMPS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTemp(t)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        temp === t
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-primary/15 bg-surface-container text-on-surface'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                  Sweetness
                </label>
                <select
                  value={sweetness}
                  onChange={e => setSweetness(e.target.value as SweetnessOption)}
                  className="w-full py-1.5 px-2 rounded-xl text-xs bg-surface-container border border-primary/15 text-on-surface focus:outline-none focus:border-primary"
                >
                  {SWEETS.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests Notes */}
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                Barista Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra hot, light foam, in a ceramic mug..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-surface-container border border-primary/15 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 px-5 rounded-2xl bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-98 shadow-md flex items-center justify-between font-semibold text-sm group"
            >
              <span>Add to Bag</span>
              <span className="font-display font-bold text-base">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


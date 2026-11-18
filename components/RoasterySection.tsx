'use client';

import React, { useState } from 'react';

const BREW_GUIDES = [
  {
    method: 'V60 Pour Over',
    ratio: '1:16 (18g coffee / 290g water)',
    grind: 'Medium-Fine (sea salt texture)',
    temp: '93°C / 200°F',
    time: '3:15 min',
    steps: [
      'Rinse paper filter with boiling water to remove paper taste and preheat glass brewer.',
      'Add 18g freshly ground coffee, create a gentle indentation in the center of the bed.',
      'Bloom with 50g water in spiral motion. Wait 45 seconds to release trapped carbon dioxide.',
      'Pour remaining water in gentle concentric circles keeping flow rate steady until 290g.',
      'Give one gentle swirl and let draw down completely. Serve in warm ceramic mug.'
    ]
  },
  {
    method: 'French Press',
    ratio: '1:14 (30g coffee / 420g water)',
    grind: 'Coarse (kosher salt)',
    temp: '94°C / 202°F',
    time: '4:30 min',
    steps: [
      'Preheat press pot with hot water, then discard water.',
      'Add 30g coarse ground single-origin coffee.',
      'Pour all 420g water vigorously to saturate all grounds evenly.',
      'Place plunger on top to retain heat without pressing down. Steep for 4 minutes.',
      'Break and stir the crust with a spoon, scoop away surface foam, then gently press.'
    ]
  },
  {
    method: 'Artisanal Espresso',
    ratio: '1:2 (18.5g in / 37g out)',
    grind: 'Fine (powdered sugar feel)',
    temp: '93.5°C / 200°F',
    time: '26 - 30 sec',
    steps: [
      'Dose 18.5g of Velvet Espresso Blend into naked portafilter basket.',
      'Distribute evenly with WDT needle tool to eliminate channels.',
      'Tamp level with 30 lbs of perpendicular pressure.',
      'Lock in and pull shot under 9 bars of pressure for 28 seconds.',
      'Admire rich tiger-stripe crema and velvety sweet finish.'
    ]
  }
];

export default function RoasterySection() {
  const [activeGuide, setActiveGuide] = useState(0);

  return (
    <section className="w-full mt-8" id="roastery-info">
      <div className="bg-surface-container-high rounded-3xl p-6 sm:p-8 shadow-warm border border-primary/10">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">coffee_maker</span>
          </div>
          <div>
            <h2 className="font-display font-semibold text-2xl text-on-surface">
              Roastery &amp; Pour Hours
            </h2>
            <p className="text-xs text-on-surface-variant">
              The heart of our craft in the Downtown Coffee Quarter
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Daily hours */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl bg-surface shadow-sm border border-primary/10 gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
              <div>
                <p className="font-display font-semibold text-sm sm:text-base text-on-surface">
                  Monday – Sunday
                </p>
                <p className="text-xs text-on-surface-variant">
                  Full Bar, Roastery Counter &amp; Tasting Flights
                </p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 w-fit">
              7:00 AM – 9:00 PM
            </span>
          </div>

          {/* Happy Pour Hours Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary-container text-on-secondary-container shadow-sm border border-primary/15">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-primary">timer</span>
                <p className="font-display font-bold text-base sm:text-lg">
                  Happy Pour Hours
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold tracking-wide w-fit">
                15% Off Manual Pour-Overs
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-2 text-on-secondary-container/90 leading-relaxed">
              Every day from 2:00 PM to 5:00 PM. Experience our rare single-origin Kalita Wave, Chemex, and V60 single lots at a special tasting discount.
            </p>
          </div>

          {/* Address & Parking Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface shadow-sm border border-primary/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="font-display font-semibold text-base text-on-surface">
                  428 Artisan Way, Coffee Quarter
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Downtown Historic Mill District • Free 2-Hour Parking Behind Roastery
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-all w-fit"
              >
                <span className="material-symbols-outlined text-[16px]">map</span>
                <span>Open in Maps</span>
              </a>
            </div>

            {/* Location Image from template */}
            <div
              className="w-full h-44 sm:h-52 rounded-xl mt-4 bg-cover bg-center overflow-hidden border border-primary/10 relative shadow-inner group"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjtFdT_rcoEU31cNfVt914WAdynhoMxuQP21U0WwkNNAZisntBHa3PmhwiSHCv3VZotFS0mTDN2Ogn-tSfZO_WQnHz3v2Qtr3jVLdGskx07Wkqs4rXKVO6K_n40b3XD4VE142d50qq__vw3_gGtKpjJLdMSQixOEbPEzDBE2v6nMTvIMoNHTL0Z577d464NUKnxkEMRK1RuOkVtD4Q3kubGiwYVIcU6JF5qapuzZEu')`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-semibold text-on-surface shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[14px]">pin_drop</span>
                <span>Historic Mill District Roastery Bar</span>
              </div>
            </div>
          </div>

          {/* Interactive Barista Brew Guides */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface shadow-sm border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-base text-on-surface">
                  Barista Home Brew Guides
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Master the art of single-origin extraction at home
                </p>
              </div>
            </div>

            {/* Guide tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
              {BREW_GUIDES.map((guide, idx) => (
                <button
                  key={guide.method}
                  onClick={() => setActiveGuide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeGuide === idx
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {guide.method}
                </button>
              ))}
            </div>

            {/* Selected Guide Details */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-primary/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
                <div className="bg-surface rounded-lg p-2 border border-primary/5">
                  <span className="text-[10px] uppercase font-bold text-primary block">Ratio</span>
                  <span className="font-medium text-on-surface">{BREW_GUIDES[activeGuide].ratio}</span>
                </div>
                <div className="bg-surface rounded-lg p-2 border border-primary/5">
                  <span className="text-[10px] uppercase font-bold text-primary block">Grind</span>
                  <span className="font-medium text-on-surface">{BREW_GUIDES[activeGuide].grind}</span>
                </div>
                <div className="bg-surface rounded-lg p-2 border border-primary/5">
                  <span className="text-[10px] uppercase font-bold text-primary block">Temp</span>
                  <span className="font-medium text-on-surface">{BREW_GUIDES[activeGuide].temp}</span>
                </div>
                <div className="bg-surface rounded-lg p-2 border border-primary/5">
                  <span className="text-[10px] uppercase font-bold text-primary block">Target Time</span>
                  <span className="font-medium text-on-surface">{BREW_GUIDES[activeGuide].time}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-on-surface-variant">
                <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider block mb-1">
                  Step-by-Step Instructions:
                </span>
                {BREW_GUIDES[activeGuide].steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-on-surface">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


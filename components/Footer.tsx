'use client';

import React, { useState } from 'react';
import Logo from '@/components/Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-highest/60 border-t border-primary/10 mt-16 pb-24 md:pb-12 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-display font-bold text-xl text-primary">
                Velvet Bean Café
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Downtown Roastery &amp; Espresso Bar. Dedicated to direct-trade microlots, precision iron-drum roasting, and ritual mornings.
            </p>
            <div className="text-xs text-on-surface-variant font-medium">
              428 Artisan Way, Coffee Quarter
            </div>
          </div>

          {/* Roastery Hours */}
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-sm text-on-surface">
              Hours
            </h4>
            <ul className="text-xs text-on-surface-variant space-y-1">
              <li>Mon – Sun: 7:00 AM – 9:00 PM</li>
              <li>Happy Pour Hours: 2:00 PM – 5:00 PM</li>
              <li>Weekend Tasting: 10:00 AM &amp; 2:00 PM</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-sm text-on-surface">
              Quick Links
            </h4>
            <ul className="text-xs text-on-surface-variant space-y-1.5">
              <li>
                <a href="#drinks-section" className="hover:text-primary transition-colors">
                  Single-Origin &amp; Espresso Menu
                </a>
              </li>
              <li>
                <a href="#roastery-info" className="hover:text-primary transition-colors">
                  Roastery &amp; Home Brew Guides
                </a>
              </li>
              <li>
                <a href="#visit-section" className="hover:text-primary transition-colors">
                  Reserve a Tasting Flight
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-2 md:col-span-1">
            <h4 className="font-display font-semibold text-sm text-on-surface">
              Bean Drops &amp; Roasts
            </h4>
            <p className="text-xs text-on-surface-variant">
              Get notified when fresh harvest Geisha and Ethiopia microlots arrive.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                You are on the roast list!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-surface border border-primary/15 text-on-surface flex-1 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-2">
          <span suppressHydrationWarning>&copy; 2026 Velvet Bean Café. All rights reserved.</span>
          <span>Crafted with passion in the Historic Coffee Quarter.</span>
        </div>
      </div>
    </footer>
  );
}


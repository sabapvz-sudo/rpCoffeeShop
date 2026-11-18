'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, CATEGORIES } from '@/data/menu';
import { CategoryId, MenuItem } from '@/types/coffee';

export default function MenuSection() {
  const { itemCount, addToCart, activeShot, setSelectedItemModal } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tastingNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesTag = true;
      if (selectedTag === 'light-roast') {
        matchesTag = item.roast.toLowerCase().includes('light');
      } else if (selectedTag === 'dark-roast') {
        matchesTag = item.roast.toLowerCase().includes('dark');
      } else if (selectedTag === 'single-origin') {
        matchesTag = Boolean(item.badge === 'Single Origin' || item.origin?.includes('Ethiopia') || item.origin?.includes('Panama'));
      }

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [activeCategory, searchQuery, selectedTag]);

  const getRoastBadgeClass = (color: string) => {
    switch (color) {
      case 'tertiary':
        return 'bg-tertiary-container text-on-tertiary-container';
      case 'secondary':
        return 'bg-secondary text-on-secondary';
      case 'primary':
        return 'bg-secondary-fixed-dim text-on-secondary-fixed';
      case 'dark':
        return 'bg-inverse-surface text-inverse-on-surface';
      case 'light':
        return 'bg-tertiary-fixed text-on-tertiary-fixed';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <section className="w-full" id="drinks-section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h2 className="font-display font-semibold text-2xl text-on-surface tracking-tight">
            Curated Menu
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Freshly pulled shots, slow pourovers &amp; house-crafted signatures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            suppressHydrationWarning
            className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
          >
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'} In Bag
          </span>
        </div>
      </div>

      {/* Search & Quick Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by flavor, roast, or origin (e.g. peach, vanilla, ethiopia)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-low border border-primary/15 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-on-surface"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'single-origin', label: 'Single Origin' },
            { id: 'light-roast', label: 'Light Roast' },
            { id: 'dark-roast', label: 'Dark Roast' },
          ].map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag.id
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills (Scrollable) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 -mx-1 px-1" id="category-bar">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? 'bg-primary text-on-primary ring-2 ring-primary/30'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-8 text-center border border-primary/10 shadow-warm">
          <span className="material-symbols-outlined text-[48px] text-primary/40 mb-2">
            search_off
          </span>
          <p className="font-display font-medium text-lg text-on-surface">No coffees found</p>
          <p className="text-xs text-on-surface-variant mt-1">
            Try adjusting your search terms or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setSelectedTag('all');
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="menu-items-grid">
          {filteredItems.map(item => {
            const hasExtra = activeShot.includes('Triple');
            const displayPrice = hasExtra ? (item.price + 1.0).toFixed(2) : item.price.toFixed(2);

            return (
              <div
                key={item.id}
                className="menu-item-card bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-warm border border-primary/10 hover:shadow-warm-hover hover:border-primary/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Content & Image */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${getRoastBadgeClass(
                            item.roastBadgeColor
                          )}`}
                        >
                          {item.roast}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedItemModal(item)}
                        className="font-display font-semibold text-lg text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Drink Image */}
                    <div
                      onClick={() => setSelectedItemModal(item)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container cursor-pointer relative group-hover:scale-102 transition-transform shadow-sm"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.alt || item.name}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Tasting Notes Chips */}
                  <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
                    {item.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-surface-container-low text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap border border-primary/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Price & Add Button */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-primary/10">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-lg sm:text-xl text-primary">
                      ${displayPrice}
                    </span>
                    {hasExtra && (
                      <span className="text-[10px] text-on-surface-variant">
                        Includes Triple Shot
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItemModal(item)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
                      title="View Details"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => addToOrder(item)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 shadow-sm font-semibold text-xs sm:text-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );

  function addToOrder(item: MenuItem) {
    addToCart(item);
  }
}


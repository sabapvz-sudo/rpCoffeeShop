'use client';

import React, { useState } from 'react';

export default function VisitUsSection() {
  const [reservationName, setReservationName] = useState('');
  const [guests, setGuests] = useState('2');
  const [time, setTime] = useState('10:00 AM');
  const [experience, setExperience] = useState('Coffee Cupping & Tasting Flight');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reservationName.trim()) {
      setBooked(true);
    }
  };

  return (
    <section className="w-full mt-8" id="visit-section">
      <div className="bg-surface-container rounded-3xl p-6 sm:p-8 shadow-warm border border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <div>
            <h2 className="font-display font-semibold text-2xl text-on-surface">
              Visit Velvet Bean Roastery
            </h2>
            <p className="text-xs text-on-surface-variant">
              Immerse yourself in bean aroma, warm wood seating &amp; curated jazz
            </p>
          </div>
        </div>

        {/* Amenities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-surface rounded-2xl p-3.5 border border-primary/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">wifi</span>
            <span className="font-semibold text-xs text-on-surface">Gigabit Fiber WiFi</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">Complimentary &amp; Fast</span>
          </div>

          <div className="bg-surface rounded-2xl p-3.5 border border-primary/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">power</span>
            <span className="font-semibold text-xs text-on-surface">Power Outlets</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">At every oak booth</span>
          </div>

          <div className="bg-surface rounded-2xl p-3.5 border border-primary/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">pets</span>
            <span className="font-semibold text-xs text-on-surface">Pet Friendly</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">Patio bowls &amp; treats</span>
          </div>

          <div className="bg-surface rounded-2xl p-3.5 border border-primary/10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary text-[24px] mb-1">local_parking</span>
            <span className="font-semibold text-xs text-on-surface">Free 2-Hour Parking</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">Behind building</span>
          </div>
        </div>

        {/* Tasting Table Reservation Form */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-primary/10 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-[20px]">event_seat</span>
            <h3 className="font-display font-semibold text-base sm:text-lg text-on-surface">
              Reserve a Coffee Tasting or Workshop
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant mb-4">
            Join our head roaster for a guided 45-minute sensory cupping of seasonal microlots or reserve a corner booth for your meeting.
          </p>

          {booked ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-emerald-600 text-[32px] mb-1">check_circle</span>
              <h4 className="font-display font-bold text-base text-emerald-900">
                Reservation Confirmed, {reservationName}!
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                We have saved {guests} seats for {time} for the &ldquo;{experience}&rdquo;. A confirmation email has been dispatched.
              </p>
              <button
                onClick={() => setBooked(false)}
                className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={reservationName}
                    onChange={e => setReservationName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-surface-container-low border border-primary/15 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-surface-container-low border border-primary/15 text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="1">1 Person (Solo Sensory Bar)</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People (Oak Booth)</option>
                    <option value="6">6 People (Community Roasting Table)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-surface-container-low border border-primary/15 text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="9:00 AM">Morning Cupping (9:00 AM)</option>
                    <option value="11:30 AM">Midday Pour Over Flight (11:30 AM)</option>
                    <option value="2:30 PM">Happy Pour Hours Tasting (2:30 PM)</option>
                    <option value="5:00 PM">Espresso &amp; Dessert Pairing (5:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase block mb-1">
                    Experience
                  </label>
                  <select
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-surface-container-low border border-primary/15 text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Coffee Cupping & Tasting Flight">Coffee Cupping &amp; Tasting Flight ($15)</option>
                    <option value="Casual Table Seating">Casual Table Seating (Free)</option>
                    <option value="Latte Art & Extraction Workshop">Latte Art &amp; Extraction Workshop ($35)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-all shadow-sm active:scale-95"
              >
                Confirm Tasting Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


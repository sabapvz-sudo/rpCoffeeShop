# Velvet Bean Café — Next.js Web Application

An artisanal, modern, responsive Next.js web application for **Velvet Bean Café** (Downtown Roastery & Espresso Bar), crafted strictly in accordance with [`DESIGN.md`](./DESIGN.md) and [`code.html`](./code.html).

---

## ☕ Key Features

1. **Brand Aesthetic & Design System**:
   - Palette built with roasted amber (`#8B4B27`), deep espresso (`#74584e`), subtle sage (`#4C6156`), oat milk tones (`#FCF9F3`, `#F6F3ED`), and warm ambient shadows.
   - Typography paired with **Playfair Display** (editorial serif headlines) and **Plus Jakarta Sans** (clean, geometric sans-serif body & labels).

2. **Interactive Custom Craft Bar**:
   - Quick selection modifiers:
     - Milk Choice: Cycle between *Oat Milk*, *Whole Milk*, *Macadamia Milk*, *Almond Milk*, and *Pistachio Milk*.
     - Espresso Extraction: Toggle between *Double Shot* and *Triple Shot (+ $1.00)*.
     - Temperature: *Hot* vs *Iced*.
     - Sweetness: *0%*, *25%*, *50%*, or *100%*.

3. **Curated Menu & Category Filtering**:
   - 12 specialty coffee items directly from template with high-resolution imagery and roast badges:
     1. Velvet Espresso Blend
     2. Ethiopian Yirgacheffe Pour Over
     3. Classic Flat White
     4. Spanish Cortado
     5. Madagascar Vanilla Bean Latte
     6. Brown Sugar Cardamom Cold Brew
     7. Kyoto Slow Drip Reserve
     8. Salted Caramel Macchiato
     9. Hazelnut Mocha Royale
     10. Honey Lavender Cappuccino
     11. Golden Turmeric Espresso Tonic
     12. Affogato al Caffè
   - Live search by origin, flavor notes, or name.
   - Roast profile badges and single-origin tags.

4. **Product Detail & Customization Modal**:
   - Deep dive into tasting notes, bean origin, harvest elevation, wash process, and caffeine levels.
   - Custom barista notes (e.g., "extra hot", "light foam").

5. **Slide-Over Bag & Checkout Flow**:
   - Real-time bag counter in header, floating toast, and bottom navigation.
   - Item adjustments (quantity increment/decrement, removal).
   - Barista tip selector (10%, 15%, 18%, 22%).
   - Pickup speed option (ASAP 10-15m vs Scheduled).
   - Checkout with instant digital receipt and order pickup tracking (`#VB-XXXX`).

6. **Roastery & Pour Hours Showcase**:
   - Daily hours and Happy Pour Hours promotion (15% off manual pour-overs daily 2:00 PM – 5:00 PM).
   - Roastery map and address card in the historic Coffee Quarter.
   - Interactive home brew guides for V60 Pour Over, French Press, and Artisanal Espresso with grind, ratio, and step-by-step instructions.

7. **Tasting Flight & Workshop Reservation**:
   - Interactive reservation form for sensory cuppings, latte art workshops, or booth bookings.

8. **Mobile Bottom Navigation & Responsive Desktop Header**:
   - Full mobile app experience with bottom navigation tabs (Menu, Roastery, Order Bag, Visit Us).
   - Full desktop responsiveness with sticky blur header and footer.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Google Fonts (Playfair Display & Plus Jakarta Sans) + Material Symbols
- **State Management**: React Context (`CartContext`)

---

## 🚀 Getting Started

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Run Production
```bash
npm run build
npm run start
```


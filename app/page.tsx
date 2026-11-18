'use client';

import React from 'react';
import Header from '@/components/Header';
import StoreStatusBanner from '@/components/StoreStatusBanner';
import HeroStorytelling from '@/components/HeroStorytelling';
import CraftBarPeek from '@/components/CraftBarPeek';
import MenuSection from '@/components/MenuSection';
import RoasterySection from '@/components/RoasterySection';
import VisitUsSection from '@/components/VisitUsSection';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import ItemModal from '@/components/ItemModal';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-5 sm:gap-6">
          {/* Top Context & Live Status */}
          <StoreStatusBanner />

          {/* Hero Storytelling Card */}
          <HeroStorytelling />

          {/* Craft Bar Modifiers Peek */}
          <CraftBarPeek />

          {/* Full Curated Menu */}
          <MenuSection />

          {/* Roastery & Hours */}
          <RoasterySection />

          {/* Visit Us & Tasting Reservation */}
          <VisitUsSection />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Floating Order Toast */}
      <Toast />

      {/* Item Customization Modal */}
      <ItemModal />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer />

      {/* AI Barista Chatbot (Gemini) */}
      <ChatWidget />
    </div>
  );
}


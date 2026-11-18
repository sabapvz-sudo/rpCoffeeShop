'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, itemCount, subtotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [pickupTime, setPickupTime] = useState<'asap' | 'scheduled'>('asap');
  const [orderCompleted, setOrderCompleted] = useState<any | null>(null);

  if (!isCartOpen) return null;

  const tax = subtotal * 0.0825;
  const tipAmount = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + tipAmount;

  const handleCheckout = () => {
    const orderNumber = `VB-${Math.floor(1000 + Math.random() * 9000)}`;
    const readyTime = new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrderCompleted({
      orderNumber,
      readyTime,
      items: [...cart],
      total,
      tipAmount,
    });
    clearCart();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setOrderCompleted(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col border-l border-primary/20">
          {/* Header */}
          <div className="p-5 border-b border-primary/10 flex items-center justify-between bg-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
              <div>
                <h2 className="font-display font-semibold text-lg text-on-surface">
                  Your Coffee Order
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface transition-colors"
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* If Order Just Completed - Show Receipt */}
          {orderCompleted ? (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Order Received • Sent to Barista
              </span>
              <h3 className="font-display font-bold text-2xl text-on-surface mt-1">
                Thank You!
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Your craft coffee is being freshly ground and extracted.
              </p>

              {/* Receipt Ticket */}
              <div className="w-full bg-surface-container-lowest rounded-2xl p-4 mt-6 border border-primary/15 shadow-sm text-left">
                <div className="flex items-center justify-between border-b border-primary/10 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold">Order ID</span>
                    <p className="font-display font-bold text-base text-primary">
                      {orderCompleted.orderNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold">Est. Pickup</span>
                    <p className="font-semibold text-sm text-emerald-700">
                      ~ {orderCompleted.readyTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {orderCompleted.items.map((ci: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-on-surface">
                        {ci.quantity}x {ci.item.name} ({ci.customization.milk})
                      </span>
                      <span className="font-semibold text-on-surface">
                        ${(ci.unitPrice * ci.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-primary/10 pt-2 flex justify-between text-sm font-bold text-on-surface">
                  <span>Total Paid</span>
                  <span className="text-primary font-display">${orderCompleted.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="w-full mt-6 space-y-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs transition-all active:scale-95"
                >
                  Order More Drinks
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px] text-primary/40">local_cafe</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-on-surface">
                Your bag is empty
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
                Explore our curated single-origin roasts, velvety lattes, and artisanal pour overs to start an order.
              </p>
              <button
                onClick={handleClose}
                className="mt-5 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-sm hover:bg-primary-container transition-all"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Items List & Checkout */
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.map(item => (
                  <div
                    key={item.cartItemId}
                    className="bg-surface-container-lowest rounded-2xl p-3.5 border border-primary/10 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-sm text-on-surface truncate">
                          {item.item.name}
                        </h4>
                        <div className="text-[11px] text-on-surface-variant mt-0.5 space-y-0.5">
                          <div>
                            <span className="font-semibold text-primary">{item.customization.milk}</span> • {item.customization.shot}
                          </div>
                          <div>
                            {item.customization.temp} • {item.customization.sweetness}
                          </div>
                          {item.customization.notes && (
                            <div className="italic text-[10px] text-secondary">
                              &ldquo;{item.customization.notes}&rdquo;
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="font-display font-bold text-sm text-primary">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-primary/5">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[11px] text-error hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        <span>Remove</span>
                      </button>

                      <div className="flex items-center gap-2 bg-surface-container px-2 py-0.5 rounded-lg border border-primary/10">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-on-surface hover:text-primary font-bold text-xs"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-on-surface min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-on-surface hover:text-primary font-bold text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pickup Speed Selector */}
                <div className="bg-surface-container rounded-2xl p-3 border border-primary/10">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-2">
                    Pickup Time
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPickupTime('asap')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                        pickupTime === 'asap'
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-primary/15 bg-surface text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                      <span>ASAP (10–15m)</span>
                    </button>
                    <button
                      onClick={() => setPickupTime('scheduled')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                        pickupTime === 'scheduled'
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-primary/15 bg-surface text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>Later Today</span>
                    </button>
                  </div>
                </div>

                {/* Barista Tip Selector */}
                <div className="bg-surface-container rounded-2xl p-3 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Support Your Roastery Baristas
                    </span>
                    <span className="text-[11px] font-semibold text-on-surface">
                      ${tipAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[10, 15, 18, 22].map(pct => (
                      <button
                        key={pct}
                        onClick={() => setTipPercent(pct)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          tipPercent === pct
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-primary/15 bg-surface text-on-surface'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Total & Checkout CTA */}
              <div className="p-4 bg-surface-container border-t border-primary/10 space-y-2.5">
                <div className="space-y-1 text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Barista Tip ({tipPercent}%)</span>
                    <span className="font-semibold text-on-surface">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-on-surface pt-1 border-t border-primary/10">
                    <span>Total</span>
                    <span className="font-display text-primary text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary text-on-primary hover:bg-primary-container font-semibold text-sm transition-all shadow-md active:scale-98 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    <span>Order for Pickup</span>
                  </span>
                  <span className="font-display font-bold text-base">
                    ${total.toFixed(2)}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


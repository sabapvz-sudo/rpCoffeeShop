'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  MenuItem,
  CartItem,
  MilkOption,
  ShotOption,
  SweetnessOption,
  TemperatureOption,
  ItemCustomization,
  BeanBag,
  BagSizeOption,
  GrindOption,
  SubscriptionOption,
  PastOrder,
} from '@/types/coffee';

interface ToastState {
  visible: boolean;
  message: string;
  price: string;
}

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  isMounted: boolean;
  activeMilk: MilkOption;
  activeShot: ShotOption;
  activeTemp: TemperatureOption;
  activeSweetness: SweetnessOption;
  setActiveMilk: (milk: MilkOption) => void;
  setActiveShot: (shot: ShotOption) => void;
  setActiveTemp: (temp: TemperatureOption) => void;
  setActiveSweetness: (sweet: SweetnessOption) => void;
  cycleMilk: () => void;
  toggleShot: () => void;
  addToCart: (item: MenuItem, customization?: Partial<ItemCustomization>) => void;
  addBeanToCart: (bean: BeanBag, size: BagSizeOption, grind: GrindOption, subscription: SubscriptionOption) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedItemModal: MenuItem | null;
  setSelectedItemModal: (item: MenuItem | null) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isFlightOpen: boolean;
  setIsFlightOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  pastOrders: PastOrder[];
  saveCompletedOrder: (order: PastOrder) => void;
  toast: ToastState;
  activeTab: 'menu' | 'roastery' | 'order' | 'visit' | 'beans';
  setActiveTab: (tab: 'menu' | 'roastery' | 'order' | 'visit' | 'beans') => void;
  theme: 'warm' | 'night';
  toggleTheme: () => void;
}

const MILK_OPTIONS: MilkOption[] = ['Oat Milk', 'Whole Milk', 'Macadamia Milk', 'Almond Milk', 'Pistachio Milk'];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeMilk, setActiveMilk] = useState<MilkOption>('Oat Milk');
  const [activeShot, setActiveShot] = useState<ShotOption>('Double Shot');
  const [activeTemp, setActiveTemp] = useState<TemperatureOption>('Hot');
  const [activeSweetness, setActiveSweetness] = useState<SweetnessOption>('Standard (50%)');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFlightOpen, setIsFlightOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'roastery' | 'order' | 'visit' | 'beans'>('menu');
  const [favorites, setFavorites] = useState<string[]>(['velvet-espresso-blend', 'ethiopian-yirgacheffe']);
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);
  const [theme, setTheme] = useState<'warm' | 'night'>('warm');
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    price: '',
  });

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('vb_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedFavs = localStorage.getItem('vb_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedOrders = localStorage.getItem('vb_past_orders');
      if (savedOrders) setPastOrders(JSON.parse(savedOrders));

      const savedTheme = localStorage.getItem('vb_theme') as 'warm' | 'night';
      if (savedTheme) setTheme(savedTheme);
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vb_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('vb_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('vb_past_orders', JSON.stringify(pastOrders));
    } catch (e) {}
  }, [pastOrders]);

  const toggleTheme = () => {
    const next = theme === 'warm' ? 'night' : 'warm';
    setTheme(next);
    try {
      localStorage.setItem('vb_theme', next);
    } catch (e) {}
  };

  const cycleMilk = () => {
    const currentIndex = MILK_OPTIONS.indexOf(activeMilk);
    const nextIndex = (currentIndex + 1) % MILK_OPTIONS.length;
    setActiveMilk(MILK_OPTIONS[nextIndex]);
  };

  const toggleShot = () => {
    setActiveShot(prev => (prev === 'Double Shot' ? 'Triple Shot (+ $1.00)' : 'Double Shot'));
  };

  const showToast = (message: string, price: string) => {
    setToast({
      visible: true,
      message,
      price,
    });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const saveCompletedOrder = (order: PastOrder) => {
    setPastOrders(prev => [order, ...prev.slice(0, 9)]);
  };

  const addToCart = (item: MenuItem, custom?: Partial<ItemCustomization>) => {
    const finalCustomization: ItemCustomization = {
      milk: custom?.milk || activeMilk,
      shot: custom?.shot || activeShot,
      sweetness: custom?.sweetness || activeSweetness,
      temp: custom?.temp || activeTemp,
      extraSyrup: custom?.extraSyrup,
      notes: custom?.notes,
    };

    const isTriple = finalCustomization.shot.includes('Triple');
    const extraPrice = isTriple ? 1.0 : 0.0;
    const finalUnitPrice = item.price + extraPrice;

    const cartItemId = `${item.id}-${finalCustomization.milk}-${finalCustomization.shot}-${finalCustomization.temp}-${finalCustomization.sweetness}-${finalCustomization.notes || ''}`;

    setCart(prev => {
      const existing = prev.find(ci => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map(ci =>
          ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          customization: finalCustomization,
          quantity: 1,
          unitPrice: finalUnitPrice,
        },
      ];
    });

    showToast(`${item.name} (${finalCustomization.milk})`, `$${finalUnitPrice.toFixed(2)}`);
  };

  const addBeanToCart = (
    bean: BeanBag,
    size: BagSizeOption,
    grind: GrindOption,
    subscription: SubscriptionOption
  ) => {
    let multiplier = 1.0;
    if (size.includes('500g')) multiplier = 1.85;
    if (size.includes('1kg')) multiplier = 3.4;

    let subDiscount = 1.0;
    if (subscription !== 'One-time Purchase') {
      subDiscount = 0.9; // 10% off
    }

    const calculatedPrice = bean.basePrice250g * multiplier * subDiscount;

    const fakeMenuItem: MenuItem = {
      id: bean.id,
      name: `${bean.name} (${size})`,
      category: 'pourover',
      categoryLabel: 'Whole Bean Bag',
      roast: bean.roast,
      roastBadgeColor: 'tertiary',
      badge: subscription !== 'One-time Purchase' ? 'Subscription (-10%)' : 'Fresh Roast',
      badgeType: 'single-origin',
      description: `${bean.notes.join(', ')} • Grind: ${grind}`,
      price: calculatedPrice,
      image: bean.image,
      alt: bean.name,
      tastingNotes: bean.notes,
      origin: bean.origin,
      process: bean.process,
      altitude: bean.altitude,
      caffeine: 'High',
    };

    const dummyCustomization: ItemCustomization = {
      milk: 'Whole Milk',
      shot: 'Double Shot',
      sweetness: 'Unsweetened (0%)',
      temp: 'Hot',
      notes: `Grind: ${grind} | ${subscription}`,
    };

    const cartItemId = `${bean.id}-${size}-${grind}-${subscription}`;

    setCart(prev => {
      const existing = prev.find(ci => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map(ci =>
          ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item: fakeMenuItem,
          customization: dummyCustomization,
          quantity: 1,
          unitPrice: calculatedPrice,
          beanDetails: {
            size,
            grind,
            subscription,
          },
        },
      ];
    });

    showToast(`${bean.name} (${size})`, `$${calculatedPrice.toFixed(2)}`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const rawItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemCount = isMounted ? rawItemCount : 0;
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        isMounted,
        activeMilk,
        activeShot,
        activeTemp,
        activeSweetness,
        setActiveMilk,
        setActiveShot,
        setActiveTemp,
        setActiveSweetness,
        cycleMilk,
        toggleShot,
        addToCart,
        addBeanToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedItemModal,
        setSelectedItemModal,
        isProfileOpen,
        setIsProfileOpen,
        isFlightOpen,
        setIsFlightOpen,
        favorites,
        toggleFavorite,
        pastOrders,
        saveCompletedOrder,
        toast,
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export type CategoryId = 'all' | 'espresso' | 'pourover' | 'signatures' | 'seasonal';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  roast: string;
  roastBadgeColor: 'secondary' | 'tertiary' | 'primary' | 'dark' | 'light';
  badge?: string;
  badgeType?: 'core' | 'bestseller' | 'seasonal' | 'reserve' | 'dessert' | 'single-origin';
  description: string;
  price: number;
  image: string;
  alt: string;
  tastingNotes: string[];
  origin?: string;
  process?: string;
  altitude?: string;
  caffeine: 'High' | 'Medium' | 'Low' | 'Decaf';
}

export type MilkOption = 'Oat Milk' | 'Whole Milk' | 'Macadamia Milk' | 'Almond Milk' | 'Pistachio Milk';
export type ShotOption = 'Single Shot' | 'Double Shot' | 'Triple Shot (+ $1.00)';
export type SweetnessOption = 'Unsweetened (0%)' | 'Light (25%)' | 'Standard (50%)' | 'Sweet (100%)';
export type TemperatureOption = 'Hot' | 'Iced';

export interface ItemCustomization {
  milk: MilkOption;
  shot: ShotOption;
  sweetness: SweetnessOption;
  temp: TemperatureOption;
  extraSyrup?: string;
  notes?: string;
}

export type GrindOption =
  | 'Whole Bean'
  | 'Espresso'
  | 'Aeropress'
  | 'V60 / Pour Over'
  | 'French Press / Cold Brew';

export type BagSizeOption = '250g (8.8 oz)' | '500g (1.1 lbs)' | '1kg (2.2 lbs)';

export type SubscriptionOption = 'One-time Purchase' | 'Weekly (Save 10%)' | 'Bi-Weekly (Save 10%)' | 'Monthly (Save 10%)';

export interface BeanBag {
  id: string;
  name: string;
  origin: string;
  region: string;
  altitude: string;
  process: string;
  roast: string;
  notes: string[];
  description: string;
  basePrice250g: number;
  image: string;
  badge?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  customization: ItemCustomization;
  quantity: number;
  unitPrice: number;
  beanDetails?: {
    size: BagSizeOption;
    grind: GrindOption;
    subscription: SubscriptionOption;
  };
}

export interface PastOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  tip: number;
}

export type Category = 'chocolats' | 'bonbons' | 'sucettes' | 'gateaux' | 'coffrets';
export type Page = 'home' | 'products' | 'product-detail' | 'cart' | 'about' | 'contact' | 'profile' | 'admin' | 'manager';
export type ProfileSection = 'dashboard' | 'commandes' | 'points' | 'wishlist' | 'adresses' | 'parametres';
export type BadgeType = 'nouveau' | 'promo' | 'populaire';
export type LoyaltyLevel = 'Caramel' | 'Sucre' | 'Chocolat' | 'VIP';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: BadgeType;
  inStock: boolean;
  description: string;
  ingredients: string;
  allergens: string;
  points: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Livré' | 'En cours' | 'Préparation' | 'Annulé';
  total: number;
  items: number;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user' | 'manager';
  timestamp: Date;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  points: number;
  level: LoyaltyLevel;
  lastOrder: string;
  avatar: string;
  inactive?: boolean;
}

export interface AppState {
  currentPage: Page;
  cart: CartItem[];
  wishlist: number[];
  selectedProductId: number | null;
  chatOpen: boolean;
}

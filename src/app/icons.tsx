import {
  Candy,
  Lollipop,
  Cookie,
  Cake,
  Gift,
  ShoppingCart,
  Star,
  Package,
  Users,
  Smile,
  Sparkles,
  Flame,
  Gem,
  Droplets,
  Truck,
  Heart,
  MessageCircle,
  Bot,
  UserCircle,
  Search,
  Mail,
  Map,
  Leaf,
  Handshake,
  Rocket,
  Home,
  ShoppingBag,
  Construction,
  HeartCrack,
  Lock,
  Eye,
  Pencil,
  Trash2,
  DollarSign,
  User,
  Camera,
  PartyPopper,
  Sparkle,
  UtensilsCrossed,
  CircleDot,
  Calendar,
  BarChart3,
  Frown,
  ImageIcon,
  LineChart,
  Trophy,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import type { Category, LoyaltyLevel, BadgeType } from './types';

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  chocolats: Cookie,
  bonbons: Candy,
  sucettes: Lollipop,
  gateaux: Cake,
  coffrets: Gift,
};

export const LOYALTY_ICONS: Record<LoyaltyLevel, LucideIcon> = {
  Caramel: Droplets,
  Sucre: Candy,
  Chocolat: Cookie,
  VIP: Gem,
};

export const BADGE_ICONS: Record<BadgeType, LucideIcon> = {
  nouveau: Sparkles,
  promo: Flame,
  populaire: Star,
};

export const STAT_ICONS = {
  products: Candy,
  rating: Star,
  orders: Package,
  clients: Users,
  smile: Smile,
} as const;

interface IconBoxProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export function IconBox({ icon: Icon, size = 20, className = '', color, strokeWidth = 2 }: IconBoxProps) {
  return (
    <Icon
      size={size}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}

export {
  Candy,
  Lollipop,
  Cookie,
  Cake,
  Gift,
  ShoppingCart,
  Star,
  Package,
  Users,
  Smile,
  Sparkles,
  Flame,
  Gem,
  Droplets,
  Truck,
  Heart,
  MessageCircle,
  Bot,
  UserCircle,
  Search,
  Mail,
  Map,
  Leaf,
  Handshake,
  Rocket,
  Home,
  ShoppingBag,
  Construction,
  HeartCrack,
  Lock,
  Eye,
  Pencil,
  Trash2,
  DollarSign,
  User,
  Camera,
  PartyPopper,
  Sparkle,
  UtensilsCrossed,
  CircleDot,
  Calendar,
  BarChart3,
  Frown,
  ImageIcon,
  LineChart,
  Trophy,
  ClipboardList,
};

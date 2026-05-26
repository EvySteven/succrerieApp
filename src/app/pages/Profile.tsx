import { useState, useEffect } from 'react';
import { Package, Star, Heart, MapPin, Settings, LogOut, LayoutDashboard, Award, Gift, Lock, Construction, HeartCrack, Menu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Page, LoyaltyLevel, Product, ProfileSection } from '../types';
import { ORDERS, PRODUCTS } from '../data';
import AnimatedCounter from '../components/design-system/AnimatedCounter';
import ProductCard from '../components/ProductCard';
import { LOYALTY_ICONS, IconBox } from '../icons';
import { formatPrice, POINTS_DISCOUNT } from '../utils/currency';

interface ProfileProps {
  navigate: (page: Page, options?: { profileSection?: ProfileSection }) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  initialSection?: ProfileSection;
  onSectionChange?: (section: ProfileSection) => void;
}

const LEVEL_CONFIG: Record<LoyaltyLevel, { color: string; bg: string; icon: LucideIcon; min: number; max: number }> = {
  Caramel: { color: '#D4A017', bg: 'rgba(212,160,23,0.1)', icon: LOYALTY_ICONS.Caramel, min: 0, max: 200 },
  Sucre: { color: '#FF6B9D', bg: 'rgba(255,107,157,0.1)', icon: LOYALTY_ICONS.Sucre, min: 200, max: 600 },
  Chocolat: { color: '#6B3A2A', bg: 'rgba(107,58,42,0.1)', icon: LOYALTY_ICONS.Chocolat, min: 600, max: 1200 },
  VIP: { color: '#A855F7', bg: 'rgba(168,85,247,0.1)', icon: LOYALTY_ICONS.VIP, min: 1200, max: 2000 },
};

const POINTS_HISTORY = [
  { date: '14 mai 2025', action: 'Commande #BOM-2451', points: +38 },
  { date: '28 avr. 2025', action: 'Commande #BOM-2389', points: +23 },
  { date: '20 avr. 2025', action: 'Code promo utilisé', points: -50 },
  { date: '10 avr. 2025', action: 'Commande #BOM-2310', points: +58 },
  { date: '1 avr. 2025', action: 'Parrainage ami', points: +100 },
  { date: '22 mars 2025', action: 'Récompense anniversaire', points: +50 },
];

const MENU_ITEMS: { key: ProfileSection; label: string; Icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Tableau de bord', Icon: LayoutDashboard },
  { key: 'commandes', label: 'Mes commandes', Icon: Package },
  { key: 'points', label: 'Mes points', Icon: Star },
  { key: 'wishlist', label: 'Ma wishlist', Icon: Heart },
  { key: 'adresses', label: 'Mes adresses', Icon: MapPin },
  { key: 'parametres', label: 'Paramètres', Icon: Settings },
];

const USER = {
  name: 'Sophie D.',
  email: 'sophie.d@email.fr',
  avatar: 'https://i.pravatar.cc/80?img=47',
  points: 420,
  level: 'Sucre' as LoyaltyLevel,
};

const STATUS_CONFIG = {
  'Livré': { bg: 'rgba(74,222,128,0.1)', color: '#16a34a' },
  'En cours': { bg: 'rgba(255,107,157,0.1)', color: '#FF6B9D' },
  'Préparation': { bg: 'rgba(255,217,61,0.15)', color: '#ca8a04' },
  'Annulé': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};

const LEVELS: LoyaltyLevel[] = ['Caramel', 'Sucre', 'Chocolat', 'VIP'];

export default function Profile({
  navigate,
  wishlist,
  onToggleWishlist,
  onViewProduct,
  onAddToCart,
  initialSection = 'dashboard',
  onSectionChange,
}: ProfileProps) {
  const [activeSection, setActiveSection] = useState<ProfileSection>(initialSection);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const setSection = (section: ProfileSection) => {
    setActiveSection(section);
    onSectionChange?.(section);
  };

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const level = LEVEL_CONFIG[USER.level];
  const nextLevelKey = LEVELS[LEVELS.indexOf(USER.level) + 1];
  const nextLevel = nextLevelKey ? LEVEL_CONFIG[nextLevelKey] : null;
  const pointsToNext = nextLevel ? nextLevel.min - USER.points : 0;
  const progress = nextLevel
    ? ((USER.points - level.min) / (nextLevel.min - level.min)) * 100
    : 100;

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>
              Tableau de bord
            </h2>

            {/* Points card */}
            <div
              className="rounded-3xl p-6"
              style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Mes points Bombo</p>
                  <div className="text-5xl font-bold text-white" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    <AnimatedCounter value={USER.points} />
                  </div>
                  <p className="text-white/70 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    points accumulés
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Poppins, sans-serif' }}
                >
                  <IconBox icon={level.icon} size={16} color="#fff" />
                  Niveau {USER.level}
                </div>
              </div>

              {nextLevel && (
                <>
                  <div className="w-full h-2 rounded-full bg-white/20 mb-2">
                    <div
                      className="h-full rounded-full bg-[#FFD93D] transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-white/80 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Tu es à <strong className="text-[#FFD93D]">{pointsToNext} pts</strong> du niveau {nextLevelKey}
                    {nextLevelKey && (
                      <IconBox icon={LEVEL_CONFIG[nextLevelKey].icon} size={14} color="#FFD93D" className="inline ml-1" />
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Recent orders */}
            <div>
              <h3 className="font-bold text-[#3D1C02] mb-4 text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Dernières commandes
              </h3>
              <div className="flex flex-col gap-3">
                {ORDERS.map(order => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between"
                    style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}
                  >
                    <div>
                      <div className="font-bold text-[#3D1C02] text-sm" style={{ fontFamily: 'Baloo 2, cursive' }}>
                        {order.id}
                      </div>
                      <div className="text-xs text-[#8B6355] mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {order.date} · {order.items} article{order.items > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: STATUS_CONFIG[order.status].bg, color: STATUS_CONFIG[order.status].color, fontFamily: 'Poppins, sans-serif' }}
                      >
                        {order.status}
                      </span>
                      <span className="font-bold text-[#FF6B9D] text-sm" style={{ fontFamily: 'Baloo 2, cursive' }}>
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div>
              <h3 className="font-bold text-[#3D1C02] mb-4 text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                <span className="inline-flex items-center gap-2">
                  Récompenses disponibles
                  <Gift size={20} className="text-[#FF6B9D]" />
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { pts: 50, label: `-${formatPrice(POINTS_DISCOUNT)} sur votre prochaine commande`, unlocked: true },
                  { pts: 100, label: 'Livraison gratuite', unlocked: true },
                  { pts: 200, label: '-6 500 FCFA sur votre prochaine commande', unlocked: false },
                ].map(r => (
                  <div
                    key={r.pts}
                    className="rounded-2xl p-4 text-center"
                    style={{
                      border: `1.5px solid ${r.unlocked ? 'rgba(255,107,157,0.2)' : 'rgba(0,0,0,0.06)'}`,
                      background: r.unlocked ? 'rgba(255,107,157,0.04)' : '#f9f9f9',
                      opacity: r.unlocked ? 1 : 0.5,
                    }}
                  >
                    <div className="flex justify-center mb-1">
                      {r.unlocked ? (
                        <Gift size={28} className="text-[#FF6B9D]" />
                      ) : (
                        <Lock size={28} className="text-[#8B6355]" />
                      )}
                    </div>
                    <div className="font-bold text-[#FF6B9D] text-sm mb-1" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      {r.pts} pts
                    </div>
                    <div className="text-xs text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'commandes':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#3D1C02] mb-6" style={{ fontFamily: 'Baloo 2, cursive' }}>
              Mes commandes
            </h2>
            <div className="flex flex-col gap-4">
              {ORDERS.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-5"
                  style={{ border: '1.5px solid rgba(255,107,157,0.1)', boxShadow: '0 4px 20px rgba(255,107,157,0.06)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>{order.id}</span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: STATUS_CONFIG[order.status].bg, color: STATUS_CONFIG[order.status].color, fontFamily: 'Poppins, sans-serif' }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span>{order.date}</span>
                    <span>{order.items} articles · <strong className="text-[#FF6B9D]">{formatPrice(order.total)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'points':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#3D1C02] mb-6" style={{ fontFamily: 'Baloo 2, cursive' }}>
              Mes points & fidélité
            </h2>

            {/* Big counter */}
            <div
              className="text-center rounded-3xl py-10 mb-6"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
            >
              <div className="text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
                <AnimatedCounter value={USER.points} duration={1200} />
              </div>
              <div className="text-white/80 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                points Bombo · Niveau {USER.level}
              </div>
            </div>

            {/* Level progression */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {LEVELS.map(lvl => {
                const cfg = LEVEL_CONFIG[lvl];
                const isActive = lvl === USER.level;
                const isReached = LEVELS.indexOf(lvl) <= LEVELS.indexOf(USER.level);
                return (
                  <div
                    key={lvl}
                    className="rounded-2xl p-4 text-center"
                    style={{
                      background: isActive ? cfg.bg : isReached ? 'rgba(74,222,128,0.05)' : '#f5f5f5',
                      border: `2px solid ${isActive ? cfg.color : isReached ? '#4ADE80' : '#e5e7eb'}`,
                      opacity: isReached ? 1 : 0.6,
                    }}
                  >
                    <div className="flex justify-center mb-1">
                      <IconBox icon={cfg.icon} size={32} color={cfg.color} />
                    </div>
                    <div className="font-bold text-sm" style={{ color: cfg.color, fontFamily: 'Baloo 2, cursive' }}>
                      {lvl}
                    </div>
                    <div className="text-xs text-[#8B6355] mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {cfg.min}+ pts
                    </div>
                    {isActive && (
                      <div className="mt-1 text-[10px] font-bold text-[#FF6B9D]">← Votre niveau</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* History */}
            <h3 className="font-bold text-[#3D1C02] mb-4 text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
              Historique des points
            </h3>
            <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}>
              {POINTS_HISTORY.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < POINTS_HISTORY.length - 1 ? '1px solid rgba(255,107,157,0.08)' : 'none' }}
                >
                  <div>
                    <div className="font-semibold text-sm text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {entry.action}
                    </div>
                    <div className="text-xs text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {entry.date}
                    </div>
                  </div>
                  <span
                    className="font-bold text-lg"
                    style={{
                      color: entry.points > 0 ? '#4ADE80' : '#ef4444',
                      fontFamily: 'Baloo 2, cursive',
                    }}
                  >
                    {entry.points > 0 ? `+${entry.points}` : entry.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#3D1C02] mb-6" style={{ fontFamily: 'Baloo 2, cursive' }}>
              <span className="inline-flex items-center gap-2">
                <Heart size={24} className="text-[#FF6B9D] fill-[#FF6B9D]" />
                Ma wishlist ({wishlistProducts.length})
              </span>
            </h2>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl" style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}>
                <HeartCrack size={56} className="text-[#FF6B9D] opacity-40 mb-4 mx-auto" />
                <p className="text-[#8B6355] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ta wishlist est vide. Ajoute des friandises avec le cœur !
                </p>
                <button
                  onClick={() => navigate('products')}
                  className="px-6 py-3 rounded-2xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive' }}
                >
                  Découvrir nos produits
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {wishlistProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted
                    onClick={onViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <Construction size={56} className="text-[#FF6B9D] opacity-40 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-[#3D1C02] mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
              Bientôt disponible
            </h3>
            <p className="text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Cette section arrive très prochainement.
            </p>
          </div>
        );
    }
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* User info */}
      <div className="p-5 border-b border-pink-100 flex items-center gap-3">
        <img src={USER.avatar} alt={USER.name} className="w-12 h-12 rounded-full border-2 border-[#FF6B9D]/30" />
        <div>
          <div className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>{USER.name}</div>
          <div
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: LEVEL_CONFIG[USER.level].bg, color: LEVEL_CONFIG[USER.level].color, fontFamily: 'Poppins, sans-serif' }}
          >
            <IconBox icon={LEVEL_CONFIG[USER.level].icon} size={12} color={LEVEL_CONFIG[USER.level].color} />
            {USER.level}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {MENU_ITEMS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => { setSection(key); setMobileSidebarOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all text-left"
            style={{
              background: activeSection === key ? 'rgba(255,107,157,0.1)' : 'transparent',
              color: activeSection === key ? '#FF6B9D' : '#3D1C02',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-pink-100">
        <button
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-2xl text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-72 shrink-0 sticky top-0 h-screen bg-white"
        style={{ borderRight: '1.5px solid rgba(255,107,157,0.1)' }}
      >
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative w-72 bg-white h-full overflow-y-auto rounded-r-3xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-8 min-w-0">
        <button
          className="lg:hidden flex items-center gap-2 mb-6 text-sm font-semibold text-[#FF6B9D]"
          onClick={() => setMobileSidebarOpen(true)}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <Menu size={16} /> Mon compte
        </button>
        {renderSection()}
      </main>
    </div>
  );
}

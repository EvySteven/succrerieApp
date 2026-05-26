import { useState, useEffect } from 'react';
import logo from '../../imports/logo.svg';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import type { Page } from '../types';
import { Candy, Truck, Gift, Star, Package, Heart as HeartIcon, IconBox } from '../icons';
import type { LucideIcon } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page, options?: { profileSection?: 'wishlist' }) => void;
  cartCount: number;
  wishlistCount: number;
  isAdmin?: boolean;
}

const NAV_ITEMS = [
  { label: 'Accueil', page: 'home' as Page },
  { label: 'Produits', page: 'products' as Page },
  { label: 'À propos', page: 'about' as Page },
  { label: 'Contact', page: 'contact' as Page },
];

type BannerItem = { icon: LucideIcon; text: string };

const BANNERS: BannerItem[][] = [
  [
    { icon: Truck, text: 'Livraison gratuite dès 20 000 FCFA' },
    { icon: Gift, text: 'Cadeau offert à partir de 33 000 FCFA' },
  ],
  [
    { icon: Candy, text: 'Nouveautés chaque semaine' },
    { icon: Star, text: 'Programme fidélité exclusif' },
  ],
  [
    { icon: HeartIcon, text: 'Paiement sécurisé' },
    { icon: Package, text: 'Expédition en 24h ouvrées' },
  ],
];

function PromoBanner({ items }: { items: BannerItem[] }) {
  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      {items.map((item, i) => (
        <span key={item.text} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="opacity-60">|</span>}
          <IconBox icon={item.icon} size={14} className="shrink-0" />
          {item.text}
        </span>
      ))}
    </span>
  );
}

export default function Header({ currentPage, navigate, cartCount, wishlistCount }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBannerIndex(i => (i + 1) % BANNERS.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-[#A855F7] text-white text-xs sm:text-sm text-center py-2 px-4 font-medium overflow-hidden relative">
        <div
          key={bannerIndex}
          className="animate-fade-in"
          style={{ animation: 'fadeSlide 0.5s ease', fontFamily: 'Poppins, sans-serif' }}
        >
          <PromoBanner items={BANNERS[bannerIndex]} />
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-pink-100' : 'shadow-sm'
        }`}
        style={{ borderBottom: '2px solid rgba(255,107,157,0.12)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Pacifico, cursive', color: '#FF6B9D' }}
            >
              <img src={logo} alt="Bômbô" className="h-10 max-h-10 object-contain mt-1" />
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.page)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    currentPage === item.page
                      ? 'bg-pink-50 text-[#FF6B9D]'
                      : 'text-[#3D1C02] hover:bg-pink-50 hover:text-[#FF6B9D]'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-50 text-[#8B6355] hover:text-[#FF6B9D] transition-colors">
                <Search size={18} />
              </button>

              <button
                onClick={() => navigate('profile', { profileSection: 'wishlist' })}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-50 text-[#8B6355] hover:text-[#FF6B9D] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('cart')}
                data-cart-icon
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-50 text-[#8B6355] hover:text-[#FF6B9D] transition-colors relative"
                aria-label="Panier"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-[11px] flex items-center justify-center font-bold animate-bounce-once"
                    style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('profile')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Poppins, sans-serif' }}
              >
                <User size={15} />
                <span>Mon compte</span>
              </button>

              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-50 text-[#3D1C02] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 flex flex-col gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => { navigate(item.page); setMobileOpen(false); }}
                className={`text-left px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                  currentPage === item.page ? 'bg-pink-50 text-[#FF6B9D]' : 'text-[#3D1C02]'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => { navigate('profile'); setMobileOpen(false); }}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white text-center"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}
              >
                Mon compte
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

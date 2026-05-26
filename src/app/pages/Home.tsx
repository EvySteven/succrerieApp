import { ArrowRight, Star, ChevronRight, Sparkles, Heart, MessageCircle, Leaf } from 'lucide-react';
import type { Page, Product } from '../types';
import { PRODUCTS, REVIEWS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import {
  CATEGORY_ICONS,
  IconBox,
  Candy,
  Lollipop,
  Cookie,
  Cake,
  ShoppingCart,
  Gift,
  STAT_ICONS,
  PartyPopper,
  UtensilsCrossed,
} from '../icons';

interface HomeProps {
  navigate: (page: Page) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
  wishlist: number[];
  onViewProduct: (product: Product) => void;
}

const FEATURED_IDS = [1, 5, 12, 15];

const CANDY_SVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full opacity-20" fill="none">
    <circle cx="60" cy="80" r="25" fill="#FFD93D" />
    <circle cx="340" cy="120" r="20" fill="#4ADE80" />
    <circle cx="80" cy="300" r="18" fill="#fff" />
    <circle cx="320" cy="280" r="30" fill="#FFD93D" />
    <circle cx="200" cy="50" r="15" fill="#fff" />
    <circle cx="180" cy="350" r="22" fill="#4ADE80" />
    <rect x="150" y="180" width="100" height="40" rx="20" fill="#fff" opacity="0.3" />
    <circle cx="370" cy="370" r="20" fill="#FFD93D" />
    <circle cx="30" cy="200" r="15" fill="#fff" opacity="0.5" />
  </svg>
);

const LOYALTY_STEPS = [
  { icon: ShoppingCart, label: 'Commander' },
  { icon: STAT_ICONS.rating, label: 'Gagner des points' },
  { icon: Gift, label: 'Obtenir des réductions' },
];

const STATS = [
  { value: '5 000+', label: 'Produits vendus', icon: STAT_ICONS.products },
  { value: '4,9/5', label: 'Satisfaction client', icon: STAT_ICONS.rating },
  { value: '1 200', label: 'Commandes livrées', icon: STAT_ICONS.orders },
  { value: '800', label: 'Clients fidèles', icon: STAT_ICONS.clients },
];

export default function Home({ navigate, onAddToCart, onToggleWishlist, wishlist, onViewProduct }: HomeProps) {
  const featured = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));

  return (
    <main>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #A855F7 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <CANDY_SVG />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              <PartyPopper size={16} /> Nouvelles créations chaque semaine
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl text-white mb-5 leading-tight flex flex-wrap items-center gap-3"
              style={{ fontFamily: 'Baloo 2, cursive', fontWeight: 800 }}
            >
              La boutique qui fait sourire
              <Sparkles size={40} className="text-[#FFD93D] shrink-0" />
            </h1>
            <p className="text-white/85 text-xl mb-8 leading-relaxed flex items-start gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Lollipop size={22} className="shrink-0 mt-1" />
              <span>
              Friandises artisanales livrées avec amour
              <br />
              <span className="text-base opacity-80 block">Fait à la main, sans compromis sur la qualité.</span>
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('products')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-[#A855F7] bg-white hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg"
                style={{ fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
              >
                Découvrir nos produits
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('about')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white border-2 border-white/50 hover:bg-white/10 transition-all"
                style={{ fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
              >
                Notre histoire
              </button>
            </div>

            {/* Micro-stats */}
            <div className="flex gap-6 mt-10">
              {STATS.slice(0, 3).map(s => (
                <div key={s.label} className="text-white">
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Baloo 2, cursive' }}>{s.value}</div>
                  <div className="text-xs opacity-70" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-white/15 flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
                <Lollipop size={120} className="text-white/90" strokeWidth={1.2} />
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-[float_2.5s_ease-in-out_infinite_0.5s]">
                <Cookie size={36} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-[float_3.5s_ease-in-out_infinite_1s]">
                <Cake size={30} className="text-white" />
              </div>
              <div className="absolute top-8 -right-8 w-12 h-12 rounded-full bg-[#FFD93D]/80 flex items-center justify-center animate-[float_2s_ease-in-out_infinite_0.2s]">
                <Candy size={24} className="text-[#3D1C02]" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold text-center text-[#3D1C02] mb-10"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              Qu'est-ce qui vous fait envie ?
              <UtensilsCrossed size={28} className="text-[#FF6B9D]" />
            </span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => {
              const CatIcon = CATEGORY_ICONS[cat.key];
              return (
              <button
                key={cat.key}
                onClick={() => navigate('products')}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-3xl hover:shadow-lg hover:shadow-pink-100 transition-all hover:-translate-y-1"
                style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.12), rgba(168,85,247,0.12))' }}
                >
                  <CatIcon size={32} className="text-[#FF6B9D]" strokeWidth={1.8} />
                </div>
                <span className="text-sm font-semibold text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cat.label}
                </span>
              </button>
            );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-[#FF6B9D] font-semibold mb-1 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sélection Bombo
              </div>
              <h2
                className="text-3xl font-bold text-[#3D1C02] flex items-center gap-2"
                style={{ fontFamily: 'Baloo 2, cursive' }}
              >
                <Star size={28} className="text-[#FFD93D] fill-[#FFD93D]" />
                La sélection de la semaine
              </h2>
            </div>
            <button
              onClick={() => navigate('products')}
              className="hidden sm:flex items-center gap-2 text-[#FF6B9D] font-semibold hover:gap-3 transition-all"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Voir tout <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onClick={onViewProduct}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('products')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-200"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
            >
              Voir tous nos produits <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* LOYALTY BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#2D0F5A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Star size={48} className="text-[#FFD93D] fill-[#FFD93D]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2 flex-wrap"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            Chaque friandise rapproche d'une récompense
            <Star size={32} className="text-[#FFD93D] fill-[#FFD93D]" />
          </h2>
          <p className="text-white/70 mb-10 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Accumulez des points à chaque commande et débloquez des avantages exclusifs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-10">
            {LOYALTY_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,107,157,0.2)', border: '2px solid rgba(255,107,157,0.4)' }}
                  >
                    <IconBox icon={step.icon} size={28} color="#fff" />
                  </div>
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {step.label}
                  </span>
                </div>
                {i < LOYALTY_STEPS.length - 1 && (
                  <div className="hidden sm:block w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-2 mb-6" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('profile')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-[#2D0F5A] bg-[#FFD93D] hover:bg-yellow-300 transition-all hover:scale-105"
            style={{ fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
          >
            Rejoindre le programme Bombo <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold text-center text-[#3D1C02] mb-2"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              Ils nous font confiance
              <MessageCircle size={28} className="text-[#FF6B9D]" />
            </span>
          </h2>
          <p className="text-center text-[#8B6355] mb-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Plus de 800 clients satisfaits et des étoiles plein les yeux
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(review => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-3xl flex flex-col gap-4"
                style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      {review.author}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className="fill-[#FFD93D] text-[#FFD93D]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#8B6355] text-sm leading-relaxed italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  "{review.text}"
                </p>
                <span className="text-xs text-[#8B6355]/60" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {review.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#FF6B9D] font-semibold mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre histoire
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#3D1C02] mb-4 leading-snug"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              <span className="inline-flex items-center gap-2 flex-wrap">
                Fait avec passion, livré avec amour
                <Heart size={28} className="text-[#FF6B9D] fill-[#FF6B9D]" />
              </span>
            </h2>
            <p className="text-[#8B6355] leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Bombo est née en 2019 dans la cuisine de Sophie, une passionnée de confiserie qui voulait partager ses créations avec le monde. Ce qui a commencé comme un projet du week-end est devenu une vraie boutique artisanale.
            </p>
            <p className="text-[#8B6355] leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Chaque bonbon est fabriqué à la main avec des ingrédients soigneusement sélectionnés, sans colorants artificiels. Parce que la gourmandise mérite le meilleur.
            </p>
            <button
              onClick={() => navigate('about')}
              className="inline-flex items-center gap-2 text-[#FF6B9D] font-bold hover:gap-3 transition-all"
              style={{ fontFamily: 'Baloo 2, cursive', fontSize: '1.05rem' }}
            >
              En savoir plus sur nous <ArrowRight size={18} />
            </button>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ background: '#f5e6d3' }}>
              <img
                src="https://images.unsplash.com/photo-1596350351182-c2ce5b74a758?w=600&h=450&fit=crop&auto=format"
                alt="L'atelier Bombo"
                className="w-full h-72 object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
              style={{ border: '1.5px solid rgba(255,107,157,0.15)' }}
            >
              <div className="flex items-center gap-2">
                <Leaf size={28} className="text-[#4ADE80]" />
                <div>
                  <div className="font-bold text-[#3D1C02] text-sm" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    100% Artisanal
                  </div>
                  <div className="text-xs text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Fait main au Burkina Faso 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section
        className="py-12 px-4"
        style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(stat => (
            <div key={stat.label} className="text-white">
              <div className="flex justify-center mb-1">
                <IconBox icon={stat.icon} size={32} color="#fff" />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Baloo 2, cursive' }}>
                {stat.value}
              </div>
              <div className="text-sm opacity-80" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

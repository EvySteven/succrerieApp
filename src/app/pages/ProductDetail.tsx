import { useState } from 'react';
import { Heart, ShoppingCart, Star, ChevronRight, Minus, Plus, ArrowLeft, Check, Frown, Sparkles } from 'lucide-react';
import type { Page, Product, BadgeType } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { BADGE_ICONS, IconBox } from '../icons';
import { formatPrice, FREE_SHIPPING_MIN } from '../utils/currency';

interface ProductDetailProps {
  product: Product;
  navigate: (page: Page) => void;
  onAddToCart: (product: Product, qty: number) => void;
  onToggleWishlist: (id: number) => void;
  wishlist: number[];
  onViewProduct: (product: Product) => void;
}

type Tab = 'description' | 'ingredients' | 'allergenes' | 'livraison';

const TABS: { key: Tab; label: string }[] = [
  { key: 'description', label: 'Description' },
  { key: 'ingredients', label: 'Ingrédients' },
  { key: 'allergenes', label: 'Allergènes' },
  { key: 'livraison', label: 'Livraison' },
];

const BADGE_CONFIG: Record<BadgeType, { label: string; bg: string; text?: string }> = {
  nouveau: { label: 'Nouveau', bg: '#4ADE80' },
  promo: { label: 'Promo', bg: '#FF6B9D' },
  populaire: { label: 'Populaire', bg: '#FFD93D', text: '#3D1C02' },
};

export default function ProductDetail({
  product,
  navigate,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onViewProduct,
}: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const thumbImages = [
    product.image,
    ...PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => p.image),
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const tabContent: Record<Tab, string> = {
    description: product.description,
    ingredients: product.ingredients,
    allergenes: product.allergens,
    livraison: `Livraison en 24-48h ouvrées via Colissimo. Livraison gratuite à partir de ${formatPrice(FREE_SHIPPING_MIN)} d'achat. Emballage isotherme pour les chocolats en période chaude. Suivi par SMS et email inclus.`,
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <button onClick={() => navigate('home')} className="hover:text-[#FF6B9D] transition-colors">Accueil</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate('products')} className="hover:text-[#FF6B9D] transition-colors">Produits</button>
          <ChevronRight size={14} />
          <span className="text-[#3D1C02] font-medium capitalize">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-[#FF6B9D] truncate max-w-[120px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('products')}
          className="flex items-center gap-2 text-[#8B6355] hover:text-[#FF6B9D] transition-colors mb-6 font-medium"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <ArrowLeft size={16} /> Retour aux produits
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-pink-50 mb-4" style={{ aspectRatio: '1' }}>
              <img
                src={thumbImages[selectedThumb]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedThumb(i)}
                  className="rounded-2xl overflow-hidden bg-pink-50 transition-all"
                  style={{
                    aspectRatio: '1',
                    border: selectedThumb === i ? '2.5px solid #FF6B9D' : '2px solid transparent',
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {product.badge && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    background: BADGE_CONFIG[product.badge].bg,
                    color: BADGE_CONFIG[product.badge].text ?? '#fff',
                  }}
                >
                  <IconBox icon={BADGE_ICONS[product.badge]} size={12} color={BADGE_CONFIG[product.badge].text ?? '#fff'} />
                  {BADGE_CONFIG[product.badge].label}
                </span>
              )}
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
                style={{ background: 'rgba(255,107,157,0.1)', color: '#FF6B9D', fontFamily: 'Poppins, sans-serif' }}
              >
                {product.category}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-[#3D1C02] mb-3"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-[#FFD93D] text-[#FFD93D]' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>
              <span className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>
                {product.rating}
              </span>
              <span className="text-sm text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ({product.reviewCount} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="text-4xl font-bold"
                style={{ color: '#FF6B9D', fontFamily: 'Baloo 2, cursive' }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[#8B6355] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-[#FF6B9D]">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-[#8B6355] leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {product.description}
            </p>

            {/* Tabs */}
            <div className="border-b border-pink-100 mb-5">
              <div className="flex gap-1 overflow-x-auto">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      borderColor: activeTab === tab.key ? '#FF6B9D' : 'transparent',
                      color: activeTab === tab.key ? '#FF6B9D' : '#8B6355',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="text-sm text-[#8B6355] leading-relaxed mb-6 min-h-[3rem]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {tabContent[activeTab]}
            </div>

            {/* Quantity + CTA */}
            {product.inStock ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="flex items-center rounded-2xl overflow-hidden"
                    style={{ border: '2px solid rgba(255,107,157,0.2)' }}
                  >
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#FF6B9D] hover:bg-pink-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span
                      className="w-10 text-center font-bold text-[#3D1C02]"
                      style={{ fontFamily: 'Baloo 2, cursive' }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#FF6B9D] hover:bg-pink-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Total :{' '}
                    <strong className="text-[#FF6B9D]">
                      {formatPrice(product.price * quantity)}
                    </strong>
                  </span>
                </div>

                <div className="flex gap-3 mb-5">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-200"
                    style={{
                      background: added
                        ? 'linear-gradient(135deg, #4ADE80, #22c55e)'
                        : 'linear-gradient(135deg, #FF6B9D, #A855F7)',
                      fontFamily: 'Baloo 2, cursive',
                      fontSize: '1rem',
                    }}
                  >
                    {added ? (
                      <><Check size={18} /> Ajouté au panier !</>
                    ) : (
                      <><ShoppingCart size={18} /> Ajouter au panier</>
                    )}
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold border-2 transition-all hover:scale-105"
                    style={{
                      borderColor: '#FF6B9D',
                      color: '#FF6B9D',
                      background: isWishlisted ? 'rgba(255,107,157,0.08)' : 'transparent',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    <Heart size={18} className={isWishlisted ? 'fill-[#FF6B9D]' : ''} />
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-100 rounded-2xl px-5 py-4 mb-5 flex items-center gap-3">
                <Frown size={28} className="text-[#8B6355] shrink-0" />
                <div>
                  <div className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    Produit épuisé
                  </div>
                  <div className="text-sm text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Revenez bientôt, nous fabriquons de nouvelles fournées chaque semaine.
                  </div>
                </div>
              </div>
            )}

            {/* Loyalty points */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(255,217,61,0.15)', border: '1.5px solid rgba(255,217,61,0.3)' }}
            >
              <Star size={22} className="text-[#FFD93D] fill-[#FFD93D] shrink-0" />
              <p className="text-sm font-medium text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Cette commande vous rapporte{' '}
                <strong className="text-[#A855F7]">{product.points * quantity} points</strong> de fidélité !
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-[#3D1C02] mb-6"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              <span className="inline-flex items-center gap-2">
                Vous aimerez aussi
                <Sparkles size={22} className="text-[#FF6B9D]" />
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={prod => onAddToCart(prod, 1)}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.includes(p.id)}
                  onClick={onViewProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

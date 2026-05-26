import { useState, useRef } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '../types';
import StarRating from './design-system/StarRating';
import { triggerConfetti, flyToCart } from '../utils/animations';
import { BADGE_ICONS, IconBox } from '../icons';
import { formatPrice } from '../utils/currency';
import type { BadgeType } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
  onClick: (product: Product) => void;
}

const BADGE_CONFIG: Record<BadgeType, { label: string; bg: string; text: string }> = {
  nouveau: { label: 'Nouveau', bg: '#4ADE80', text: '#fff' },
  promo: { label: 'Promo', bg: '#FF6B9D', text: '#fff' },
  populaire: { label: 'Populaire', bg: '#FFD93D', text: '#3D1C02' },
};

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onClick }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    if (btnRef.current) flyToCart(btnRef.current);
    triggerConfetti();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 300);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onClick(product)}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100 flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-pink-50" style={{ aspectRatio: '1' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            style={{ background: BADGE_CONFIG[product.badge].bg, color: BADGE_CONFIG[product.badge].text }}
          >
            <IconBox icon={BADGE_ICONS[product.badge]} size={12} color={BADGE_CONFIG[product.badge].text} />
            {BADGE_CONFIG[product.badge].label}
          </div>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-[#3D1C02]">
              Épuisé
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow transition-all duration-200 ${
            heartAnim ? 'scale-125' : 'scale-100'
          } hover:scale-110`}
        >
          <Heart
            size={16}
            className={`transition-colors ${isWishlisted ? 'fill-[#FF6B9D] text-[#FF6B9D]' : 'text-[#8B6355]'}`}
          />
        </button>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#FF6B9D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <StarRating rating={product.rating} size={12} reviewCount={product.reviewCount} />
        </div>

        {/* Name */}
        <h3
          className="font-bold text-[#3D1C02] mb-2 leading-snug flex-1"
          style={{ fontFamily: 'Baloo 2, cursive', fontSize: '0.95rem' }}
        >
          {product.name}
        </h3>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span
              className="text-xl font-bold"
              style={{ color: '#FF6B9D', fontFamily: 'Baloo 2, cursive' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8B6355] line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            ref={btnRef}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-white transition-all duration-300 ${
              !product.inStock ? 'opacity-40 cursor-not-allowed' :
              added ? 'scale-105' : 'hover:scale-105 hover:shadow-md hover:shadow-pink-200'
            }`}
            style={{
              background: added
                ? 'linear-gradient(135deg, #4ADE80, #22c55e)'
                : 'linear-gradient(135deg, #FF6B9D, #A855F7)',
            }}
          >
            {added ? (
              <>
                <Check size={13} /> Ajouté !
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

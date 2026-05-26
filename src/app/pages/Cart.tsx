import { useState } from 'react';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, Lock, ShoppingCart, Truck, PartyPopper, Star, Frown, Check } from 'lucide-react';
import type { Page, CartItem } from '../types';
import {
  formatPrice,
  FREE_SHIPPING_MIN,
  SHIPPING_FEE,
  POINTS_DISCOUNT,
} from '../utils/currency';

interface CartProps {
  cart: CartItem[];
  navigate: (page: Page) => void;
  onUpdateQuantity: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

const PROMO_CODES: Record<string, number> = {
  'BOMBO10': 10,
  'BIENVENUE': 15,
  'DOUCEUR20': 20,
};

export default function Cart({ cart, navigate, onUpdateQuantity, onRemoveItem }: CartProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [usePoints, setUsePoints] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  const promoDiscount = appliedPromo ? (subtotal * PROMO_CODES[appliedPromo]) / 100 : 0;
  const pointsDiscount = usePoints ? POINTS_DISCOUNT : 0;
  const total = subtotal + shipping - promoDiscount - pointsDiscount;

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Code invalide. Essayez BOMBO10 ou BIENVENUE.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 animate-bounce">
          <Frown size={72} className="text-[#FF6B9D] opacity-50" strokeWidth={1.5} />
        </div>
        <h2
          className="text-3xl font-bold text-[#3D1C02] mb-3"
          style={{ fontFamily: 'Baloo 2, cursive' }}
        >
          Ton panier est vide
        </h2>
        <p className="text-[#8B6355] mb-8 max-w-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Pas encore de friandises dans ton panier. C'est l'heure de se faire plaisir !
        </p>
        <button
          onClick={() => navigate('products')}
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive', fontSize: '1rem' }}
        >
          <ShoppingBag size={18} />
          Découvrir nos produits
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('products')}
          className="flex items-center gap-2 text-[#8B6355] hover:text-[#FF6B9D] transition-colors mb-6 font-medium"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <ArrowLeft size={16} /> Continuer mes achats
        </button>

        <h1
          className="text-3xl font-bold text-[#3D1C02] mb-8"
          style={{ fontFamily: 'Baloo 2, cursive' }}
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingCart size={28} className="text-[#FF6B9D]" />
            Mon panier ({cart.length} article{cart.length > 1 ? 's' : ''})
          </span>
        </h1>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Items list */}
          <div className="flex flex-col gap-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 flex gap-4 items-center"
                style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.06)', border: '1.5px solid rgba(255,107,157,0.1)' }}
              >
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 cursor-pointer bg-pink-50"
                  onClick={() => navigate('product-detail')}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-[#3D1C02] truncate"
                    style={{ fontFamily: 'Baloo 2, cursive' }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8B6355] capitalize mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.category}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="flex items-center rounded-xl overflow-hidden"
                      style={{ border: '1.5px solid rgba(255,107,157,0.2)' }}
                    >
                      <button
                        onClick={() => quantity > 1 ? onUpdateQuantity(product.id, quantity - 1) : onRemoveItem(product.id)}
                        className="w-8 h-8 flex items-center justify-center text-[#FF6B9D] hover:bg-pink-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#3D1C02]">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#FF6B9D] hover:bg-pink-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-3">
                  <span
                    className="text-xl font-bold text-[#FF6B9D]"
                    style={{ fontFamily: 'Baloo 2, cursive' }}
                  >
                    {formatPrice(product.price * quantity)}
                  </span>
                  <span className="text-xs text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {formatPrice(product.price)}/unité
                  </span>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-[#8B6355] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Free shipping banner */}
            {subtotal < FREE_SHIPPING_MIN && (
              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-3"
                style={{ background: 'rgba(255,217,61,0.15)', border: '1.5px solid rgba(255,217,61,0.4)' }}
              >
                <Truck size={28} className="text-[#FF6B9D]" />
                <p className="text-sm text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Plus que{' '}
                  <strong className="text-[#A855F7]">{formatPrice(FREE_SHIPPING_MIN - subtotal)}</strong>{' '}
                  pour la livraison gratuite !
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div
            className="bg-white rounded-3xl p-6 sticky top-24"
            style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
          >
            <h2
              className="text-xl font-bold text-[#3D1C02] mb-6"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              Résumé
            </h2>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex justify-between text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-[#8B6355]">Sous-total</span>
                <span className="font-semibold text-[#3D1C02]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="text-[#8B6355]">Livraison</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-[#4ADE80]' : 'text-[#3D1C02]'}`}>
                  {shipping === 0 ? (
                    <span className="inline-flex items-center gap-1">
                      Gratuite <PartyPopper size={14} />
                    </span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span className="text-[#4ADE80]">Code promo ({appliedPromo})</span>
                  <span className="font-semibold text-[#4ADE80]">-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              {usePoints && (
                <div className="flex justify-between text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span className="text-[#A855F7]">Points fidélité (50 pts)</span>
                  <span className="font-semibold text-[#A855F7]">-{formatPrice(POINTS_DISCOUNT)}</span>
                </div>
              )}
            </div>

            {/* Promo code */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePromo()}
                  placeholder="Code promo"
                  disabled={!!appliedPromo}
                  className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none disabled:opacity-50"
                  style={{
                    background: '#FFF8F0',
                    border: `1.5px solid ${promoError ? '#ef4444' : 'rgba(255,107,157,0.2)'}`,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#3D1C02',
                  }}
                />
                <button
                  onClick={handlePromo}
                  disabled={!!appliedPromo}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                  style={{ background: '#FF6B9D', fontFamily: 'Poppins, sans-serif' }}
                >
                  {appliedPromo ? <Check size={16} /> : 'Appliquer'}
                </button>
              </div>
              {promoError && (
                <p className="text-xs text-red-400 mt-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {promoError}
                </p>
              )}
            </div>

            {/* Points toggle */}
            <div
              className="flex items-center gap-3 p-3 rounded-2xl mb-5"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1.5px solid rgba(168,85,247,0.2)' }}
            >
              <button
                onClick={() => setUsePoints(!usePoints)}
                className="w-10 h-5.5 rounded-full transition-all relative shrink-0"
                style={{ background: usePoints ? '#A855F7' : '#e5e7eb', height: '22px', width: '44px' }}
              >
                <div
                  className="w-4 h-4 rounded-full bg-white shadow absolute top-[3px] transition-all"
                  style={{ left: usePoints ? '24px' : '3px' }}
                />
              </button>
              <span className="text-xs text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="inline-flex items-center gap-1.5">
                  <Star size={14} className="text-[#FFD93D] fill-[#FFD93D]" />
                  J'utilise 50 points <strong className="text-[#A855F7]">(−{formatPrice(POINTS_DISCOUNT)})</strong>
                </span>
              </span>
            </div>

            <div
              className="flex justify-between items-center py-3 mb-5 border-t border-b"
              style={{ borderColor: 'rgba(255,107,157,0.15)' }}
            >
              <span className="font-bold text-[#3D1C02] text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Total
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: '#FF6B9D', fontFamily: 'Baloo 2, cursive' }}
              >
                {formatPrice(total)}
              </span>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-200 mb-4"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive' }}
            >
              Passer la commande →
            </button>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-3 opacity-50">
              <Lock size={13} className="text-[#8B6355]" />
              <span className="text-xs text-[#8B6355]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Paiement 100% sécurisé
              </span>
              {['VISA', 'MC', 'PayPal'].map(icon => (
                <span
                  key={icon}
                  className="text-[10px] font-bold px-2 py-0.5 rounded border border-current text-[#8B6355]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

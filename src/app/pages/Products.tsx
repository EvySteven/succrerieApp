import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import type { Page, Product, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';
import { CATEGORY_ICONS, Candy, Search, IconBox } from '../icons';
import { formatPrice } from '../utils/currency';
import ProductCard from '../components/ProductCard';

interface ProductsProps {
  navigate: (page: Page) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
  wishlist: number[];
  onViewProduct: (product: Product) => void;
  initialCategory?: Category;
}

type SortType = 'popularite' | 'prix-asc' | 'prix-desc' | 'nouveaute';

export default function Products({
  navigate,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onViewProduct,
  initialCategory,
}: ProductsProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceMin, setPriceMin] = useState(1000);
  const [priceMax, setPriceMax] = useState(33000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortType>('popularite');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  const PER_PAGE = 9;

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let results = PRODUCTS.filter(p => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case 'prix-asc': results = [...results].sort((a, b) => a.price - b.price); break;
      case 'prix-desc': results = [...results].sort((a, b) => b.price - a.price); break;
      case 'popularite': results = [...results].sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'nouveaute': results = [...results].sort((a, b) => (b.badge === 'nouveau' ? 1 : 0) - (a.badge === 'nouveau' ? 1 : 0)); break;
    }
    return results;
  }, [selectedCategories, priceMin, priceMax, inStockOnly, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginatedResults = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceMin(1000);
    setPriceMax(33000);
    setInStockOnly(false);
    setSearchQuery('');
    setPage(1);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#3D1C02] text-lg flex items-center gap-2"
          style={{ fontFamily: 'Baloo 2, cursive' }}>
          <SlidersHorizontal size={18} className="text-[#FF6B9D]" />
          Filtrer
        </h3>
      </div>

      {/* Search */}
      <div>
        <label className="text-sm font-semibold text-[#3D1C02] block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Rechercher
        </label>
        <input
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
          placeholder="Nom du produit..."
          className="w-full px-4 py-2.5 rounded-2xl text-sm outline-none"
          style={{
            background: '#FFF8F0',
            border: '1.5px solid rgba(255,107,157,0.2)',
            fontFamily: 'Poppins, sans-serif',
            color: '#3D1C02',
          }}
        />
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-semibold text-[#3D1C02] block mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Catégories
        </label>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <label key={cat.key} className="flex items-center gap-3 cursor-pointer group">
              <div
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer"
                style={{
                  borderColor: selectedCategories.includes(cat.key) ? '#FF6B9D' : 'rgba(255,107,157,0.3)',
                  background: selectedCategories.includes(cat.key) ? '#FF6B9D' : 'transparent',
                }}
                onClick={() => toggleCategory(cat.key)}
              >
                {selectedCategories.includes(cat.key) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm group-hover:text-[#FF6B9D] transition-colors"
                style={{ color: selectedCategories.includes(cat.key) ? '#FF6B9D' : '#3D1C02', fontFamily: 'Poppins, sans-serif' }}
                onClick={() => toggleCategory(cat.key)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <IconBox icon={CATEGORY_ICONS[cat.key]} size={14} />
                  {cat.label}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="text-sm font-semibold text-[#3D1C02] block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Fourchette de prix
        </label>
        <div className="flex justify-between text-sm font-bold text-[#FF6B9D] mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
        <input
          type="range"
          min={1000}
          max={33000}
          step={500}
          value={priceMin}
          onChange={e => {
            const v = Number(e.target.value);
            setPriceMin(v > priceMax ? priceMax : v);
            setPage(1);
          }}
          className="w-full accent-pink-400 cursor-pointer mb-2"
        />
        <input
          type="range"
          min={1000}
          max={33000}
          step={500}
          value={priceMax}
          onChange={e => {
            const v = Number(e.target.value);
            setPriceMax(v < priceMin ? priceMin : v);
            setPage(1);
          }}
          className="w-full accent-purple-400 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[#8B6355] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span>1 000 FCFA</span><span>33 000 FCFA</span>
        </div>
      </div>

      {/* In stock */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setInStockOnly(!inStockOnly); setPage(1); }}
          className="w-11 h-6 rounded-full transition-all relative"
          style={{ background: inStockOnly ? '#FF6B9D' : '#e5e7eb' }}
        >
          <div
            className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all"
            style={{ left: inStockOnly ? '22px' : '2px' }}
          />
        </button>
        <span className="text-sm text-[#3D1C02]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          En stock seulement
        </span>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-semibold text-[#3D1C02] block mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Trier par
        </label>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortType)}
          className="w-full px-3 py-2.5 rounded-2xl text-sm outline-none cursor-pointer"
          style={{
            background: '#FFF8F0',
            border: '1.5px solid rgba(255,107,157,0.2)',
            fontFamily: 'Poppins, sans-serif',
            color: '#3D1C02',
          }}
        >
          <option value="popularite">Popularité</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="nouveaute">Nouveautés</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full py-2.5 rounded-2xl text-sm font-semibold border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-pink-50 transition-colors"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Page header */}
      <div
        className="py-12 px-4 sm:px-6 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(168,85,247,0.1))' }}
      >
        <h1 className="text-4xl font-bold text-[#3D1C02] flex items-center justify-center gap-3" style={{ fontFamily: 'Baloo 2, cursive' }}>
          Tous nos produits
          <Candy size={36} className="text-[#FF6B9D]" />
        </h1>
        <p className="text-[#8B6355] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {PRODUCTS.length} friandises artisanales vous attendent
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div
            className="bg-white rounded-3xl p-6 sticky top-24"
            style={{ boxShadow: '0 4px 20px rgba(255,107,157,0.08)', border: '1.5px solid rgba(255,107,157,0.1)' }}
          >
            <SidebarContent />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold border-2 border-[#FF6B9D] text-[#FF6B9D]"
                onClick={() => setSidebarOpen(true)}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <SlidersHorizontal size={15} /> Filtres
              </button>
              <span className="text-[#8B6355] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <strong className="text-[#3D1C02]">{filtered.length}</strong> produits trouvés
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-pink-100 text-[#FF6B9D]' : 'text-[#8B6355] hover:bg-pink-50'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-pink-100 text-[#FF6B9D]' : 'text-[#8B6355] hover:bg-pink-50'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Active filters chips */}
          {(selectedCategories.length > 0 || inStockOnly) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map(cat => {
                const c = CATEGORIES.find(c => c.key === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: '#FF6B9D', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {c && <IconBox icon={CATEGORY_ICONS[c.key]} size={12} color="#fff" />}
                    {c?.label} <X size={12} />
                  </button>
                );
              })}
              {inStockOnly && (
                <button
                  onClick={() => setInStockOnly(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: '#A855F7', fontFamily: 'Poppins, sans-serif' }}
                >
                  En stock <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {paginatedResults.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <Search size={56} className="text-[#FF6B9D] opacity-40" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#3D1C02] mb-2" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Aucun produit trouvé
              </h3>
              <p className="text-[#8B6355] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Essayez d'ajuster vos filtres.
              </p>
              <button onClick={resetFilters} className="text-[#FF6B9D] font-semibold hover:underline"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedResults.map(product => (
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
          ) : (
            <div className="flex flex-col gap-4">
              {paginatedResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => onViewProduct(product)}
                  className="bg-white rounded-2xl p-4 flex gap-4 items-center cursor-pointer hover:shadow-md transition-shadow"
                  style={{ border: '1.5px solid rgba(255,107,157,0.1)' }}
                >
                  <img src={product.image} alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-pink-50" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#3D1C02] truncate" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#8B6355] line-clamp-1 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xl font-bold text-[#FF6B9D]" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      {formatPrice(product.price)}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); onAddToCart(product); }}
                      className="mt-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      + Panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold disabled:opacity-30 hover:bg-pink-50 transition-colors text-[#3D1C02]"
              >
                ←
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm transition-all"
                  style={{
                    background: page === i + 1 ? 'linear-gradient(135deg, #FF6B9D, #A855F7)' : 'transparent',
                    color: page === i + 1 ? '#fff' : '#3D1C02',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold disabled:opacity-30 hover:bg-pink-50 transition-colors text-[#3D1C02]"
              >
                →
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile filters — bottom sheet */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div
            className="relative w-full max-h-[85vh] bg-white overflow-y-auto p-6 rounded-t-3xl animate-[slideUp_0.3s_ease-out]"
            style={{ boxShadow: '0 -8px 40px rgba(168,85,247,0.15)' }}
          >
            <div className="w-12 h-1 rounded-full bg-pink-200 mx-auto mb-4" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-[#3D1C02]" style={{ fontFamily: 'Baloo 2, cursive' }}>Filtrer</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[#8B6355]"><X size={20} /></button>
            </div>
            <SidebarContent />
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full mt-6 py-3 rounded-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', fontFamily: 'Baloo 2, cursive' }}
            >
              Voir {filtered.length} produits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

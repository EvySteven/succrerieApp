import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import type { Page, CartItem, Product, ProfileSection } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import AdminAuthModal from './components/AdminAuthModal';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Manager from './pages/Manager';
import { useAdminAuth } from './utils/useAdminAuth';

const FULL_LAYOUT_PAGES: Page[] = ['home', 'products', 'product-detail', 'cart', 'about', 'contact', 'profile'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated: isAdminAuthenticated } = useAdminAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [pendingAdminPage, setPendingAdminPage] = useState<'admin' | 'manager' | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [profileSection, setProfileSection] = useState<ProfileSection>('dashboard');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = useCallback((page: Page, options?: { profileSection?: ProfileSection }) => {
    // Require authentication for admin and manager pages
    if ((page === 'admin' || page === 'manager') && !isAdminAuthenticated) {
      setPendingAdminPage(page);
      setShowAdminAuth(true);
      return;
    }
    setCurrentPage(page);
    if (options?.profileSection) setProfileSection(options.profileSection);
  }, [isAdminAuthenticated]);

  const handleAdminAuthSuccess = () => {
    setShowAdminAuth(false);
    if (pendingAdminPage) {
      setCurrentPage(pendingAdminPage);
      setPendingAdminPage(null);
    }
    toast.success('Authentification réussie', {
      style: {
        background: '#fff',
        border: '1.5px solid rgba(74,222,128,0.2)',
        color: '#3D1C02',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '16px',
      },
    });
  };

  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    toast.success(`${product.name} ajouté au panier !`, {
      style: {
        background: '#fff',
        border: '1.5px solid rgba(255,107,157,0.2)',
        color: '#3D1C02',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '16px',
      },
    });
  };

  const updateQuantity = (productId: number, qty: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    toast.info('Article retiré du panier', {
      style: {
        background: '#fff',
        border: '1.5px solid rgba(255,107,157,0.2)',
        color: '#3D1C02',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '16px',
      },
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      if (!prev.includes(id)) {
        toast.success('Ajouté à votre wishlist', {
          style: {
            background: '#fff',
            border: '1.5px solid rgba(255,107,157,0.2)',
            color: '#3D1C02',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '16px',
          },
        });
      }
      return next;
    });
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isFullLayout = FULL_LAYOUT_PAGES.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            navigate={navigate}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onViewProduct={viewProduct}
          />
        );
      case 'products':
        return (
          <Products
            navigate={navigate}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onViewProduct={viewProduct}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            navigate={navigate}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onViewProduct={viewProduct}
          />
        ) : null;
      case 'cart':
        return (
          <Cart
            cart={cart}
            navigate={navigate}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        );
      case 'about':
        return <About navigate={navigate} />;
      case 'contact':
        return <Contact navigate={navigate} />;
      case 'profile':
        return (
          <Profile
            navigate={navigate}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
            initialSection={profileSection}
            onSectionChange={setProfileSection}
          />
        );
      case 'admin':
        return <Admin navigate={navigate} />;
      case 'manager':
        return <Manager navigate={navigate} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(255,107,157,0.2) transparent; }
        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(255,107,157,0.25); border-radius: 99px; }
      `}</style>

      {isFullLayout && (
        <Header
          currentPage={currentPage}
          navigate={navigate}
          cartCount={cartCount}
          wishlistCount={wishlist.length}
        />
      )}

      <div className={isFullLayout ? '' : ''}>
        {renderPage()}
      </div>

      {isFullLayout && <Footer navigate={navigate} />}

      {isFullLayout && <ChatBot />}

      {/* Admin Authentication Modal */}
      {showAdminAuth && (
        <AdminAuthModal
          onSuccess={handleAdminAuthSuccess}
          onClose={() => { setShowAdminAuth(false); setPendingAdminPage(null); }}
        />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
    </div>
  );
}

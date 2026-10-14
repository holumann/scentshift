import { useState, useEffect } from 'react';
import { Product, CartItem } from './types.ts';
import { INITIAL_PRODUCTS } from './data/products.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CatalogSection } from './components/CatalogSection.tsx';
import { AuthenticityGuideSection } from './components/AuthenticityGuideSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { FragranceQuizModal } from './components/FragranceQuizModal.tsx';
import { ConsignmentModal } from './components/ConsignmentModal.tsx';
import { VercelDeployModal } from './components/VercelDeployModal.tsx';
import { ShieldCheck, Sparkles, X } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('scentshift_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isConsignmentOpen, setIsConsignmentOpen] = useState(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('scentshift_cart', JSON.stringify(cart));
    } catch {
      // ignore localstorage error
    }
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.product.id === product.id);
      if (existing) {
        return prevCart.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((it) => {
          if (it.product.id === productId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((it) => it.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Banner (Dismissible, <= 40px) */}
      {showTopBanner && (
        <div className="bg-stone-950 text-stone-200 text-[11px] sm:text-xs py-2 px-4 border-b border-stone-800 flex items-center justify-between z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2 tracking-wide truncate">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold shrink-0">
              <Sparkles className="w-3.5 h-3.5" /> Jaminan 100% Authentic
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="truncate text-stone-300">
              Gratis Ongkir se-Indonesia minimal pembelian Rp 500.000 &middot; Pemesanan instan via WhatsApp
            </span>
          </div>
          <button
            onClick={() => setShowTopBanner(false)}
            aria-label="Tutup Banner"
            className="text-stone-400 hover:text-white transition-colors cursor-pointer ml-2 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenConsignment={() => setIsConsignmentOpen(true)}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenConsignment={() => setIsConsignmentOpen(true)}
        />

        {/* Catalog Section */}
        <CatalogSection
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* Authenticity & Education Section */}
        <AuthenticityGuideSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenConsignment={() => setIsConsignmentOpen(true)}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <FragranceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <ConsignmentModal
        isOpen={isConsignmentOpen}
        onClose={() => setIsConsignmentOpen(false)}
      />

      <VercelDeployModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />

    </div>
  );
}

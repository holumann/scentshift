import { ShoppingBag, MessageCircle, Rocket } from 'lucide-react';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenConsignment: () => void;
  onOpenVercelGuide: () => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenConsignment,
  onOpenVercelGuide
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#home" className="text-2xl font-extrabold tracking-widest uppercase font-sans text-stone-900 whitespace-nowrap shrink-0 group">
          Scent<span className="text-amber-600 group-hover:text-amber-700 transition-colors">Shift</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-600">
          <a href="#katalog" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Katalog Parfum
          </a>
          <button
            onClick={onOpenQuiz}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Cari Scent Karakter
          </button>
          <button
            onClick={onOpenConsignment}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Titip Jual Preloved
          </button>
          <a href="#keaslian" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Jaminan 100% Original
          </a>
          <button
            onClick={onOpenVercelGuide}
            className="text-stone-900 font-semibold hover:text-amber-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-600" />
            Deploy ke Vercel
          </button>
        </nav>

        {/* Zone 3: 1 primary action group */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            className="relative p-2.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={`https://wa.me/${ADMIN_WA_NUMBER}?text=Halo%20Admin%20ScentShift,%20saya%20ingin%20konsultasi%20parfum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all hover:scale-[1.02] shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat Admin WA</span>
          </a>
        </div>
      </div>
    </header>
  );
}

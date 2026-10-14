import { Sparkles, ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';
import { HERO_ASSET } from '../data/products.ts';

interface HeroProps {
  onOpenQuiz: () => void;
  onOpenConsignment: () => void;
}

export function Hero({ onOpenQuiz, onOpenConsignment }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-stone-900 text-white min-h-[580px] flex items-center">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_ASSET}
          alt="ScentShift Authentic Perfume Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl space-y-6">
          
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            <span>Kurasi Parfum Premium & Preloved</span>
            <span aria-hidden="true">·</span>
            <span>Garansi 100% Authentic</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
            Temukan Karakter Signature Scent Impian Anda.
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Koleksi parfum Brand New dan Preloved otentik terverifikasi batch code. Beli aman dengan pengiriman instan, atau titip jual koleksi parfum preloved Anda dengan mudah.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#katalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-600/30 hover:-translate-y-0.5"
            >
              <span>Jelajahi Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/80 hover:bg-stone-800 text-amber-200 border border-stone-700/80 hover:border-amber-400 text-sm font-medium tracking-wide transition-all backdrop-blur-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cari Scent Karaktermu</span>
            </button>

            <button
              onClick={onOpenConsignment}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-stone-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-amber-500" />
              <span>Titip Jual Preloved</span>
            </button>
          </div>
        </div>

        {/* 4-Item Value Strip */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-800/70 text-amber-400 border border-stone-700/50">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">100% Original</p>
              <p className="text-stone-400 text-xs">Cek Batch Code Akurat</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-800/70 text-amber-400 border border-stone-700/50">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Preloved Berkualitas</p>
              <p className="text-stone-400 text-xs">Kurasi Juice & Botol Rapi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-800/70 text-amber-400 border border-stone-700/50">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Kirim Cepat & Aman</p>
              <p className="text-stone-400 text-xs">Bubble Wrap Tebal & Garansi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-800/70 text-amber-400 border border-stone-700/50">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Pesan via WhatsApp</p>
              <p className="text-stone-400 text-xs">Konfirmasi & Cek Stok Real</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import { ShieldCheck, MessageCircle, MapPin, Clock, Truck, Rocket } from 'lucide-react';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenConsignment: () => void;
  onOpenVercelGuide: () => void;
}

export function Footer({ onOpenQuiz, onOpenConsignment, onOpenVercelGuide }: FooterProps) {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-extrabold tracking-widest uppercase font-sans text-white">
              Scent<span className="text-amber-500">Shift</span>
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Platform kurasi parfum authentic nomor satu di Indonesia. Menghadirkan parfum Brand New dan Preloved otentik terverifikasi batch code dengan jaminan keaslian 100%.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Garansi 100% Original atau Uang Kembali</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#katalog" className="hover:text-amber-400 transition-colors">
                  Katalog Semua Parfum
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Cari Scent Karakter (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsignment}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Titip Jual Preloved Anda
                </button>
              </li>
              <li>
                <a href="#keaslian" className="hover:text-amber-400 transition-colors">
                  Panduan Cek Keaslian & Batch
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenVercelGuide}
                  className="hover:text-amber-400 text-amber-500 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Rocket className="w-3.5 h-3.5" /> Panduan Deploy Vercel
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Operational */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Layanan & Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Jam Operasional:</p>
                  <p>Senin – Sabtu (09:00 – 20:00 WIB)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Gudang Pengiriman:</p>
                  <p>Jakarta Selatan & Tangerang</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Ekspedisi Resmi:</p>
                  <p>JNE, J&T, SiCepat, GoSend / Grab</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="space-y-3 bg-stone-800/60 p-5 rounded-2xl border border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Konsultasi Aroma Gratis
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bingung memilih parfum untuk acara kencan atau kantor? Tanyakan langsung ke fragrance consultant kami.
            </p>
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}?text=Halo%20Admin%20ScentShift,%20saya%20ingin%20konsultasi%20pilihan%20parfum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admin Official</span>
            </a>
            <p className="text-[11px] text-center text-stone-500">
              +62 856-9281-1350
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500 space-y-2">
          <p>&copy; 2026 ScentShift Store. Tugas Kelompok Digital Entrepreneurship.</p>
          <p className="text-[11px] text-stone-600">
            Seluruh merek dagang dan nama parfum adalah hak milik masing-masing rumah mode. ScentShift menjual unit asli yang diperoleh dari distributor resmi dan kurasi kolektor terpercaya.
          </p>
        </div>

      </div>
    </footer>
  );
}

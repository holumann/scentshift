import { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types.ts';

interface FragranceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function FragranceQuizModal({
  isOpen,
  onClose,
  products,
  onSelectProduct
}: FragranceQuizModalProps) {
  const [step, setStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>('daily');
  const [vibe, setVibe] = useState<string>('fresh');
  const [budget, setBudget] = useState<string>('any');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setOccasion('daily');
    setVibe('fresh');
    setBudget('any');
  };

  const getRecommendations = () => {
    return products.filter((p) => {
      // Vibe match
      if (vibe === 'fresh' && !['Fresh & Citrus', 'Aquatic'].includes(p.scentFamily)) return false;
      if (vibe === 'woody' && !['Woody'].includes(p.scentFamily)) return false;
      if (vibe === 'sweet' && !['Amber & Oriental', 'Floral', 'Gourmand'].includes(p.scentFamily)) return false;
      if (vibe === 'floral' && !['Floral'].includes(p.scentFamily)) return false;

      // Budget match
      if (budget === 'low' && p.price > 500000) return false;
      if (budget === 'mid' && (p.price < 500000 || p.price > 1800000)) return false;
      if (budget === 'high' && p.price < 1800000) return false;

      return true;
    });
  };

  const recommendations = getRecommendations();
  // If no exact match, fallback to top 2 items matching vibe
  const finalDisplay = recommendations.length > 0 ? recommendations : products.slice(0, 3);

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Cari Scent Karaktermu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="py-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Langkah 1 dari 3</p>
            <h4 className="text-xl font-bold font-serif text-stone-900">
              Kapan Anda paling sering memakai parfum ini?
            </h4>
            
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {[
                { id: 'daily', label: 'Harian, Kantor & Kampus', desc: 'Aroma bersih, sopan di hidung rekan kerja, dan tidak bikin pusing.' },
                { id: 'date', label: 'Kencan Romantis / Date Night', desc: 'Aroma menggoda, hangat, intim dengan sillage yang bikin penasaran.' },
                { id: 'party', label: 'Pesta Malam & Acara Spesial', desc: 'Karakter mewah, berwibawa, dan tahan seharian penuh di keramaian.' },
                { id: 'sport', label: 'Olahraga & Aktivitas Outdoor', desc: 'Kesegaran maksimal, citrus energik dan anti-apek saat berkeringat.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOccasion(opt.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    occasion === opt.id
                      ? 'border-amber-600 bg-amber-50/70'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <p className="text-sm font-bold text-stone-900">{opt.label}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Karakter Aroma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="py-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Langkah 2 dari 3</p>
            <h4 className="text-xl font-bold font-serif text-stone-900">
              Aroma seperti apa yang membuat Anda percaya diri?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                { id: 'fresh', title: 'Segar & Citrus / Aquatic', desc: 'Lemon, Bergamot, Sea Breeze' },
                { id: 'woody', title: 'Kayu Hangat & Maskulin', desc: 'Cedar, Sandalwood, Birch Smoke' },
                { id: 'sweet', title: 'Manis Vanilla & Amber', desc: 'Warm Amber, Gourmand, Tonka' },
                { id: 'floral', title: 'Floral Elegan & Powdery', desc: 'Rose, Iris, Clean Musks' }
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    vibe === v.id
                      ? 'border-amber-600 bg-amber-50/70'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <p className="text-sm font-bold text-stone-900">{v.title}</p>
                  <p className="text-xs text-stone-500 mt-1">{v.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pilih Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Langkah 3 dari 3</p>
            <h4 className="text-xl font-bold font-serif text-stone-900">
              Berapa kisaran budget yang Anda alokasikan?
            </h4>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {[
                { id: 'low', label: 'Affordable / Decant (< Rp 500.000)', desc: 'Pilihan hemat lokal & preloved dengan kualitas prima' },
                { id: 'mid', label: 'Designer Premium (Rp 500.000 - Rp 1.800.000)', desc: 'Standar desainer internasional seperti Bvlgari & Chanel' },
                { id: 'high', label: 'Niche & High Luxury (> Rp 1.800.000)', desc: 'Koleksi eksklusif Tom Ford, MFK & Diptyque' },
                { id: 'any', label: 'Bebas / Rekomendasikan yang Terbaik', desc: 'Tampilkan aroma paling cocok tanpa batasan budget' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudget(b.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    budget === b.id
                      ? 'border-amber-600 bg-amber-50/70'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <p className="text-sm font-bold text-stone-900">{b.label}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{b.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Lihat Rekomendasi Parfum</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Hasil Kurasi ScentShift</p>
                <h4 className="text-xl font-bold font-serif text-stone-900">
                  Parfum Paling Cocok Untuk Anda
                </h4>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {finalDisplay.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-stone-200 hover:border-amber-600 bg-stone-50/50 items-center transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
                      <span>{item.brand}</span>
                      <span>·</span>
                      <span>{item.scentFamily}</span>
                    </div>
                    <h5 className="text-xs font-bold text-stone-900 truncate">{item.name}</h5>
                    <p className="text-xs font-bold text-amber-700 tabular-nums">{formatRupiah(item.price)}</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
                  >
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-3 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors cursor-pointer"
            >
              Tutup & Eksplor Katalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

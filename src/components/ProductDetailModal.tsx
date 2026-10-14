import { X, ShieldCheck, CheckCircle2, MessageCircle, ShoppingBag, Droplets, Clock, Wind } from 'lucide-react';
import { Product } from '../types.ts';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  const waMessage = encodeURIComponent(
    `Halo Admin ScentShift, saya tertarik dengan parfum:\n*${product.name}*\nKategori: ${
      product.category === 'preloved'
        ? `Preloved (${product.remainingJuice}%)`
        : product.category === 'new'
        ? 'Brand New'
        : 'Decant 10ml'
    }\nHarga: ${formatRupiah(product.price)}\nBatch Code: ${product.batchCode}\n\nBoleh minta konfirmasi kondisi dan foto detail unitnya? Terima kasih!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image & Badges */}
          <div className="relative bg-stone-100 p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-stone-200">
            <div className="w-full flex justify-between items-center text-xs font-semibold">
              <span className="text-stone-500 uppercase tracking-widest">{product.brand}</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Authentic
              </span>
            </div>

            <div className="my-6 max-h-[360px] w-full flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-[340px] w-full object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Juice gauge if preloved */}
            {product.category === 'preloved' && product.remainingJuice && (
              <div className="w-full bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-stone-700 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-amber-600" /> Sisa Isi (Juice Level)
                  </span>
                  <span className="text-amber-700">{product.remainingJuice}% / ~{Math.round((parseInt(product.bottleSize) * product.remainingJuice) / 100)}ml</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${product.remainingJuice}%` }}
                  />
                </div>
              </div>
            )}

            {product.category === 'new' && (
              <div className="w-full bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 text-center font-medium">
                Unit Baru Segel Pabrik (Factory Sealed Box)
              </div>
            )}
          </div>

          {/* Right: Detailed Specifications */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
                <span>{product.concentration}</span>
                <span>·</span>
                <span>Ukuran {product.bottleSize}</span>
                <span>·</span>
                <span>Kategori: {product.scentFamily}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 tabular-nums">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatRupiah(product.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Hemat {savingsPercent}% ({formatRupiah(savings)})
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 text-stone-600 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Fragrance Notes Breakdown */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Piramida Aroma (Fragrance Notes)
              </h4>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <p className="font-semibold text-amber-700 text-[11px] mb-1">Top Notes</p>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {product.notes.top.join(', ')}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <p className="font-semibold text-amber-700 text-[11px] mb-1">Heart Notes</p>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {product.notes.middle.join(', ')}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                  <p className="font-semibold text-amber-700 text-[11px] mb-1">Base Notes</p>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {product.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance & Condition Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <p className="text-stone-500 text-[10px]">Ketahanan (Longevity)</p>
                  <p className="font-semibold text-stone-800">{product.longevity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <Wind className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <p className="text-stone-500 text-[10px]">Jarak Jejak (Sillage)</p>
                  <p className="font-semibold text-stone-800">{product.sillage}</p>
                </div>
              </div>
            </div>

            {/* Batch & Box Details */}
            <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-1.5 border border-stone-200 text-stone-600">
              <div className="flex justify-between">
                <span className="text-stone-500">Kondisi Box:</span>
                <span className="font-semibold text-stone-800">{product.boxCondition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Batch Code:</span>
                <span className="font-mono font-semibold text-stone-800">{product.batchCode}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terverifikasi otentik & garansi uang kembali 100% jika terbukti KW</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-stone-900 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </button>

              <a
                href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Cepat via WA</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Search, Eye, ShoppingBag, MessageCircle, SlidersHorizontal, Check, Sparkles } from 'lucide-react';
import { Product, ProductCategory, ScentFamily, GenderTarget } from '../types.ts';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function CatalogSection({ products, onSelectProduct, onAddToCart }: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [selectedFamily, setSelectedFamily] = useState<ScentFamily>('Semua');
  const [selectedGender, setSelectedGender] = useState<GenderTarget>('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const scentFamilies: ScentFamily[] = ['Semua', 'Woody', 'Fresh & Citrus', 'Floral', 'Amber & Oriental', 'Aquatic'];
  const genders: GenderTarget[] = ['Semua', 'Unisex', 'Pria', 'Wanita'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchNotes = [...item.notes.top, ...item.notes.middle, ...item.notes.base].some(n => n.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchNotes) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Scent Family filter
        if (selectedFamily !== 'Semua' && item.scentFamily !== selectedFamily) {
          return false;
        }

        // Gender filter
        if (selectedGender !== 'Semua' && item.gender !== selectedGender) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [products, searchQuery, selectedCategory, selectedFamily, selectedGender, sortBy]);

  const handleAddToCartWithNotice = (product: Product) => {
    onAddToCart(product);
    setAddedNoticeId(product.id);
    setTimeout(() => {
      setAddedNoticeId(null);
    }, 1500);
  };

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  return (
    <section id="katalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
          Kurasi Eksklusif ScentShift
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Katalog Parfum Authentic & Preloved
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Semua parfum dijamin keasliannya dengan batch code jelas dan deskripsi kondisi jujur. Pesan instan via WhatsApp atau masukkan ke keranjang belanja.
        </p>
      </div>

      {/* Control Bar: Primary Filters & Search */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Semua ({products.length})
            </button>
            <button
              onClick={() => setSelectedCategory('preloved')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'preloved'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Preloved Authentic ({products.filter(p => p.category === 'preloved').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama parfum, brand, atau notes (misal: Vanilla, Woody)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="popular">Terpopuler</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

        </div>

        {/* Secondary Filter Line: Scent Family & Gender */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-stone-500 font-medium shrink-0">Aroma:</span>
            {scentFamilies.map((family) => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFamily === family
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {family}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium shrink-0">Gender:</span>
            {genders.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedGender === g
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-lg font-serif text-stone-800">Tidak ada parfum yang cocok dengan filter Anda.</p>
          <p className="text-xs text-stone-500 mt-1">Coba gunakan kata kunci lain atau reset filter kategori.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFamily('Semua');
              setSelectedGender('Semua');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const waMessage = encodeURIComponent(
              `Halo Admin ScentShift, saya ingin memesan:\n*${product.name}*\nKategori: ${
                product.category === 'preloved'
                  ? `Preloved (${product.remainingJuice}%)`
                  : product.category === 'new'
                  ? 'Brand New'
                  : 'Decant 10ml'
              }\nHarga: ${formatRupiah(product.price)}\n\nApakah stok unit ini masih tersedia?`
            );
            const waLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Product Image Area */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.category === 'new' && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-emerald-700 text-white rounded-md shadow-sm">
                        Baru / Sealed
                      </span>
                    )}
                    {product.category === 'preloved' && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-amber-700 text-white rounded-md shadow-sm">
                        Preloved {product.remainingJuice}%
                      </span>
                    )}
                    {product.category === 'decant' && (
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-stone-800 text-white rounded-md shadow-sm">
                        Decant 10ml
                      </span>
                    )}
                  </div>

                  {/* Quick View Floating Button */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                    title="Lihat Detail Parfum"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium mb-1">
                    <span>{product.brand}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.concentration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.bottleSize}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-sans font-bold text-stone-900 text-base leading-snug hover:text-amber-700 transition-colors cursor-pointer line-clamp-1 mb-1.5"
                  >
                    {product.name}
                  </h3>

                  {/* Notes / Scent Highlight */}
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {product.notes.top.join(', ')} &middot; {product.notes.base.slice(0, 2).join(', ')}
                  </p>

                  {/* Preloved Condition status if applicable */}
                  {product.category === 'preloved' && (
                    <div className="mb-3 text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/60 font-medium">
                      Kondisi: {product.boxCondition} (Juice {product.remainingJuice}%)
                    </div>
                  )}

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-stone-900 tabular-nums">
                      {formatRupiah(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        {formatRupiah(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => handleAddToCartWithNotice(product)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {addedNoticeId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Masuk!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Keranjang</span>
                        </>
                      )}
                    </button>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order WA</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}

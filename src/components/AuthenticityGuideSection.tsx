import { ShieldCheck, CheckCircle2, Search, Sparkles, Star } from 'lucide-react';
import { STORE_REVIEWS, ADMIN_WA_NUMBER } from '../data/products.ts';

export function AuthenticityGuideSection() {
  return (
    <section id="keaslian" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
            Standar Kurasi & Edukasi
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Jaminan Keaslian 100% & Anti-KW
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Di pasar parfum saat ini, banyak beredar barang tiruan dengan istilah &quot;Original Singapore&quot; atau &quot;Reject Eropa&quot;. Di ScentShift, kami menolak segala bentuk parfum palsu. Setiap botol baru maupun preloved melewati 4 tahap inspeksi fisik.
          </p>
        </div>

        {/* 4 Inspection Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-sans font-bold text-base text-stone-900">
              Validasi Batch Code
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nomor batch yang terukir di pantat botol wajib 100% cocok dengan kode emboss pada box luar, serta terbaca di database CheckFresh / CheckCosmetic.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-sans font-bold text-base text-stone-900">
              Inspeksi Nozzle & Atomizer
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Atomizer asli menghasilkan partikel kabut (fine mist) merata tanpa tetesan bocor. Dudukan ring atomizer orisinil tidak menggunakan lem murahan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-sans font-bold text-base text-stone-900">
              Kualitas Kaca & Tutup
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Botol desainer dan niche memiliki bobot kaca solid, garis cetakan halus tanpa gelembung udara, serta tutup magnetik atau klik presisi sempurna.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-sans font-bold text-base text-stone-900">
              Kondisi Juice & Maceration
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Parfum preloved disimpan dalam suhu sejuk 20-23°C kedap sinar matahari. Aroma top notes tetap jernih dan bebas bau alkohol tajam yang menusuk.
            </p>
          </div>

        </div>

        {/* Guarantee Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>ScentShift Authenticity Commitment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Garansi 100% Uang Kembali Tanpa Potongan
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Jika unit parfum yang Anda terima terbukti tidak otentik dengan bukti perbandingan batch code atau konfirmasi counter resmi, dana Anda akan kami kembalikan 100% penuh beserta ongkos kirim.
            </p>
          </div>

          <a
            href={`https://wa.me/${ADMIN_WA_NUMBER}?text=Halo%20Admin%20ScentShift,%20saya%20ingin%20tanya%20tentang%20garansi%20keaslian%20parfum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase rounded-full whitespace-nowrap transition-all shadow-lg hover:scale-105 shrink-0"
          >
            Konsultasi dengan Admin
          </a>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Testimoni Pembeli Terverifikasi</p>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Ulasan Pelanggan ScentShift</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORE_REVIEWS.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{rev.name}</p>
                    <p className="text-stone-500 text-[11px]">{rev.role}</p>
                  </div>
                  <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                    {rev.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

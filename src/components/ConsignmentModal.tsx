import { useState } from 'react';
import { X, RefreshCw, MessageCircle, ShieldCheck, Camera, Info } from 'lucide-react';
import { ConsignmentFormData } from '../types.ts';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface ConsignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsignmentModal({ isOpen, onClose }: ConsignmentModalProps) {
  const [formData, setFormData] = useState<ConsignmentFormData>({
    senderName: '',
    whatsappNumber: '',
    perfumeName: '',
    brand: '',
    remainingJuice: 80,
    boxStatus: 'Fullset Box Original',
    batchCode: '',
    expectedPrice: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*PENGAJUAN TITIP JUAL PARFUM PRELOVED*\n` +
      `-----------------------------------------\n` +
      `*Nama Pemilik:* ${formData.senderName}\n` +
      `*No. WhatsApp:* ${formData.whatsappNumber}\n` +
      `*Brand Parfum:* ${formData.brand}\n` +
      `*Varian Parfum:* ${formData.perfumeName}\n` +
      `*Perkiraan Sisa Juice:* ${formData.remainingJuice}%\n` +
      `*Kelengkapan:* ${formData.boxStatus}\n` +
      `*Batch Code Botol:* ${formData.batchCode || 'Ada di bawah botol'}\n` +
      `*Ekspektasi Harga:* Rp ${formData.expectedPrice}\n` +
      (formData.notes ? `*Catatan Kondisi/Penyimpanan:* ${formData.notes}\n` : '') +
      `-----------------------------------------\n` +
      `Halo Tim Kurasi ScentShift, saya ingin titip jual parfum di atas. Saya siap kirim foto detail botol, batch code, dan nozzle.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Titip Jual Parfum Preloved
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 mt-3 leading-relaxed">
          Punya parfum original yang jarang terpakai? Ubah koleksi lemari Anda menjadi uang tunai. Tim ScentShift membantu kurasi, foto produk, dan memasarkan ke ribuan pecinta parfum.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                Nama Pemilik *
              </label>
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                No. WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxx"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                Brand / Rumah Mode *
              </label>
              <input
                type="text"
                required
                placeholder="Misal: Chanel, Dior, YSL"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                Varian Parfum & Ukuran *
              </label>
              <input
                type="text"
                required
                placeholder="Sauvage EDP 100ml"
                value={formData.perfumeName}
                onChange={(e) => setFormData({ ...formData, perfumeName: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[11px] font-medium text-stone-700 mb-1">
              <span>Perkiraan Sisa Juice:</span>
              <span className="font-bold text-amber-700">{formData.remainingJuice}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="99"
              value={formData.remainingJuice}
              onChange={(e) => setFormData({ ...formData, remainingJuice: parseInt(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                Kelengkapan Box
              </label>
              <select
                value={formData.boxStatus}
                onChange={(e) => setFormData({ ...formData, boxStatus: e.target.value })}
                className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option value="Fullset Box Original">Fullset Box Original</option>
                <option value="Tester Unit (No Box)">Tester Unit (No Box)</option>
                <option value="Bottle Only (Box Hilang)">Bottle Only</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-700 mb-1">
                Ekspektasi Harga (Rp) *
              </label>
              <input
                type="text"
                required
                placeholder="850.000"
                value={formData.expectedPrice}
                onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-stone-700 mb-1">
              Batch Code / Riwayat Pembelian (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Beli di C&F Senayan City 2023, Batch 8901"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" /> Syarat & Ketentuan Konsinyasi
            </p>
            <p>Hanya menerima unit 100% Original (Bukan bibit/refill/KW). Tim kami akan menginspeksi fisik botol dan batch code.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ajukan Titip Jual ke WhatsApp Admin</span>
          </button>
        </form>

      </div>
    </div>
  );
}

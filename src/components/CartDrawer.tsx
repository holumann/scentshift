import { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, OrderFormData } from '../types.ts';
import { ADMIN_WA_NUMBER } from '../data/products.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    city: '',
    fullAddress: '',
    courier: 'JNE Reguler',
    paymentMethod: 'Transfer BCA / Mandiri',
    customerNote: ''
  });

  if (!isOpen) return null;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 500000;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 25000;
  const grandTotal = subtotal + shippingCost;

  const handleCheckoutViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      alert('Mohon lengkapi Nama dan Nomor WhatsApp Anda.');
      return;
    }

    const itemLines = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.name}* (${it.product.category.toUpperCase()}) - ${it.quantity}x @ ${formatRupiah(it.product.price)} = ${formatRupiah(it.product.price * it.quantity)}`
      )
      .join('\n');

    const message = `*INVOICE PEMESANAN SCENTSHIFT*\n` +
      `-----------------------------------------\n` +
      `*Nama Pemesan:* ${formData.customerName}\n` +
      `*No. WhatsApp:* ${formData.customerPhone}\n` +
      `*Kota / Kecamatan:* ${formData.city || '-'}\n` +
      `*Alamat Lengkap:* ${formData.fullAddress || '-'}\n` +
      `*Pilihan Ekspedisi:* ${formData.courier}\n` +
      `*Metode Pembayaran:* ${formData.paymentMethod}\n` +
      (formData.customerNote ? `*Catatan Khusus:* ${formData.customerNote}\n` : '') +
      `-----------------------------------------\n` +
      `*DAFTAR PESANAN:*\n${itemLines}\n` +
      `-----------------------------------------\n` +
      `*Subtotal:* ${formatRupiah(subtotal)}\n` +
      `*Ongkos Kirim:* ${isFreeShipping ? 'GRATIS (Promo > 500k)' : formatRupiah(shippingCost)}\n` +
      `*TOTAL PEMBAYARAN:* ${formatRupiah(grandTotal)}\n` +
      `-----------------------------------------\n` +
      `Mohon info ketersediaan stok & nomor rekening untuk pembayaran. Terima kasih ScentShift!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="font-sans font-bold text-base text-stone-900">
              Keranjang Pesanan ({items.reduce((acc, it) => acc + it.quantity, 0)} item)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-amber-700" />
            {isFreeShipping ? 'Selamat! Anda berhak Gratis Ongkir' : `Tambah ${formatRupiah(500000 - subtotal)} lagi untuk Gratis Ongkir!`}
          </span>
          <span className="font-semibold text-amber-700">{isFreeShipping ? 'FREE' : 'Rp 25.000'}</span>
        </div>

        {/* Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 stroke-1" />
              <p className="font-medium text-stone-800">Keranjang belanja Anda masih kosong</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Silakan pilih parfum impian Anda dari katalog dan klik &quot;+ Keranjang&quot;.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Jelajahi Parfum Sekarang
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-stone-50/50 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-stone-500 font-medium truncate">
                        {item.product.brand} · {item.product.bottleSize}
                      </p>
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-700 tabular-nums mt-0.5">
                        {formatRupiah(item.product.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="ml-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form */}
              <form onSubmit={handleCheckoutViaWhatsApp} className="pt-4 border-t border-stone-200 space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Data Pengiriman & Checkout
                </h3>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      No. WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxx"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Kota / Kecamatan
                    </label>
                    <input
                      type="text"
                      placeholder="Jakarta Selatan"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Alamat Lengkap & Kode Pos
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Jl. Senopati No. 12, Kebayoran Baru..."
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Pilihan Ekspedisi
                    </label>
                    <select
                      value={formData.courier}
                      onChange={(e) => setFormData({ ...formData, courier: e.target.value as any })}
                      className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                    >
                      <option value="JNE Reguler">JNE Reguler</option>
                      <option value="J&T Express">J&T Express</option>
                      <option value="SiCepat">SiCepat</option>
                      <option value="GoSend / Grab SameDay">GoSend / Grab SameDay</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Metode Pembayaran
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                    >
                      <option value="Transfer BCA / Mandiri">BCA / Mandiri</option>
                      <option value="QRIS All Payment">QRIS All Payment</option>
                      <option value="COD (Area Jabodetabek)">COD (Jabodetabek)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Minta video batch code botol sebelum dikirim..."
                    value={formData.customerNote}
                    onChange={(e) => setFormData({ ...formData, customerNote: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                {/* Subtotal & Total Box */}
                <div className="p-3.5 bg-stone-100 rounded-xl space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>Subtotal Produk:</span>
                    <span className="font-semibold tabular-nums">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim:</span>
                    <span className="font-semibold tabular-nums">
                      {isFreeShipping ? 'GRATIS' : formatRupiah(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                    <span>Total Pembayaran:</span>
                    <span className="text-amber-700 tabular-nums">{formatRupiah(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Checkout via WA */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Pesanan ke WhatsApp Admin</span>
                </button>

                <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Transaksi aman · Cek foto fisik unit sebelum bayar
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

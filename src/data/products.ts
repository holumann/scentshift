import { Product } from '../types.ts';

// High-resolution generated product assets matching user's exact uploaded perfume photos
import heroImage from '../assets/images/hero_luxury_perfume_1791980286659.jpg';
import turathiBlueImage from '../assets/images/turathi_blue_product_1791982515605.jpg';
import armafMilestoneImage from '../assets/images/armaf_milestone_product_1791982516165.jpg';
import frostIceImage from '../assets/images/frost_ice_ahmed_product_1791982516297.jpg';

export const HERO_ASSET = heroImage;
export const ADMIN_WA_NUMBER = '6285692811350';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'afnan-turathi-blue-90',
    name: 'Afnan - Turathi Blue EDP 90ml',
    brand: 'Afnan Perfumes',
    category: 'preloved',
    price: 330000,
    originalPrice: 490000,
    remainingJuice: 90,
    bottleSize: '90ml',
    concentration: 'EDP',
    notes: {
      top: ['Bergamot', 'Mandarin Orange', 'Grapefruit'],
      middle: ['Aromatic Aquatic', 'Spices', 'Amber'],
      base: ['Musky', 'Patchouli', 'Woody Notes', 'Fresh Spices']
    },
    scentFamily: 'Fresh & Citrus',
    gender: 'Pria',
    batchCode: 'ATB-90-2023 (Verified)',
    boxCondition: 'Fullset Box Original',
    description: 'Parfum inspirasi terbaik Bvlgari Tygar. Membawa karakter citrus grapefruit yang segar, berpadu dengan keharuman aquatic aromatik dan sentuhan musky hangat berkelas. Sisa juice 90% dengan box beludru mewah bawaan.',
    longevity: '8-10 Jam',
    sillage: 'Moderate to Strong',
    image: turathiBlueImage,
    inStock: true,
    rating: 4.9,
    reviewsCount: 68
  },
  {
    id: 'armaf-cdn-milestone-100',
    name: 'Armaf - Club de Nuit Milestone 105ml',
    brand: 'Armaf Fragrances',
    category: 'preloved',
    price: 750000,
    originalPrice: 835000,
    remainingJuice: 99,
    bottleSize: '105ml',
    concentration: 'EDP',
    notes: {
      top: ['Sea Notes', 'Red Fruits (Salted Watermelon Accord)', 'Bergamot'],
      middle: ['Violet', 'White Woods', 'Sandalwood'],
      base: ['Ambroxan', 'Musk', 'Vetiver']
    },
    scentFamily: 'Aquatic',
    gender: 'Unisex',
    batchCode: '384910 - Made in France',
    boxCondition: 'Fullset Box Original',
    description: 'Interpretasi legendaris Creed Millesime Imperial. Memadukan hembusan aroma laut (marine notes) dengan kesegaran buah merah dan nuansa salted watermelon yang unik serta mewah. Kondisi 99% mulus seperti baru beli, hanya tes spray.',
    longevity: '7-9 Jam',
    sillage: 'Strong',
    image: armafMilestoneImage,
    inStock: true,
    rating: 4.9,
    reviewsCount: 45
  },
  {
    id: 'frost-ice-ahmed-100',
    name: 'Frost Ice - Ahmed Al Maghribi Perfumes 100ml',
    brand: 'Ahmed Al Maghribi',
    category: 'preloved',
    price: 200000,
    originalPrice: 290000,
    remainingJuice: 98,
    bottleSize: '100ml',
    concentration: 'EDP',
    notes: {
      top: ['Watermelon', 'Grapefruit', 'Mandarin Orange', 'Spearmint'],
      middle: ['Sea / Marine Notes', 'Eucalyptus', 'Aquatic Accord'],
      base: ['Clean Musk', 'Ambergris', 'Cedarwood']
    },
    scentFamily: 'Fresh & Citrus',
    gender: 'Unisex',
    batchCode: 'FI-AM2024 (CheckFresh Verified)',
    boxCondition: 'Fullset Box Original',
    description: 'Kesegaran es semangka (watermelon) dingin yang berpadu dengan segarnya marine notes, grapefruit, jeruk mandarin dan sentuhan mint sejuk. Sangat cocok untuk cuaca terik di Indonesia. Kondisi 98% terawat di dalam box orisinil.',
    longevity: '6-8 Jam',
    sillage: 'Fresh & Radiating',
    image: frostIceImage,
    inStock: true,
    rating: 4.8,
    reviewsCount: 37
  }
];

export const STORE_REVIEWS = [
  {
    name: 'Rian Pratama',
    role: 'Kolektor Parfum, Jakarta Selatan',
    text: 'Afnan Turathi Blue sampai dengan aman. Sisa juice 90% sesuai deskripsi, box beludrunya masih mulus banget. Batch code juga tembus di CheckFresh. Seller amanah!',
    rating: 5,
    item: 'Afnan Turathi Blue 90ml'
  },
  {
    name: 'Nadia Salsabila',
    role: 'Perfume Enthusiast, Bandung',
    text: 'Armaf Milestone-nya beneran 99% seperti baru! Salted watermelon notes-nya mewah banget mirip Millesime Imperial. Packing bubble wrap tebal dan rapi.',
    rating: 5,
    item: 'Armaf CDN Milestone 105ml'
  },
  {
    name: 'Dimas Wicaksono',
    role: 'Daily Scent User, Surabaya',
    text: 'Ahmed Al Maghribi Frost Ice harga 200rb untuk sisa 98% dapet box asli itu best deal banget. Dingin seger semangka & citrusnya awet seharian.',
    rating: 5,
    item: 'Frost Ice Ahmed Al Maghribi 100ml'
  }
];

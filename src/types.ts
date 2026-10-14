export type ProductCategory = 'new' | 'preloved' | 'decant';
export type ScentFamily = 'Semua' | 'Woody' | 'Fresh & Citrus' | 'Floral' | 'Amber & Oriental' | 'Gourmand' | 'Aquatic' | 'Spicy';
export type GenderTarget = 'Semua' | 'Unisex' | 'Pria' | 'Wanita';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  remainingJuice?: number; // e.g. 85 for 85%
  bottleSize: string; // e.g. "100ml"
  concentration: 'EDP' | 'EDT' | 'Extrait' | 'Parfum';
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  scentFamily: ScentFamily;
  gender: 'Unisex' | 'Pria' | 'Wanita';
  batchCode: string;
  boxCondition: 'Fullset Box Original' | 'Tester Unit (No Box)' | 'Bottle Only' | 'Sealed Brand New';
  description: string;
  longevity: string;
  sillage: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  city: string;
  fullAddress: string;
  courier: 'JNE Reguler' | 'J&T Express' | 'SiCepat' | 'GoSend / Grab SameDay';
  paymentMethod: 'Transfer BCA / Mandiri' | 'QRIS All Payment' | 'COD (Area Jabodetabek)';
  customerNote: string;
}

export interface ConsignmentFormData {
  senderName: string;
  whatsappNumber: string;
  perfumeName: string;
  brand: string;
  remainingJuice: number;
  boxStatus: string;
  batchCode: string;
  expectedPrice: string;
  notes: string;
}

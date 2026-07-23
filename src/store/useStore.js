import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'

export const THEME_PRESETS = [
  {
    id: 'streetwear',
    name: '🔥 Streetwear & Cyber (Supreme / Off-White)',
    desc: 'Тёмный контрастный стиль с яркими акцентами для уличной одежды',
    config: {
      primaryColor: '#ff2a00',
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      cardBg: '#181818',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      telegram: 'reseller_admin'
    }
  },
  {
    id: 'minimalist',
    name: '🖤 Luxury Minimal (Balenciaga / Celine)',
    desc: 'Строгий минимализм, монохром и элегантная типографика',
    config: {
      primaryColor: '#ffffff',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      cardBg: '#111111',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      telegram: 'luxe_reseller'
    }
  },
  {
    id: 'apple_clean',
    name: '🍏 Apple Clean & Glass (Светлый премиум)',
    desc: 'Светлый чистый интерфейс с эффектом стекла и мягкими тенями',
    config: {
      primaryColor: '#0066ff',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'clean_reseller'
    }
  },
  {
    id: 'y2k_vintage',
    name: '📼 Y2K & Vintage Retro (Stussy / Evisu)',
    desc: 'Ретро-эстетика 2000-х, дерзкие акценты и гранжевые элементы',
    config: {
      primaryColor: '#e11d48',
      backgroundColor: '#18181b',
      textColor: '#f4f4f5',
      cardBg: '#27272a',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'retro_reseller'
    }
  },
  {
    id: 'pastel_fashion',
    name: '🌸 Pastel K-Fashion (Gentle Monster)',
    desc: 'Нежная пастельная палитра для трендовой азиатской одежды и косметики',
    config: {
      primaryColor: '#db2777',
      backgroundColor: '#faf5ff',
      textColor: '#2e1065',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'kfashion_store'
    }
  }
]

const DEFAULT_BLOCKS = [
  { id: 'b-banner', type: 'banner', title: 'Эксклюзивная коллекция 2026', subtitle: 'Оригинальные бренды с гарантией качества', imageUrl: '' },
  { id: 'b-categories', type: 'categories', title: 'Категории' },
  { id: 'b-products', type: 'products', title: 'Все товары' },
  { id: 'b-promo', type: 'promo', title: '🔥 Скидки при заказе от 2-х позиций', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80', buttonText: 'Выбрать товары' },
  { id: 'b-contact', type: 'contact', title: 'Есть вопросы по размеру или наличию?', subtitle: 'Напишите нам прямо в Telegram — ответим за 2 минуты!' }
]

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    user_id: 'user-demo',
    name: 'Urban Streetwear Co.',
    slug: 'urban-vibes',
    description: 'Эксклюзивные дропы уличной одежды и лимитированных кроссовок.',
    blocks: DEFAULT_BLOCKS,
    theme_config: THEME_PRESETS[0].config
  },
  {
    id: 'shop-2',
    user_id: 'user-demo',
    name: 'Luxe Minimal Apparel',
    slug: 'luxe-store',
    description: 'Премиальный минималистичный гардероб и качественные аксессуары.',
    blocks: DEFAULT_BLOCKS,
    theme_config: THEME_PRESETS[1].config
  }
]

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    shop_id: 'shop-1',
    title: 'Oversized Acid-Wash Hoodie',
    price: 4900,
    size: 'S, M, L, XL',
    category: 'Одежда',
    brand: 'Supreme',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-2',
    shop_id: 'shop-1',
    title: 'Retro High-Top Sneakers (Edition 01)',
    price: 12500,
    size: '41, 42, 43, 44',
    category: 'Обувь',
    brand: 'Nike',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-3',
    shop_id: 'shop-1',
    title: 'Minimalist Cargo Pants - Matte Black',
    price: 6800,
    size: 'M, L',
    category: 'Одежда',
    brand: 'Stone Island',
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-4',
    shop_id: 'shop-1',
    title: 'Cyberpunk Graphics Heavy Tee',
    price: 3200,
    size: 'S, M, L',
    category: 'Одежда',
    brand: 'Palace',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-5',
    shop_id: 'shop-2',
    title: 'Cashmere Blend Minimalist Coat',
    price: 24000,
    size: 'S, M',
    category: 'Одежда',
    brand: 'Acne Studios',
    image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-6',
    shop_id: 'shop-2',
    title: 'Italian Leather Everyday Tote',
    price: 18500,
    size: 'One Size',
    category: 'Аксессуары',
    brand: 'Bottega Veneta',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    is_available: true
  }
]

export const useStore = create((set, get) => ({
  shops: (() => {
    const saved = localStorage.getItem('creatiwise_shops')
    return saved ? JSON.parse(saved) : INITIAL_SHOPS
  })(),
  products: (() => {
    const saved = localStorage.getItem('creatiwise_products')
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS
  })(),
  activeShopId: 'shop-1',

  persist: () => {
    const { shops, products } = get()
    localStorage.setItem('creatiwise_shops', JSON.stringify(shops))
    localStorage.setItem('creatiwise_products', JSON.stringify(products))
  },

  setActiveShopId: (id) => set({ activeShopId: id }),

  fetchData: async () => {
    if (!isConfigured) return
    try {
      const { data: shops } = await supabase.from('shops').select('*')
      const { data: products } = await supabase.from('products').select('*')
      if (shops && shops.length > 0) set({ shops })
      if (products && products.length > 0) set({ products })
    } catch (e) {
      console.warn('Supabase fetch fallback', e)
    }
  },

  // Shop CRUD & Preset Applier
  createShop: async (newShop) => {
    const formattedSlug = (newShop.slug || newShop.name.toLowerCase())
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')

    const shopWithId = {
      id: 'shop-' + Date.now(),
      user_id: 'user-' + Date.now(),
      created_at: new Date().toISOString(),
      name: newShop.name,
      slug: formattedSlug,
      description: newShop.description || 'Кастомный конструктор интернет-витрины',
      blocks: DEFAULT_BLOCKS,
      theme_config: THEME_PRESETS[0].config
    }

    set((state) => ({
      shops: [shopWithId, ...state.shops],
      activeShopId: shopWithId.id
    }))
    get().persist()
    return shopWithId
  },

  updateShop: async (id, updates) => {
    set((state) => ({
      shops: state.shops.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }))
    get().persist()
  },

  applyPresetToShop: (shopId, presetId) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    const shop = get().shops.find((s) => s.id === shopId)
    if (!shop) return

    get().updateShop(shopId, {
      theme_config: {
        ...shop.theme_config,
        ...preset.config
      }
    })
  },

  // Block Builder Actions (Add, Delete, Move, Update Block)
  updateShopBlocks: (shopId, blocks) => {
    get().updateShop(shopId, { blocks })
  },

  // Product actions
  addProduct: async (newProduct) => {
    const productWithId = {
      id: 'prod-' + Date.now(),
      is_available: true,
      category: newProduct.category || 'Общее',
      brand: newProduct.brand || 'Без бренда',
      ...newProduct
    }
    set((state) => ({ products: [productWithId, ...state.products] }))
    get().persist()
  },

  updateProduct: async (id, updates) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }))
    get().persist()
  },

  deleteProduct: async (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }))
    get().persist()
  },

  resetDemoData: () => {
    localStorage.removeItem('creatiwise_shops')
    localStorage.removeItem('creatiwise_products')
    set({ shops: INITIAL_SHOPS, products: INITIAL_PRODUCTS, activeShopId: 'shop-1' })
  }
}))

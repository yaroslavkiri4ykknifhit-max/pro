import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'

export const THEME_PRESETS = [
  {
    id: 'streetwear',
    name: '🔥 Streetwear & Cyber (Supreme / Off-White)',
    desc: 'Тёмный уличный стиль с контрастными яркими акцентами и спортивной обувью',
    previewImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#ff2a00',
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      cardBg: '#181818',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      telegram: 'reseller_supreme'
    },
    sampleBlocks: [
      { id: 'b-banner', type: 'banner', title: 'SUPREME & OFF-WHITE DROP 2026', subtitle: 'Оригинальный streetwear с гарантией подлинности', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80' },
      { id: 'b-categories', type: 'categories' },
      { id: 'b-products', type: 'products' },
      { id: 'b-promo', type: 'promo', title: '🔥 Лимитированные кроссовки в наличии', subtitle: 'Быстрая доставка по всему миру', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80' },
      { id: 'b-contact', type: 'contact', title: 'Связаться с менеджером Supreme', subtitle: 'Ответим за 2 минуты в Telegram' }
    ],
    sampleProducts: [
      { title: 'Supreme Box Logo Hoodie - Red/White', price: 28500, size: 'M, L, XL', category: 'Одежда', brand: 'Supreme', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Off-White "Out Of Office" Sneakers', price: 42000, size: '41, 42, 43, 44', category: 'Обувь', brand: 'Off-White', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Nike Air Jordan 1 High x Travis Scott', price: 89000, size: '42, 43', category: 'Обувь', brand: 'Nike', image_url: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Off-White Industrial Yellow Belt', price: 14500, size: '200 cm', category: 'Аксессуары', brand: 'Off-White', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'minimalist',
    name: '🖤 Luxury Minimal (Balenciaga / Celine)',
    desc: 'Строгий люксовый монохром, высокая мода и премиальный стиль',
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#ffffff',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      cardBg: '#111111',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      telegram: 'balenciaga_luxe'
    },
    sampleBlocks: [
      { id: 'b-banner', type: 'banner', title: 'BALENCIAGA & CELINE LUXURY', subtitle: 'Премиальная коллекция высокой моды', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80' },
      { id: 'b-categories', type: 'categories' },
      { id: 'b-products', type: 'products' },
      { id: 'b-promo', type: 'promo', title: 'Кожаные аксессуары премиум-сегмента', subtitle: 'Доставка курьером в день заказа', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80' },
      { id: 'b-contact', type: 'contact', title: 'Персональный клиентский сервис', subtitle: 'Консультация стилиста в Telegram' }
    ],
    sampleProducts: [
      { title: 'Balenciaga Triple S Black Edition', price: 65000, size: '39, 40, 41, 42, 43', category: 'Обувь', brand: 'Balenciaga', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Celine Oversized Biker Leather Jacket', price: 195000, size: '48, 50', category: 'Одежда', brand: 'Celine', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Balenciaga Hourglass Leather Bag', price: 140000, size: 'One Size', category: 'Аксессуары', brand: 'Balenciaga', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Celine Black Frame Acetate Sunglasses', price: 32000, size: 'Standard', category: 'Аксессуары', brand: 'Celine', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'apple_clean',
    name: '🍏 Apple Clean & Glass (Минимализм & Гаджеты)',
    desc: 'Премиальный светлый интерфейс с эффектом матового стекла',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#0066ff',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'apple_reseller'
    },
    sampleBlocks: [
      { id: 'b-banner', type: 'banner', title: 'ОРИГИНАЛЬНАЯ ТЕХНИКА APPLE', subtitle: 'Официальная гарантия 1 год. Новые запечатанные устройства', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80' },
      { id: 'b-categories', type: 'categories' },
      { id: 'b-products', type: 'products' },
      { id: 'b-promo', type: 'promo', title: 'Оригинальные аксессуары MagSafe', subtitle: 'Чехлы, кошельки и быстрые зарядные устройства', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80' },
      { id: 'b-contact', type: 'contact', title: 'Быстрый заказ устройств', subtitle: 'Уточнить наличие нужной модели в Telegram' }
    ],
    sampleProducts: [
      { title: 'Apple Watch Ultra 2 Titanium Case', price: 79900, size: '49mm', category: 'Электроника', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'AirPods Max Wireless Headphones Silver', price: 54900, size: 'Standard', category: 'Электроника', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'iPhone 16 Pro Max 256GB Natural Titanium', price: 139000, size: '256GB', category: 'Электроника', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Leather MagSafe Wallet Black Edition', price: 6900, size: 'Universal', category: 'Аксессуары', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'y2k_vintage',
    name: '📼 Y2K & Vintage Retro (Evisu / Stussy)',
    desc: 'Ретро-деним 2000-х, японская вышивка и уличный винтаж',
    previewImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#e11d48',
      backgroundColor: '#18181b',
      textColor: '#f4f4f5',
      cardBg: '#27272a',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'evisu_vintage'
    },
    sampleBlocks: [
      { id: 'b-banner', type: 'banner', title: 'EVISU & STUSSY ARCHIVE 2000s', subtitle: 'Винтажный японский деним и винтажные куртки', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80' },
      { id: 'b-categories', type: 'categories' },
      { id: 'b-products', type: 'products' },
      { id: 'b-promo', type: 'promo', title: 'Японский деним ручной вышивки', subtitle: 'Редкие архивные релизы', imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80' },
      { id: 'b-contact', type: 'contact', title: 'Заказ винтажных позиций', subtitle: 'Пишите в Telegram' }
    ],
    sampleProducts: [
      { title: 'Evisu Seagull Embroidered Denim Jeans', price: 34000, size: '32, 34, 36', category: 'Одежда', brand: 'Evisu', image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Stussy World Tour Zip-Up Hoodie', price: 16500, size: 'M, L, XL', category: 'Одежда', brand: 'Stussy', image_url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Vintage Carhartt Detroit Duck Jacket', price: 22000, size: 'L', category: 'Одежда', brand: 'Carhartt', image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Stussy Stock Logo Bucket Hat', price: 6200, size: 'L/XL', category: 'Аксессуары', brand: 'Stussy', image_url: 'https://images.unsplash.com/photo-1534215754734-18e534b37287?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'pastel_fashion',
    name: '🌸 Pastel K-Fashion (Gentle Monster)',
    desc: 'Трендовая пастельная эстетика корейской моды и дизайнерской оптики',
    previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#db2777',
      backgroundColor: '#faf5ff',
      textColor: '#2e1065',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      telegram: 'korea_fashion'
    },
    sampleBlocks: [
      { id: 'b-banner', type: 'banner', title: 'GENTLE MONSTER & K-FASHION', subtitle: 'Дизайнерские очки и трендовая одежда из Сеула', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' },
      { id: 'b-categories', type: 'categories' },
      { id: 'b-products', type: 'products' },
      { id: 'b-promo', type: 'promo', title: 'Коллекция солнцезащитных очков 2026', subtitle: 'Оригиналы из Сеула с футляром', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80' },
      { id: 'b-contact', type: 'contact', title: 'Заказ корейских брендов', subtitle: 'Подбор размера и цвета в Telegram' }
    ],
    sampleProducts: [
      { title: 'Gentle Monster "Her" Oversized Sunglasses', price: 29500, size: 'Standard', category: 'Аксессуары', brand: 'Gentle Monster', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Korean Chunky Oversized Knit Sweater', price: 8900, size: 'Free Size', category: 'Одежда', brand: 'K-Brand', image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80', is_available: true },
      { title: 'Gentle Monster "Rick" Clear Optical Glasses', price: 26000, size: 'Standard', category: 'Аксессуары', brand: 'Gentle Monster', image_url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  }
]

const DEFAULT_BLOCKS = THEME_PRESETS[0].sampleBlocks

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    user_id: 'user-demo',
    name: 'Urban Streetwear Co.',
    slug: 'urban-vibes',
    description: 'Эксклюзивные дропы уличной одежды и лимитированных кроссовок.',
    blocks: THEME_PRESETS[0].sampleBlocks,
    theme_config: THEME_PRESETS[0].config
  },
  {
    id: 'shop-2',
    user_id: 'user-demo',
    name: 'Luxe Minimal Apparel',
    slug: 'luxe-store',
    description: 'Премиальный минималистичный гардероб и качественные аксессуары.',
    blocks: THEME_PRESETS[1].sampleBlocks,
    theme_config: THEME_PRESETS[1].config
  }
]

const INITIAL_PRODUCTS = [
  // Shop 1 products
  ...THEME_PRESETS[0].sampleProducts.map((p, idx) => ({ ...p, id: 'prod-s1-' + idx, shop_id: 'shop-1' })),
  // Shop 2 products
  ...THEME_PRESETS[1].sampleProducts.map((p, idx) => ({ ...p, id: 'prod-s2-' + idx, shop_id: 'shop-2' }))
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

  createShop: async (newShop) => {
    const formattedSlug = (newShop.slug || newShop.name.toLowerCase())
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')

    const defaultPreset = THEME_PRESETS[0]
    const shopId = 'shop-' + Date.now()

    const shopWithId = {
      id: shopId,
      user_id: 'user-' + Date.now(),
      created_at: new Date().toISOString(),
      name: newShop.name,
      slug: formattedSlug,
      description: newShop.description || 'Кастомный конструктор интернет-витрины',
      blocks: defaultPreset.sampleBlocks,
      theme_config: {
        ...defaultPreset.config,
        telegram: newShop.telegram || 'seller_admin'
      }
    }

    // Auto add sample products matching default preset
    const newProducts = defaultPreset.sampleProducts.map((p, idx) => ({
      ...p,
      id: 'prod-' + Date.now() + '-' + idx,
      shop_id: shopId
    }))

    set((state) => ({
      shops: [shopWithId, ...state.shops],
      products: [...newProducts, ...state.products],
      activeShopId: shopId
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

  // APPLY PRESET: REPLACES COLORS, BLOCKS, AND POPULATES AUTHENTIC BRAND PRODUCTS
  applyPresetToShop: (shopId, presetId) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    const shop = get().shops.find((s) => s.id === shopId)
    if (!shop) return

    // 1. Prepare new sample products for this shop
    const newBrandProducts = preset.sampleProducts.map((p, idx) => ({
      ...p,
      id: 'prod-' + Date.now() + '-' + idx,
      shop_id: shopId
    }))

    // 2. Remove old products for this shop and add new brand products
    const otherProducts = get().products.filter((p) => p.shop_id !== shopId)

    // 3. Update shop theme & blocks
    set((state) => ({
      products: [...newBrandProducts, ...otherProducts],
      shops: state.shops.map((s) =>
        s.id === shopId
          ? {
              ...s,
              blocks: preset.sampleBlocks,
              theme_config: {
                ...s.theme_config,
                ...preset.config
              }
            }
          : s
      )
    }))

    get().persist()
  },

  updateShopBlocks: (shopId, blocks) => {
    get().updateShop(shopId, { blocks })
  },

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

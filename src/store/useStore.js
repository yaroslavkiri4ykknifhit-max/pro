import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'
import { THEME_LIBRARY, THEMES_REGISTRY } from '../themes/index.jsx'

export const TILDA_BLOCK_LIBRARY = [
  {
    category: 'Hero',
    name: '🖼️ Hero (Обложки)',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      name: `Hero Вариант #${i + 1}`,
      desc: i === 0 ? 'Balenciaga High Fashion Hero' : i === 1 ? 'Poizon Cyber Sneaker Hero' : i === 2 ? 'Zara Editorial Tall Hero' : `Дизайнерская обложка #${i + 1}`,
      type: 'hero',
      defaultProps: {
        title: 'НОВАЯ КОЛЛЕКЦИЯ 2026',
        subtitle: 'Эксклюзивная подборка брендов в наличии',
        imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
        height: 'medium',
        buttonText: 'Смотреть каталог'
      }
    }))
  },

  {
    category: 'Catalog',
    name: '📦 Каталог и Карточки',
    count: 20,
    items: Array.from({ length: 20 }, (_, i) => ({
      variant: i + 1,
      name: `Catalog Сетка #${i + 1}`,
      desc: i === 0 ? 'Balenciaga (2 колонки + сердечки)' : i === 1 ? 'Poizon Cyber (4 колонки + скидки)' : i === 2 ? 'Zara Editorial Portrait' : `Карточки каталога #${i + 1}`,
      type: 'products',
      defaultProps: {
        title: 'Каталог товаров',
        columns: i === 1 ? 4 : 2,
        cardStyle: i === 0 ? 'underbuy' : i === 1 ? 'poizon' : i === 2 ? 'zara' : 'modern',
        showHeartIcon: true,
        showBrandBadge: true
      }
    }))
  },

  {
    category: 'CTA',
    name: '💬 Призыв к действию (CTA)',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      name: `CTA Вариант #${i + 1}`,
      desc: `Блок прямого заказа в Telegram #${i + 1}`,
      type: 'contact',
      defaultProps: {
        title: 'Есть вопросы по размеру или наличию?',
        subtitle: 'Менеджер в Telegram ответит вам за 2 минуты!',
        buttonText: 'Написать в Telegram'
      }
    }))
  }
]

const INITIAL_SHOPS = [
  {
    id: 'shop-balenciaga',
    name: 'Balenciaga Resell Store',
    slug: 'balenciaga-type',
    description: 'Элитный ресейл брендовой одежды высокой моды.',
    blocks: THEMES_REGISTRY.balenciaga.defaultBlocks,
    theme_config: THEMES_REGISTRY.balenciaga.tokens
  },
  {
    id: 'shop-poizon',
    name: 'Poizon Cyber Store',
    slug: 'poizon-street',
    description: 'Лимитированные релизы кроссовок с гарантией подлинности POIZON.',
    blocks: THEMES_REGISTRY.poizon.defaultBlocks,
    theme_config: THEMES_REGISTRY.poizon.tokens
  },
  {
    id: 'shop-zara',
    name: 'Zara Editorial Store',
    slug: 'zara-editorial',
    description: 'Редакционная эстетика фэшн-журнала и чистые силуэты.',
    blocks: THEMES_REGISTRY.zara.defaultBlocks,
    theme_config: THEMES_REGISTRY.zara.tokens
  }
]

const INITIAL_PRODUCTS = [
  { id: 'prod-b-1', shop_id: 'shop-balenciaga', title: 'BALENCIAGA TRIPLE S BLACK EDITION', price: 65000, oldPrice: 78000, size: '42, 43', category: 'ОБУВЬ', brand: 'BALENCIAGA', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-b-2', shop_id: 'shop-balenciaga', title: 'ENFANTS RICHES DEPRIMES RECORDS TOTE BAG', price: 6500, oldPrice: 8900, size: 'One Size', category: 'СУМКИ', brand: 'ENFANTS RICHES DEPRIMES', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-p-1', shop_id: 'shop-poizon', title: 'Nike Air Jordan 1 High OG', price: 24500, oldPrice: 28000, size: '41, 42, 43', category: 'ОБУВЬ', brand: 'NIKE', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-z-1', shop_id: 'shop-zara', title: 'Oversized Double Breasted Coat', price: 18900, oldPrice: 22000, size: 'M, L', category: 'ОДЕЖДА', brand: 'ZARA', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', is_available: true }
]

export const useStore = create((set, get) => ({
  shops: (() => {
    const saved = localStorage.getItem('creatiwise_shops_v3')
    return saved ? JSON.parse(saved) : INITIAL_SHOPS
  })(),
  products: (() => {
    const saved = localStorage.getItem('creatiwise_products_v3')
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS
  })(),
  activeShopId: 'shop-balenciaga',

  persist: () => {
    const { shops, products } = get()
    localStorage.setItem('creatiwise_shops_v3', JSON.stringify(shops))
    localStorage.setItem('creatiwise_products_v3', JSON.stringify(products))
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
      console.warn('Supabase fallback', e)
    }
  },

  createShop: async (newShop) => {
    const formattedSlug = (newShop.slug || newShop.name.toLowerCase())
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')

    const defaultPreset = THEME_LIBRARY[0]
    const themePkg = THEMES_REGISTRY[defaultPreset.id]
    const shopId = 'shop-' + Date.now()

    const shopWithId = {
      id: shopId,
      user_id: 'user-' + Date.now(),
      created_at: new Date().toISOString(),
      name: newShop.name,
      slug: formattedSlug,
      description: newShop.description || 'Кастомная витрина',
      blocks: themePkg.defaultBlocks,
      theme_config: {
        ...themePkg.tokens,
        logoText: newShop.name,
        telegram: newShop.telegram || 'reseller_admin'
      }
    }

    set((state) => ({
      shops: [shopWithId, ...state.shops],
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

  // APPLY FULL THEME PRESET (rebuilds entire blocks structure & tokens to theme's dedicated component set)
  applyPresetToShop: (shopId, presetId) => {
    const themePkg = THEMES_REGISTRY[presetId]
    if (!themePkg) return

    set((state) => ({
      shops: state.shops.map((s) =>
        s.id === shopId
          ? {
              ...s,
              blocks: JSON.parse(JSON.stringify(themePkg.defaultBlocks)),
              theme_config: JSON.parse(JSON.stringify(themePkg.tokens))
            }
          : s
      )
    }))
    get().persist()
  },

  updateDesignTokens: (shopId, tokenUpdates) => {
    set((state) => ({
      shops: state.shops.map((s) => {
        if (s.id !== shopId) return s
        const currentTheme = s.theme_config || {}
        return {
          ...s,
          theme_config: {
            ...currentTheme,
            colors: { ...(currentTheme.colors || {}), ...(tokenUpdates.colors || {}) },
            typography: { ...(currentTheme.typography || {}), ...(tokenUpdates.typography || {}) },
            styles: { ...(currentTheme.styles || {}), ...(tokenUpdates.styles || {}) }
          }
        }
      })
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
      category: newProduct.category || 'СУМКИ',
      brand: newProduct.brand || 'БРЕНД',
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
  }
}))

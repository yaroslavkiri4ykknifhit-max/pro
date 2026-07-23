import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'
import { THEME_LIBRARY } from '../themes/index.js'

// TILDA-LIKE BLOCK CATEGORIES LIBRARY WITH RICH VARIANTS (15 Hero, 12 Catalog, 15 Banner, 10 Footer, 12 Reviews, 8 Gallery, 15 CTA, 8 FAQ)
export const TILDA_BLOCK_LIBRARY = [
  {
    category: 'Hero',
    name: '🖼️ Hero (Обложки)',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      name: `Hero Вариант #${i + 1}`,
      desc: i === 0 ? 'Минималистичный центр' : i === 1 ? 'Сплит с картинкой справа' : i === 2 ? 'Editorial во весь экран' : `Дизайнерская обложка #${i + 1}`,
      type: 'hero',
      defaultProps: {
        title: 'НОВАЯ КОЛЛЕКЦИЯ 2026',
        subtitle: 'Эксклюзивная подборка брендов в наличии',
        imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
        height: 'medium',
        textAlignment: i % 2 === 0 ? 'center' : 'left',
        buttonText: 'Смотреть каталог'
      }
    }))
  },

  {
    category: 'Catalog',
    name: '📦 Каталог и Карточки',
    count: 12,
    items: Array.from({ length: 12 }, (_, i) => ({
      variant: i + 1,
      name: `Catalog Сетка #${i + 1}`,
      desc: i === 0 ? 'Underbuy (2 колонки + сердечки)' : i === 1 ? 'Poizon Cyber Drop' : i === 2 ? 'Zara Tall Editorial' : `Карточки каталога #${i + 1}`,
      type: 'products',
      defaultProps: {
        title: 'Каталог товаров',
        columns: i === 0 || i === 2 ? 2 : i === 1 ? 2 : 3,
        cardStyle: i === 0 ? 'underbuy' : i === 1 ? 'poizon' : i === 2 ? 'zara' : 'modern',
        showHeartIcon: true,
        showBrandBadge: true
      }
    }))
  },

  {
    category: 'Banner',
    name: '📸 Промо Баннеры',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      name: `Banner Вариант #${i + 1}`,
      desc: `Акционный баннер #${i + 1}`,
      type: 'promo',
      defaultProps: {
        title: '🔥 Спецпредложение недели',
        subtitle: 'Скидка до 15% при заказе от двух вещей',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
        buttonText: 'Выбрать'
      }
    }))
  },

  {
    category: 'Reviews',
    name: '⭐ Отзывы и Репутация',
    count: 12,
    items: Array.from({ length: 12 }, (_, i) => ({
      variant: i + 1,
      name: `Reviews Вариант #${i + 1}`,
      desc: `Отзывы покупателей #${i + 1}`,
      type: 'reviews',
      defaultProps: {
        title: 'Отзывы наших покупателей',
        text: 'Заказывал Balenciaga Triple S, всё пришло за 4 дня! Состояние идеально, оригинальность подтверждена.',
        author: 'Александр К., Москва'
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
      desc: `Блок прямого заказа #${i + 1}`,
      type: 'contact',
      defaultProps: {
        title: 'Есть вопросы по размеру или наличию?',
        subtitle: 'Менеджер в Telegram ответит вам за 2 минуты!',
        buttonText: 'Написать в Telegram'
      }
    }))
  },

  {
    category: 'Footer',
    name: '🔻 Подвал (Footer)',
    count: 10,
    items: Array.from({ length: 10 }, (_, i) => ({
      variant: i + 1,
      name: `Footer Вариант #${i + 1}`,
      desc: `Подвал сайта #${i + 1}`,
      type: 'footer',
      defaultProps: {
        copyright: '© 2026. Все права защищены.'
      }
    }))
  }
]

const INITIAL_SHOPS = [
  {
    id: 'shop-underbuy',
    name: 'Underbuy Resell Store',
    slug: 'under-buy',
    description: 'Элитный ресейл брендовой одежды и аксессуаров.',
    blocks: THEME_LIBRARY[0].blocksJson,
    theme_config: THEME_LIBRARY[0].themeJson
  },
  {
    id: 'shop-poizon',
    name: 'Poizon Cyber Store',
    slug: 'poizon-drop',
    description: 'Лимитированные релизы кроссовок с гарантией подлинности.',
    blocks: THEME_LIBRARY[1].blocksJson,
    theme_config: THEME_LIBRARY[1].themeJson
  }
]

const INITIAL_PRODUCTS = [
  { id: 'prod-ub-1', shop_id: 'shop-underbuy', title: 'ENFANTS RICHES DEPRIMES RECORDS TOTE BAG', price: 6500, oldPrice: 8900, size: 'One Size', category: 'СУМКИ', brand: 'ENFANTS RICHES DEPRIMES', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-ub-2', shop_id: 'shop-underbuy', title: 'Y-3 LOGO SHOULDER BAG', price: 12500, oldPrice: 15000, size: 'One Size', category: 'СУМКИ', brand: 'Y-3', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-ub-3', shop_id: 'shop-underbuy', title: 'BALENCIAGA TRIPLE S BLACK EDITION', price: 65000, oldPrice: 78000, size: '42, 43', category: 'ОБУВЬ', brand: 'BALENCIAGA', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-p1', shop_id: 'shop-poizon', title: 'Nike Air Jordan 1 High OG', price: 24500, oldPrice: 28000, size: '41, 42, 43', category: 'ОБУВЬ', brand: 'NIKE', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', is_available: true }
]

export const useStore = create((set, get) => ({
  shops: (() => {
    const saved = localStorage.getItem('creatiwise_shops_v2')
    return saved ? JSON.parse(saved) : INITIAL_SHOPS
  })(),
  products: (() => {
    const saved = localStorage.getItem('creatiwise_products_v2')
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS
  })(),
  activeShopId: 'shop-underbuy',

  persist: () => {
    const { shops, products } = get()
    localStorage.setItem('creatiwise_shops_v2', JSON.stringify(shops))
    localStorage.setItem('creatiwise_products_v2', JSON.stringify(products))
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
    const shopId = 'shop-' + Date.now()

    const shopWithId = {
      id: shopId,
      user_id: 'user-' + Date.now(),
      created_at: new Date().toISOString(),
      name: newShop.name,
      slug: formattedSlug,
      description: newShop.description || 'Кастомная витрина',
      blocks: defaultPreset.blocksJson,
      theme_config: {
        ...defaultPreset.themeJson,
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

  // APPLY FULL THEME PRESET (loads theme.json, layout.json, blocks.json)
  applyPresetToShop: (shopId, presetId) => {
    const preset = THEME_LIBRARY.find((p) => p.id === presetId)
    if (!preset) return

    set((state) => ({
      shops: state.shops.map((s) =>
        s.id === shopId
          ? {
              ...s,
              blocks: JSON.parse(JSON.stringify(preset.blocksJson)),
              theme_config: JSON.parse(JSON.stringify(preset.themeJson))
            }
          : s
      )
    }))
    get().persist()
  },

  // DESIGN PANEL TOKEN UPDATER (Colors, Fonts, Radii, Shadows, Container Width)
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

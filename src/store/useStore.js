import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'

export const BLOCK_LIBRARY = [
  {
    type: 'banner',
    name: '🖼️ Герой-Обложка / Баннер',
    desc: 'Главный баннер с фоновым изображением, заголовком и кнопкой',
    defaultProps: {
      title: 'НОВАЯ КОЛЛЕКЦИЯ 2026',
      subtitle: 'Эксклюзивные брендовые товары с доставкой',
      imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Смотреть каталог',
      height: 'medium', // 'small' | 'medium' | 'large'
      textAlignment: 'center', // 'left' | 'center'
      overlayOpacity: 50
    }
  },
  {
    type: 'categories',
    name: '🏷️ Блок Фильтров и Поиска',
    desc: 'Чипсы категорий, фильтр брендов и поисковая строка',
    defaultProps: {
      showSearch: true,
      showCategories: true,
      showBrands: true,
      chipStyle: 'pill' // 'pill' | 'rounded' | 'sharp'
    }
  },
  {
    type: 'products',
    name: '📦 Каталог и Сетка Товаров',
    desc: 'Основной каталог товаров с гибкой настройкой колонок и карточек',
    defaultProps: {
      title: 'Все товары',
      columns: 3, // 2 | 3 | 4
      cardStyle: 'modern', // 'modern' | 'minimal' | 'glass' | 'border'
      borderRadius: '2xl', // 'none' | 'xl' | '2xl' | '3xl' | 'full'
      showBrandBadge: true,
      showPriceButton: true
    }
  },
  {
    type: 'promo',
    name: '📸 Промо-Карточка / Спецпредложение',
    desc: 'Широкая акционная карточка с картинкой и кнопкой',
    defaultProps: {
      title: '🔥 Скидка 10% при заказе от 2-х вещей',
      subtitle: 'Успейте оформить заказ через менеджер в Telegram',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
      buttonText: 'Выбрать в каталоге'
    }
  },
  {
    type: 'text_note',
    name: '📝 Текстовый Блок / Манифест Бренда',
    desc: 'Заметка, описание условий доставки или цитата продавца',
    defaultProps: {
      title: 'О нашей витрине',
      text: 'Мы поставляем только 100% оригинальную продукцию напрямую от проверенных дистрибьюторов. Все вещи проходят строгую проверку подлинности перед отправкой.',
      fontStyle: 'normal' // 'normal' | 'italic' | 'handwriting'
    }
  },
  {
    type: 'contact',
    name: '💬 Блок Заказа в Telegram',
    desc: 'Большая призывающая кнопка связи с Telegram-продавцом',
    defaultProps: {
      title: 'Остались вопросы по размеру или наличию?',
      subtitle: 'Напишите продавцу прямо в Telegram — ответим за 2 минуты!',
      buttonText: 'Написать в Telegram'
    }
  }
]

export const LAYOUT_PRESETS = [
  {
    id: 'streetwear',
    name: '🔥 Streetwear Cyber (Supreme / Off-White)',
    desc: 'Тёмный сплит-стиль, крупная сетка товаров (2 колонки), оранжевые акценты',
    config: {
      primaryColor: '#ff2a00',
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      cardBg: '#181818',
      font: 'Inter',
      borderRadius: '2xl'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'SUPREME & OFF-WHITE DROP', subtitle: 'Оригинальный streetwear в наличии', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center', overlayOpacity: 50 },
      { id: 'b-2', type: 'categories', showSearch: true, showCategories: true, showBrands: true, chipStyle: 'pill' },
      { id: 'b-3', type: 'products', title: 'Релиз недели', columns: 2, cardStyle: 'modern', borderRadius: '2xl', showBrandBadge: true, showPriceButton: true },
      { id: 'b-4', type: 'promo', title: '🔥 Спецпредложение на кроссовки', subtitle: 'Ограниченное количество размеров', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', buttonText: 'Выбрать' },
      { id: 'b-5', type: 'contact', title: 'Заказ напрямую в Telegram', subtitle: 'Менеджер ответит моментально' }
    ]
  },
  {
    id: 'minimalist',
    name: '🖤 Luxury Minimal (Balenciaga / Celine)',
    desc: 'Строгий монохромный дизайн, острые углы, высокая плотность сетки (3 колонки)',
    config: {
      primaryColor: '#ffffff',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      cardBg: '#111111',
      font: 'Inter',
      borderRadius: 'none'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'BALENCIAGA ARCHIVE', subtitle: 'Люксовая коллекция высокой моды', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', height: 'small', textAlignment: 'left', overlayOpacity: 40 },
      { id: 'b-2', type: 'categories', showSearch: true, showCategories: true, showBrands: true, chipStyle: 'sharp' },
      { id: 'b-3', type: 'products', title: 'Каталог', columns: 3, cardStyle: 'border', borderRadius: 'none', showBrandBadge: true, showPriceButton: true },
      { id: 'b-4', type: 'contact', title: 'Клиентский сервис Balenciaga', subtitle: 'Консультация стилиста в Telegram' }
    ]
  },
  {
    id: 'apple_clean',
    name: '🍏 Apple Clean & Glass (Светлый Элегантный)',
    desc: 'Светлый минималистичный интерфейс, карточки с размытым фоном, 3 колонки',
    config: {
      primaryColor: '#0066ff',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      borderRadius: '3xl'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'Оригинальные устройства и аксессуары', subtitle: 'Светлый чистый каталог премиум-уровня', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center', overlayOpacity: 30 },
      { id: 'b-2', type: 'categories', showSearch: true, showCategories: true, showBrands: true, chipStyle: 'rounded' },
      { id: 'b-3', type: 'products', title: 'Каталог устройств', columns: 3, cardStyle: 'glass', borderRadius: '3xl', showBrandBadge: true, showPriceButton: true },
      { id: 'b-4', type: 'contact', title: 'Задать вопрос в Telegram', subtitle: 'Быстрая консультация по моделям' }
    ]
  },
  {
    id: 'y2k_vintage',
    name: '📼 Y2K & Vintage Retro (Stussy / Evisu)',
    desc: 'Винтажные карточки, ретро-рамки, рукописные подписи',
    config: {
      primaryColor: '#e11d48',
      backgroundColor: '#18181b',
      textColor: '#f4f4f5',
      cardBg: '#27272a',
      font: 'Inter',
      borderRadius: 'xl'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'EVISU & STUSSY ARCHIVE 2000s', subtitle: 'Архивный деним и редкие вещи', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center', overlayOpacity: 60 },
      { id: 'b-2', type: 'categories', showSearch: true, showCategories: true, showBrands: true, chipStyle: 'pill' },
      { id: 'b-3', type: 'products', title: 'Архивный деним', columns: 2, cardStyle: 'modern', borderRadius: 'xl', showBrandBadge: true, showPriceButton: true },
      { id: 'b-4', type: 'contact', title: 'Заказ редких позиций в Telegram', subtitle: 'Подбор размера менеджером' }
    ]
  }
]

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    user_id: 'user-demo',
    name: 'Urban Streetwear Co.',
    slug: 'urban-vibes',
    description: 'Эксклюзивные дропы уличной одежды и лимитированных кроссовок.',
    blocks: LAYOUT_PRESETS[0].blocks,
    theme_config: LAYOUT_PRESETS[0].config
  },
  {
    id: 'shop-2',
    user_id: 'user-demo',
    name: 'Luxe Minimal Apparel',
    slug: 'luxe-store',
    description: 'Премиальный минималистичный гардероб и качественные аксессуары.',
    blocks: LAYOUT_PRESETS[1].blocks,
    theme_config: LAYOUT_PRESETS[1].config
  }
]

const INITIAL_PRODUCTS = [
  { id: 'prod-1', shop_id: 'shop-1', title: 'Oversized Acid-Wash Hoodie', price: 4900, size: 'S, M, L, XL', category: 'Одежда', brand: 'Supreme', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-2', shop_id: 'shop-1', title: 'Retro High-Top Sneakers (Edition 01)', price: 12500, size: '41, 42, 43, 44', category: 'Обувь', brand: 'Nike', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-3', shop_id: 'shop-1', title: 'Minimalist Cargo Pants - Matte Black', price: 6800, size: 'M, L', category: 'Одежда', brand: 'Stone Island', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-4', shop_id: 'shop-1', title: 'Cyberpunk Graphics Heavy Tee', price: 3200, size: 'S, M, L', category: 'Одежда', brand: 'Palace', image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-5', shop_id: 'shop-2', title: 'Balenciaga Triple S Black Edition', price: 65000, size: '39, 40, 41, 42, 43', category: 'Обувь', brand: 'Balenciaga', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', is_available: true },
  { id: 'prod-6', shop_id: 'shop-2', title: 'Celine Oversized Biker Leather Jacket', price: 195000, size: '48, 50', category: 'Одежда', brand: 'Celine', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', is_available: true }
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

    const defaultPreset = LAYOUT_PRESETS[0]
    const shopId = 'shop-' + Date.now()

    const shopWithId = {
      id: shopId,
      user_id: 'user-' + Date.now(),
      created_at: new Date().toISOString(),
      name: newShop.name,
      slug: formattedSlug,
      description: newShop.description || 'Кастомная витрина товаров',
      blocks: defaultPreset.blocks,
      theme_config: {
        ...defaultPreset.config,
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

  // APPLY LAYOUT & UI CONCEPT PRESET
  applyPresetToShop: (shopId, presetId) => {
    const preset = LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    set((state) => ({
      shops: state.shops.map((s) =>
        s.id === shopId
          ? {
              ...s,
              blocks: preset.blocks,
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

  // Product CRUD
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

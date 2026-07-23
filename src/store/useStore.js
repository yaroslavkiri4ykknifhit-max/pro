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
      height: 'medium',
      textAlignment: 'center',
      overlayOpacity: 50
    }
  },
  {
    type: 'categories',
    name: '🏷️ Блок Фильтров и Поиска (Underbuy Style)',
    desc: 'Рамочные прямоугольные выпадающие меню категорий и брендов',
    defaultProps: {
      showSearch: true,
      showCategories: true,
      showBrands: true,
      filterStyle: 'underbuy_dropdowns' // 'underbuy_dropdowns' | 'pill' | 'rounded'
    }
  },
  {
    type: 'products',
    name: '📦 Сетка Каталога (Underbuy Design)',
    desc: 'Минималистичная сетка товаров с сердечками и заглавной типографикой',
    defaultProps: {
      title: '',
      columns: 2,
      cardStyle: 'underbuy', // 'underbuy' | 'modern' | 'minimal' | 'glass' | 'border'
      showHeartIcon: true,
      showBrandBadge: true,
      showCategoryTag: true
    }
  },
  {
    type: 'promo',
    name: '📸 Промо-Карточка / Спецпредложение',
    desc: 'Широкая акционная карточка с картинкой и кнопкой',
    defaultProps: {
      title: '🔥 Скидка при заказе от 2-х позиций',
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
      text: 'Мы поставляем только 100% оригинальную продукцию напрямую от проверенных дистрибьюторов.',
      fontStyle: 'normal'
    }
  },
  {
    type: 'contact',
    name: '💬 Блок Заказа в Telegram',
    desc: 'Призывающая кнопка связи с Telegram-продавцом',
    defaultProps: {
      title: 'Остались вопросы по размеру или наличию?',
      subtitle: 'Напишите продавцу прямо в Telegram — ответим за 2 минуты!',
      buttonText: 'Написать в Telegram'
    }
  }
]

export const LAYOUT_PRESETS = [
  {
    id: 'underbuy_minimal',
    name: '🖤 Underbuy Minimalist (Resell Fashion)',
    desc: 'Строгий минимализм с рамочными выпадающими фильтрами, иконками сердечек и крупными ценами',
    previewImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      cardBg: '#ffffff',
      font: 'Inter',
      logoText: 'under buy',
      logoUrl: '',
      currencySymbol: '₽',
      telegram: 'underbuy_admin'
    },
    blocks: [
      { id: 'b-1', type: 'categories', filterStyle: 'underbuy_dropdowns', showSearch: true, showCategories: true, showBrands: true },
      { id: 'b-2', type: 'products', title: '', columns: 2, cardStyle: 'underbuy', showHeartIcon: true, showBrandBadge: true, showCategoryTag: true },
      { id: 'b-3', type: 'contact', title: 'Оформить заказ в Telegram', subtitle: 'Напишите менеджеру для проверки наличия и размера' }
    ],
    sampleProducts: [
      { id: 'prod-ub-1', title: 'ENFANTS RICHES DEPRIMES RECORDS TOTE BAG', price: 6500, oldPrice: 8900, size: 'One Size', category: 'СУМКИ', brand: 'ENFANTS RICHES DEPRIMES', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', is_available: true },
      { id: 'prod-ub-2', title: 'Y-3 LOGO SHOULDER BAG', price: 12500, oldPrice: 15000, size: 'One Size', category: 'СУМКИ', brand: 'Y-3', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', is_available: true },
      { id: 'prod-ub-3', title: 'BALENCIAGA TRIPLE S BLACK EDITION', price: 65000, oldPrice: 78000, size: '42, 43', category: 'ОБУВЬ', brand: 'BALENCIAGA', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', is_available: true },
      { id: 'prod-ub-4', title: 'SUPREME BOX LOGO HOODIE BLACK', price: 28500, oldPrice: 32000, size: 'L, XL', category: 'ОДЕЖДА', brand: 'SUPREME', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'streetwear',
    name: '🔥 Streetwear Cyber (Supreme / Off-White)',
    desc: 'Тёмный сплит-стиль, крупная сетка товаров (2 колонки), оранжевые акценты',
    previewImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#ff2a00',
      backgroundColor: '#0d0d0d',
      textColor: '#ffffff',
      cardBg: '#181818',
      font: 'Inter',
      logoText: 'STREET LAB',
      logoUrl: '',
      currencySymbol: '₽',
      telegram: 'reseller_admin'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'SUPREME & OFF-WHITE DROP', subtitle: 'Оригинальный streetwear в наличии', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center', overlayOpacity: 50 },
      { id: 'b-2', type: 'categories', filterStyle: 'pill', showSearch: true, showCategories: true, showBrands: true },
      { id: 'b-3', type: 'products', title: 'Релиз недели', columns: 2, cardStyle: 'modern', showHeartIcon: false },
      { id: 'b-4', type: 'contact', title: 'Заказ напрямую в Telegram', subtitle: 'Менеджер ответит моментально' }
    ],
    sampleProducts: [
      { id: 'prod-1', title: 'Oversized Acid-Wash Hoodie', price: 4900, size: 'S, M, L, XL', category: 'Одежда', brand: 'Supreme', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', is_available: true },
      { id: 'prod-2', title: 'Retro High-Top Sneakers', price: 12500, size: '41, 42, 43', category: 'Обувь', brand: 'Nike', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  },
  {
    id: 'apple_clean',
    name: '🍏 Apple Clean & Glass (Светлый Элегантный)',
    desc: 'Светлый минималистичный интерфейс, карточки с размытым фоном, 3 колонки',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    config: {
      primaryColor: '#0066ff',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      cardBg: '#ffffff',
      font: 'Plus Jakarta Sans',
      logoText: 'creatiwise.',
      logoUrl: '',
      currencySymbol: '₽',
      telegram: 'apple_reseller'
    },
    blocks: [
      { id: 'b-1', type: 'banner', title: 'Оригинальные устройства и аксессуары', subtitle: 'Светлый чистый каталог', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center', overlayOpacity: 30 },
      { id: 'b-2', type: 'categories', filterStyle: 'pill', showSearch: true, showCategories: true, showBrands: true },
      { id: 'b-3', type: 'products', title: 'Каталог устройств', columns: 3, cardStyle: 'glass', showHeartIcon: false },
      { id: 'b-4', type: 'contact', title: 'Задать вопрос в Telegram', subtitle: 'Быстрая консультация по моделям' }
    ],
    sampleProducts: [
      { id: 'prod-a1', title: 'Apple Watch Ultra 2', price: 79900, size: '49mm', category: 'Электроника', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', is_available: true },
      { id: 'prod-a2', title: 'AirPods Max Silver', price: 54900, size: 'Standard', category: 'Электроника', brand: 'Apple', image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', is_available: true }
    ]
  }
]

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    user_id: 'user-demo',
    name: 'Underbuy Resell Store',
    slug: 'under-buy',
    description: 'Элитный ресейл брендовой одежды и аксессуаров.',
    blocks: LAYOUT_PRESETS[0].blocks,
    theme_config: LAYOUT_PRESETS[0].config
  },
  {
    id: 'shop-2',
    user_id: 'user-demo',
    name: 'Urban Streetwear Co.',
    slug: 'urban-vibes',
    description: 'Эксклюзивные дропы уличной одежды и лимитированных кроссовок.',
    blocks: LAYOUT_PRESETS[1].blocks,
    theme_config: LAYOUT_PRESETS[1].config
  }
]

const INITIAL_PRODUCTS = [
  ...LAYOUT_PRESETS[0].sampleProducts.map((p) => ({ ...p, shop_id: 'shop-1' })),
  ...LAYOUT_PRESETS[1].sampleProducts.map((p) => ({ ...p, shop_id: 'shop-2' }))
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
        logoText: newShop.name,
        telegram: newShop.telegram || 'reseller_admin'
      }
    }

    // Auto populate sample items matching preset
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

  applyPresetToShop: (shopId, presetId) => {
    const preset = LAYOUT_PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    const newBrandProducts = preset.sampleProducts.map((p, idx) => ({
      ...p,
      id: 'prod-' + Date.now() + '-' + idx,
      shop_id: shopId
    }))

    const otherProducts = get().products.filter((p) => p.shop_id !== shopId)

    set((state) => ({
      products: [...newBrandProducts, ...otherProducts],
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

  addProduct: async (newProduct) => {
    const productWithId = {
      id: 'prod-' + Date.now(),
      is_available: true,
      category: newProduct.category || 'ОБЩЕЕ',
      brand: newProduct.brand || 'БЕЗ БРЕНДА',
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

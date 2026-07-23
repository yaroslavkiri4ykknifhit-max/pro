import { create } from 'zustand'
import { supabase, isConfigured } from '../lib/supabase'

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    user_id: 'user-demo',
    name: 'Urban Streetwear Co.',
    slug: 'urban-vibes',
    description: 'Exclusive streetwear drop & limited edition sneakers.',
    theme_config: {
      primaryColor: '#0066ff',
      backgroundColor: '#090a0f',
      textColor: '#ffffff',
      cardBg: '#12141d',
      accentColor: '#38bdf8',
      font: 'Inter',
      layout: 'grid', // 'grid' | 'list' | 'bento'
      bannerUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      whatsapp: '+79990000000',
      telegram: 'urbanvibes_admin'
    }
  },
  {
    id: 'shop-2',
    user_id: 'user-demo',
    name: 'Luxe Minimal Apparel',
    slug: 'luxe-store',
    description: 'Curated premium minimalist wardrobe essentials.',
    theme_config: {
      primaryColor: '#10b981',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      cardBg: '#ffffff',
      accentColor: '#059669',
      font: 'Plus Jakarta Sans',
      layout: 'grid',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      whatsapp: '+79991112233',
      telegram: 'luxe_support'
    }
  }
]

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    shop_id: 'shop-1',
    title: 'Oversized Acid-Wash Hoodie',
    price: 4900,
    size: 'S, M, L, XL',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-2',
    shop_id: 'shop-1',
    title: 'Retro High-Top Sneakers (Edition 01)',
    price: 12500,
    size: '41, 42, 43, 44',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-3',
    shop_id: 'shop-1',
    title: 'Minimalist Cargo Pants - Matte Black',
    price: 6800,
    size: 'M, L',
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-4',
    shop_id: 'shop-1',
    title: 'Cyberpunk Graphics Heavy Tee',
    price: 3200,
    size: 'S, M, L',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-5',
    shop_id: 'shop-2',
    title: 'Cashmere Blend Minimalist Coat',
    price: 24000,
    size: 'S, M',
    image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    is_available: true
  },
  {
    id: 'prod-6',
    shop_id: 'shop-2',
    title: 'Italian Leather Everyday Tote',
    price: 18500,
    size: 'One Size',
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
  isLoading: false,
  error: null,

  // Helper to persist state to local storage
  persist: () => {
    const { shops, products } = get()
    localStorage.setItem('creatiwise_shops', JSON.stringify(shops))
    localStorage.setItem('creatiwise_products', JSON.stringify(products))
  },

  setActiveShopId: (id) => set({ activeShopId: id }),

  fetchData: async () => {
    if (!isConfigured) return
    set({ isLoading: true })
    try {
      const { data: shops, error: shopsErr } = await supabase.from('shops').select('*')
      const { data: products, error: prodsErr } = await supabase.from('products').select('*')

      if (!shopsErr && shops && shops.length > 0) {
        set({ shops })
      }
      if (!prodsErr && products && products.length > 0) {
        set({ products })
      }
    } catch (e) {
      console.warn('Supabase fetch failed, fallback to local state', e)
    } finally {
      set({ isLoading: false })
    }
  },

  // Shop actions
  createShop: async (newShop) => {
    const shopWithId = {
      id: 'shop-' + Date.now(),
      user_id: 'user-demo',
      created_at: new Date().toISOString(),
      theme_config: {
        primaryColor: '#0066ff',
        backgroundColor: '#090a0f',
        textColor: '#ffffff',
        cardBg: '#12141d',
        font: 'Inter',
        layout: 'grid',
        bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        logoUrl: '',
        whatsapp: '',
        telegram: ''
      },
      ...newShop
    }

    set((state) => ({
      shops: [shopWithId, ...state.shops],
      activeShopId: shopWithId.id
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('shops').insert([shopWithId])
      } catch (e) {
        console.error('Supabase error creating shop', e)
      }
    }

    return shopWithId
  },

  updateShop: async (id, updates) => {
    set((state) => ({
      shops: state.shops.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('shops').update(updates).eq('id', id)
      } catch (e) {
        console.error('Supabase error updating shop', e)
      }
    }
  },

  deleteShop: async (id) => {
    set((state) => ({
      shops: state.shops.filter((s) => s.id !== id),
      products: state.products.filter((p) => p.shop_id !== id),
      activeShopId: state.shops.find((s) => s.id !== id)?.id || ''
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('shops').delete().eq('id', id)
      } catch (e) {
        console.error('Supabase error deleting shop', e)
      }
    }
  },

  // Product actions
  addProduct: async (newProduct) => {
    const productWithId = {
      id: 'prod-' + Date.now(),
      is_available: true,
      ...newProduct
    }

    set((state) => ({
      products: [productWithId, ...state.products]
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('products').insert([productWithId])
      } catch (e) {
        console.error('Supabase error adding product', e)
      }
    }
  },

  updateProduct: async (id, updates) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('products').update(updates).eq('id', id)
      } catch (e) {
        console.error('Supabase error updating product', e)
      }
    }
  },

  deleteProduct: async (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }))
    get().persist()

    if (isConfigured) {
      try {
        await supabase.from('products').delete().eq('id', id)
      } catch (e) {
        console.error('Supabase error deleting product', e)
      }
    }
  },

  resetDemoData: () => {
    localStorage.removeItem('creatiwise_shops')
    localStorage.removeItem('creatiwise_products')
    set({ shops: INITIAL_SHOPS, products: INITIAL_PRODUCTS, activeShopId: 'shop-1' })
  }
}))

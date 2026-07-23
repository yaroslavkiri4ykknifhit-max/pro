// Themes Index Registry for 12 Theme Presets:
// Minimal, Luxury, Streetwear, Underbuy, Poizon, Farfetch, Zara, Apple, Editorial, Glass, Black Boutique, Modern

export const THEME_LIBRARY = [
  {
    id: 'underbuy',
    name: 'Underbuy Resell',
    desc: 'Минималистичные рамочные выпадающие списки, сердечки, заглавная типографика брендов',
    preview: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'underbuy',
      name: 'Underbuy',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        text: '#000000',
        cardBg: '#ffffff',
        accent: '#000000',
        border: '#000000'
      },
      typography: {
        fontFamily: 'Inter',
        headingCase: 'uppercase',
        brandCase: 'uppercase'
      },
      styles: {
        borderRadius: '0px',
        shadow: 'none',
        containerWidth: '1200px',
        cardStyle: 'underbuy',
        filterStyle: 'underbuy_dropdowns',
        animation: 'none'
      }
    },
    layoutJson: {
      columns: 2,
      gap: '24px',
      headerStyle: 'underbuy_minimal'
    },
    blocksJson: [
      {
        id: 'b-categories-1',
        type: 'categories',
        variant: 1,
        props: { showSearch: true, showCategories: true, showBrands: true, filterStyle: 'underbuy_dropdowns' }
      },
      {
        id: 'b-catalog-1',
        type: 'products',
        variant: 1, // Underbuy 2-column card layout
        props: { columns: 2, cardStyle: 'underbuy', showHeartIcon: true, showBrandBadge: true }
      },
      {
        id: 'b-contact-1',
        type: 'contact',
        variant: 1,
        props: { title: 'ОФОРМИТЬ ЗАКАЗ В TELEGRAM', subtitle: 'Менеджер проверит наличие вашего размера' }
      }
    ]
  },

  {
    id: 'poizon',
    name: 'Poizon Cyber Drop',
    desc: 'Тёмный неоновый интерфейс маркетплейса кроссовок и лимитированных релизов',
    preview: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'poizon',
      name: 'Poizon Cyber',
      colors: {
        primary: '#00f0ff',
        background: '#0a0d14',
        text: '#ffffff',
        cardBg: '#131824',
        accent: '#00f0ff',
        border: '#1f293d'
      },
      typography: {
        fontFamily: 'Geist',
        headingCase: 'uppercase',
        brandCase: 'uppercase'
      },
      styles: {
        borderRadius: '16px',
        shadow: 'glow',
        containerWidth: '1300px',
        cardStyle: 'poizon',
        filterStyle: 'pill',
        animation: 'scale'
      }
    },
    layoutJson: {
      columns: 2,
      gap: '16px',
      headerStyle: 'cyber'
    },
    blocksJson: [
      {
        id: 'b-hero-poizon',
        type: 'hero',
        variant: 2, // Cyber Neon Hero
        props: { title: 'POIZON VERIFIED DROPS 2026', subtitle: '100% Legit Check перед отправкой', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'left' }
      },
      {
        id: 'b-categories-poizon',
        type: 'categories',
        variant: 2,
        props: { showSearch: true, showCategories: true, showBrands: true, filterStyle: 'pill' }
      },
      {
        id: 'b-catalog-poizon',
        type: 'products',
        variant: 2, // Poizon Card
        props: { columns: 2, cardStyle: 'poizon', showHeartIcon: true, showBrandBadge: true }
      }
    ]
  },

  {
    id: 'zara',
    name: 'Zara Editorial',
    desc: 'Высокая мода, широкоформатные портретные сетки 2 колонок, ультраминимализм',
    preview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'zara',
      name: 'Zara Editorial',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        text: '#000000',
        cardBg: '#ffffff',
        accent: '#000000',
        border: '#e2e8f0'
      },
      typography: {
        fontFamily: 'General Sans',
        headingCase: 'uppercase',
        brandCase: 'uppercase'
      },
      styles: {
        borderRadius: '0px',
        shadow: 'none',
        containerWidth: '1400px',
        cardStyle: 'zara',
        filterStyle: 'minimal',
        animation: 'fade'
      }
    },
    layoutJson: {
      columns: 2,
      gap: '32px',
      headerStyle: 'editorial'
    },
    blocksJson: [
      {
        id: 'b-hero-zara',
        type: 'hero',
        variant: 3, // Fullscreen Editorial Hero
        props: { title: 'SUMMER ARCHIVE COLLECTION', subtitle: 'Эстетика высокой моды и строгие силуэты', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80', height: 'large', textAlignment: 'center' }
      },
      {
        id: 'b-catalog-zara',
        type: 'products',
        variant: 3, // Zara Tall Card
        props: { columns: 2, cardStyle: 'zara', showBrandBadge: false, showPriceButton: false }
      }
    ]
  },

  {
    id: 'farfetch',
    name: 'Farfetch Boutique',
    desc: 'Премиальный люксовый маркетплейс, 4 колонки, изысканная палитра',
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'farfetch',
      name: 'Farfetch Boutique',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        text: '#1a1a1a',
        cardBg: '#ffffff',
        accent: '#000000',
        border: '#eeeeee'
      },
      typography: {
        fontFamily: 'Manrope',
        headingCase: 'uppercase',
        brandCase: 'uppercase'
      },
      styles: {
        borderRadius: '8px',
        shadow: 'soft',
        containerWidth: '1400px',
        cardStyle: 'farfetch',
        filterStyle: 'pill',
        animation: 'fade'
      }
    },
    layoutJson: {
      columns: 4,
      gap: '20px',
      headerStyle: 'boutique'
    },
    blocksJson: [
      {
        id: 'b-cat-ff',
        type: 'categories',
        variant: 1,
        props: { showSearch: true, showCategories: true, showBrands: true, filterStyle: 'pill' }
      },
      {
        id: 'b-catalog-ff',
        type: 'products',
        variant: 4, // Farfetch 4-column card
        props: { columns: 4, cardStyle: 'farfetch', showBrandBadge: true }
      }
    ]
  },

  {
    id: 'minimal',
    name: 'Minimal Clean',
    desc: 'Очищенный светлый дизайн, акцент на фотографиях товаров',
    preview: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'minimal',
      name: 'Minimal',
      colors: { primary: '#000000', background: '#f8fafc', text: '#0f172a', cardBg: '#ffffff', accent: '#000000', border: '#e2e8f0' },
      typography: { fontFamily: 'Inter', headingCase: 'normal', brandCase: 'uppercase' },
      styles: { borderRadius: '12px', shadow: 'soft', containerWidth: '1200px', cardStyle: 'minimal', filterStyle: 'pill', animation: 'fade' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'minimal' },
    blocksJson: [
      { id: 'b-categories-min', type: 'categories', variant: 1, props: { showSearch: true, showCategories: true, showBrands: true, filterStyle: 'pill' } },
      { id: 'b-catalog-min', type: 'products', variant: 5, props: { columns: 3, cardStyle: 'minimal', showBrandBadge: true } }
    ]
  },

  {
    id: 'luxury',
    name: 'Luxury Dark Gold',
    desc: 'Премиальный тёмный дизайн с золотыми акцентами для дорогих часов и украшений',
    preview: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'luxury',
      name: 'Luxury Gold',
      colors: { primary: '#d4af37', background: '#08080a', text: '#ffffff', cardBg: '#121216', accent: '#d4af37', border: '#2a2a35' },
      typography: { fontFamily: 'Manrope', headingCase: 'uppercase', brandCase: 'uppercase' },
      styles: { borderRadius: '16px', shadow: 'glow', containerWidth: '1200px', cardStyle: 'luxury', filterStyle: 'pill', animation: 'scale' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'luxury' },
    blocksJson: [
      { id: 'b-hero-lux', type: 'hero', variant: 4, props: { title: 'HIGH JEWELRY & WATCHES', subtitle: 'Эксклюзивная коллекция редких брендов', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center' } },
      { id: 'b-catalog-lux', type: 'products', variant: 6, props: { columns: 3, cardStyle: 'luxury', showBrandBadge: true } }
    ]
  },

  {
    id: 'streetwear',
    name: 'Streetwear & Drop',
    desc: 'Уличная культура, ярко-красные граффити-акценты и массивные карточки',
    preview: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'streetwear',
      name: 'Streetwear',
      colors: { primary: '#ff003b', background: '#0a0a0c', text: '#ffffff', cardBg: '#141418', accent: '#ff003b', border: '#22222a' },
      typography: { fontFamily: 'Inter', headingCase: 'uppercase', brandCase: 'uppercase' },
      styles: { borderRadius: '24px', shadow: 'heavy', containerWidth: '1300px', cardStyle: 'streetwear', filterStyle: 'pill', animation: 'scale' }
    },
    layoutJson: { columns: 2, gap: '24px', headerStyle: 'streetwear' },
    blocksJson: [
      { id: 'b-hero-st', type: 'hero', variant: 1, props: { title: 'LIMITED STREETWEAR DROPS', subtitle: 'Официальный ресейл брендов уличной моды', imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'left' } },
      { id: 'b-catalog-st', type: 'products', variant: 1, props: { columns: 2, cardStyle: 'streetwear', showBrandBadge: true } }
    ]
  },

  {
    id: 'apple',
    name: 'Apple Glassmorphism',
    desc: 'Светлое матовое стекло, закругления 32px, максимальная утонченность',
    preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'apple',
      name: 'Apple Glass',
      colors: { primary: '#0066ff', background: '#f1f5f9', text: '#0f172a', cardBg: '#ffffff', accent: '#0066ff', border: '#cbd5e1' },
      typography: { fontFamily: 'Plus Jakarta Sans', headingCase: 'normal', brandCase: 'uppercase' },
      styles: { borderRadius: '32px', shadow: 'soft', containerWidth: '1200px', cardStyle: 'glass', filterStyle: 'pill', animation: 'fade' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'apple' },
    blocksJson: [
      { id: 'b-hero-ap', type: 'hero', variant: 5, props: { title: 'PREMIUM ELECTRONICS & APPAREL', subtitle: 'Современный чистый дизайн магазина', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', height: 'medium', textAlignment: 'center' } },
      { id: 'b-catalog-ap', type: 'products', variant: 7, props: { columns: 3, cardStyle: 'glass', showBrandBadge: true } }
    ]
  },

  {
    id: 'editorial',
    name: 'Editorial Magazine',
    desc: 'Журнальная верстка с акцентом на типографику и крупный заголовок',
    preview: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'editorial',
      name: 'Editorial',
      colors: { primary: '#000000', background: '#faf9f6', text: '#111111', cardBg: '#ffffff', accent: '#000000', border: '#e5e5e0' },
      typography: { fontFamily: 'General Sans', headingCase: 'uppercase', brandCase: 'uppercase' },
      styles: { borderRadius: '0px', shadow: 'none', containerWidth: '1300px', cardStyle: 'editorial', filterStyle: 'minimal', animation: 'fade' }
    },
    layoutJson: { columns: 2, gap: '32px', headerStyle: 'editorial' },
    blocksJson: [
      { id: 'b-catalog-ed', type: 'products', variant: 8, props: { columns: 2, cardStyle: 'editorial', showBrandBadge: true } }
    ]
  },

  {
    id: 'glass',
    name: 'Neon Glass Dark',
    desc: 'Полупрозрачные градиентные плашки с неоновым свечением',
    preview: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'glass',
      name: 'Neon Glass',
      colors: { primary: '#38bdf8', background: '#090d16', text: '#f8fafc', cardBg: 'rgba(255, 255, 255, 0.05)', accent: '#38bdf8', border: 'rgba(255, 255, 255, 0.1)' },
      typography: { fontFamily: 'Geist', headingCase: 'normal', brandCase: 'uppercase' },
      styles: { borderRadius: '24px', shadow: 'glow', containerWidth: '1200px', cardStyle: 'glass', filterStyle: 'pill', animation: 'fade' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'glass' },
    blocksJson: [
      { id: 'b-catalog-gl', type: 'products', variant: 9, props: { columns: 3, cardStyle: 'glass', showBrandBadge: true } }
    ]
  },

  {
    id: 'black_boutique',
    name: 'Black Boutique',
    desc: 'Матовый глубокий черный фон, контрастные шрифты и элегантный минимализм',
    preview: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'black_boutique',
      name: 'Black Boutique',
      colors: { primary: '#ffffff', background: '#050505', text: '#ffffff', cardBg: '#0f0f0f', accent: '#ffffff', border: '#1f1f1f' },
      typography: { fontFamily: 'SF Pro', headingCase: 'uppercase', brandCase: 'uppercase' },
      styles: { borderRadius: '12px', shadow: 'none', containerWidth: '1300px', cardStyle: 'border', filterStyle: 'pill', animation: 'fade' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'boutique' },
    blocksJson: [
      { id: 'b-catalog-bb', type: 'products', variant: 10, props: { columns: 3, cardStyle: 'border', showBrandBadge: true } }
    ]
  },

  {
    id: 'modern',
    name: 'Modern SaaS Standard',
    desc: 'Универсальный чистый e-commerce стиль под любые ниши',
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    themeJson: {
      id: 'modern',
      name: 'Modern',
      colors: { primary: '#0066ff', background: '#ffffff', text: '#0f172a', cardBg: '#f8fafc', accent: '#0066ff', border: '#e2e8f0' },
      typography: { fontFamily: 'Inter', headingCase: 'normal', brandCase: 'uppercase' },
      styles: { borderRadius: '16px', shadow: 'soft', containerWidth: '1200px', cardStyle: 'modern', filterStyle: 'pill', animation: 'fade' }
    },
    layoutJson: { columns: 3, gap: '24px', headerStyle: 'modern' },
    blocksJson: [
      { id: 'b-catalog-mod', type: 'products', variant: 11, props: { columns: 3, cardStyle: 'modern', showBrandBadge: true } }
    ]
  }
]

import { balenciagaTokens, BalenciagaHero, BalenciagaCatalog, BalenciagaFooter } from './balenciaga/index.jsx'
import { poizonTokens, PoizonHero, PoizonCatalog, PoizonFooter } from './poizon/index.jsx'
import { zaraTokens, ZaraHero, ZaraCatalog, ZaraFooter } from './zara/index.jsx'

export const THEMES_REGISTRY = {
  balenciaga: {
    tokens: balenciagaTokens,
    HeroComponent: BalenciagaHero,
    CatalogComponent: BalenciagaCatalog,
    FooterComponent: BalenciagaFooter,
    defaultBlocks: [
      { id: 'b-b-1', type: 'hero', variant: 1, props: { title: 'LUXURY BOUTIQUE CATALOGUE • 100% AUTHENTIC GUARANTEED' } },
      { id: 'b-b-2', type: 'products', variant: 1, props: { columns: 3, cardStyle: 'underbuy' } },
      { id: 'b-b-3', type: 'contact', variant: 1, props: { title: 'LUXURY BOUTIQUE TELEGRAM MARKETPLACE' } }
    ]
  },
  poizon: {
    tokens: poizonTokens,
    HeroComponent: PoizonHero,
    CatalogComponent: PoizonCatalog,
    FooterComponent: PoizonFooter,
    defaultBlocks: [
      { id: 'b-p-1', type: 'hero', variant: 2, props: { title: 'POIZON 100% VERIFIED LEGIT CHECK MARKETPLACE' } },
      { id: 'b-p-2', type: 'products', variant: 2, props: { columns: 4, cardStyle: 'poizon' } },
      { id: 'b-p-3', type: 'contact', variant: 2, props: { title: 'POIZON FAST TELEGRAM MARKETPLACE GATEWAY' } }
    ]
  },
  zara: {
    tokens: zaraTokens,
    HeroComponent: ZaraHero,
    CatalogComponent: ZaraCatalog,
    FooterComponent: ZaraFooter,
    defaultBlocks: [
      { id: 'b-z-1', type: 'hero', variant: 3, props: { title: 'MODERN STORE CATALOGUE • EXPRESS TELEGRAM ORDER SERVICE' } },
      { id: 'b-z-2', type: 'products', variant: 3, props: { columns: 4, cardStyle: 'zara' } },
      { id: 'b-z-3', type: 'contact', variant: 3, props: { title: 'MODERN STORE CONCIERGE' } }
    ]
  }
}

export const THEME_LIBRARY = [
  {
    id: 'balenciaga',
    name: 'Luxury Boutique Shopify Theme',
    desc: 'Farfetch & SSENSE style: 3 колонки, чистые пропорции 4:5, монохромная палитра, заглавные бренды и быстрая покупка в TG',
    preview: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    themeJson: balenciagaTokens
  },
  {
    id: 'poizon',
    name: 'Street Marketplace Shopify Theme',
    desc: 'Poizon & StockX style: плотный каталог 4 колонок, скидки, размеры, неон cyan, бейджи и мгновенный поиск',
    preview: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    themeJson: poizonTokens
  },
  {
    id: 'zara',
    name: 'Modern Store Shopify Theme',
    desc: 'Arket, COS & END style: чистый белый каталог 4 колонок, 4:5 пропорции фото, акцент на удобстве поиска и покупках',
    preview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    themeJson: zaraTokens
  }
]

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
      { id: 'b-b-1', type: 'hero', variant: 1, props: { title: 'BALENCIAGA ARCHIVE COLLECTION', subtitle: 'Эксклюзивный ресейл высокой моды со строгой проверкой подлинности', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80' } },
      { id: 'b-b-2', type: 'products', variant: 1, props: { columns: 2, cardStyle: 'underbuy' } },
      { id: 'b-b-3', type: 'contact', variant: 1, props: { title: 'BALENCIAGA CLIENT SERVICE', subtitle: 'Прямой приём заказов и консультация стилиста в Telegram' } }
    ]
  },
  poizon: {
    tokens: poizonTokens,
    HeroComponent: PoizonHero,
    CatalogComponent: PoizonCatalog,
    FooterComponent: PoizonFooter,
    defaultBlocks: [
      { id: 'b-p-1', type: 'hero', variant: 2, props: { title: 'POIZON SNEAKER MARKETPLACE', subtitle: 'Лимитированные релизы кроссовок с гарантированным сертификатом подлинности POIZON', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80' } },
      { id: 'b-p-2', type: 'products', variant: 2, props: { columns: 4, cardStyle: 'poizon' } },
      { id: 'b-p-3', type: 'contact', variant: 2, props: { title: 'POIZON FAST TELEGRAM ORDER', subtitle: 'Быстрая проверка наличия вашего размера и моментальный приём заказа' } }
    ]
  },
  zara: {
    tokens: zaraTokens,
    HeroComponent: ZaraHero,
    CatalogComponent: ZaraCatalog,
    FooterComponent: ZaraFooter,
    defaultBlocks: [
      { id: 'b-z-1', type: 'hero', variant: 3, props: { title: 'ZARA EDITORIAL ARCHIVE', subtitle: 'Чистые линии, строгий силуэт и естественные фактурные ткани', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' } },
      { id: 'b-z-2', type: 'products', variant: 3, props: { columns: 2, cardStyle: 'zara' } },
      { id: 'b-z-3', type: 'contact', variant: 3, props: { title: 'ZARA EDITORIAL SERVICE', subtitle: 'Оформить заказ или уточнить детали наличия у стилиста' } }
    ]
  }
}

export const THEME_LIBRARY = [
  {
    id: 'balenciaga',
    name: 'Balenciaga Type',
    desc: 'Современный luxury fashion: монохромная палитра, гигантская типографика, много воздуха и ультраминимализм',
    preview: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    themeJson: balenciagaTokens
  },
  {
    id: 'poizon',
    name: 'Poizon Street Marketplace',
    desc: 'Тёмный маркетплейс кроссовок: неоновые акценты cyan, плотная сетка 4 колонок, бейджи скидок и размеров',
    preview: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    themeJson: poizonTokens
  },
  {
    id: 'zara',
    name: 'Zara Editorial Fashion',
    desc: 'Редакционная эстетика фэшн-журнала: белоснежный фон, ультракрупные portrait фотографии, 1400px контейнер',
    preview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    themeJson: zaraTokens
  }
]

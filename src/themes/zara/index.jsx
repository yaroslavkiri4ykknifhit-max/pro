import React, { useState, useMemo } from 'react'
import { Search, Send, Heart, ChevronDown, X, Filter } from 'lucide-react'

export const zaraTokens = {
  id: 'zara',
  name: 'MODERN STORE SHOPIFY THEME',
  subtitle: 'Arket, COS & END Mobile UX',
  desc: 'Нативная мобильная верстка: 2 колонки на мобильном, модальный Filter Bottom Sheet, чистые 4:5 пропорции и моментальный поиск',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    cardBg: '#ffffff',
    text: '#111111',
    border: '#e5e5e0',
    accent: '#000000'
  },
  typography: {
    fontFamily: 'General Sans',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '8px',
    shadow: 'subtle',
    containerWidth: '1350px'
  }
}

export function ZaraHero({ props }) {
  return (
    <div className="py-2 px-4 bg-slate-100 border-b border-slate-200 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
      MODERN STORE CATALOGUE • TELEGRAM ORDER SERVICE
    </div>
  )
}

export function ZaraCatalog({ products, currencySymbol, telegram }) {
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ')
  const [selectedBrand, setSelectedBrand] = useState('ВСЕ БРЕНДЫ')
  const [selectedSize, setSelectedSize] = useState('ВСЕ')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState({})
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  const categories = ['ВСЕ', 'ОДЕЖДА', 'ОБУВЬ', 'СУМКИ', 'АКСЕССУАРЫ']
  const brands = ['ВСЕ БРЕНДЫ', 'ZARA', 'COS', 'ARKET', 'MAISON MARGIELA', 'JIL SANDER', 'ACNE STUDIOS']
  const sizes = ['ВСЕ', 'S', 'M', 'L', 'XL', '40', '41', '42']

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'ВСЕ' || (p.category || '').toUpperCase() === selectedCategory
      const matchBrand = selectedBrand === 'ВСЕ БРЕНДЫ' || (p.brand || '').toUpperCase() === selectedBrand
      const matchSize = selectedSize === 'ВСЕ' || (p.size || '').includes(selectedSize)
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchBrand && matchSize && matchSearch
    })
  }, [products, selectedCategory, selectedBrand, selectedSize, searchQuery])

  const toggleFav = (id, e) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOrder = (product) => {
    const rawTg = telegram || 'admin'
    const orderMessage = `Привет! Хочу заказать ${product.title}\n` +
      `• Цена: ${product.price.toLocaleString('ru-RU')} ${currencySymbol}\n` +
      (product.brand ? `• Бренд: ${product.brand}\n` : '') +
      `• Каталог: Modern Store`
    window.open(`https://t.me/${rawTg.replace('@', '')}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  return (
    <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 px-2 sm:px-6 max-w-[1350px] mx-auto text-black">
      
      {/* 1. FRONT-PAGE SEARCH & FILTERS */}
      <div className="space-y-3 border-b border-slate-200 pb-4">
        
        {/* Search Bar + Mobile Filter Trigger */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию или бренду..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 text-xs text-black uppercase font-bold tracking-wider placeholder:text-slate-400 focus:outline-none focus:border-black"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="flex items-center gap-1 px-3 py-2.5 bg-black text-white text-xs font-bold rounded-xl sm:hidden"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Фильтры</span>
          </button>
        </div>

        {/* Category Chips (Mobile Horizontal Native Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap snap-start transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Brand & Size Selectors (Hidden on Mobile) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
            ))}
          </select>

          <div className="flex items-center justify-end text-xs font-mono font-bold text-slate-400">
            НАЙДЕНО: <span className="text-black font-extrabold ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. DEDICATED 2-COLUMN MOBILE E-COMMERCE GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-400" />
          <h3 className="text-xs font-bold uppercase text-slate-600">Товары не найдены</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-3 px-4 py-2 text-xs font-bold bg-black text-white rounded-xl"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer space-y-2 bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Photo Container (Aspect 4/5) */}
                <div className="w-full aspect-[4/5] bg-slate-50 rounded-lg overflow-hidden relative border border-slate-100 flex items-center justify-center p-2">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full border border-slate-200 hover:bg-slate-100"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{p.brand || 'MODERN'}</div>
                  <h3 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-black line-clamp-2">{p.title}</h3>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                    <span className="text-xs sm:text-sm font-black text-black leading-none">{p.price.toLocaleString('ru-RU')} {currencySymbol}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase rounded-lg hover:bg-slate-800"
                    >
                      Купить
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 text-black relative shadow-2xl">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-56 rounded-2xl bg-slate-50 flex items-center justify-center p-3 border border-slate-200">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-sm font-bold uppercase leading-tight">{quickViewProduct.title}</h3>
              <div className="text-xl font-black">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Оформить в Telegram</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export function ZaraFooter({ telegram }) {
  return (
    <footer className="py-6 px-4 text-center space-y-2 bg-slate-100 border-t border-slate-200 text-black">
      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">MODERN STORE CONCIERGE</div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

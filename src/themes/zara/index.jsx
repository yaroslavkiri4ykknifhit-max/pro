import React, { useState, useMemo } from 'react'
import { Search, Send, Heart, ChevronDown, X, Tag } from 'lucide-react'

export const zaraTokens = {
  id: 'zara',
  name: 'MODERN STORE SHOPIFY THEME',
  subtitle: 'Arket, COS & END Clothing Style',
  desc: 'Чистый современный каталог 4 колонок: оптимальные пропорции карточек 4:5, акцент на удобстве поиска и максимальной конверсии',
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
  // Minimal compact store status bar
  return (
    <div className="py-2.5 px-6 bg-slate-100 border-b border-slate-200 text-center text-xs font-bold uppercase tracking-widest text-slate-700">
      MODERN STORE CATALOGUE • EXPRESS TELEGRAM ORDER SERVICE
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
    <div className="space-y-6 py-4 px-4 sm:px-6 max-w-[1350px] mx-auto text-black">
      
      {/* 1. FRONT-PAGE SEARCH & FILTERS */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию или бренду..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-xs text-black uppercase font-bold tracking-wider placeholder:text-slate-400 focus:outline-none focus:border-black"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Size Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
            ))}
          </select>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-xs font-mono font-bold text-slate-400">
            НАЙДЕНО: <span className="text-black font-extrabold ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. 4-COLUMN E-COMMERCE GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
          <h3 className="text-sm font-bold uppercase text-slate-600">Товары не найдены</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-4 px-5 py-2.5 text-xs font-bold bg-black text-white rounded-xl"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer space-y-3 bg-white border border-slate-200 rounded-2xl p-3 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Product Photo Box (4:5 Ratio) */}
                <div className="h-56 w-full bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100 flex items-center justify-center p-3">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-2.5 right-2.5 p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.brand || 'MODERN'}</div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-black line-clamp-2">{p.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-sm font-black text-black">{p.price.toLocaleString('ru-RU')} {currencySymbol}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="px-3 py-1.5 bg-black text-white text-[11px] font-bold uppercase rounded-lg hover:bg-slate-800"
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 text-black relative shadow-2xl">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-2xl bg-slate-50 flex items-center justify-center p-4 border border-slate-200">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-xl font-bold uppercase leading-tight">{quickViewProduct.title}</h3>
              <div className="text-2xl font-black">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800"
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
    <footer className="py-8 px-6 text-center space-y-3 bg-slate-100 border-t border-slate-200 text-black">
      <div className="text-xs font-bold uppercase tracking-wider">MODERN STORE CONCIERGE</div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl"
      >
        <Send className="w-4 h-4" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

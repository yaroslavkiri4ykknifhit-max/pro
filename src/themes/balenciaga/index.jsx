import React, { useState, useMemo } from 'react'
import { Search, Heart, Send, ChevronDown, SlidersHorizontal, X, Check, ArrowRight, Filter } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'LUXURY BOUTIQUE SHOPIFY THEME',
  subtitle: 'Farfetch & SSENSE Mobile UX',
  desc: 'Нативная мобильная архитектура: 2 колонки на смартфоне, пропорции 4:5, модальный Filter Drawer и быстрый заказ в TG',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    cardBg: '#ffffff',
    text: '#000000',
    border: '#000000',
    accent: '#000000'
  },
  typography: {
    fontFamily: 'Inter',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '0px',
    shadow: 'none',
    containerWidth: '1350px'
  }
}

export function BalenciagaHero({ props }) {
  return (
    <div className="bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] py-2 px-3 text-center border-b border-black">
      {props?.title || 'LUXURY BOUTIQUE • 100% AUTHENTIC GUARANTEED'}
    </div>
  )
}

export function BalenciagaCatalog({ products, currencySymbol, telegram }) {
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ')
  const [selectedBrand, setSelectedBrand] = useState('ВСЕ БРЕНДЫ')
  const [selectedSize, setSelectedSize] = useState('ВСЕ')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState({})
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  const categories = ['ВСЕ', 'СУМКИ', 'ОБУВЬ', 'ОДЕЖДА', 'ХУДИ', 'АКСЕССУАРЫ']
  const brands = ['ВСЕ БРЕНДЫ', 'BALENCIAGA', 'ENFANTS RICHES DEPRIMES', 'Y-3', 'VETEMENTS', 'OFF-WHITE', 'STONE ISLAND']
  const sizes = ['ВСЕ', 'S', 'M', 'L', 'XL', '40', '41', '42', '43', '44']

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
      `• Каталог: Luxury Boutique`
    window.open(`https://t.me/${rawTg.replace('@', '')}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  return (
    <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 px-2 sm:px-6 max-w-[1350px] mx-auto text-black font-sans">
      
      {/* 1. COMPACT STICKY MOBILE CONTROLS & SEARCH BAR */}
      <div className="space-y-3 border-b-2 border-black pb-4">
        
        {/* Search Input + Mobile Filter Drawer Trigger */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black opacity-60" />
            <input
              type="text"
              placeholder="Поиск по названию или бренду..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-black pl-10 pr-3 py-2.5 text-xs font-bold text-black uppercase tracking-wider placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Filter Drawer Toggle Button (Visible on Mobile & Tablet) */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black sm:hidden"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Фильтры</span>
          </button>
        </div>

        {/* Category Horizontal Scroll Bar (Mobile Native Touch Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider whitespace-nowrap snap-start transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Filters (Hidden on Mobile) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-3 pt-1">
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black px-3 py-2 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-8 focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
          </div>

          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black px-3 py-2 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-8 focus:outline-none"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
          </div>

          <div className="flex items-center justify-end text-xs font-black uppercase tracking-widest text-slate-400">
            НАЙДЕНО: <span className="text-black font-black ml-1.5">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. DEDICATED NATIVE MOBILE & DESKTOP GRID (2 COLUMNS MOBILE, 3 COLUMNS DESKTOP) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 border-2 border-black">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <h3 className="text-xs font-black uppercase tracking-wider">Товары не найдены</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-3 px-4 py-2 bg-black text-white text-[11px] font-black uppercase tracking-widest"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer flex flex-col justify-between border-2 border-black p-2 sm:p-4 bg-white hover:shadow-xl transition-all space-y-2"
              >
                {/* Product Photo Box (Fluid 4:5 Aspect Ratio) */}
                <div className="w-full aspect-[4/5] bg-slate-50 relative flex items-center justify-center p-2 border border-slate-200 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <span className="absolute top-2 left-2 bg-black text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider">
                    {p.is_available ? 'В НАЛИЧИИ' : 'ПОД ЗАКАЗ'}
                  </span>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-2 right-2 p-1.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
                    {p.brand || 'BALENCIAGA'}
                  </div>
                  <h3 className="font-extrabold text-[11px] sm:text-xs uppercase tracking-tight leading-snug text-black line-clamp-2">
                    {p.title}
                  </h3>

                  {p.size && (
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      Размер: {p.size}
                    </div>
                  )}

                  <div className="pt-1.5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <span className="font-black text-xs sm:text-base text-black block leading-none">
                        {p.price.toLocaleString('ru-RU')} {currencySymbol}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="w-full sm:w-auto px-2.5 py-1.5 bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Купить</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {/* MOBILE BOTTOM SHEET FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:hidden">
          <div className="bg-white border-t-2 border-black w-full p-5 space-y-4 rounded-t-3xl text-black animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider">Фильтры каталога</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 border border-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Бренд:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2.5 text-xs font-black uppercase"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Размер:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2.5 text-xs font-black uppercase"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-wider"
            >
              Применить ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-sm sm:max-w-md w-full p-5 space-y-4 text-black relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 p-1.5 text-black border border-black"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-56 bg-slate-50 border border-slate-200 flex items-center justify-center p-3">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-sm font-black uppercase font-display leading-tight">{quickViewProduct.title}</h3>
              <div className="text-xl font-black font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-3.5 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 flex items-center justify-center gap-2"
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

export function BalenciagaFooter({ telegram }) {
  return (
    <footer className="border-t-2 border-black bg-black text-white py-6 px-4 text-center space-y-2">
      <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
        LUXURY BOUTIQUE TELEGRAM MARKETPLACE
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-slate-200"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

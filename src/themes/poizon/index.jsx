import React, { useState, useMemo } from 'react'
import { ShieldCheck, Search, ShoppingBag, Send, Tag, Flame, Heart, ChevronDown, X, Sparkles, SlidersHorizontal } from 'lucide-react'

export const poizonTokens = {
  id: 'poizon',
  name: 'STREET MARKETPLACE SHOPIFY THEME',
  subtitle: 'Poizon & StockX Cyber Marketplace',
  desc: 'Плотный маркетплейс кроссовок: мгновенный поиск на первом экране, 4 колонки товаров, скидки, размеры и 100% Legit Check',
  colors: {
    primary: '#00f0ff',
    background: '#080a10',
    cardBg: '#111624',
    text: '#ffffff',
    border: '#1b2336',
    accent: '#00f0ff'
  },
  typography: {
    fontFamily: 'Geist',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '16px',
    shadow: 'glow',
    containerWidth: '1350px'
  }
}

export function PoizonHero({ props }) {
  // Minimal compact tech status bar
  return (
    <div className="bg-[#111624] border border-[#1b2336] rounded-2xl py-2.5 px-6 text-center text-xs font-bold text-[#00f0ff] uppercase flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
        <span>POIZON 100% VERIFIED LEGIT CHECK MARKETPLACE</span>
      </div>
      <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">EXPRESS AIR SHIPPING 3-5 DAYS</span>
    </div>
  )
}

export function PoizonCatalog({ products, currencySymbol, telegram }) {
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ')
  const [selectedBrand, setSelectedBrand] = useState('ВСЕ БРЕНДЫ')
  const [selectedSize, setSelectedSize] = useState('ВСЕ')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState({})
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const categories = ['ВСЕ', 'КРОССОВКИ', 'ХУДИ', 'ФУТБОЛКИ', 'КУРТКИ', 'ШТАНЫ', 'СУМКИ']
  const brands = ['ВСЕ БРЕНДЫ', 'NIKE', 'JORDAN', 'ADIDAS', 'SUPREME', 'OFF-WHITE', 'STONE ISLAND']
  const sizes = ['ВСЕ', '40', '41', '42', '43', '44', 'S', 'M', 'L']

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
      `• Каталог: Street Marketplace`
    window.open(`https://t.me/${rawTg.replace('@', '')}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  return (
    <div className="space-y-6 py-4 text-white">
      
      {/* 1. FRONT-PAGE MARKETPLACE SEARCH & FILTER CONTROLS */}
      <div className="space-y-4 bg-[#111624] p-5 rounded-3xl border border-[#1b2336] shadow-2xl">
        
        {/* Instant Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по 300+ позициям кроссовок и одежды..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080a10] border border-[#1b2336] rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f0ff] font-bold"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/20'
                  : 'bg-[#080a10] text-slate-400 hover:text-white border border-[#1b2336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Size Selector Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#080a10] border border-[#1b2336] text-xs text-white rounded-xl px-4 py-2.5 font-bold focus:outline-none cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-[#080a10] border border-[#1b2336] text-xs text-white rounded-xl px-4 py-2.5 font-bold focus:outline-none cursor-pointer"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
            ))}
          </select>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-xs font-bold text-slate-400">
            Найдено: <span className="text-[#00f0ff] font-extrabold ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. DENSE 4-COLUMN MARKETPLACE GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#111624] rounded-3xl border border-[#1b2336]">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
          <h3 className="text-sm font-bold uppercase text-slate-300">Ничего не найдено</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-4 px-5 py-2.5 text-xs font-bold bg-[#00f0ff] text-black rounded-xl shadow-md"
          >
            Сбросить все фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="bg-[#111624] border border-[#1b2336] hover:border-[#00f0ff] rounded-2xl p-4 space-y-3 group transition-all duration-300 relative flex flex-col justify-between shadow-xl cursor-pointer"
              >
                {/* Discount Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#ff0055] text-white font-black text-[10px]">
                    -20%
                  </span>
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="text-slate-400 hover:text-[#00f0ff]"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#00f0ff] text-[#00f0ff]' : ''}`} />
                  </button>
                </div>

                <div>
                  <div className="h-44 rounded-xl overflow-hidden bg-[#080a10] flex items-center justify-center p-3 mb-3 border border-[#1b2336]">
                    <img src={p.image_url} alt={p.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-[#00f0ff] uppercase">{p.brand || 'NIKE'}</div>
                    <h3 className="font-extrabold text-xs uppercase leading-snug text-white line-clamp-2">{p.title}</h3>
                    
                    {p.size && (
                      <div className="inline-flex items-center gap-1 text-[10px] bg-[#080a10] px-2 py-0.5 rounded text-slate-400 border border-[#1b2336]">
                        <Tag className="w-2.5 h-2.5 text-[#00f0ff]" />
                        <span>{p.size}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1b2336] flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-sm text-[#00f0ff] font-display block">
                      {p.price.toLocaleString('ru-RU')} {currencySymbol}
                    </span>
                    {p.oldPrice && (
                      <span className="line-through text-slate-500 text-[10px]">
                        {p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOrder(p)
                    }}
                    className="p-2 rounded-xl bg-[#00f0ff] text-black font-extrabold text-xs flex items-center gap-1 hover:bg-[#33f3ff]"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111624] border border-[#1b2336] rounded-3xl max-w-md w-full p-6 space-y-6 text-white relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-[#080a10]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-2xl bg-[#080a10] flex items-center justify-center p-4 border border-[#1b2336]">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-[#00f0ff] uppercase">{quickViewProduct.brand}</div>
              <h3 className="text-xl font-extrabold uppercase font-display leading-tight">{quickViewProduct.title}</h3>
              <div className="text-2xl font-black text-[#00f0ff] font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-4 bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Купить через Telegram</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export function PoizonFooter({ telegram }) {
  return (
    <footer className="bg-[#111624] border border-[#1b2336] rounded-3xl p-8 text-center space-y-4 text-white">
      <div className="flex items-center justify-center gap-2 text-xs font-black text-[#00f0ff] uppercase">
        <ShieldCheck className="w-4 h-4" />
        <span>POIZON FAST TELEGRAM MARKETPLACE GATEWAY</span>
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl"
      >
        <Send className="w-4 h-4" />
        <span>Купить в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

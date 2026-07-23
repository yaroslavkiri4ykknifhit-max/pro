import React, { useState, useMemo } from 'react'
import { ShieldCheck, Search, ShoppingBag, Send, Tag, Flame, Heart, ChevronDown, X, Filter } from 'lucide-react'

export const poizonTokens = {
  id: 'poizon',
  name: 'STREET MARKETPLACE SHOPIFY THEME',
  subtitle: 'Poizon & StockX Mobile UX',
  desc: 'Нативная мобильная e-commerce архитектура: 2 колонки на смартфоне, модальный Filter Bottom Sheet, неоновые чипсы и моментальный поиск',
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
  return (
    <div className="bg-[#111624] border border-[#1b2336] rounded-2xl py-2 px-4 text-center text-[10px] sm:text-xs font-bold text-[#00f0ff] uppercase flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>POIZON 100% VERIFIED LEGIT CHECK</span>
      </div>
      <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">AIR SHIP 3-5 DAYS</span>
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

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
    <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 text-white">
      
      {/* 1. FRONT-PAGE MARKETPLACE SEARCH & FILTER CONTROLS */}
      <div className="space-y-3 bg-[#111624] p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#1b2336] shadow-2xl">
        
        {/* Instant Search Bar + Filter Trigger */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по кроссовкам и одежде..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080a10] border border-[#1b2336] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f0ff] font-bold"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-1 px-3 py-2.5 bg-[#00f0ff] text-black text-xs font-bold rounded-xl sm:hidden"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Фильтры</span>
          </button>
        </div>

        {/* Category Chips (Mobile Horizontal Native Touch Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap snap-start transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00f0ff] text-black shadow-md shadow-[#00f0ff]/20'
                  : 'bg-[#080a10] text-slate-400 border border-[#1b2336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Brand & Size Selector Row (Hidden on Mobile) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#080a10] border border-[#1b2336] text-xs text-white rounded-xl px-3 py-2 font-bold focus:outline-none cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-[#080a10] border border-[#1b2336] text-xs text-white rounded-xl px-3 py-2 font-bold focus:outline-none cursor-pointer"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
            ))}
          </select>

          <div className="flex items-center justify-end text-xs font-bold text-slate-400">
            Найдено: <span className="text-[#00f0ff] font-extrabold ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. DEDICATED 2-COLUMN MOBILE MARKETPLACE GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-[#111624] rounded-2xl border border-[#1b2336]">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-400" />
          <h3 className="text-xs font-bold uppercase text-slate-300">Ничего не найдено</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-3 px-4 py-2 text-xs font-bold bg-[#00f0ff] text-black rounded-xl"
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
                className="bg-[#111624] border border-[#1b2336] hover:border-[#00f0ff] rounded-xl p-2.5 sm:p-3.5 space-y-2 group transition-all duration-300 relative flex flex-col justify-between shadow-xl cursor-pointer"
              >
                {/* Discount Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-[#ff0055] text-white font-black text-[9px]">
                    -20%
                  </span>
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="text-slate-400 hover:text-[#00f0ff]"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#00f0ff] text-[#00f0ff]' : ''}`} />
                  </button>
                </div>

                {/* Photo (Aspect Ratio 4/5) */}
                <div>
                  <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#080a10] flex items-center justify-center p-2 mb-2 border border-[#1b2336]">
                    <img src={p.image_url} alt={p.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-[#00f0ff] uppercase truncate">{p.brand || 'NIKE'}</div>
                    <h3 className="font-extrabold text-[11px] sm:text-xs uppercase leading-tight text-white line-clamp-2">{p.title}</h3>
                    
                    {p.size && (
                      <div className="inline-flex items-center gap-1 text-[9px] bg-[#080a10] px-1.5 py-0.5 rounded text-slate-400 border border-[#1b2336] truncate max-w-full">
                        <Tag className="w-2.5 h-2.5 text-[#00f0ff]" />
                        <span>{p.size}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1b2336] flex items-center justify-between gap-1">
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm text-[#00f0ff] font-display block leading-none">
                      {p.price.toLocaleString('ru-RU')} {currencySymbol}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOrder(p)
                    }}
                    className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#00f0ff] text-black font-extrabold text-[10px] flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* MOBILE BOTTOM SHEET FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:hidden">
          <div className="bg-[#111624] border-t border-[#1b2336] w-full p-5 space-y-4 rounded-t-3xl text-white animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-[#1b2336] pb-3">
              <h3 className="text-sm font-bold uppercase text-white">Фильтры маркетплейса</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Бренд:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#080a10] border border-[#1b2336] p-2.5 text-xs text-white rounded-xl"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Размер:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#080a10] border border-[#1b2336] p-2.5 text-xs text-white rounded-xl"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full py-3 bg-[#00f0ff] text-black font-bold text-xs uppercase rounded-xl"
            >
              Применить ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111624] border border-[#1b2336] rounded-3xl max-w-sm w-full p-5 space-y-4 text-white relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 p-1.5 text-slate-400 rounded-full bg-[#080a10]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-56 rounded-2xl bg-[#080a10] flex items-center justify-center p-3 border border-[#1b2336]">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-black text-[#00f0ff] uppercase">{quickViewProduct.brand}</div>
              <h3 className="text-sm font-extrabold uppercase leading-tight">{quickViewProduct.title}</h3>
              <div className="text-xl font-black text-[#00f0ff] font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-3.5 bg-[#00f0ff] text-black font-extrabold text-xs uppercase rounded-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Купить в Telegram</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export function PoizonFooter({ telegram }) {
  return (
    <footer className="bg-[#111624] border border-[#1b2336] rounded-2xl p-6 text-center space-y-3 text-white">
      <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#00f0ff] uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>POIZON FAST TELEGRAM MARKETPLACE</span>
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

import React, { useState, useMemo } from 'react'
import { ShieldCheck, Search, ShoppingBag, Send, Tag, Flame, Heart, ChevronDown, X, Filter } from 'lucide-react'

export const poizonTokens = {
  id: 'poizon',
  name: 'STREET MARKETPLACE SHOPIFY THEME',
  subtitle: 'Poizon & StockX Mobile UX',
  desc: 'Нативная мобильная карточка: 2 колонки (50% ширины), пропорции 4:5, неоновые акценты cyan и мгновенный заказ в Telegram',
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
    <div className="bg-[#111624] border border-[#1b2336] rounded-xl py-2 px-3 text-center text-[10px] font-bold text-[#00f0ff] uppercase flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>POIZON 100% VERIFIED LEGIT CHECK</span>
      </div>
      <span className="text-slate-400 font-mono text-[9px]">EXPRESS 3-5 DAYS</span>
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
    <div className="w-full space-y-3 p-2 text-white">
      
      {/* SEARCH BAR & CATEGORY SWIPE CHIPS */}
      <div className="space-y-2 bg-[#111624] p-3 rounded-2xl border border-[#1b2336] shadow-xl">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по модели или бренду..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080a10] border border-[#1b2336] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f0ff] font-bold"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-1 px-3 py-2 bg-[#00f0ff] text-black text-xs font-bold rounded-xl"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap snap-start transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00f0ff] text-black shadow-md shadow-[#00f0ff]/20'
                  : 'bg-[#080a10] text-slate-400 border border-[#1b2336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RE-ARCHITECTED 2-COLUMN MARKETPLACE MOBILE PRODUCT GRID (EXACTLY 2 COLUMNS) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 bg-[#111624] rounded-2xl border border-[#1b2336]">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
          <h3 className="text-xs font-bold uppercase text-slate-300">Ничего не найдено</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="w-full min-w-0 bg-[#111624] border border-[#1b2336] hover:border-[#00f0ff] rounded-xl p-2.5 flex flex-col justify-between space-y-2 group cursor-pointer shadow-xl transition-all"
              >
                {/* 1. PHOTO (ASPECT RATIO 4:5) */}
                <div className="w-full aspect-[4/5] rounded-lg bg-[#080a10] border border-[#1b2336] relative flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge Tag */}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#ff0055] text-white font-black text-[9px]">
                    -20%
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-[#00f0ff]"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#00f0ff] text-[#00f0ff]' : ''}`} />
                  </button>
                </div>

                {/* 2. PRODUCT DETAILS */}
                <div className="space-y-1 flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-black text-[#00f0ff] uppercase truncate">
                      {p.brand || 'NIKE'}
                    </div>

                    <h3 className="font-extrabold text-[11px] uppercase tracking-tight text-white line-clamp-2 leading-tight">
                      {p.title}
                    </h3>

                    {p.size && (
                      <div className="inline-flex items-center gap-1 text-[9px] bg-[#080a10] px-1.5 py-0.5 rounded text-slate-400 border border-[#1b2336] truncate max-w-full">
                        <Tag className="w-2.5 h-2.5 text-[#00f0ff]" />
                        <span>{p.size}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-1.5 space-y-1.5 border-t border-[#1b2336]">
                    <div className="font-extrabold text-xs text-[#00f0ff] font-display leading-none">
                      {p.price.toLocaleString('ru-RU')} {currencySymbol}
                    </div>

                    {/* Full Width Telegram Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="w-full py-2 rounded-lg bg-[#00f0ff] text-black font-extrabold text-[10px] uppercase flex items-center justify-center gap-1 hover:bg-[#33f3ff] transition-colors"
                    >
                      <span>Купить в TG</span>
                      <Send className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {/* BOTTOM SHEET FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end">
          <div className="bg-[#111624] border-t border-[#1b2336] w-full p-4 space-y-3 rounded-t-3xl text-white">
            <div className="flex items-center justify-between border-b border-[#1b2336] pb-2">
              <h3 className="text-xs font-bold uppercase text-white">Фильтры маркетплейса</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Бренд:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#080a10] border border-[#1b2336] p-2 text-xs text-white rounded-xl"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Размер:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#080a10] border border-[#1b2336] p-2 text-xs text-white rounded-xl"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full py-2.5 bg-[#00f0ff] text-black font-bold text-xs uppercase rounded-xl"
            >
              Применить ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111624] border border-[#1b2336] rounded-2xl max-w-xs w-full p-4 space-y-3 text-white relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-2 right-2 p-1 text-slate-400 bg-[#080a10] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-48 rounded-xl bg-[#080a10] flex items-center justify-center p-2 border border-[#1b2336]">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-black text-[#00f0ff] uppercase">{quickViewProduct.brand}</div>
              <h3 className="text-xs font-extrabold uppercase leading-tight">{quickViewProduct.title}</h3>
              <div className="text-lg font-black text-[#00f0ff] font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-3 bg-[#00f0ff] text-black font-extrabold text-xs uppercase rounded-xl flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
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
    <footer className="bg-[#111624] border border-[#1b2336] rounded-xl p-4 text-center space-y-2 text-white">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-[#00f0ff] uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>POIZON FAST TELEGRAM MARKETPLACE</span>
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00f0ff] text-black font-extrabold text-[10px] uppercase rounded-xl"
      >
        <Send className="w-3 h-3" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

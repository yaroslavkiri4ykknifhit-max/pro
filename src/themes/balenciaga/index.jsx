import React, { useState, useMemo } from 'react'
import { Search, Heart, Send, ChevronDown, X, Filter } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'LUXURY BOUTIQUE SHOPIFY THEME',
  subtitle: 'Farfetch Mobile Card UX',
  desc: 'Нативная мобильная карточка e-commerce: сетка 2 колонок, пропорции 4:5, полноширинная кнопка заказа в TG и чистая типографика',
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
    <div className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-3 text-center border-b border-black">
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
    <div className="w-full space-y-3 p-2 text-black font-sans">
      
      {/* SEARCH BAR & CATEGORIES SCROLL BAR */}
      <div className="space-y-2.5 border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-black pl-9 pr-3 py-2 text-xs font-bold text-black uppercase tracking-wider placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-1 px-3 py-2 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider whitespace-nowrap snap-start transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RE-ARCHITECTED NATIVE E-COMMERCE MOBILE PRODUCT GRID (EXACTLY 2 COLUMNS, 50% EACH) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border-2 border-black">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <h3 className="text-xs font-black uppercase tracking-wider">Товары не найдены</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="w-full min-w-0 bg-white border-2 border-black p-2 flex flex-col justify-between space-y-2 cursor-pointer group"
              >
                {/* 1. PHOTO (E-COMMERCE ASPECT RATIO 4:5) */}
                <div className="w-full aspect-[4/5] bg-slate-50 border border-slate-200 relative flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-1.5 right-1.5 p-1 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                {/* 2. PRODUCT DETAILS */}
                <div className="space-y-1 flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
                      {p.brand || 'BALENCIAGA'}
                    </div>

                    <h3 className="font-extrabold text-[11px] uppercase tracking-tight text-black line-clamp-2 leading-tight">
                      {p.title}
                    </h3>

                    {p.size && (
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate">
                        Размер: {p.size}
                      </div>
                    )}
                  </div>

                  <div className="pt-1.5 space-y-1.5 border-t border-slate-100">
                    <div className="font-black text-xs text-black leading-none font-display">
                      {p.price.toLocaleString('ru-RU')} {currencySymbol}
                    </div>

                    {/* Full Width Telegram Purchase Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="w-full py-2 bg-black text-white text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors"
                    >
                      <span>Заказать в TG</span>
                      <Send className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {/* FILTER DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end">
          <div className="bg-white border-t-2 border-black w-full p-4 space-y-3 text-black">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <h3 className="text-xs font-black uppercase">Фильтры</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 border border-black">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Бренд:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-black uppercase"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Размер:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-black uppercase"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full py-2.5 bg-black text-white font-black text-xs uppercase"
            >
              Применить ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-xs w-full p-4 space-y-3 text-black relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-2 right-2 p-1 text-black border border-black"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-48 bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-1">
              <div className="text-[9px] font-black text-slate-400 uppercase">{quickViewProduct.brand}</div>
              <h3 className="text-xs font-black uppercase font-display leading-tight">{quickViewProduct.title}</h3>
              <div className="text-lg font-black font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-3 bg-black text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
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
    <footer className="border-t-2 border-black bg-black text-white py-4 px-3 text-center space-y-2">
      <div className="text-[9px] font-black uppercase tracking-widest">
        LUXURY BOUTIQUE TELEGRAM MARKETPLACE
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black font-black text-[10px] uppercase tracking-wider"
      >
        <Send className="w-3 h-3" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

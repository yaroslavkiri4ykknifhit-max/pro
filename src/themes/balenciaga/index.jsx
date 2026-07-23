import React, { useState, useMemo } from 'react'
import { Search, Heart, Send, ChevronDown, SlidersHorizontal, X, Check, ArrowRight } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'LUXURY BOUTIQUE SHOPIFY THEME',
  subtitle: 'Farfetch & SSENSE Style',
  desc: 'Премиальный e-commerce каталог 3 колонок: чистые пропорции 4:5, заглавная типографика, мгновенный фильтр размеров и заказы в Telegram',
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
  // Ultra compact 1-line e-commerce trust bar
  return (
    <div className="bg-black text-white text-[11px] font-black uppercase tracking-[0.25em] py-2.5 px-4 text-center border-b border-black">
      {props?.title || 'LUXURY BOUTIQUE CATALOGUE • 100% AUTHENTIC GUARANTEED'}
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
    <div className="space-y-6 py-4 px-4 sm:px-8 max-w-[1350px] mx-auto text-black">
      
      {/* 1. FRONT-PAGE E-COMMERCE SEARCH & FILTER SYSTEM */}
      <div className="space-y-4 border-b-2 border-black pb-6">
        
        {/* Instant Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-60" />
          <input
            type="text"
            placeholder="Поиск по 300+ позициям гардероба (название, бренд)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-black pl-11 pr-4 py-3 text-xs font-black text-black uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:bg-slate-50"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Size Filter Selector Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
          </div>

          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-xs font-black uppercase tracking-widest text-slate-400">
            ТОВАРОВ: <span className="text-black font-black ml-1.5">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. 3-COLUMN COMMERCIAL E-COMMERCE PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border-2 border-black">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <h3 className="text-sm font-black uppercase tracking-wider">Товары не найдены</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-4 px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-widest"
          >
            Сбросить все фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer flex flex-col justify-between space-y-3 border-2 border-black p-4 bg-white hover:shadow-2xl transition-all"
              >
                {/* Product Photo Box (4:5 E-Commerce Ratio) */}
                <div className="h-64 sm:h-72 w-full bg-slate-50 relative flex items-center justify-center p-3 overflow-hidden border border-slate-200">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black px-2.5 py-1 uppercase tracking-widest">
                    {p.is_available ? 'В НАЛИЧИИ' : 'ПОД ЗАКАЗ'}
                  </span>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-3 right-3 p-2 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
                    {p.brand || 'BALENCIAGA'}
                  </div>
                  <h3 className="font-extrabold text-xs uppercase tracking-tight leading-snug font-display text-black line-clamp-2">
                    {p.title}
                  </h3>

                  {p.size && (
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Размеры: {p.size}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div>
                      <span className="font-black text-lg font-display text-black block">
                        {p.price.toLocaleString('ru-RU')} {currencySymbol}
                      </span>
                      {p.oldPrice && (
                        <span className="line-through text-slate-400 text-[10px] font-bold">
                          {p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <span>Купить в TG</span>
                      <Send className="w-3 h-3" />
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-md w-full p-6 space-y-6 text-black relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-black hover:bg-slate-100 border border-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-lg font-black uppercase font-display leading-tight">{quickViewProduct.title}</h3>
              <div className="text-2xl font-black font-display">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-4 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Оформить заказ в Telegram</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export function BalenciagaFooter({ telegram }) {
  return (
    <footer className="border-t-2 border-black bg-black text-white py-8 px-6 text-center space-y-3">
      <div className="text-xs font-black uppercase tracking-widest">
        LUXURY BOUTIQUE TELEGRAM MARKETPLACE
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200"
      >
        <Send className="w-4 h-4" />
        <span>Заказать в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

import React, { useState, useMemo } from 'react'
import { Heart, Search, ChevronDown, Send, ArrowRight, Eye, SlidersHorizontal, X } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'BALENCIAGA TYPE',
  subtitle: 'Luxury Fashion Catalogue',
  desc: 'Крупный 2-колоночный каталог высокой моды: заглавные монохромные бренды, минималистичные цены и быстрая фильтрация',
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
    containerWidth: '1300px'
  }
}

export function BalenciagaHero({ props }) {
  // Ultra compact minimal bar instead of giant hero
  return (
    <div className="py-4 border-b-2 border-black bg-black text-white text-center text-xs font-black uppercase tracking-[0.3em]">
      {props?.title || 'BALENCIAGA ARCHIVE CATALOGUE • 100% AUTHENTIC'}
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
  const brands = ['ВСЕ БРЕНДЫ', 'BALENCIAGA', 'ENFANTS RICHES DEPRIMES', 'Y-3', 'VETEMENTS', 'OFF-WHITE']
  const sizes = ['ВСЕ', 'S', 'M', 'L', 'XL', '41', '42', '43', '44']

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
      `• Каталог: Balenciaga Type`
    window.open(`https://t.me/${rawTg.replace('@', '')}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  return (
    <div className="space-y-8 py-6 px-4 max-w-[1300px] mx-auto text-black">
      
      {/* 1. SEARCH & FILTER TOOLBAR FRONT AND CENTER */}
      <div className="space-y-4 border-b-2 border-black pb-6">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-60" />
          <input
            type="text"
            placeholder="ПОИСК ПО НАЗВАНИЮ, БРЕНДУ ИЛИ АРТИКУЛУ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-black px-12 py-3.5 text-xs font-black text-black uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 transition-colors"
          />
        </div>

        {/* Category Pills & Dropdowns */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Size Filter Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
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
              className="w-full appearance-none bg-white border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s === 'ВСЕ' ? 'ВСЕ РАЗМЕРЫ' : `РАЗМЕР: ${s}`}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-xs font-black uppercase tracking-widest text-slate-400">
            НАЙДЕНО: <span className="text-black font-black ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. 2-COLUMN LUXURY FASHION CARDS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 border-2 border-black">
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
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer flex flex-col justify-between space-y-4 border-b-2 border-black pb-8"
              >
                {/* Image Frame */}
                <div className="h-80 sm:h-96 w-full bg-slate-50 border-2 border-black relative flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                    {p.is_available ? 'В НАЛИЧИИ' : 'ПОД ЗАКАЗ'}
                  </span>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-4 right-4 p-2.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    <Heart className={`w-5 h-5 stroke-[2] ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-display">
                    {p.brand || 'BALENCIAGA'}
                  </div>
                  <h3 className="font-black text-base uppercase tracking-tight leading-tight font-display text-black line-clamp-2">
                    {p.title}
                  </h3>

                  {p.size && (
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Размеры: {p.size}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="flex items-baseline gap-3">
                      <span className="font-black text-2xl font-display text-black">
                        {p.price.toLocaleString('ru-RU')} {currencySymbol}
                      </span>
                      {p.oldPrice && (
                        <span className="line-through text-slate-400 text-xs font-bold">
                          {p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      <span>Купить в TG</span>
                      <Send className="w-3.5 h-3.5" />
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
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 space-y-6 text-black relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-black hover:bg-slate-100 border border-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-72 bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-xl font-black uppercase font-display leading-tight">{quickViewProduct.title}</h3>
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
    <footer className="border-t-4 border-black bg-black text-white py-12 px-8 text-center space-y-6">
      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tight font-display">
          BALENCIAGA CLIENT SERVICE
        </h3>
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Прямой приём заказов и консультация стилиста в Telegram
        </p>
      </div>

      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-200"
      >
        <Send className="w-4 h-4" />
        <span>Заказать в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

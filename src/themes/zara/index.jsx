import React, { useState, useMemo } from 'react'
import { Search, Send, ArrowUpRight, Heart, ChevronDown, X, Tag } from 'lucide-react'

export const zaraTokens = {
  id: 'zara',
  name: 'EDITORIAL STORE CATALOGUE',
  subtitle: 'Vogue & SSENSE Style Catalogue',
  desc: 'Редакционная эстетика каталога: крупная portrait фотография (520px), быстрый поиск на первом экране, 1400px широкий макет',
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
    borderRadius: '0px',
    shadow: 'none',
    containerWidth: '1400px'
  }
}

export function ZaraHero({ props }) {
  // Minimal compact editorial bar
  return (
    <div className="py-3 px-6 bg-[#faf9f5] border-b border-black text-center text-xs font-serif uppercase tracking-[0.3em] text-slate-600">
      EDITORIAL CATALOGUE ISSUE N° 42 • CURATED SELECTION
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
  const brands = ['ВСЕ БРЕНДЫ', 'ZARA', 'COS', 'MAISON MARGIELA', 'JIL SANDER', 'ACNE STUDIOS']
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
      `• Каталог: Editorial Store`
    window.open(`https://t.me/${rawTg.replace('@', '')}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  return (
    <div className="space-y-12 py-8 px-6 max-w-[1400px] mx-auto text-black">
      
      {/* 1. FRONT-PAGE EDITORIAL SEARCH & FILTERS */}
      <div className="space-y-6 border-b border-black pb-8">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search items, designer brands or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#faf9f5] border border-black/20 pl-12 pr-4 py-3.5 text-xs text-black font-serif uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:border-black"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 text-xs font-serif uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-black text-white' : 'bg-[#faf9f5] text-slate-600 hover:text-black border border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand & Size Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-serif">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#faf9f5] border border-slate-300 px-4 py-3 text-xs font-serif uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-[#faf9f5] border border-slate-300 px-4 py-3 text-xs font-serif uppercase tracking-wider text-black cursor-pointer focus:outline-none"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === 'ВСЕ' ? 'ALL SIZES' : `SIZE: ${s}`}</option>
            ))}
          </select>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-end text-xs font-mono font-bold text-slate-400">
            ITEMS FOUND: <span className="text-black font-extrabold ml-1">{filteredProducts.length}</span>
          </div>
        </div>

      </div>

      {/* 2. 2-COLUMN WIDE ULTRA TALL PORTRAIT CARDS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#faf9f5] border border-slate-200">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
          <h3 className="text-sm font-serif uppercase tracking-widest">No Items Match Filter</h3>
          <button
            onClick={() => {
              setSelectedCategory('ВСЕ')
              setSelectedBrand('ВСЕ БРЕНДЫ')
              setSelectedSize('ВСЕ')
              setSearchQuery('')
            }}
            className="mt-4 px-6 py-3 bg-black text-white text-xs font-serif uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
          {filteredProducts.map((p) => {
            const isFav = favorites[p.id]
            return (
              <div
                key={p.id}
                onClick={() => setQuickViewProduct(p)}
                className="group cursor-pointer space-y-4"
              >
                <div className="h-[480px] w-full bg-[#faf9f5] overflow-hidden relative border border-slate-200">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <button
                    onClick={(e) => toggleFav(p.id, e)}
                    className="absolute top-4 right-4 p-3 bg-white border border-slate-200"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-black text-black' : ''}`} />
                  </button>

                  <button className="absolute bottom-4 right-4 p-3 bg-black text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em] font-sans">{p.brand || 'EDITORIAL'}</div>
                  <h3 className="font-serif text-lg font-normal uppercase tracking-wider text-black">{p.title}</h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold font-serif text-black">{p.price.toLocaleString('ru-RU')} {currencySymbol}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(p)
                      }}
                      className="px-5 py-2.5 bg-black text-white text-xs font-serif uppercase tracking-widest hover:bg-slate-800"
                    >
                      Buy in TG
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
          <div className="bg-[#faf9f5] border border-black max-w-lg w-full p-6 space-y-6 text-black relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-black border border-slate-300 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-80 bg-white border border-slate-200 flex items-center justify-center p-4">
              <img src={quickViewProduct.image_url} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase font-sans tracking-widest">{quickViewProduct.brand}</div>
              <h3 className="text-2xl font-serif uppercase leading-tight">{quickViewProduct.title}</h3>
              <div className="text-2xl font-bold font-serif">{quickViewProduct.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>

            <button
              onClick={() => handleOrder(quickViewProduct)}
              className="w-full py-4 bg-black text-white text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800"
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
    <footer className="py-12 px-8 text-center space-y-6 bg-[#faf9f5] border-t border-black text-black">
      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-2xl font-serif font-light uppercase tracking-widest">EDITORIAL CONCIERGE</h3>
        <p className="text-xs text-slate-500 uppercase font-sans tracking-wider">Приём заказов и консультация по наличию в Telegram</p>
      </div>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em]"
      >
        <Send className="w-4 h-4" />
        <span>Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

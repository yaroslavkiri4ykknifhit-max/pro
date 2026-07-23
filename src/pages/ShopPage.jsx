import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShoppingBag,
  Send,
  MessageSquare,
  X,
  Share2,
  Tag,
  Layers,
  Search,
  Heart,
  ChevronDown
} from 'lucide-react'
import { useStore } from '../store/useStore'

export function ShopPage() {
  const { shopSlug } = useParams()
  const { shops, products } = useStore()

  // Find shop matching current slug
  const shop = shops.find((s) => s.slug === shopSlug) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === shop?.id)

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ')
  const [selectedBrand, setSelectedBrand] = useState('ВСЕ БРЕНДЫ')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState({})

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)

  // Theme config fallback
  const theme = shop?.theme_config || {
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    cardBg: '#ffffff',
    font: 'Inter',
    logoText: 'under buy',
    logoUrl: '',
    currencySymbol: '₽',
    telegram: 'underbuy_admin'
  }

  const currencySymbol = theme.currencySymbol || '₽'
  const logoText = theme.logoText || shop?.name || 'under buy'

  // Categories & Brands list
  const categories = useMemo(() => {
    const cats = new Set(['ВСЕ'])
    shopProducts.forEach((p) => {
      if (p.category) cats.add(p.category.toUpperCase())
    })
    return Array.from(cats)
  }, [shopProducts])

  const brands = useMemo(() => {
    const bnd = new Set(['ВСЕ БРЕНДЫ'])
    shopProducts.forEach((p) => {
      if (p.brand) bnd.add(p.brand.toUpperCase())
    })
    return Array.from(bnd)
  }, [shopProducts])

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((p) => {
      const prodCat = (p.category || '').toUpperCase()
      const prodBrand = (p.brand || '').toUpperCase()

      const matchCat = selectedCategory === 'ВСЕ' || prodCat === selectedCategory
      const matchBrand = selectedBrand === 'ВСЕ БРЕНДЫ' || prodBrand === selectedBrand
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prodBrand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchBrand && matchSearch
    })
  }, [shopProducts, selectedCategory, selectedBrand, searchQuery])

  useEffect(() => {
    if (selectedProduct && selectedProduct.size) {
      const sizes = selectedProduct.size.split(',').map((s) => s.trim())
      if (sizes.length > 0) setSelectedSize(sizes[0])
    }
  }, [selectedProduct])

  const toggleFavorite = (productId, e) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }))
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-400 mb-4" />
        <h1 className="text-2xl font-bold font-display mb-2">Магазин не найден</h1>
        <p className="text-slate-500 text-sm mb-6">
          Витрина <code className="text-black font-bold">/{shopSlug}</code> не существует.
        </p>
        <Link to="/" className="px-6 py-3 bg-black text-white rounded-none text-xs font-bold uppercase">
          На главную
        </Link>
      </div>
    )
  }

  // DIRECT TELEGRAM ORDERING TO RESELLER USERNAME
  const handleTelegramOrder = () => {
    if (!selectedProduct) return
    const rawTg = theme.telegram || 'underbuy_admin'
    const cleanTgUsername = rawTg.replace('@', '').trim()

    const orderMessage = `Привет! Хочу заказать ${selectedProduct.title}\n` +
      `• Цена: ${selectedProduct.price.toLocaleString('ru-RU')} ${currencySymbol}\n` +
      `• Размер: ${selectedSize || 'Не указан'}\n` +
      (selectedProduct.brand ? `• Бренд: ${selectedProduct.brand}\n` : '') +
      `• Витрина: ${shop.name}`

    const encodedText = encodeURIComponent(orderMessage)
    const tgUrl = `https://t.me/${cleanTgUsername}?text=${encodedText}`
    window.open(tgUrl, '_blank')
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const activeBlocks = shop.blocks || [
    { id: 'b-categories', type: 'categories', filterStyle: 'underbuy_dropdowns' },
    { id: 'b-products', type: 'products', columns: 2, cardStyle: 'underbuy' }
  ]

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 flex flex-col bg-white text-black selection:bg-black selection:text-white"
      style={{
        backgroundColor: theme.backgroundColor || '#ffffff',
        color: theme.textColor || '#000000'
      }}
    >
      {/* UNDERBUY STYLE HEADER */}
      <header className="w-full bg-white border-b border-slate-200 py-6 px-4 sm:px-8 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* Logo (Text or Image configurable in constructor) */}
          <Link to={`/s/${shop.slug}`} className="flex items-center gap-2">
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt={logoText} className="h-10 object-contain" />
            ) : (
              <div className="flex flex-col leading-none font-display font-black text-3xl sm:text-4xl tracking-tighter text-black lowercase">
                {logoText.includes(' ') ? (
                  <>
                    <span>{logoText.split(' ')[0]}</span>
                    <span>{logoText.split(' ')[1]}</span>
                  </>
                ) : (
                  <span>{logoText}</span>
                )}
              </div>
            )}
          </Link>

          {/* Right Action Icons (Wishlist & Search) */}
          <div className="flex items-center gap-5">
            <button
              onClick={copyShareLink}
              className="text-xs font-bold uppercase tracking-wider underline opacity-70 hover:opacity-100 hidden sm:inline"
            >
              {copiedLink ? 'Скопировано!' : 'Поделиться'}
            </button>

            <button className="p-1 hover:opacity-75 transition-opacity" title="Избранное">
              <Heart className="w-6 h-6 stroke-[1.8] text-black" />
            </button>

            <button
              onClick={() => {
                const searchEl = document.getElementById('shop-search-input')
                if (searchEl) searchEl.focus()
              }}
              className="p-1 hover:opacity-75 transition-opacity"
              title="Поиск"
            >
              <Search className="w-6 h-6 stroke-[1.8] text-black" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Dynamic Blocks Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow space-y-8">
        {activeBlocks.map((block) => {

          // BLOCK 1: UNDERBUY RECTANGULAR DROPDOWN FILTERS
          if (block.type === 'categories') {
            return (
              <div key={block.id} className="space-y-4 pt-2">
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-black" />
                  <input
                    id="shop-search-input"
                    type="text"
                    placeholder="Поиск по наименованию или бренду..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded-none pl-11 pr-4 py-3 text-xs font-bold text-black uppercase tracking-wider placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 transition-colors"
                  />
                </div>

                {/* Side-by-side Outlined Dropdowns (Underbuy screenshot style) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  
                  {/* Category Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none bg-white border-2 border-black rounded-none px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black stroke-[2.5]" />
                  </div>

                  {/* Brand Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full appearance-none bg-white border-2 border-black rounded-none px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-black cursor-pointer pr-10 focus:outline-none"
                    >
                      {brands.map((br) => (
                        <option key={br} value={br}>
                          {br}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black stroke-[2.5]" />
                  </div>

                </div>

              </div>
            )
          }

          // BLOCK 2: UNDERBUY PRODUCT CARD GRID (Pixel-perfect matching screenshot)
          if (block.type === 'products') {
            const colsClass =
              block.columns === 1
                ? 'grid-cols-1'
                : block.columns === 3
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2' // Default 2 columns as in screenshot

            return (
              <div key={block.id} className="space-y-6 pt-2">
                {block.title && (
                  <h2 className="text-xl font-black font-display uppercase tracking-tight">{block.title}</h2>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 border-2 border-black rounded-none">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Товары не найдены</h3>
                    <button
                      onClick={() => {
                        setSelectedCategory('ВСЕ')
                        setSelectedBrand('ВСЕ БРЕНДЫ')
                        setSearchQuery('')
                      }}
                      className="mt-4 px-5 py-2.5 text-xs font-extrabold bg-black text-white uppercase tracking-wider"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                ) : (
                  <div className={`grid ${colsClass} gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12`}>
                    {filteredProducts.map((product) => {
                      const isFav = favorites[product.id]
                      return (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="group cursor-pointer flex flex-col justify-between space-y-3"
                        >
                          <div>
                            {/* Product Photo with Heart Icon at Top-Right */}
                            <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-3">
                              <img
                                src={product.image_url}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Heart Wishlist Icon */}
                              <button
                                onClick={(e) => toggleFavorite(product.id, e)}
                                className="absolute top-3 right-3 p-1 hover:scale-110 transition-transform z-10"
                              >
                                <Heart
                                  className={`w-5 h-5 stroke-[2] transition-colors ${
                                    isFav ? 'fill-black text-black' : 'text-black stroke-black fill-none'
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Product Details Typography matching Screenshot */}
                            <div className="space-y-1">
                              {/* Brand in Uppercase Gray */}
                              {product.brand && (
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display">
                                  {product.brand}
                                </div>
                              )}

                              {/* Title in Bold Black */}
                              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-tight leading-snug text-black font-display line-clamp-2">
                                {product.title}
                              </h3>

                              {/* Price Row (Large Bold Price + Old Price) */}
                              <div className="flex items-baseline justify-between pt-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="font-black text-lg sm:text-xl font-display text-black tracking-tight">
                                    {product.price.toLocaleString('ru-RU')} {currencySymbol}
                                  </span>
                                  {product.oldPrice && (
                                    <span className="line-through text-slate-400 text-xs font-semibold">
                                      {product.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Category Tag at Bottom */}
                          {product.category && (
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1 border-t border-slate-100 font-display">
                              {product.category}
                            </div>
                          )}

                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          // BLOCK 3: BANNER
          if (block.type === 'banner') {
            return (
              <div key={block.id} className="relative border-2 border-black p-8 sm:p-12 text-center bg-black text-white space-y-3">
                {block.imageUrl && (
                  <img src={block.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                )}
                <div className="relative z-10 space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight">{block.title}</h2>
                  {block.subtitle && <p className="text-xs sm:text-sm opacity-80 uppercase tracking-wider">{block.subtitle}</p>}
                </div>
              </div>
            )
          }

          // BLOCK 4: CONTACT / TELEGRAM CTA
          if (block.type === 'contact') {
            return (
              <div key={block.id} className="border-2 border-black p-8 text-center space-y-4 bg-black text-white">
                <h3 className="text-xl font-black uppercase font-display tracking-tight">{block.title}</h3>
                {block.subtitle && <p className="text-xs text-slate-300 max-w-md mx-auto">{block.subtitle}</p>}
                <div>
                  <a
                    href={`https://t.me/${(theme.telegram || 'underbuy_admin').replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Написать в Telegram (@{(theme.telegram || 'underbuy_admin').replace('@', '')})</span>
                  </a>
                </div>
              </div>
            )
          }

          return null
        })}
      </main>

      {/* Footer Branding */}
      <footer className="w-full py-8 text-center text-xs opacity-60 border-t border-slate-200 mt-12">
        <p>© {new Date().getFullYear()} {logoText.toUpperCase()}. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        <p className="mt-1">Витрина создана на <Link to="/" className="underline font-bold text-black">Creatiwise Platform</Link></p>
      </footer>

      {/* PRODUCT ORDER MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-md w-full p-6 space-y-6 text-black relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-black hover:bg-slate-100 rounded-none border border-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-slate-200">
                <img src={selectedProduct.image_url} alt={selectedProduct.title} className="max-h-full max-w-full object-contain" />
              </div>

              <div>
                {selectedProduct.brand && (
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    {selectedProduct.brand}
                  </span>
                )}
                <h3 className="text-lg font-black uppercase font-display leading-tight">{selectedProduct.title}</h3>
                <div className="text-2xl font-black mt-2 font-display">
                  {selectedProduct.price.toLocaleString('ru-RU')} {currencySymbol}
                </div>
              </div>

              {/* Size Selector */}
              {selectedProduct.size && (
                <div className="space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider block">Выберите размер:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.size.split(',').map((sz) => {
                      const cleanSize = sz.trim()
                      const isSelected = selectedSize === cleanSize
                      return (
                        <button
                          key={cleanSize}
                          onClick={() => setSelectedSize(cleanSize)}
                          className={`px-4 py-2 text-xs font-bold border-2 transition-all ${
                            isSelected
                              ? 'bg-black text-white border-black shadow-md'
                              : 'bg-white text-black border-slate-300 hover:border-black'
                          }`}
                        >
                          {cleanSize}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Telegram Order Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleTelegramOrder}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all border border-black shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Купить в Telegram (@{(theme.telegram || 'underbuy_admin').replace('@', '')})</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

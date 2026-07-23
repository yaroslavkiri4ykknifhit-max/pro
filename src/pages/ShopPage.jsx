import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShoppingBag,
  Send,
  MessageSquare,
  CheckCircle,
  X,
  Share2,
  Tag,
  Filter,
  Layers,
  Search,
  ExternalLink
} from 'lucide-react'
import { useStore } from '../store/useStore'

export function ShopPage() {
  const { shopSlug } = useParams()
  const { shops, products } = useStore()

  // Find shop matching current slug
  const shop = shops.find((s) => s.slug === shopSlug) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === shop?.id)

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedBrand, setSelectedBrand] = useState('Все бренды')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)

  // Default theme fallback
  const theme = shop?.theme_config || {
    primaryColor: '#0066ff',
    backgroundColor: '#090a0f',
    textColor: '#ffffff',
    cardBg: '#12141d',
    font: 'Inter',
    bannerUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
    logoUrl: '',
    whatsapp: '',
    telegram: 'reseller_admin'
  }

  // Calculate unique categories and brands
  const categories = useMemo(() => {
    const cats = new Set(['Все'])
    shopProducts.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats)
  }, [shopProducts])

  const brands = useMemo(() => {
    const bnd = new Set(['Все бренды'])
    shopProducts.forEach((p) => {
      if (p.brand) bnd.add(p.brand)
    })
    return Array.from(bnd)
  }, [shopProducts])

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((p) => {
      const matchCat = selectedCategory === 'Все' || p.category === selectedCategory
      const matchBrand = selectedBrand === 'Все бренды' || p.brand === selectedBrand
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchBrand && matchSearch
    })
  }, [shopProducts, selectedCategory, selectedBrand, searchQuery])

  useEffect(() => {
    if (selectedProduct && selectedProduct.size) {
      const sizes = selectedProduct.size.split(',').map((s) => s.trim())
      if (sizes.length > 0) setSelectedSize(sizes[0])
    }
  }, [selectedProduct])

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#090a0f] text-white flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-500 mb-4" />
        <h1 className="text-2xl font-bold font-display mb-2">Магазин не найден</h1>
        <p className="text-slate-400 text-sm mb-6 max-w-sm">
          Страница магазина <code className="text-blue-400">/{shopSlug}</code> не существует.
        </p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-full text-xs font-bold">
          На главную
        </Link>
      </div>
    )
  }

  // DIRECT TELEGRAM ORDERING TO RESELLER USERNAME
  const handleTelegramOrder = () => {
    if (!selectedProduct) return
    const rawTg = theme.telegram || 'reseller_admin'
    const cleanTgUsername = rawTg.replace('@', '').trim()

    // Formatted message strictly as requested
    const orderMessage = `Привет! Хочу заказать ${selectedProduct.title}\n` +
      `• Цена: ${selectedProduct.price.toLocaleString('ru-RU')} ₽\n` +
      `• Размер: ${selectedSize || 'Не указан'}\n` +
      (selectedProduct.brand ? `• Бренд: ${selectedProduct.brand}\n` : '') +
      `• Витрина: ${shop.name}`

    const encodedText = encodeURIComponent(orderMessage)
    const tgUrl = `https://t.me/${cleanTgUsername}?text=${encodedText}`

    // Redirect buyer directly to reseller's Telegram
    window.open(tgUrl, '_blank')
  }

  const handleWhatsAppOrder = () => {
    if (!selectedProduct) return
    const cleanWa = (theme.whatsapp || '').replace(/[^0-9]/g, '')
    const orderMessage = `Привет! Хочу заказать ${selectedProduct.title}, цена: ${selectedProduct.price} ₽, размер: ${selectedSize || 'Не указан'}`
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(orderMessage)}`, '_blank')
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white"
      style={{
        backgroundColor: theme.backgroundColor || '#090a0f',
        color: theme.textColor || '#ffffff'
      }}
    >
      {/* Top Banner Header */}
      <div className="w-full relative h-48 sm:h-64 md:h-80 overflow-hidden bg-slate-900">
        {theme.bannerUrl && (
          <img
            src={theme.bannerUrl}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Top Share Button */}
        <div className="absolute top-4 right-4 max-w-5xl mx-auto z-10">
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/80 transition-all border border-white/15 shadow-md"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Ссылка скопирована!' : 'Поделиться витриной'}</span>
          </button>
        </div>

        {/* Shop Avatar & Info Overlay */}
        <div className="absolute bottom-6 left-4 right-4 max-w-5xl mx-auto flex items-end gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white/20 overflow-hidden bg-blue-600 shadow-xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt={shop.name} className="w-full h-full object-cover" />
            ) : (
              shop.name[0]
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white drop-shadow-md">
              {shop.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2 drop-shadow">
              {shop.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Catalog Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        
        {/* FILTERS & SEARCH BAR */}
        <div className="space-y-4 mb-8">
          
          {/* Search & Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder="Поиск по названию или бренду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-white/30 backdrop-blur-md"
              />
            </div>

            <div className="text-xs opacity-75 font-medium">
              Показано товаров: <span className="font-bold text-white">{filteredProducts.length}</span> из {shopProducts.length}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold opacity-60 flex items-center gap-1 mr-1">
              <Layers className="w-3.5 h-3.5" />
              Категории:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black shadow-md font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Brand Filter Pills (if brands exist) */}
          {brands.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold opacity-60 flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5" />
                Бренды:
              </span>
              {brands.map((br) => (
                <button
                  key={br}
                  onClick={() => setSelectedBrand(br)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedBrand === br
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                  }`}
                >
                  {br}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Products Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 opacity-60 bg-white/5 rounded-3xl border border-white/10">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold">Товары не найдены</h3>
            <p className="text-xs mt-1">Попробуйте изменить параметры поиска или сбросить фильтры.</p>
            <button
              onClick={() => {
                setSelectedCategory('Все')
                setSelectedBrand('Все бренды')
                setSearchQuery('')
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-full"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group rounded-3xl p-4 border border-white/10 shadow-xl hover:border-white/25 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                style={{ backgroundColor: theme.cardBg || '#12141d' }}
              >
                <div>
                  <div className="h-60 sm:h-64 rounded-2xl overflow-hidden mb-4 relative bg-slate-900">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Available Tag */}
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${
                        product.is_available ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
                      }`}
                    >
                      {product.is_available ? 'В наличии' : 'Распродано'}
                    </span>

                    {/* Brand Pill */}
                    {product.brand && (
                      <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                      {product.category || 'Одежда'}
                    </div>

                    <h3 className="font-bold text-base leading-snug line-clamp-2">
                      {product.title}
                    </h3>
                    
                    {product.size && (
                      <div className="inline-flex items-center gap-1 text-[11px] opacity-75 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        <Tag className="w-3 h-3" />
                        <span>Размеры: {product.size}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-lg font-extrabold font-display" style={{ color: theme.primaryColor || '#0066ff' }}>
                    {product.price.toLocaleString('ru-RU')} ₽
                  </div>

                  <button
                    style={{ backgroundColor: theme.primaryColor || '#0066ff' }}
                    className="px-4 py-2 text-xs font-bold text-white rounded-full shadow-md hover:opacity-90 transition-opacity"
                  >
                    Заказать
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="w-full py-8 text-center text-xs opacity-60 border-t border-white/10">
        <p>© {new Date().getFullYear()} {shop.name}. Все права защищены.</p>
        <p className="mt-1">Витрина создана на <Link to="/" className="underline font-bold text-white">Creatiwise Platform</Link></p>
      </footer>

      {/* BUY / TELEGRAM ORDER MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="rounded-3xl border border-white/20 max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            style={{ backgroundColor: theme.cardBg || '#12141d', color: theme.textColor || '#ffffff' }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="h-56 rounded-2xl overflow-hidden bg-slate-900">
                <img src={selectedProduct.image_url} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>

              <div>
                {selectedProduct.brand && (
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {selectedProduct.brand}
                  </span>
                )}
                <h3 className="text-xl font-bold font-display leading-tight">{selectedProduct.title}</h3>
                <div className="text-2xl font-black mt-1" style={{ color: theme.primaryColor || '#0066ff' }}>
                  {selectedProduct.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>

              {/* Size Selector */}
              {selectedProduct.size && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold opacity-80 block">Выберите размер:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.size.split(',').map((sz) => {
                      const cleanSize = sz.trim()
                      const isSelected = selectedSize === cleanSize
                      return (
                        <button
                          key={cleanSize}
                          onClick={() => setSelectedSize(cleanSize)}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-md'
                              : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
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
              <label className="text-xs font-semibold opacity-80 block">
                Заказ перенаправит напрямую продавцу в Telegram:
              </label>

              <button
                onClick={handleTelegramOrder}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#2AABEE] hover:bg-[#229ed9] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Купить в Telegram (@{(theme.telegram || 'seller').replace('@', '')})</span>
              </button>

              {theme.whatsapp && (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-2xl shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Купить в WhatsApp</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

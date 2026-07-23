import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Trash2,
  Edit,
  Store,
  Package,
  Palette,
  ExternalLink,
  Save,
  Check,
  Copy,
  Eye,
  X,
  Send,
  Sparkles,
  Share2,
  Tag,
  Layers
} from 'lucide-react'
import { useStore } from '../store/useStore'

export function AdminPage() {
  const navigate = useNavigate()
  const {
    shops,
    products,
    activeShopId,
    setActiveShopId,
    createShop,
    updateShop,
    deleteShop,
    addProduct,
    updateProduct,
    deleteProduct
  } = useStore()

  const [activeTab, setActiveTab] = useState('products') // 'products' | 'theme' | 'shops'
  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Current selected shop
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)

  // Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    price: '',
    size: 'S, M, L',
    category: 'Одежда',
    brand: '',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    is_available: true
  })

  // New Shop Form State
  const [shopForm, setShopForm] = useState({
    name: '',
    slug: '',
    description: '',
    telegram: ''
  })

  // Theme Form State
  const [themeForm, setThemeForm] = useState(
    activeShop?.theme_config || {
      primaryColor: '#0066ff',
      backgroundColor: '#090a0f',
      textColor: '#ffffff',
      cardBg: '#12141d',
      font: 'Inter',
      layout: 'grid',
      bannerUrl: '',
      logoUrl: '',
      whatsapp: '',
      telegram: 'reseller_admin'
    }
  )

  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setProdForm({
        title: product.title,
        price: product.price,
        size: product.size || '',
        category: product.category || 'Одежда',
        brand: product.brand || '',
        image_url: product.image_url || '',
        is_available: product.is_available
      })
    } else {
      setEditingProduct(null)
      setProdForm({
        title: '',
        price: '',
        size: 'S, M, L',
        category: 'Одежда',
        brand: 'Nike',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        is_available: true
      })
    }
    setShowProductModal(true)
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    if (!activeShop) return

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...prodForm,
        price: parseFloat(prodForm.price) || 0
      })
    } else {
      addProduct({
        shop_id: activeShop.id,
        title: prodForm.title,
        price: parseFloat(prodForm.price) || 0,
        size: prodForm.size,
        category: prodForm.category,
        brand: prodForm.brand,
        image_url: prodForm.image_url,
        is_available: prodForm.is_available
      })
    }
    setShowProductModal(false)
  }

  const handleSaveShopTheme = (e) => {
    e.preventDefault()
    if (!activeShop) return
    // Clean telegram username (remove @)
    const cleanTg = (themeForm.telegram || '').replace('@', '').trim()
    const updatedTheme = { ...themeForm, telegram: cleanTg }

    updateShop(activeShop.id, { theme_config: updatedTheme })
    setThemeForm(updatedTheme)
    alert('Настройки витрины и Telegram для заказов сохранены!')
  }

  const handleCreateShop = (e) => {
    e.preventDefault()
    if (!shopForm.name) return
    const cleanTg = (shopForm.telegram || '').replace('@', '').trim()
    const newCreated = createShop({
      name: shopForm.name,
      slug: shopForm.slug,
      description: shopForm.description,
      telegram: cleanTg
    })
    setShowShopModal(false)
    setShopForm({ name: '', slug: '', description: '', telegram: '' })
  }

  const copyShopUrl = () => {
    if (!activeShop) return
    const fullUrl = `${window.location.origin}${window.location.pathname}#/s/${activeShop.slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white">Кабинет Ресейлера</h1>
              <p className="text-xs text-slate-400">Автоматическое создание витрин и прием заказов в Telegram</p>
            </div>
          </div>

          {/* Active Shop Switcher & Quick Public Store Link */}
          <div className="flex items-center gap-3">
            <select
              value={activeShopId}
              onChange={(e) => {
                setActiveShopId(e.target.value)
                const newShop = shops.find((s) => s.id === e.target.value)
                if (newShop) setThemeForm(newShop.theme_config)
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {shops.map((s) => (
                <option key={s.id} value={s.id}>
                  🏬 {s.name} (/{s.slug})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowShopModal(true)}
              className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Новый магазин</span>
            </button>

            {activeShop && (
              <button
                onClick={() => navigate(`/s/${activeShop.slug}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Открыть Витрину</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        
        {/* Quick Link Share Banner */}
        {activeShop && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-800/90 border border-blue-500/30 flex items-center justify-between flex-wrap gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Ссылка на вашу витрину для покупателей:</span>
              </div>
              <div className="text-sm font-mono font-bold text-white">
                {window.location.origin}{window.location.pathname}#/s/{activeShop.slug}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyShopUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Ссылка скопирована!' : 'Скопировать ссылку'}</span>
              </button>

              <a
                href={`#/s/${activeShop.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-xl"
                title="Открыть в новой вкладке"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-8 space-x-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Товары ({shopProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-4 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'theme'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Настройка Telegram и Дизайна</span>
          </button>

          <button
            onClick={() => setActiveTab('shops')}
            className={`pb-4 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'shops'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Мои магазины ({shops.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Каталог товаров "{activeShop?.name}"</h2>
                <p className="text-xs text-slate-400">Добавляйте товары с ценой, размерами, брендами и категориями</p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить товар</span>
              </button>
            </div>

            {/* Products Table / Cards Grid */}
            {shopProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-dashed border-slate-700">
                <Package className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-300">В этом магазине пока нет товаров</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Нажмите кнопку ниже, чтобы добавить первый товар.
                </p>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-md"
                >
                  Добавить первый товар
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shopProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden flex flex-col justify-between group hover:border-slate-600 transition-all shadow-sm"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative bg-slate-900">
                        <img
                          src={prod.image_url}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            prod.is_available ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
                          }`}
                        >
                          {prod.is_available ? 'В наличии' : 'Распродано'}
                        </span>

                        {prod.brand && (
                          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10">
                            {prod.brand}
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
                          {prod.category || 'Одежда'}
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug line-clamp-1">
                          {prod.title}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                          <span className="font-extrabold text-white text-base font-display">
                            {prod.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {prod.size && (
                            <span className="bg-slate-700/80 px-2 py-0.5 rounded text-[11px] text-slate-300">
                              {prod.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-700/50 mt-2">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Удалить "${prod.title}"?`)) {
                            deleteProduct(prod.id)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: THEME & TELEGRAM CONFIGURATION */}
        {activeTab === 'theme' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form */}
            <form onSubmit={handleSaveShopTheme} className="lg:col-span-7 bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Прием заказов и Оформление витрины</h2>
                <p className="text-xs text-slate-400">Укажите ваш Telegram для получения заказов напрямую от клиентов</p>
              </div>

              {/* TELEGRAM USERNAME HIGHLIGHTED */}
              <div className="bg-blue-600/10 border border-blue-500/40 p-4 rounded-2xl space-y-2">
                <label className="block text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>Ваш Юзернейм в Telegram для приема заказов:</span>
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-400 bg-slate-900 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-700 font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={themeForm.telegram || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, telegram: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-semibold"
                    placeholder="reseller_admin"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Когда покупатель нажмет "Купить" на вашей витрине, откроется диалог в Telegram с сообщением вида:
                  <br />
                  <i className="text-blue-300 font-mono">"Привет! Хочу заказать [Название Товара]..."</i>
                </p>
              </div>

              {/* WhatsApp Optional */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp (Необязательно)</label>
                <input
                  type="text"
                  value={themeForm.whatsapp || ''}
                  onChange={(e) => setThemeForm({ ...themeForm, whatsapp: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="+79991234567"
                />
              </div>

              {/* Color Palette */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Основной цвет витрины</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeForm.primaryColor || '#0066ff'}
                      onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.primaryColor || '#0066ff'}
                      onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Цвет фона витрины</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeForm.backgroundColor || '#090a0f'}
                      onChange={(e) => setThemeForm({ ...themeForm, backgroundColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.backgroundColor || '#090a0f'}
                      onChange={(e) => setThemeForm({ ...themeForm, backgroundColor: e.target.value })}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Banner & Logo URLs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL Шапки / Баннера витрины</label>
                  <input
                    type="url"
                    value={themeForm.bannerUrl || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, bannerUrl: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL Логотипа / Аватарки магазина</label>
                  <input
                    type="url"
                    value={themeForm.logoUrl || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, logoUrl: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Сохранить настройки Telegram и дизайна</span>
              </button>
            </form>

            {/* Right Live Mini Preview Frame */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Предпросмотр на смартфоне</span>
              </h3>

              <div className="mx-auto w-[320px] h-[580px] bg-slate-950 rounded-[3rem] p-3 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex-shrink-0"></div>

                <div
                  className="flex-1 rounded-[2.2rem] overflow-y-auto p-4 space-y-4 text-slate-100 text-xs"
                  style={{
                    backgroundColor: themeForm.backgroundColor || '#090a0f',
                    color: themeForm.textColor || '#ffffff'
                  }}
                >
                  <div className="relative rounded-2xl h-24 overflow-hidden bg-slate-800">
                    {themeForm.bannerUrl && (
                      <img src={themeForm.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute -bottom-2 left-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                      {themeForm.logoUrl ? (
                        <img src={themeForm.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        activeShop?.name[0]
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-bold text-base leading-tight">
                      {activeShop?.name}
                    </h4>
                    <p className="text-[11px] opacity-75 line-clamp-2 mt-1">{activeShop?.description}</p>
                    {themeForm.telegram && (
                      <div className="text-[10px] text-blue-400 mt-1 font-mono">
                        Заказы: @{themeForm.telegram.replace('@', '')}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {shopProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        className="rounded-xl p-2 border border-white/10 flex flex-col justify-between"
                        style={{ backgroundColor: themeForm.cardBg || '#12141d' }}
                      >
                        <img src={p.image_url} alt="" className="w-full h-16 object-cover rounded-lg mb-1" />
                        <div className="font-semibold text-[10px] line-clamp-1">{p.title}</div>
                        <div className="font-bold text-[11px] mt-1" style={{ color: themeForm.primaryColor }}>
                          {p.price} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SHOPS LIST */}
        {activeTab === 'shops' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Список ваших магазинов</h2>
                <p className="text-xs text-slate-400">Создавайте несколько разных витрин под разные бренды и ниши</p>
              </div>

              <button
                onClick={() => setShowShopModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Создать новый магазин</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((s) => {
                const count = products.filter((p) => p.shop_id === s.id).length
                return (
                  <div
                    key={s.id}
                    className={`bg-slate-800 rounded-2xl p-6 border transition-all ${
                      s.id === activeShopId ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-700 text-slate-300 font-mono">
                        /{s.slug}
                      </span>
                      {s.id === activeShopId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                          АКТИВЕН
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 font-display">{s.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{s.description}</p>

                    <div className="text-xs text-slate-300 mb-6 flex items-center justify-between font-medium">
                      <span>📦 Товаров: {count}</span>
                      <span className="text-blue-400 font-mono">
                        @{s.theme_config?.telegram || 'не указан'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-700">
                      <button
                        onClick={() => setActiveShopId(s.id)}
                        className="text-xs font-semibold px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        Выбрать
                      </button>

                      <a
                        href={`#/s/${s.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1"
                      >
                        <span>Открыть витрину</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>

      {/* PRODUCT MODAL WITH BRAND & CATEGORY */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Название товара</label>
                <input
                  type="text"
                  required
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="Например: Oversized Acid-Wash Hoodie"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Категория</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  >
                    <option value="Одежда">Одежда</option>
                    <option value="Обувь">Обувь</option>
                    <option value="Аксессуары">Аксессуары</option>
                    <option value="Электроника">Электроника</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Бренд (Производитель)</label>
                  <input
                    type="text"
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="Nike, Supreme..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Цена (₽)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="4900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Доступные размеры</label>
                  <input
                    type="text"
                    value={prodForm.size}
                    onChange={(e) => setProdForm({ ...prodForm, size: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="S, M, L, XL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Фотографии товара</label>
                <input
                  type="url"
                  required
                  value={prodForm.image_url}
                  onChange={(e) => setProdForm({ ...prodForm, image_url: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="avail"
                  checked={prodForm.is_available}
                  onChange={(e) => setProdForm({ ...prodForm, is_available: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
                />
                <label htmlFor="avail" className="text-xs font-medium text-slate-300">
                  Товар в наличии в магазине
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md"
                >
                  Сохранить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSTANT SHOP CREATION MODAL */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Создать витрину за 1 минуту</h3>
              <button onClick={() => setShowShopModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Название магазина</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="Например: Streetwear Lab"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL слаг (адрес витрины)</label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 bg-slate-950 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-700 font-mono">
                    /#/s/
                  </span>
                  <input
                    type="text"
                    required
                    value={shopForm.slug}
                    onChange={(e) => setShopForm({ ...shopForm, slug: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-mono"
                    placeholder="streetwear-lab"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-400 mb-1 flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" />
                  <span>Ваш Telegram username для приема заказов</span>
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 bg-slate-950 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-700 font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={shopForm.telegram}
                    onChange={(e) => setShopForm({ ...shopForm, telegram: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-semibold"
                    placeholder="your_telegram_username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Краткое описание</label>
                <textarea
                  value={shopForm.description}
                  onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full h-20"
                  placeholder="Опишите, какие товары вы продаете..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowShopModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md"
                >
                  Создать витрину
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

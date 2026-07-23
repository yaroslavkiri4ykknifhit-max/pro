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
  Database,
  Check,
  Copy,
  LayoutGrid,
  List,
  Eye,
  X,
  PhoneCall,
  Send,
  Image as ImageIcon
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { SUPABASE_SQL_SCHEMA, isConfigured } from '../lib/supabase'

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

  const [activeTab, setActiveTab] = useState('products') // 'products' | 'theme' | 'shops' | 'sql'
  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedSql, setCopiedSql] = useState(false)

  // Current selected shop
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)

  // Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    price: '',
    size: 'S, M, L',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    is_available: true
  })

  // New Shop Form State
  const [shopForm, setShopForm] = useState({
    name: '',
    slug: '',
    description: ''
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
      telegram: ''
    }
  )

  // Open product modal for edit or create
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setProdForm({
        title: product.title,
        price: product.price,
        size: product.size || '',
        image_url: product.image_url || '',
        is_available: product.is_available
      })
    } else {
      setEditingProduct(null)
      setProdForm({
        title: '',
        price: '',
        size: 'S, M, L',
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
        image_url: prodForm.image_url,
        is_available: prodForm.is_available
      })
    }
    setShowProductModal(false)
  }

  const handleSaveShopTheme = (e) => {
    e.preventDefault()
    if (!activeShop) return
    updateShop(activeShop.id, { theme_config: themeForm })
    alert('Theme settings updated successfully!')
  }

  const handleCreateShop = (e) => {
    e.preventDefault()
    if (!shopForm.name || !shopForm.slug) return
    const formattedSlug = shopForm.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    createShop({
      name: shopForm.name,
      slug: formattedSlug,
      description: shopForm.description
    })
    setShowShopModal(false)
    setShopForm({ name: '', slug: '', description: '' })
  }

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-9 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white">Reseller Control Dashboard</h1>
              <p className="text-xs text-slate-400">Manage products, custom storefronts & branding</p>
            </div>
          </div>

          {/* Active Shop Switcher & Quick Preview */}
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
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 transition-colors"
              title="Add New Shop"
            >
              <Plus className="w-4 h-4" />
            </button>

            {activeShop && (
              <a
                href={`#/s/${activeShop.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Showcase</span>
              </a>
            )}
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        
        {/* Supabase Status Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
            <span className="text-xs sm:text-sm font-medium">
              {isConfigured ? (
                <span className="text-emerald-400 font-semibold">Supabase Connected: Live PostgreSQL Database Active</span>
              ) : (
                <span className="text-amber-300">Demo Standalone Mode: Local DB active. (Add Supabase URL & Key to .env to sync backend)</span>
              )}
            </span>
          </div>

          <button
            onClick={() => setActiveTab('sql')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
          >
            <Database className="w-3.5 h-3.5" />
            View SQL Schema
          </button>
        </div>

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
            <span>Products ({shopProducts.length})</span>
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
            <span>Design & Theme</span>
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
            <span>Shops List ({shops.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-4 px-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'sql'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase SQL</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Product Inventory for "{activeShop?.name}"</h2>
                <p className="text-xs text-slate-400">Add products with title, price, sizes, photos & availability</p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table / Cards Grid */}
            {shopProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-dashed border-slate-700">
                <Package className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-300">No products in this shop yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Start building your storefront by adding items with images, pricing, and available sizes.
                </p>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl"
                >
                  Create First Product
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
                          {prod.is_available ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-white text-base leading-snug line-clamp-1">
                          {prod.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-extrabold text-white text-base font-display">
                            {prod.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {prod.size && (
                            <span className="bg-slate-700/80 px-2 py-0.5 rounded text-[11px] text-slate-300">
                              Sizes: {prod.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-700/50 mt-2">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${prod.title}"?`)) {
                            deleteProduct(prod.id)
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Delete"
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

        {/* TAB 2: THEME & DESIGN CONFIGURATION */}
        {activeTab === 'theme' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form */}
            <form onSubmit={handleSaveShopTheme} className="lg:col-span-7 bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Storefront Customization</h2>
                <p className="text-xs text-slate-400">Customize colors, branding logo, banner & contact details for /{activeShop?.slug}</p>
              </div>

              {/* Color Palette */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Color</label>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Background Color</label>
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

              {/* Card & Font Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Card Background</label>
                  <input
                    type="text"
                    value={themeForm.cardBg || '#12141d'}
                    onChange={(e) => setThemeForm({ ...themeForm, cardBg: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="#12141d or white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Font Family</label>
                  <select
                    value={themeForm.font || 'Inter'}
                    onChange={(e) => setThemeForm({ ...themeForm, font: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  >
                    <option value="Inter">Inter (Grotesque)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                    <option value="Caveat">Caveat (Handwritten)</option>
                  </select>
                </div>
              </div>

              {/* Banner & Logo URLs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    value={themeForm.bannerUrl || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, bannerUrl: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Shop Avatar/Logo URL</label>
                  <input
                    type="url"
                    value={themeForm.logoUrl || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, logoUrl: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              {/* Contact Handles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Telegram Username</label>
                  <input
                    type="text"
                    value={themeForm.telegram || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, telegram: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="username (without @)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={themeForm.whatsapp || ''}
                    onChange={(e) => setThemeForm({ ...themeForm, whatsapp: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="+79991234567"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Theme Settings</span>
              </button>
            </form>

            {/* Right Live Mini Preview Frame */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Live Mobile Preview</span>
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
                  {/* Banner & Logo */}
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

                  {/* Shop Info */}
                  <div className="pt-2">
                    <h4 className="font-bold text-base leading-tight" style={{ color: themeForm.textColor }}>
                      {activeShop?.name}
                    </h4>
                    <p className="text-[11px] opacity-75 line-clamp-2 mt-1">{activeShop?.description}</p>
                  </div>

                  {/* Product Cards Grid Preview */}
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
                <h2 className="text-xl font-bold text-white">Your Registered Storefronts</h2>
                <p className="text-xs text-slate-400">Manage multiple link-in-bio storefronts from a single account</p>
              </div>

              <button
                onClick={() => setShowShopModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Shop</span>
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
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-700 text-slate-300">
                        /{s.slug}
                      </span>
                      {s.id === activeShopId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 font-display">{s.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{s.description}</p>

                    <div className="text-xs text-slate-400 mb-6 font-medium">
                      📦 {count} Products listed
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-700">
                      <button
                        onClick={() => setActiveShopId(s.id)}
                        className="text-xs font-semibold px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        Select
                      </button>

                      <a
                        href={`#/s/${s.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1"
                      >
                        <span>Visit Store</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SUPABASE SQL SCHEMA EXPORTER */}
        {activeTab === 'sql' && (
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span>Supabase PostgreSQL Migration Script</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Copy & paste this script into your Supabase Dashboard SQL Editor to initialize `shops` & `products` tables
                </p>
              </div>

              <button
                onClick={copySqlToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-2xl text-slate-300 text-xs font-mono overflow-x-auto border border-slate-800 max-h-[450px]">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        )}

      </div>

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="e.g. Oversized Acid-Wash Hoodie"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (₽)</label>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Available Sizes</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
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
                  Item is Available in Stock
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SHOP MODAL */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Create New Showcase Store</h3>
              <button onClick={() => setShowShopModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="e.g. Vintage Apparel Lab"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 bg-slate-950 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-700">
                    /#/s/
                  </span>
                  <input
                    type="text"
                    required
                    value={shopForm.slug}
                    onChange={(e) => setShopForm({ ...shopForm, slug: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1"
                    placeholder="vintage-lab"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  value={shopForm.description}
                  onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full h-20"
                  placeholder="Tell customers what your store offers..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowShopModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md"
                >
                  Create Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

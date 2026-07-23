import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Trash2,
  Edit,
  Store,
  Package,
  ExternalLink,
  Save,
  Check,
  Copy,
  Eye,
  X,
  Send,
  Sparkles,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  Wand2,
  Copy as CopyIcon,
  Settings,
  Heart,
  Type,
  Smartphone,
  Palette,
  Layers,
  Search,
  LayoutGrid
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { THEME_LIBRARY } from '../themes/index.js'
import { DesignPanel } from '../components/builder/DesignPanel'
import { BlockLibraryModal } from '../components/builder/BlockLibraryModal'
import { BlockInspectorModal } from '../components/builder/BlockInspectorModal'

export function AdminPage() {
  const navigate = useNavigate()
  const {
    shops,
    products,
    activeShopId,
    setActiveShopId,
    createShop,
    updateShop,
    applyPresetToShop,
    updateShopBlocks,
    addProduct,
    updateProduct,
    deleteProduct
  } = useStore()

  const [activeTab, setActiveTab] = useState('builder') // 'builder' | 'design' | 'themes' | 'products' | 'telegram'
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [editingBlock, setEditingBlock] = useState(null)

  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Selected shop
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)
  const activeBlocks = activeShop?.blocks || []

  // Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    price: '',
    oldPrice: '',
    size: 'S, M, L',
    category: 'СУМКИ',
    brand: '',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    is_available: true
  })

  // New Shop Form State
  const [shopForm, setShopForm] = useState({
    name: '',
    slug: '',
    description: '',
    telegram: ''
  })

  // Theme Config State
  const theme = activeShop?.theme_config || THEME_LIBRARY[0].themeJson

  // Reordering Handlers
  const moveBlock = (index, direction) => {
    if (!activeShop) return
    const newBlocks = [...activeBlocks]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return
    const [moved] = newBlocks.splice(index, 1)
    newBlocks.splice(targetIndex, 0, moved)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const duplicateBlock = (index) => {
    if (!activeShop) return
    const blockToCopy = activeBlocks[index]
    const copied = {
      ...JSON.parse(JSON.stringify(blockToCopy)),
      id: 'b-' + Date.now()
    }
    const newBlocks = [...activeBlocks]
    newBlocks.splice(index + 1, 0, copied)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const deleteBlock = (blockId) => {
    if (!activeShop) return
    if (activeBlocks.length <= 1) {
      alert('В витрине должен оставаться хотя бы один блок!')
      return
    }
    const newBlocks = activeBlocks.filter((b) => b.id !== blockId)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const handleAddBlockFromLibrary = (libraryItem) => {
    if (!activeShop) return
    const newBlock = {
      id: 'b-' + Date.now(),
      type: libraryItem.type,
      variant: libraryItem.variant || 1,
      props: JSON.parse(JSON.stringify(libraryItem.defaultProps))
    }
    updateShopBlocks(activeShop.id, [...activeBlocks, newBlock])
  }

  const handleSaveBlockProps = (updatedBlock) => {
    if (!activeShop) return
    const updated = activeBlocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b))
    updateShopBlocks(activeShop.id, updated)
  }

  // Product CRUD
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setProdForm({
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice || '',
        size: product.size || '',
        category: product.category || 'СУМКИ',
        brand: product.brand || '',
        image_url: product.image_url || '',
        is_available: product.is_available
      })
    } else {
      setEditingProduct(null)
      setProdForm({
        title: '',
        price: '',
        oldPrice: '',
        size: 'S, M, L',
        category: 'СУМКИ',
        brand: 'Y-3',
        image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
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
        price: parseFloat(prodForm.price) || 0,
        oldPrice: prodForm.oldPrice ? parseFloat(prodForm.oldPrice) : null
      })
    } else {
      addProduct({
        shop_id: activeShop.id,
        title: prodForm.title,
        price: parseFloat(prodForm.price) || 0,
        oldPrice: prodForm.oldPrice ? parseFloat(prodForm.oldPrice) : null,
        size: prodForm.size,
        category: prodForm.category,
        brand: prodForm.brand,
        image_url: prodForm.image_url,
        is_available: prodForm.is_available
      })
    }
    setShowProductModal(false)
  }

  const handleCreateShop = (e) => {
    e.preventDefault()
    if (!shopForm.name) return
    const cleanTg = (shopForm.telegram || '').replace('@', '').trim()
    createShop({
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
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans flex flex-col selection:bg-black selection:text-white">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200/80 sticky top-9 z-40 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl tracking-tight text-black font-display">
              creatiwise<span className="text-black font-extrabold">.</span>
            </span>
            <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-bold bg-black text-white">
              SaaS Engine
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={activeShopId}
              onChange={(e) => setActiveShopId(e.target.value)}
              className="bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-full px-4 py-2 font-semibold shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            >
              {shops.map((s) => (
                <option key={s.id} value={s.id}>
                  🏬 {s.name} (/{s.slug})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowShopModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-black rounded-full text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Создать витрину</span>
            </button>

            {activeShop && (
              <button
                onClick={() => navigate(`/s/${activeShop.slug}`)}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Открыть Витрину</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-grow">
        
        {/* Share Banner */}
        {activeShop && (
          <div className="mb-8 p-5 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Ссылка на готовую витрину:</span>
              </div>
              <div className="text-sm font-mono font-bold text-slate-900">
                {window.location.origin}{window.location.pathname}#/s/{activeShop.slug}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyShopUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all shadow-sm"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Скопировано!' : 'Скопировать ссылку'}</span>
              </button>

              <a
                href={`#/s/${activeShop.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'builder'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Конструктор Блоков ({activeBlocks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'design'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Панель Дизайна (Design Tokens)</span>
          </button>

          <button
            onClick={() => setActiveTab('themes')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'themes'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Библиотека Шаблонов ({THEME_LIBRARY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Мои Товары ({shopProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'telegram'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Заказы в Telegram</span>
          </button>
        </div>

        {/* TAB 1: VISUAL BUILDER CANVAS & PHONE PREVIEW */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 font-display">Конструктор структуры</h2>
                  <p className="text-xs text-slate-500">Нажимайте "Настроить" для визуального изменения параметров каждого блока</p>
                </div>

                <button
                  onClick={() => setShowLibraryModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Библиотека Tilda</span>
                </button>
              </div>

              {/* Active Blocks */}
              <div className="space-y-4">
                {activeBlocks.map((block, idx) => (
                  <React.Fragment key={block.id}>
                    <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 transition-all shadow-sm hover:shadow-md">
                      
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <button
                          onClick={() => setEditingBlock(block)}
                          className="p-1.5 text-blue-600 hover:text-black rounded-full font-bold text-xs flex items-center gap-1"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>Настроить</span>
                        </button>

                        <span className="w-px h-4 bg-slate-300"></span>

                        <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="p-1 text-slate-600 hover:text-black disabled:opacity-30">
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => moveBlock(idx, 1)} disabled={idx === activeBlocks.length - 1} className="p-1 text-slate-600 hover:text-black disabled:opacity-30">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => duplicateBlock(idx)} className="p-1 text-slate-600 hover:text-black">
                          <CopyIcon className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteBlock(block.id)} className="p-1 text-red-500 hover:text-red-700">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 pr-40">
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                          Блок #{idx + 1}: {block.type} [Вариант #{block.variant || 1}]
                        </div>

                        <div className="font-bold text-slate-900 text-sm">
                          {block.props?.title || `${block.type} секция`}
                        </div>
                        {block.props?.subtitle && (
                          <p className="text-xs text-slate-500">{block.props.subtitle}</p>
                        )}
                      </div>

                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Phone Mockup Viewport */}
            <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
              <div className="mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Предпросмотр витрины на телефоне</span>
              </div>

              <div className="w-[330px] h-[640px] bg-black rounded-[3.2rem] p-3 border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="w-28 h-4 bg-black rounded-full mx-auto mb-2 flex-shrink-0 z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                </div>

                <div className="flex-1 rounded-[2.5rem] overflow-y-auto bg-white text-black text-xs space-y-4 pb-6 scrollbar-none relative">
                  <div className="p-4 border-b border-slate-200 font-black text-base uppercase font-display">
                    {theme.name || activeShop?.name}
                  </div>

                  <div className="px-3 space-y-4">
                    {activeBlocks.map((b) => (
                      <div key={b.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <div className="font-bold text-[11px] uppercase">{b.type} (#{b.variant || 1})</div>
                        <div className="text-[10px] text-slate-500">{b.props?.title || 'Секция каталога'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: GLOBAL DESIGN PANEL */}
        {activeTab === 'design' && <DesignPanel shop={activeShop} />}

        {/* TAB 3: TEMPLATE LIBRARY */}
        {activeTab === 'themes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-display">Библиотека из 12 уникальных шаблонов</h2>
              <p className="text-xs text-slate-500">Underbuy является всего лишь 1 стартовым шаблоном из десятков вариантов. Выберите любой:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {THEME_LIBRARY.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white rounded-[2.5rem] p-6 border border-slate-200 hover:border-black transition-all flex flex-col justify-between space-y-4 shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={preset.preview} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{preset.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{preset.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      applyPresetToShop(activeShop.id, preset.id)
                      alert(`Шаблон "${preset.name}" применен! Все параметры можно настроить во вкладке Design.`)
                    }}
                    className="w-full py-3.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Применить данный шаблон</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-display">Товары витрины</h2>
                <p className="text-xs text-slate-500">Добавляйте свои позиция с наименованием, ценой и фото</p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="px-6 py-3 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md"
              >
                + Добавить товар
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2">
                  <img src={prod.image_url} alt="" className="w-full h-44 object-contain rounded-xl bg-slate-50" />
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{prod.brand}</div>
                  <div className="font-extrabold text-sm uppercase leading-tight line-clamp-1">{prod.title}</div>
                  <div className="font-black text-base">{prod.price} ₽</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TELEGRAM CONFIG */}
        {activeTab === 'telegram' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 max-w-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">Заказы в Telegram</h2>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Telegram Username продавца:</label>
              <input
                type="text"
                value={theme.telegram || 'reseller_admin'}
                onChange={(e) => updateShop(activeShop.id, { theme_config: { ...theme, telegram: e.target.value } })}
                className="bg-slate-50 border border-slate-300 text-xs font-bold rounded-2xl px-4 py-3 w-full"
              />
            </div>
          </div>
        )}

      </div>

      {/* MODALS */}
      <BlockLibraryModal
        isOpen={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
        onSelectBlock={handleAddBlockFromLibrary}
      />

      <BlockInspectorModal
        block={editingBlock}
        isOpen={!!editingBlock}
        onClose={() => setEditingBlock(null)}
        onSave={handleSaveBlockProps}
      />

      {/* CREATE SHOP MODAL */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">Создать витрину</h3>
              <button onClick={() => setShowShopModal(false)} className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Название витрины</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                  placeholder="My Brand Store"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">URL слаг</label>
                <input
                  type="text"
                  required
                  value={shopForm.slug}
                  onChange={(e) => setShopForm({ ...shopForm, slug: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-mono"
                  placeholder="my-brand"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowShopModal(false)} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full shadow-md">
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

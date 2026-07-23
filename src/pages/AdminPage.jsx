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
  Palette,
  Layers,
  Wand2,
  FileText
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { THEME_LIBRARY } from '../themes/index.js'
import { LeftRailNav } from '../components/builder/LeftRailNav'
import { StructureSidebar } from '../components/builder/StructureSidebar'
import { LiveCanvasPreview } from '../components/builder/LiveCanvasPreview'
import { ContextInspector } from '../components/builder/ContextInspector'
import { TemplateGalleryModal } from '../components/builder/TemplateGalleryModal'
import { SectionLibraryModal } from '../components/builder/SectionLibraryModal'
import { DesignPanel } from '../components/builder/DesignPanel'

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

  // Primary Workspace Navigation Mode: 'editor' | 'pages' | 'themes' | 'products' | 'design' | 'publish'
  const [activeMode, setActiveMode] = useState('editor')

  // Modals & Drawers
  const [showSectionLibrary, setShowSectionLibrary] = useState(false)
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)

  // Selection
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Active Shop & Data
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)
  const activeBlocks = activeShop?.blocks || []
  const selectedBlock = activeBlocks.find((b) => b.id === selectedBlockId) || null

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
  const [shopForm, setShopForm] = useState({ name: '', slug: '', description: '', telegram: '' })

  // Reorder & Layer Handlers
  const handleMoveBlock = (index, direction) => {
    if (!activeShop) return
    const newBlocks = [...activeBlocks]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return
    const [moved] = newBlocks.splice(index, 1)
    newBlocks.splice(targetIndex, 0, moved)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const handleDuplicateBlock = (index) => {
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

  const handleDeleteBlock = (blockId) => {
    if (!activeShop) return
    if (activeBlocks.length <= 1) {
      alert('В макете должен оставаться хотя бы один блок!')
      return
    }
    const newBlocks = activeBlocks.filter((b) => b.id !== blockId)
    updateShopBlocks(activeShop.id, newBlocks)
    if (selectedBlockId === blockId) setSelectedBlockId(null)
  }

  const handleToggleHideBlock = (blockId) => {
    if (!activeShop) return
    const updated = activeBlocks.map((b) => (b.id === blockId ? { ...b, hidden: !b.hidden } : b))
    updateShopBlocks(activeShop.id, updated)
  }

  const handleAddSectionFromLibrary = (item) => {
    if (!activeShop) return
    const newBlock = {
      id: 'b-' + Date.now(),
      type: item.type,
      variant: item.variant || 1,
      props: JSON.parse(JSON.stringify(item.defaultProps))
    }
    updateShopBlocks(activeShop.id, [...activeBlocks, newBlock])
    setSelectedBlockId(newBlock.id)
  }

  const handleUpdateBlockProps = (updatedBlock) => {
    if (!activeShop) return
    const updated = activeBlocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b))
    updateShopBlocks(activeShop.id, updated)
  }

  const handleInlineTextChange = (blockId, propKey, newText) => {
    if (!activeShop) return
    const updated = activeBlocks.map((b) => {
      if (b.id !== blockId) return b
      return {
        ...b,
        props: { ...(b.props || {}), [propKey]: newText }
      }
    })
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
    <div className="h-screen w-screen bg-[#090a0f] text-slate-100 font-sans flex overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* 1. LEFT RAIL ICON NAVIGATION */}
      <LeftRailNav
        activeMode={activeMode}
        setActiveMode={(mode) => {
          if (mode === 'themes') {
            setShowTemplateGallery(true)
          } else {
            setActiveMode(mode)
          }
        }}
        shop={activeShop}
      />

      {/* MAIN STUDIO WORKSPACE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP COMPACT STUDIO BAR */}
        <header className="h-14 bg-[#0d0f17] border-b border-slate-800/80 px-6 flex items-center justify-between z-40 flex-shrink-0 select-none">
          <div className="flex items-center gap-3">
            <select
              value={activeShopId}
              onChange={(e) => setActiveShopId(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
            >
              {shops.map((s) => (
                <option key={s.id} value={s.id}>
                  🏬 {s.name} (/{s.slug})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowShopModal(true)}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-colors"
              title="Создать витрину"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTemplateGallery(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl border border-slate-800 transition-all shadow-sm"
            >
              <Wand2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Сменить шаблон</span>
            </button>

            <button
              onClick={copyShopUrl}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Скопировано!' : 'Опубликовать'}</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE BODY DEPENDING ON ACTIVE MODE */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* MODE: EDITOR (3-COLUMN STUDIO LAYOUT) */}
          {activeMode === 'editor' && (
            <>
              {/* COLUMN 1: LEFT STRUCTURE SIDEBAR */}
              <StructureSidebar
                blocks={activeBlocks}
                selectedBlockId={selectedBlockId}
                onSelectBlock={(id) => setSelectedBlockId(id)}
                onMoveBlock={handleMoveBlock}
                onDuplicateBlock={handleDuplicateBlock}
                onDeleteBlock={handleDeleteBlock}
                onToggleHideBlock={handleToggleHideBlock}
                onOpenLibrary={() => setShowSectionLibrary(true)}
              />

              {/* COLUMN 2: CENTER LIVE CANVAS PREVIEW */}
              <LiveCanvasPreview
                shop={activeShop}
                products={products}
                blocks={activeBlocks}
                selectedBlockId={selectedBlockId}
                onSelectBlock={(id) => setSelectedBlockId(id)}
                onOpenInspector={(block) => setSelectedBlockId(block.id)}
                onMoveBlock={handleMoveBlock}
                onDuplicateBlock={handleDuplicateBlock}
                onDeleteBlock={handleDeleteBlock}
                onOpenLibrary={() => setShowSectionLibrary(true)}
                onInlineTextChange={handleInlineTextChange}
              />

              {/* COLUMN 3: RIGHT CONTEXT INSPECTOR */}
              <ContextInspector
                shop={activeShop}
                selectedBlock={selectedBlock}
                onUpdateBlockProps={handleUpdateBlockProps}
              />
            </>
          )}

          {/* MODE: DESIGN */}
          {activeMode === 'design' && (
            <div className="flex-1 overflow-y-auto p-8 bg-[#090a0f] flex justify-center">
              <DesignPanel shop={activeShop} />
            </div>
          )}

          {/* MODE: PRODUCTS */}
          {activeMode === 'products' && (
            <div className="flex-1 overflow-y-auto p-8 bg-[#090a0f] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white font-display">Товары витрины</h2>
                  <p className="text-xs text-slate-400">Управляйте каталогом товаров продавца</p>
                </div>

                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-6 py-3 bg-blue-600 text-white font-extrabold text-xs rounded-2xl shadow-lg"
                >
                  + Добавить товар
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopProducts.map((prod) => (
                  <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2">
                    <img src={prod.image_url} alt="" className="w-full h-44 object-contain rounded-2xl bg-black p-2" />
                    <div className="text-[10px] text-blue-400 font-bold uppercase">{prod.brand}</div>
                    <div className="font-extrabold text-sm uppercase leading-tight line-clamp-1 text-white">{prod.title}</div>
                    <div className="font-black text-base text-white">{prod.price} ₽</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE: PAGES / PUBLISH */}
          {(activeMode === 'pages' || activeMode === 'publish') && (
            <div className="flex-1 overflow-y-auto p-8 bg-[#090a0f] space-y-6 max-w-xl">
              <h2 className="text-xl font-black text-white font-display">Настройки Публикации и Telegram</h2>
              <div className="space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Telegram Username для приёма заказов:</label>
                  <input
                    type="text"
                    value={activeShop?.theme_config?.telegram || 'reseller_admin'}
                    onChange={(e) => updateShop(activeShop.id, { theme_config: { ...(activeShop.theme_config || {}), telegram: e.target.value } })}
                    className="bg-slate-950 border border-slate-800 text-xs font-bold text-white rounded-xl px-4 py-3 w-full"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Валюта магазина:</label>
                  <select
                    value={activeShop?.theme_config?.currencySymbol || '₽'}
                    onChange={(e) => updateShop(activeShop.id, { theme_config: { ...(activeShop.theme_config || {}), currencySymbol: e.target.value } })}
                    className="bg-slate-950 border border-slate-800 text-xs font-bold text-white rounded-xl px-4 py-3 w-full"
                  >
                    <option value="₽">Рубль (₽)</option>
                    <option value="₾">Лари (₾)</option>
                    <option value="$">Доллар ($)</option>
                    <option value="€">Евро (€)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* FULLSCREEN TEMPLATE GALLERY MODAL */}
      <TemplateGalleryModal
        isOpen={showTemplateGallery}
        onClose={() => {
          setShowTemplateGallery(false)
          setActiveMode('editor')
        }}
        onApplyPreset={(presetId) => {
          applyPresetToShop(activeShop.id, presetId)
          setShowTemplateGallery(false)
          setActiveMode('editor')
        }}
      />

      {/* TILDA SECTION LIBRARY MODAL */}
      <SectionLibraryModal
        isOpen={showSectionLibrary}
        onClose={() => setShowSectionLibrary(false)}
        onSelectSection={handleAddSectionFromLibrary}
      />

      {/* CREATE SHOP MODAL */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Создать витрину</h3>
              <button onClick={() => setShowShopModal(false)} className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Название витрины</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full font-bold"
                  placeholder="My Store"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">URL слаг</label>
                <input
                  type="text"
                  required
                  value={shopForm.slug}
                  onChange={(e) => setShopForm({ ...shopForm, slug: e.target.value })}
                  className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full font-mono"
                  placeholder="my-store"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowShopModal(false)} className="px-5 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-800 rounded-xl">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md">
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Название товара</label>
                <input
                  type="text"
                  required
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="bg-slate-950 border border-slate-800 text-xs text-white font-bold rounded-xl px-4 py-3 w-full uppercase"
                  placeholder="ENFANTS RICHES DEPRIMES TOTE BAG"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Категория</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Бренд</label>
                  <input
                    type="text"
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full uppercase font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Цена (₽)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL картинки</label>
                  <input
                    type="url"
                    required
                    value={prodForm.image_url}
                    onChange={(e) => setProdForm({ ...prodForm, image_url: e.target.value })}
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-4 py-3 w-full"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-5 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-800 rounded-xl">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

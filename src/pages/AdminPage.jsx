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
  ChevronDown,
  Search,
  ShoppingBag
} from 'lucide-react'
import { useStore, BLOCK_LIBRARY, LAYOUT_PRESETS } from '../store/useStore'

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

  const [activeTab, setActiveTab] = useState('builder') // 'builder' | 'presets' | 'branding' | 'products' | 'telegram'
  const [showAddBlockModal, setShowAddBlockModal] = useState(false)
  const [insertIndex, setInsertIndex] = useState(null)

  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Selected shop
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)
  const activeBlocks = activeShop?.blocks || []

  // Block settings modal state
  const [editingBlock, setEditingBlock] = useState(null)
  const [blockPropsForm, setBlockPropsForm] = useState({})

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

  // Theme & Branding Form State
  const [themeForm, setThemeForm] = useState(
    activeShop?.theme_config || LAYOUT_PRESETS[0].config
  )

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

  const handleOpenAddBlockModal = (atIndex = null) => {
    setInsertIndex(atIndex)
    setShowAddBlockModal(true)
  }

  const handleAddBlockFromLibrary = (blockTypeItem) => {
    if (!activeShop) return
    const newBlock = {
      id: 'b-' + Date.now(),
      type: blockTypeItem.type,
      ...JSON.parse(JSON.stringify(blockTypeItem.defaultProps))
    }

    const newBlocks = [...activeBlocks]
    if (insertIndex !== null && insertIndex >= 0) {
      newBlocks.splice(insertIndex + 1, 0, newBlock)
    } else {
      newBlocks.push(newBlock)
    }

    updateShopBlocks(activeShop.id, newBlocks)
    setShowAddBlockModal(false)
    setInsertIndex(null)
  }

  const handleOpenEditBlock = (block) => {
    setEditingBlock(block)
    setBlockPropsForm({ ...block })
  }

  const handleSaveBlockProps = (e) => {
    e.preventDefault()
    if (!editingBlock || !activeShop) return
    const updated = activeBlocks.map((b) =>
      b.id === editingBlock.id ? { ...blockPropsForm } : b
    )
    updateShopBlocks(activeShop.id, updated)
    setEditingBlock(null)
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

  const handleSaveShopTheme = (e) => {
    e.preventDefault()
    if (!activeShop) return
    const cleanTg = (themeForm.telegram || '').replace('@', '').trim()
    const updatedTheme = { ...themeForm, telegram: cleanTg }
    updateShop(activeShop.id, { theme_config: updatedTheme })
    setThemeForm(updatedTheme)
    alert('Настройки сохранены!')
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
      
      {/* CREATIWISE STYLE ADMIN HEADER */}
      <header className="bg-white border-b border-slate-200/80 sticky top-9 z-40 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl tracking-tight text-black font-display">
              creatiwise<span className="text-black font-extrabold">.</span>
            </span>
            <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-bold bg-black text-white">
              Конструктор Витрин
            </span>
          </div>

          {/* Active Shop Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={activeShopId}
              onChange={(e) => {
                setActiveShopId(e.target.value)
                const newShop = shops.find((s) => s.id === e.target.value)
                if (newShop) setThemeForm(newShop.theme_config)
              }}
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
              <span>Создать магазин</span>
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
        
        {/* Share Link Banner */}
        {activeShop && (
          <div className="mb-8 p-5 rounded-[2rem] bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Прямая ссылка на вашу витрину:</span>
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

        {/* Tab Navigation matching Creatiwise Pill Style */}
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
            onClick={() => setActiveTab('branding')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'branding'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Type className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Логотип и Шапка</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'presets'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-black border border-slate-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 inline-block mr-1.5" />
            <span>Стиль Underbuy и Пресеты</span>
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

        {/* TAB 1: BUILDER CANVAS + LIVE PHONE MOCKUP PREVIEW */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: BLOCK EDITOR CONTROLS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 font-display">Конструктор структуры</h2>
                  <p className="text-xs text-slate-500">Добавляйте и настраивайте блоки — результат мгновенно виден на макете телефона справа</p>
                </div>

                <button
                  onClick={() => handleOpenAddBlockModal(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить блок</span>
                </button>
              </div>

              {/* Editable Blocks List */}
              <div className="space-y-4">
                {activeBlocks.map((block, idx) => (
                  <React.Fragment key={block.id}>
                    
                    <div className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 transition-all shadow-sm hover:shadow-md">
                      
                      {/* Floating Control Toolbar */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <button
                          onClick={() => handleOpenEditBlock(block)}
                          className="p-1.5 text-blue-600 hover:text-black rounded-full font-bold text-xs flex items-center gap-1"
                          title="Настроить блок"
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

                      {/* Block Information */}
                      <div className="space-y-2 pr-40">
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                          Блок #{idx + 1}: {block.type}
                        </div>

                        {block.type === 'categories' && (
                          <div className="space-y-2 pt-1">
                            <div className="font-bold text-slate-900 text-sm">Рамочные фильтры [ ВСЕ v ] [ ВСЕ БРЕНДЫ v ]</div>
                            <div className="flex gap-2">
                              <div className="border-2 border-black bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black flex justify-between items-center w-32">
                                <span>ВСЕ</span> <span>v</span>
                              </div>
                              <div className="border-2 border-black bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black flex justify-between items-center w-36">
                                <span>ВСЕ БРЕНДЫ</span> <span>v</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {block.type === 'products' && (
                          <div className="space-y-2 pt-1">
                            <h3 className="text-sm font-extrabold text-slate-900">
                              Сетка каталога ({block.columns || 2} Колонки | Стиль: {block.cardStyle || 'underbuy'})
                            </h3>
                            <p className="text-xs text-slate-500">Товары покупателя выводятся в 2 колонки с сердечками и заглавной типографикой</p>
                          </div>
                        )}

                        {block.type === 'banner' && (
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold text-slate-900">{block.title}</h3>
                            <p className="text-xs text-slate-500">{block.subtitle}</p>
                          </div>
                        )}

                        {block.type === 'contact' && (
                          <div className="space-y-1">
                            <h3 className="text-base font-extrabold text-slate-900">{block.title}</h3>
                            <p className="text-xs text-slate-500">{block.subtitle}</p>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Insert Block Button */}
                    <div className="flex justify-center my-2">
                      <button
                        onClick={() => handleOpenAddBlockModal(idx)}
                        className="px-4 py-1.5 bg-white hover:bg-black text-slate-600 hover:text-white border border-dashed border-slate-300 hover:border-black rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Вставить блок сюда</span>
                      </button>
                    </div>

                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: AUTHENTIC LIVE SMARTPHONE MOCKUP PREVIEW */}
            <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
              <div className="mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Предпросмотр витрины на телефоне</span>
              </div>

              {/* iPhone Frame Device */}
              <div className="w-[330px] h-[640px] bg-black rounded-[3.2rem] p-3 border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Dynamic Island / Speaker notch */}
                <div className="w-28 h-4 bg-black rounded-full mx-auto mb-2 flex-shrink-0 z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                </div>

                {/* Inner Viewport Screen */}
                <div className="flex-1 rounded-[2.5rem] overflow-y-auto bg-white text-black text-xs space-y-4 pb-6 scrollbar-none relative">
                  
                  {/* Header */}
                  <div className="p-4 pb-3 border-b border-slate-200 sticky top-0 bg-white z-20 flex items-center justify-between">
                    <div className="font-black text-base tracking-tighter uppercase font-display leading-none">
                      {themeForm.logoText || activeShop?.name || 'under buy'}
                    </div>
                    <div className="flex items-center gap-2 text-black">
                      <Heart className="w-4 h-4" />
                      <Search className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Render Live Blocks */}
                  <div className="px-3 space-y-4">
                    {activeBlocks.map((block) => {
                      if (block.type === 'categories') {
                        return (
                          <div key={block.id} className="grid grid-cols-2 gap-2">
                            <div className="border border-black bg-white px-2 py-1.5 text-[10px] font-bold uppercase flex justify-between items-center">
                              <span>ВСЕ</span> <span>v</span>
                            </div>
                            <div className="border border-black bg-white px-2 py-1.5 text-[10px] font-bold uppercase flex justify-between items-center">
                              <span>БРЕНДЫ</span> <span>v</span>
                            </div>
                          </div>
                        )
                      }

                      if (block.type === 'products') {
                        return (
                          <div key={block.id} className="grid grid-cols-2 gap-2">
                            {shopProducts.slice(0, 4).map((p) => (
                              <div key={p.id} className="bg-white border border-slate-200 p-2 space-y-1 relative">
                                <Heart className="w-3 h-3 absolute top-1 right-1 text-black" />
                                <img src={p.image_url} alt="" className="w-full h-20 object-contain" />
                                <div className="text-[8px] font-bold text-slate-400 uppercase">{p.brand}</div>
                                <div className="text-[9px] font-extrabold uppercase leading-none line-clamp-1">{p.title}</div>
                                <div className="text-xs font-black">{p.price} ₽</div>
                              </div>
                            ))}
                          </div>
                        )
                      }

                      if (block.type === 'banner') {
                        return (
                          <div key={block.id} className="bg-black text-white p-4 rounded-xl text-center space-y-1">
                            <div className="font-extrabold text-xs uppercase">{block.title}</div>
                            <div className="text-[9px] text-slate-300">{block.subtitle}</div>
                          </div>
                        )
                      }

                      if (block.type === 'contact') {
                        return (
                          <div key={block.id} className="bg-slate-900 text-white p-3 rounded-xl text-center space-y-1">
                            <div className="font-bold text-[10px]">{block.title}</div>
                            <div className="bg-white text-black px-3 py-1 rounded-full text-[9px] font-bold inline-block">
                              Заказать в Telegram
                            </div>
                          </div>
                        )
                      }

                      return null
                    })}
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BRANDING & LOGO EDITOR */}
        {activeTab === 'branding' && (
          <form onSubmit={handleSaveShopTheme} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Логотип и Шапка Витрины</h2>
              <p className="text-xs text-slate-500">Укажите текст логотипа (как "under buy" на скриншоте) или загрузите изображение</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Текст логотипа (например: under buy)
                </label>
                <input
                  type="text"
                  value={themeForm.logoText || activeShop?.name}
                  onChange={(e) => setThemeForm({ ...themeForm, logoText: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-sm text-slate-900 font-bold rounded-2xl px-4 py-3 w-full font-display"
                  placeholder="under buy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ИЛИ URL Картинки Логотипа
                </label>
                <input
                  type="url"
                  value={themeForm.logoUrl || ''}
                  onChange={(e) => setThemeForm({ ...themeForm, logoUrl: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Валюта каталога</label>
                <select
                  value={themeForm.currencySymbol || '₽'}
                  onChange={(e) => setThemeForm({ ...themeForm, currencySymbol: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                >
                  <option value="₽">Рубль (₽)</option>
                  <option value="₾">Лари (₾)</option>
                  <option value="$">Доллар ($)</option>
                  <option value="€">Евро (€)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить настройки логотипа</span>
            </button>
          </form>
        )}

        {/* TAB 3: BRAND PRESETS */}
        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-display">Готовые визуальные концепты</h2>
              <p className="text-xs text-slate-500">Переключайте стиль витрины в 1 клик</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LAYOUT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white rounded-[2.5rem] p-6 border border-slate-200 hover:border-black transition-all flex flex-col justify-between space-y-4 shadow-sm group"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 font-display">{preset.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{preset.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      applyPresetToShop(activeShop.id, preset.id)
                      alert(`Дизайн "${preset.name}" применен!`)
                    }}
                    className="w-full py-3.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Применить этот стиль</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-display">Товары магазина "{activeShop?.name}"</h2>
                <p className="text-xs text-slate-500">Добавляйте фото, наименования, цены, старые цены и бренды</p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить товар</span>
              </button>
            </div>

            {/* Products Grid */}
            {shopProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-slate-300 space-y-3">
                <Package className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Товаров пока нет</h3>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-6 py-3 text-xs font-bold bg-black text-white rounded-full shadow-md"
                >
                  Добавить первый товар
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shopProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative bg-slate-50 flex items-center justify-center p-2">
                        <img
                          src={prod.image_url}
                          alt={prod.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            prod.is_available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {prod.is_available ? 'В наличии' : 'Распродано'}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {prod.brand || 'БРЕНД'}
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-sm uppercase leading-snug line-clamp-2">
                          {prod.title}
                        </h3>

                        <div className="flex items-baseline justify-between pt-1">
                          <span className="font-black text-slate-900 text-base font-display">
                            {prod.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {prod.category && (
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">
                              {prod.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2">
                      <button onClick={() => handleOpenProductModal(prod)} className="p-2 text-slate-600 hover:text-black rounded-full hover:bg-slate-100">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(prod.id)} className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TELEGRAM CONFIGURATION */}
        {activeTab === 'telegram' && (
          <form onSubmit={handleSaveShopTheme} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Прием заказов в Telegram</h2>
              <p className="text-xs text-slate-500">Укажите ваш Telegram юзернейм для приема заявок</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
              <label className="block text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-blue-600" />
                <span>Ваш Юзернейм в Telegram:</span>
              </label>
              <div className="flex items-center">
                <span className="text-xs text-slate-500 bg-white px-4 py-3 rounded-l-2xl border border-r-0 border-slate-300 font-mono">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={themeForm.telegram || ''}
                  onChange={(e) => setThemeForm({ ...themeForm, telegram: e.target.value })}
                  className="bg-white border border-slate-300 text-xs text-slate-900 rounded-r-2xl px-4 py-3 flex-1 font-bold"
                  placeholder="underbuy_admin"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить юзернейм Telegram</span>
            </button>
          </form>
        )}

      </div>

      {/* ADD BLOCK MODAL */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">Библиотека Блоков</h3>
              <button onClick={() => setShowAddBlockModal(false)} className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {BLOCK_LIBRARY.map((item) => (
                <div
                  key={item.type}
                  onClick={() => handleAddBlockFromLibrary(item)}
                  className="bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl border border-slate-200 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-black">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-black" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK PROPS EDIT MODAL */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Настройка блока [{editingBlock.type}]
              </h3>
              <button onClick={() => setEditingBlock(null)} className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlockProps} className="space-y-4">
              {editingBlock.type === 'categories' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Стиль фильтров</label>
                  <select
                    value={blockPropsForm.filterStyle || 'underbuy_dropdowns'}
                    onChange={(e) => setBlockPropsForm({ ...blockPropsForm, filterStyle: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                  >
                    <option value="underbuy_dropdowns">Underbuy Рамочные выпадающие меню [ ВСЕ v ] [ ВСЕ БРЕНДЫ v ]</option>
                    <option value="pill">Округлые чипсы (Pills)</option>
                  </select>
                </div>
              )}

              {editingBlock.type === 'products' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Количество колонок</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBlockPropsForm({ ...blockPropsForm, columns: num })}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            (blockPropsForm.columns || 2) === num
                              ? 'bg-black text-white border-black shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {num} {num === 1 ? 'Колонка' : 'Колонки'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Стиль карточек товаров</label>
                    <select
                      value={blockPropsForm.cardStyle || 'underbuy'}
                      onChange={(e) => setBlockPropsForm({ ...blockPropsForm, cardStyle: e.target.value })}
                      className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                    >
                      <option value="underbuy">Underbuy (Сердечко, заглавный бренд, заглавное название)</option>
                      <option value="modern">Modern (Скруглённые с тенью)</option>
                      <option value="glass">Glassmorphism (Стеклянные)</option>
                    </select>
                  </div>
                </div>
              )}

              {editingBlock.title !== undefined && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Заголовок блока</label>
                  <input
                    type="text"
                    value={blockPropsForm.title || ''}
                    onChange={(e) => setBlockPropsForm({ ...blockPropsForm, title: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingBlock(null)} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full shadow-md">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Название товара</label>
                <input
                  type="text"
                  required
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 font-bold rounded-2xl px-4 py-3 w-full uppercase"
                  placeholder="ENFANTS RICHES DEPRIMES TOTE BAG"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Категория</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full uppercase font-bold"
                    placeholder="СУМКИ, ОДЕЖДА..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Бренд (Производитель)</label>
                  <input
                    type="text"
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full uppercase font-bold"
                    placeholder="ENFANTS RICHES DEPRIMES, Y-3..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Цена (₽)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                    placeholder="6500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Старая цена (зачеркнутая)</label>
                  <input
                    type="number"
                    value={prodForm.oldPrice}
                    onChange={(e) => setProdForm({ ...prodForm, oldPrice: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full"
                    placeholder="8900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">URL Фотографии товара</label>
                <input
                  type="url"
                  required
                  value={prodForm.image_url}
                  onChange={(e) => setProdForm({ ...prodForm, image_url: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full shadow-md">
                  Сохранить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <label className="block text-xs font-bold text-slate-800 mb-1">Название магазина / Текст логотипа</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                  placeholder="under buy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">URL слаг (адрес витрины)</label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 bg-slate-100 px-4 py-3 rounded-l-2xl border border-r-0 border-slate-300 font-mono">
                    /#/s/
                  </span>
                  <input
                    type="text"
                    required
                    value={shopForm.slug}
                    onChange={(e) => setShopForm({ ...shopForm, slug: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-r-2xl px-4 py-3 flex-1 font-mono"
                    placeholder="under-buy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-600 mb-1 flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" />
                  <span>Ваш Telegram username для приема заказов</span>
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 bg-slate-100 px-4 py-3 rounded-l-2xl border border-r-0 border-slate-300 font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={shopForm.telegram}
                    onChange={(e) => setShopForm({ ...shopForm, telegram: e.target.value })}
                    className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-r-2xl px-4 py-3 flex-1 font-bold"
                    placeholder="underbuy_admin"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowShopModal(false)} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full">
                  Отмена
                </button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full shadow-md">
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

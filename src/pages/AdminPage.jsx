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
  Image as ImageIcon,
  Heart,
  Type
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
    alert('Настройки брендинга и логотипа сохранены!')
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-slate-700 flex items-center justify-center font-black text-white text-lg shadow-md font-display">
              UB
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <span>Конструктор Витрины Underbuy Style</span>
              </h1>
              <p className="text-xs text-slate-400">Настройка логотипа, сетки блоков, сердечек и карточек товаров</p>
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
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
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
                <span>Просмотр витрины</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
        
        {/* Share Banner */}
        {activeShop && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-blue-500/30 flex items-center justify-between flex-wrap gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="text-xs text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Ссылка на вашу витрину в стиле Underbuy:</span>
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
                <span>{copiedLink ? 'Скопировано!' : 'Скопировать ссылку'}</span>
              </button>

              <a
                href={`#/s/${activeShop.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-8 space-x-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'builder'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Конструктор Блоков Витрины ({activeBlocks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'branding'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Логотип и Настройки Шапки</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'presets'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Стиль Underbuy и Пресеты</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Мои Товары ({shopProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'telegram'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Прием Заказов в Telegram</span>
          </button>
        </div>

        {/* TAB 1: VISUAL BUILDER */}
        {activeTab === 'builder' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Интерактивный конструктор витрины</h2>
                <p className="text-xs text-slate-400">Передвигайте блоки, настраивайте колонки карточек и рамочные фильтры Underbuy</p>
              </div>

              <button
                onClick={() => handleOpenAddBlockModal(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить блок</span>
              </button>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {activeBlocks.map((block, idx) => (
                <React.Fragment key={block.id}>
                  
                  <div className="group relative bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 rounded-3xl p-6 transition-all shadow-xl">
                    
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 shadow-md opacity-95">
                      <button
                        onClick={() => handleOpenEditBlock(block)}
                        className="p-1.5 text-blue-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                        title="Настроить стиль"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Настроить</span>
                      </button>

                      <span className="w-px h-4 bg-slate-800"></span>

                      <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => moveBlock(idx, 1)} disabled={idx === activeBlocks.length - 1} className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => duplicateBlock(idx)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                        <CopyIcon className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteBlock(block.id)} className="p-1.5 text-red-400 hover:text-red-300 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2 pr-36">
                      <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                        Блок #{idx + 1}: {block.type}
                      </div>

                      {block.type === 'categories' && (
                        <div className="space-y-2 pt-1">
                          <div className="font-bold text-white text-sm">Рамочные фильтры [ ВСЕ v ] [ ВСЕ БРЕНДЫ v ]</div>
                          <div className="flex gap-3">
                            <div className="border-2 border-slate-700 bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 flex justify-between items-center w-36">
                              <span>ВСЕ</span> <span>v</span>
                            </div>
                            <div className="border-2 border-slate-700 bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 flex justify-between items-center w-40">
                              <span>ВСЕ БРЕНДЫ</span> <span>v</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {block.type === 'products' && (
                        <div className="space-y-3 pt-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white">Сетка каталога ({block.columns || 2} Колонки | Стиль: {block.cardStyle || 'underbuy'})</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {shopProducts.slice(0, 2).map((p) => (
                              <div key={p.id} className="bg-white text-black p-3 border border-slate-300 rounded-none relative space-y-1">
                                <Heart className="w-4 h-4 absolute top-2 right-2 text-black" />
                                <img src={p.image_url} alt="" className="w-full h-24 object-cover mb-2" />
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{p.brand}</div>
                                <div className="text-[11px] font-extrabold uppercase leading-tight line-clamp-1">{p.title}</div>
                                <div className="text-sm font-black pt-1">{p.price} ₽</div>
                                <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">{p.category}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {block.type === 'banner' && (
                        <div className="space-y-1">
                          <h3 className="text-lg font-extrabold text-white">{block.title}</h3>
                          <p className="text-xs text-slate-400">{block.subtitle}</p>
                        </div>
                      )}

                      {block.type === 'contact' && (
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white">{block.title}</h3>
                          <p className="text-xs text-slate-400">{block.subtitle}</p>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="flex justify-center my-2">
                    <button
                      onClick={() => handleOpenAddBlockModal(idx)}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white border border-dashed border-slate-700 hover:border-blue-500 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Вставить блок сюда</span>
                    </button>
                  </div>

                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BRANDING & LOGO EDITOR */}
        {activeTab === 'branding' && (
          <form onSubmit={handleSaveShopTheme} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Настройка Логотипа и Шапки Витрины</h2>
              <p className="text-xs text-slate-400">Настройте отображение вашего логотипа (текст или картинка)</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Текст логотипа (как "under buy" на скриншоте)
                </label>
                <input
                  type="text"
                  value={themeForm.logoText || activeShop?.name}
                  onChange={(e) => setThemeForm({ ...themeForm, logoText: e.target.value })}
                  className="bg-slate-950 border border-slate-700 text-sm text-white font-bold rounded-xl px-4 py-3 w-full font-display"
                  placeholder="under buy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ИЛИ Картинка Логотипа (URL файла логотипа)
                </label>
                <input
                  type="url"
                  value={themeForm.logoUrl || ''}
                  onChange={(e) => setThemeForm({ ...themeForm, logoUrl: e.target.value })}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Валюта каталога</label>
                <select
                  value={themeForm.currencySymbol || '₽'}
                  onChange={(e) => setThemeForm({ ...themeForm, currencySymbol: e.target.value })}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
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
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
              <h2 className="text-xl font-bold text-white">Готовые пресеты визуального оформления</h2>
              <p className="text-xs text-slate-400">Применяйте готовые концепции дизайна к своему магазину</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LAYOUT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white font-display">{preset.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{preset.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      applyPresetToShop(activeShop.id, preset.id)
                      alert(`Дизайн "${preset.name}" применен к вашей витрине!`)
                    }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Применить этот пресет</span>
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
                <h2 className="text-xl font-bold text-white">Управление товарами магазина "{activeShop?.name}"</h2>
                <p className="text-xs text-slate-400">Добавляйте свои наименования, цены, старые цены, фотки, категории и размеры</p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить новый товар</span>
              </button>
            </div>

            {/* Products Grid */}
            {shopProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 rounded-3xl border border-dashed border-slate-800 space-y-3">
                <Package className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-semibold text-slate-300">В этом магазине пока нет товаров</h3>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-md"
                >
                  Добавить товар
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shopProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all shadow-sm"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative bg-slate-950">
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
                          {prod.category || 'СУМКИ'}
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug line-clamp-1 uppercase">
                          {prod.title}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-white text-base font-display">
                              {prod.price.toLocaleString('ru-RU')} ₽
                            </span>
                            {prod.oldPrice && (
                              <span className="line-through text-slate-500 text-xs">
                                {prod.oldPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                          </div>
                          {prod.size && (
                            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                              {prod.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-800 mt-2">
                      <button onClick={() => handleOpenProductModal(prod)} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(prod.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg">
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
          <form onSubmit={handleSaveShopTheme} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Прием заказов в Telegram</h2>
              <p className="text-xs text-slate-400">Укажите ваш Telegram юзернейм для приема сообщений</p>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/40 p-4 rounded-2xl space-y-2">
              <label className="block text-xs font-bold text-blue-300 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-blue-400" />
                <span>Ваш Юзернейм в Telegram для приема заказов:</span>
              </label>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 bg-slate-950 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-700 font-mono">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={themeForm.telegram || ''}
                  onChange={(e) => setThemeForm({ ...themeForm, telegram: e.target.value })}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-semibold"
                  placeholder="reseller_admin"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить юзернейм Telegram</span>
            </button>
          </form>
        )}

      </div>

      {/* ADD BLOCK MODAL */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Библиотека Блоков</h3>
              <button onClick={() => setShowAddBlockModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {BLOCK_LIBRARY.map((item) => (
                <div
                  key={item.type}
                  onClick={() => handleAddBlockFromLibrary(item)}
                  className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-blue-500 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK PROPS EDIT MODAL */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                Настройка блока [{editingBlock.type}]
              </h3>
              <button onClick={() => setEditingBlock(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlockProps} className="space-y-4">
              {editingBlock.type === 'categories' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Стиль фильтров</label>
                  <select
                    value={blockPropsForm.filterStyle || 'underbuy_dropdowns'}
                    onChange={(e) => setBlockPropsForm({ ...blockPropsForm, filterStyle: e.target.value })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  >
                    <option value="underbuy_dropdowns">Underbuy Рамочные выпадающие меню [ ВСЕ v ] [ ВСЕ БРЕНДЫ v ]</option>
                    <option value="pill">Округлые чипсы (Pills)</option>
                  </select>
                </div>
              )}

              {editingBlock.type === 'products' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Количество колонок</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBlockPropsForm({ ...blockPropsForm, columns: num })}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            (blockPropsForm.columns || 2) === num
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {num} Колонки
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Стиль карточек товаров</label>
                    <select
                      value={blockPropsForm.cardStyle || 'underbuy'}
                      onChange={(e) => setBlockPropsForm({ ...blockPropsForm, cardStyle: e.target.value })}
                      className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    >
                      <option value="underbuy">Underbuy (Заглавный бренд, название, сердечко, цена)</option>
                      <option value="modern">Modern (С тенью и скруглением)</option>
                      <option value="glass">Glassmorphism (Стеклянный)</option>
                    </select>
                  </div>
                </div>
              )}

              {editingBlock.title !== undefined && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Заголовок блока</label>
                  <input
                    type="text"
                    value={blockPropsForm.title || ''}
                    onChange={(e) => setBlockPropsForm({ ...blockPropsForm, title: e.target.value })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingBlock(null)} className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl">
                  Отмена
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="p-1 text-slate-400 hover:text-white">
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
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="ENFANTS RICHES DEPRIMES TOTE BAG"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Категория</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full font-mono uppercase"
                    placeholder="СУМКИ, ОДЕЖДА..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Бренд (Производитель)</label>
                  <input
                    type="text"
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full uppercase"
                    placeholder="ENFANTS RICHES DEPRIMES, Y-3..."
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
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="6500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Старая цена (зачеркнутая)</label>
                  <input
                    type="number"
                    value={prodForm.oldPrice}
                    onChange={(e) => setProdForm({ ...prodForm, oldPrice: e.target.value })}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                    placeholder="8900"
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
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl">
                  Отмена
                </button>
                <button type="submit" className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md">
                  Сохранить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SHOP MODAL */}
      {showShopModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Создать витрину в стиле Underbuy</h3>
              <button onClick={() => setShowShopModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Название магазина / Текст логотипа</label>
                <input
                  type="text"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  placeholder="under buy"
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
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-mono"
                    placeholder="under-buy"
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
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-r-xl px-3 py-2.5 flex-1 font-semibold"
                    placeholder="underbuy_admin"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowShopModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl">
                  Отмена
                </button>
                <button type="submit" className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md">
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

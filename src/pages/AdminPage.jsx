import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  ArrowUp,
  ArrowDown,
  Layers,
  Image as ImageIcon,
  SlidersHorizontal,
  Wand2
} from 'lucide-react'
import { useStore, THEME_PRESETS } from '../store/useStore'

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

  const [activeTab, setActiveTab] = useState('blocks') // 'blocks' | 'products' | 'presets' | 'telegram' | 'shops'
  const [showProductModal, setShowProductModal] = useState(false)
  const [showShopModal, setShowShopModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Current selected shop
  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === activeShop?.id)
  const activeBlocks = activeShop?.blocks || []

  // Block creation/edit state
  const [editingBlock, setEditingBlock] = useState(null)
  const [blockForm, setBlockForm] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    buttonText: ''
  })

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
    activeShop?.theme_config || THEME_PRESETS[0].config
  )

  // Block Reordering Handlers
  const moveBlock = (index, direction) => {
    if (!activeShop) return
    const newBlocks = [...activeBlocks]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return
    const [moved] = newBlocks.splice(index, 1)
    newBlocks.splice(targetIndex, 0, moved)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const deleteBlock = (blockId) => {
    if (!activeShop) return
    if (activeBlocks.length <= 1) {
      alert('В магазине должен оставаться хотя бы один блок!')
      return
    }
    const newBlocks = activeBlocks.filter((b) => b.id !== blockId)
    updateShopBlocks(activeShop.id, newBlocks)
  }

  const handleAddBlock = (type) => {
    if (!activeShop) return
    let newBlock = { id: 'b-' + Date.now(), type, title: 'Новый блок' }
    if (type === 'banner') {
      newBlock = { id: 'b-' + Date.now(), type, title: 'Новая коллекция', subtitle: 'Описание подзаголовка баннера', imageUrl: '' }
    } else if (type === 'promo') {
      newBlock = {
        id: 'b-' + Date.now(),
        type,
        title: '🔥 Спецпредложение недели',
        subtitle: 'Скидка на вторую позицию',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
        buttonText: 'Выбрать'
      }
    } else if (type === 'contact') {
      newBlock = { id: 'b-' + Date.now(), type, title: 'Задайте вопрос продавцу в Telegram', subtitle: 'Отвечаем за 2 минуты' }
    }
    updateShopBlocks(activeShop.id, [...activeBlocks, newBlock])
  }

  const handleOpenEditBlock = (block) => {
    setEditingBlock(block)
    setBlockForm({
      title: block.title || '',
      subtitle: block.subtitle || '',
      imageUrl: block.imageUrl || '',
      buttonText: block.buttonText || ''
    })
  }

  const handleSaveBlock = (e) => {
    e.preventDefault()
    if (!editingBlock || !activeShop) return
    const updated = activeBlocks.map((b) =>
      b.id === editingBlock.id ? { ...b, ...blockForm } : b
    )
    updateShopBlocks(activeShop.id, updated)
    setEditingBlock(null)
  }

  // Product Form Handlers
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
    const cleanTg = (themeForm.telegram || '').replace('@', '').trim()
    const updatedTheme = { ...themeForm, telegram: cleanTg }

    updateShop(activeShop.id, { theme_config: updatedTheme })
    setThemeForm(updatedTheme)
    alert('Настройки Telegram и цвета сохранены!')
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white">Конструктор Витрины Ресейлера</h1>
              <p className="text-xs text-slate-400">Настройка блоков, стилей модных брендов и заказов в Telegram</p>
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
              <span>Создать магазин</span>
            </button>

            {activeShop && (
              <button
                onClick={() => navigate(`/s/${activeShop.slug}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Открыть витрину</span>
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
                <span>{copiedLink ? 'Скопировано!' : 'Скопировать ссылку'}</span>
              </button>

              <a
                href={`#/s/${activeShop.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-xl"
                title="Открыть витрину"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-8 space-x-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('blocks')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'blocks'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Конструктор Блоков ({activeBlocks.length})</span>
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
            <span>Шаблоны Брендов</span>
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
            <span>Товары ({shopProducts.length})</span>
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
            <span>Настройка Telegram</span>
          </button>
        </div>

        {/* TAB 1: VISUAL BLOCK BUILDER */}
        {activeTab === 'blocks' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Block Control List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Управление блоками витрины</h2>
                  <p className="text-xs text-slate-400">Меняйте порядок блоков, редактируйте тексты и вставляйте картинки</p>
                </div>

                {/* Add Block Dropdown Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddBlock('banner')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold rounded-xl"
                  >
                    + Баннер
                  </button>
                  <button
                    onClick={() => handleAddBlock('promo')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold rounded-xl"
                  >
                    + Промо-картинка
                  </button>
                </div>
              </div>

              {/* Active Blocks Draggable/Reorderable List */}
              <div className="space-y-4">
                {activeBlocks.map((block, idx) => (
                  <div
                    key={block.id}
                    className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-slate-600 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-slate-400 text-xs">
                        #{idx + 1}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>
                            {block.type === 'banner' && '🖼️ Блок: Герой-Баннер'}
                            {block.type === 'categories' && '🏷️ Блок: Чипсы Категорий & Поиск'}
                            {block.type === 'products' && '📦 Блок: Каталог Товаров'}
                            {block.type === 'promo' && '📸 Блок: Акционное Изображение'}
                            {block.type === 'contact' && '💬 Блок: Заказ в Telegram'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{block.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Reorder Buttons */}
                      <button
                        onClick={() => moveBlock(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-700"
                        title="Вверх"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => moveBlock(idx, 1)}
                        disabled={idx === activeBlocks.length - 1}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-700"
                        title="Вниз"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      {(block.type === 'banner' || block.type === 'promo' || block.type === 'contact') && (
                        <button
                          onClick={() => handleOpenEditBlock(block)}
                          className="p-1.5 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-slate-700"
                          title="Редактировать содержимое"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-slate-700"
                        title="Удалить блок"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Live Mini Preview Frame */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Предпросмотр блочной структуры</span>
              </h3>

              <div className="mx-auto w-[320px] h-[580px] bg-slate-950 rounded-[3rem] p-3 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex-shrink-0"></div>

                <div
                  className="flex-1 rounded-[2.2rem] overflow-y-auto p-4 space-y-3 text-slate-100 text-xs"
                  style={{
                    backgroundColor: activeShop?.theme_config?.backgroundColor || '#090a0f',
                    color: activeShop?.theme_config?.textColor || '#ffffff'
                  }}
                >
                  {activeBlocks.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-2xl border border-white/15 bg-white/5 space-y-1"
                    >
                      <div className="text-[10px] font-bold uppercase text-blue-400">[{b.type}]</div>
                      <div className="font-bold text-xs">{b.title}</div>
                      {b.imageUrl && (
                        <img src={b.imageUrl} alt="" className="w-full h-16 object-cover rounded-lg mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BRAND PRESETS SELECTOR */}
        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Готовые стили и шаблоны модных брендов</h2>
              <p className="text-xs text-slate-400">Выберите готовый пресет оформления в 1 клик для вашего магазина</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {THEME_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-slate-800 rounded-3xl p-6 border border-slate-700 hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">{preset.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{preset.desc}</p>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs text-slate-500">Палитра:</span>
                      <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.config.backgroundColor }}></span>
                      <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.config.cardBg }}></span>
                      <span className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: preset.config.primaryColor }}></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyPresetToShop(activeShop.id, preset.id)
                      alert(`Стиль "${preset.name}" применен к вашей витрине!`)
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Применить этот шаблон</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
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

            {/* Products Grid */}
            {shopProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-dashed border-slate-700">
                <Package className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-300">В этом магазине пока нет товаров</h3>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="mt-3 px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-md"
                >
                  Добавить товар
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

        {/* TAB 4: TELEGRAM CONFIGURATION */}
        {activeTab === 'telegram' && (
          <form onSubmit={handleSaveShopTheme} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Прием заказов в Telegram</h2>
              <p className="text-xs text-slate-400">Укажите ваш Telegram юзернейм для моментального приёма заявок</p>
            </div>

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
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить юзернейм Telegram</span>
            </button>
          </form>
        )}

      </div>

      {/* EDIT BLOCK CONTENT MODAL */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Редактировать блок</h3>
              <button onClick={() => setEditingBlock(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Заголовок блока</label>
                <input
                  type="text"
                  value={blockForm.title}
                  onChange={(e) => setBlockForm({ ...blockForm, title: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Подзаголовок / Описание</label>
                <input
                  type="text"
                  value={blockForm.subtitle}
                  onChange={(e) => setBlockForm({ ...blockForm, subtitle: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                />
              </div>

              {editingBlock.type === 'promo' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL картинки баннера</label>
                  <input
                    type="url"
                    value={blockForm.imageUrl}
                    onChange={(e) => setBlockForm({ ...blockForm, imageUrl: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 w-full"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 rounded-xl"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL WITH BRAND & CATEGORY */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
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

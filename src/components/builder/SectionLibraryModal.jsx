import React, { useState } from 'react'
import { X, Plus, Sparkles, Check, ChevronRight, Layers, Star } from 'lucide-react'
import { THEMES_REGISTRY } from '../../themes/index.jsx'

export const COMPONENT_BLOCK_VARIANTS = [
  // HERO VARIANTS
  {
    id: 'hero-balenciaga',
    type: 'hero',
    themeId: 'balenciaga',
    category: 'Hero',
    name: 'Balenciaga High Fashion Hero',
    desc: 'Монохромная обложка высокой моды с гигантской типографикой и бейджем коллекции.',
    props: {
      title: 'BALENCIAGA RUNWAY ARCHIVE',
      subtitle: 'Эксклюзивный ресейл концептуальной моды с гарантией подлинности'
    }
  },
  {
    id: 'hero-poizon',
    type: 'hero',
    themeId: 'poizon',
    category: 'Hero',
    name: 'Poizon Cyber Sneaker Hero',
    desc: 'Тёмный технологичный статус-бар с неон cyan свечением и 100% Legit Check.',
    props: {
      title: 'POIZON SNEAKER MARKETPLACE',
      subtitle: 'Платформа лимитированных ресейл-дропов с проверкой подлинности POIZON'
    }
  },
  {
    id: 'hero-zara',
    type: 'hero',
    themeId: 'zara',
    category: 'Hero',
    name: 'Modern Store Minimal Hero',
    desc: 'Чистый минималистичный e-commerce статус-бар с моментальным сервисом.',
    props: {
      title: 'MODERN STORE CATALOGUE • EXPRESS TELEGRAM ORDER SERVICE'
    }
  },

  // CATALOG VARIANTS
  {
    id: 'catalog-balenciaga',
    type: 'products',
    themeId: 'balenciaga',
    category: 'Catalog',
    name: 'Balenciaga 2-Column Luxury Grid',
    desc: 'Крупный 2-колоночный каталог в монохромных рамках 4:5 с сердечками.',
    props: {
      columns: 2
    }
  },
  {
    id: 'catalog-poizon',
    type: 'products',
    themeId: 'poizon',
    category: 'Catalog',
    name: 'Poizon Cyber 4-Column Grid',
    desc: 'Плотный маркетплейс в 4 колонки, скидки -20%, размеры и неон cyan.',
    props: {
      columns: 4
    }
  },
  {
    id: 'catalog-zara',
    themeId: 'zara',
    type: 'products',
    category: 'Catalog',
    name: 'Modern Store 4-Column Grid',
    desc: 'Чистый белый каталог в 4 колонки с пропорциями карточек 4:5.',
    props: {
      columns: 4
    }
  },

  // FOOTER / CTA VARIANTS
  {
    id: 'contact-balenciaga',
    type: 'contact',
    themeId: 'balenciaga',
    category: 'Footer',
    name: 'Balenciaga Luxury Concierge Footer',
    desc: 'Чёрный премиальный подвал с кнопкой прямого приёма заказов в Telegram.',
    props: {
      telegram: 'reseller_admin'
    }
  },
  {
    id: 'contact-poizon',
    type: 'contact',
    themeId: 'poizon',
    category: 'Footer',
    name: 'Poizon Fast Telegram Footer',
    desc: 'Тёмно-синий технологичный подвал с гарантией и кнопкой Telegram.',
    props: {
      telegram: 'reseller_admin'
    }
  },
  {
    id: 'contact-zara',
    type: 'contact',
    themeId: 'zara',
    category: 'Footer',
    name: 'Modern Store Concierge Footer',
    desc: 'Светлый компактный подвал с клиентской службой.',
    props: {
      telegram: 'reseller_admin'
    }
  }
]

// DEMO PRODUCTS FOR REAL REACT COMPONENT MINI RENDER
const DEMO_PRODUCTS = [
  { id: '1', title: 'TRIPLE S SNEAKER', brand: 'BALENCIAGA', price: 65000, oldPrice: 78000, size: '42, 43', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', is_available: true },
  { id: '2', title: 'TOTE BAG ARCHIVE', brand: 'ENFANTS RICHES', price: 6500, oldPrice: 8900, size: 'One Size', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80', is_available: true }
]

export function SectionLibraryModal({ isOpen, onClose, onSelectSection }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedSection, setSelectedSection] = useState(COMPONENT_BLOCK_VARIANTS[0])

  if (!isOpen) return null

  const categories = [
    { id: 'ALL', label: '⭐ Все секции' },
    { id: 'Hero', label: '🖼️ Hero Обложки' },
    { id: 'Catalog', label: '📦 Сетки Каталога' },
    { id: 'Footer', label: '💬 Подвал & CTA' }
  ]

  const filtered = activeCategory === 'ALL'
    ? COMPONENT_BLOCK_VARIANTS
    : COMPONENT_BLOCK_VARIANTS.filter((item) => item.category === activeCategory)

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="bg-[#0d0f17] border border-slate-800 rounded-[2rem] max-w-7xl w-full h-[90vh] flex flex-col text-white shadow-2xl overflow-hidden">
        
        {/* TOP BAR */}
        <div className="h-16 bg-[#090a0f] border-b border-slate-800 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-blue-500" />
            <span className="font-extrabold text-lg font-display text-white">
              Панель вставки компонентов (Framer / Tilda / Shopify Style)
            </span>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-COLUMN STUDIO STUDIO WORKSPACE */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 1. LEFT CATEGORY SIDEBAR */}
          <div className="w-56 bg-[#090a0f] border-r border-slate-800/80 p-4 space-y-1.5 flex-shrink-0 overflow-y-auto">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">
              КАТЕГОРИИ ИНТЕРФЕЙСА
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* 2. CENTER REAL REACT COMPONENT MINI RENDER GRID */}
          <div className="flex-1 bg-[#090a0f] p-6 overflow-y-auto space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              ВЫБЕРИТЕ КОМПОНЕНТ ДЛЯ МГНОВЕННОЙ ВСТАВКИ:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => {
                const themePkg = THEMES_REGISTRY[item.themeId] || THEMES_REGISTRY.balenciaga
                const { HeroComponent, CatalogComponent, FooterComponent } = themePkg
                const isSelected = selectedSection.id === item.id

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSection(item)}
                    className={`bg-slate-900 border rounded-2xl p-3 space-y-3 cursor-pointer group transition-all duration-200 relative ${
                      isSelected ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-xl' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* MINIATURE REAL REACT COMPONENT SCALED CONTAINER */}
                    <div className="h-48 w-full bg-white rounded-xl overflow-hidden relative text-black border border-slate-700 pointer-events-none transform scale-100 origin-top">
                      <div className="transform scale-[0.45] origin-top-left w-[220%] space-y-2 p-2">
                        {item.type === 'hero' && (
                          <HeroComponent props={item.props} />
                        )}
                        {item.type === 'products' && (
                          <CatalogComponent products={DEMO_PRODUCTS} currencySymbol="₽" telegram="admin" />
                        )}
                        {item.type === 'contact' && (
                          <FooterComponent telegram="admin" />
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-xs text-white group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Instant Insert Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectSection(item)
                        onClose()
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Вставить компонент</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. RIGHT COMPONENT DETAILS INSPECTOR PANEL */}
          <div className="w-80 bg-[#090a0f] border-l border-slate-800/80 p-6 space-y-6 flex-shrink-0 flex flex-col justify-between hidden xl:flex">
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                СВОЙСТВА КОМПОНЕНТА
              </div>

              <div>
                <h3 className="text-base font-black text-white font-display">{selectedSection.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedSection.desc}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300 block">Тип секции:</span>
                <span className="px-3 py-1 bg-slate-800 text-blue-400 text-xs font-mono font-bold rounded-lg border border-slate-700 inline-block">
                  {selectedSection.type.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectSection(selectedSection)
                onClose()
              }}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить на страницу</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

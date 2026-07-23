import React, { useState } from 'react'
import { X, Plus, Eye, Sparkles, Check, ChevronRight, Layers, Tag } from 'lucide-react'

export const RICH_SECTION_LIBRARY = [
  // 1. HERO SECTIONS
  {
    id: 'hero-balenciaga',
    type: 'hero',
    variant: 1,
    category: 'Hero',
    name: 'Balenciaga High Fashion Hero',
    desc: 'Монохромная обложка высокой моды с гигантским заголовком и подписью коллекции.',
    tags: ['Luxury', 'Monochrome', 'Avant-Garde'],
    previewImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    features: ['Гигантская типографика', 'Темный / Светлый контраст', 'Подпись коллекции'],
    defaultProps: {
      title: 'BALENCIAGA RUNWAY ARCHIVE',
      subtitle: 'Эксклюзивный ресейл концептуальной моды с гарантией подлинности',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'hero-poizon',
    type: 'hero',
    variant: 2,
    category: 'Hero',
    name: 'Poizon Cyber Sneaker Hero',
    desc: 'Тёмный технологичный баннер с неоновым свечением, бейджем Legit Check и таймером дропа.',
    tags: ['Cyber', 'Neon Cyan', 'Marketplace'],
    previewImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    features: ['Бейдж 100% Legit Check', 'Неоновые акценты cyan', 'Таймер следующего дропа'],
    defaultProps: {
      title: 'POIZON SNEAKER MARKETPLACE',
      subtitle: 'Платформа лимитированных ресейл-дропов с проверкой подлинности POIZON',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'hero-zara',
    type: 'hero',
    variant: 3,
    category: 'Hero',
    name: 'Zara Editorial Lookbook Hero',
    desc: 'Белоснежная редакционная обложка журнала высокой моды с ультракрупной фотографией.',
    tags: ['Editorial', 'Minimal', 'Vogue'],
    previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    features: ['Редакционная типографика', 'Высокий формат фотографии', 'Чистый белый фон'],
    defaultProps: {
      title: 'ZARA EDITORIAL ARCHIVE',
      subtitle: 'Чистые линии, строгий силуэт и естественные фактурные ткани',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    }
  },

  // 2. CATALOG SECTIONS
  {
    id: 'catalog-luxury',
    type: 'products',
    variant: 1,
    category: 'Catalog',
    name: 'Luxury Boutique 2-Column Grid',
    desc: 'Крупный 2-колоночный каталог высокой моды со строгой рамкой, сердечками и мгновенной фильтрацией.',
    tags: ['Luxury', '2 Columns', 'High-Res'],
    previewImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    features: ['2 колонки (50% ширины)', 'Рамочный стиль', 'Быстрый заказ в Telegram'],
    defaultProps: {
      title: 'Luxury Catalogue',
      columns: 2,
      cardStyle: 'underbuy'
    }
  },
  {
    id: 'catalog-poizon',
    type: 'products',
    variant: 2,
    category: 'Catalog',
    name: 'Poizon Cyber 4-Column Grid',
    desc: 'Плотный маркетплейс в 4 колонки с бейджами скидок -20%, плашками размеров и быстрым поиском.',
    tags: ['Cyber', '4 Columns', 'Discount Tags'],
    previewImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    features: ['Плотная сетка 4 колонок', 'Бейджи скидок -20%', 'Размеры на карточках'],
    defaultProps: {
      title: 'Sneaker Drops',
      columns: 4,
      cardStyle: 'poizon'
    }
  },
  {
    id: 'catalog-modern',
    type: 'products',
    variant: 3,
    category: 'Catalog',
    name: 'Modern Store 4-Column Clean Grid',
    desc: 'Чистый белый каталог в 4 колонки с пропорциями карточек 4:5 для максимальной конверсии.',
    tags: ['Clean', '4:5 Ratio', 'High Conversion'],
    previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    features: ['Пропорции фото 4:5', 'Скругления rounded-2xl', 'Мгновенный поиск'],
    defaultProps: {
      title: 'Modern Catalogue',
      columns: 4,
      cardStyle: 'zara'
    }
  },

  // 3. CTA / CONTACT SECTIONS
  {
    id: 'contact-balenciaga',
    type: 'contact',
    variant: 1,
    category: 'CTA',
    name: 'Balenciaga Private Concierge CTA',
    desc: 'Чёрный премиальный блок обратной связи для индивидуального приёма заказов в Telegram.',
    tags: ['Concierge', 'Telegram', 'Black Gold'],
    previewImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    features: ['Прямой приём заказов', 'Индивидуальный стилист', 'Telegram кнопка'],
    defaultProps: {
      title: 'BALENCIAGA PRIVATE CONCIERGE',
      subtitle: 'Прямой приём заказов и консультация стилиста в Telegram'
    }
  },
  {
    id: 'contact-poizon',
    type: 'contact',
    variant: 2,
    category: 'CTA',
    name: 'Poizon Cyber Fast Order Gateway',
    desc: 'Неоновый блок быстрой покупки кроссовок с гарантией подбора размера за 2 минуты.',
    tags: ['Cyber', 'Neon Cyan', 'Fast Order'],
    previewImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    features: ['Неоновый стиль', 'Подбор размера за 2 мин', 'Telegram клиент'],
    defaultProps: {
      title: 'POIZON FAST TELEGRAM ORDER',
      subtitle: 'Быстрая проверка размера и моментальный приём заказов менеджером'
    }
  }
]

export function SectionLibraryModal({ isOpen, onClose, onSelectSection }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [inspectingSection, setInspectingSection] = useState(null)

  if (!isOpen) return null

  const categories = ['ALL', 'Hero', 'Catalog', 'CTA']

  const filteredSections = activeCategory === 'ALL'
    ? RICH_SECTION_LIBRARY
    : RICH_SECTION_LIBRARY.filter((s) => s.category === activeCategory)

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none">
      
      {/* FULLSCREEN TILDA-STYLE SECTION INSPECTOR PREVIEW */}
      {inspectingSection ? (
        <div className="fixed inset-0 z-50 bg-[#090a0f] text-white flex flex-col animate-in fade-in zoom-in duration-200">
          
          {/* Top Bar */}
          <div className="h-16 bg-[#0d0f17] border-b border-slate-800 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-lg text-white font-display">
                Предпросмотр секции: {inspectingSection.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                {inspectingSection.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectSection(inspectingSection)
                  setInspectingSection(null)
                  onClose()
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-full shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить секцию в магазин</span>
              </button>

              <button
                onClick={() => setInspectingSection(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Inspection Viewport Area */}
          <div className="flex-1 overflow-y-auto p-8 flex gap-8 justify-center bg-[#090a0f]">
            
            {/* Left: Large Scrollable Visual Replica */}
            <div className="flex-1 max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden shadow-2xl space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Визуальный превью-рендер секции:
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-white">
                <img src={inspectingSection.previewImage} alt="" className="w-full h-[450px] object-cover" />
              </div>
            </div>

            {/* Right: Metadata Details */}
            <div className="w-96 bg-[#0d0f17] border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white font-display">{inspectingSection.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{inspectingSection.desc}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Особенности композиции:</span>
                  <div className="space-y-1">
                    {inspectingSection.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Теги стиля:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectingSection.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectSection(inspectingSection)
                  setInspectingSection(null)
                  onClose()
                }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить эту секцию</span>
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* MAIN TILDA BLOCK LIBRARY GRID MODAL */
        <div className="bg-[#0d0f17] border border-slate-800 rounded-[2.5rem] max-w-6xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col text-white">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-500" />
                <span>Библиотека готовых секций (Tilda & Framer Style)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Выберите секцию с настоящим превью дизайна и нажмите «Просмотреть» перед добавлением
              </p>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Nav Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sections Visual Miniatures Grid */}
          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
            {filteredSections.map((sec) => (
              <div
                key={sec.id}
                className="bg-slate-900/90 rounded-3xl p-4 border border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
              >
                <div className="space-y-3">
                  {/* Visual Real Design Screenshot Miniature Box */}
                  <div className="h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative group-hover:scale-[1.02] transition-transform duration-300">
                    <img src={sec.previewImage} alt={sec.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-blue-400 border border-slate-700">
                      {sec.category}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white font-display group-hover:text-blue-400 transition-colors">
                      {sec.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setInspectingSection(sec)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Просмотреть</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectSection(sec)
                      onClose()
                    }}
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Добавить</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

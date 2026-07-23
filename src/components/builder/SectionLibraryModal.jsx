import React, { useState } from 'react'
import { X, Plus, Layers, Sparkles, Check } from 'lucide-react'

export const EXPANDED_SECTION_LIBRARY = [
  {
    category: 'Hero',
    name: '🖼️ Hero (Обложки)',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      type: 'hero',
      name: `Hero Вариант #${i + 1}`,
      desc: i === 0 ? 'Минималистичный центр' : i === 1 ? 'Сплит с фото справа' : i === 2 ? 'Editorial во весь экран' : `Дизайнерская обложка #${i + 1}`,
      defaultProps: {
        title: 'НОВАЯ КОЛЛЕКЦИЯ 2026',
        subtitle: 'Эксклюзивная подборка брендов с доставкой',
        imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
        height: 'medium',
        buttonText: 'Смотреть каталог'
      }
    }))
  },

  {
    category: 'Catalog',
    name: '📦 Каталог и Карточки',
    count: 20,
    items: Array.from({ length: 20 }, (_, i) => ({
      variant: i + 1,
      type: 'products',
      name: `Каталог Сетка #${i + 1}`,
      desc: i === 0 ? 'Underbuy (2 колонки + сердечки)' : i === 1 ? 'Poizon Cyber Drop' : i === 2 ? 'Zara Tall Editorial' : i === 3 ? 'Farfetch 4 колонки' : `Сетка товаров #${i + 1}`,
      defaultProps: {
        title: 'Каталог товаров',
        columns: i === 3 ? 4 : i % 2 === 0 ? 2 : 3,
        cardStyle: i === 0 ? 'underbuy' : i === 1 ? 'poizon' : i === 2 ? 'zara' : i === 3 ? 'farfetch' : 'modern',
        showHeartIcon: true,
        showBrandBadge: true
      }
    }))
  },

  {
    category: 'Banner',
    name: '📸 Промо Баннеры',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      type: 'promo',
      name: `Баннер Вариант #${i + 1}`,
      desc: `Промо-баннер акций и скидок #${i + 1}`,
      defaultProps: {
        title: '🔥 Спецпредложение недели',
        subtitle: 'Скидка при заказе от 2-х вещей в Telegram',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
        buttonText: 'Выбрать'
      }
    }))
  },

  {
    category: 'Gallery',
    name: '🖼️ Галерея & Лукбук',
    count: 10,
    items: Array.from({ length: 10 }, (_, i) => ({
      variant: i + 1,
      type: 'gallery',
      name: `Галерея Вариант #${i + 1}`,
      desc: `Галерея стильных фотографий и лукбука #${i + 1}`,
      defaultProps: {
        title: 'Галерея коллекции',
        subtitle: 'Архивный фотосет новых поступлений'
      }
    }))
  },

  {
    category: 'Reviews',
    name: '⭐ Отзывы Покупателей',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      type: 'reviews',
      name: `Отзывы Вариант #${i + 1}`,
      desc: `Карточки отзывов клиентов #${i + 1}`,
      defaultProps: {
        title: 'Отзывы наших покупателей',
        text: 'Заказывал Balenciaga Triple S, доставили за 4 дня в идеале!'
      }
    }))
  },

  {
    category: 'FAQ',
    name: '❓ FAQ (Вопрос / Ответ)',
    count: 10,
    items: Array.from({ length: 10 }, (_, i) => ({
      variant: i + 1,
      type: 'faq',
      name: `FAQ Вариант #${i + 1}`,
      desc: `Раскрывающийся блок вопросов и ответов #${i + 1}`,
      defaultProps: {
        title: 'Часто задаваемые вопросы',
        text: 'Все вещи проверяются на подлинность перед отправкой.'
      }
    }))
  },

  {
    category: 'CTA',
    name: '💬 Telegram CTA (Заказ)',
    count: 20,
    items: Array.from({ length: 20 }, (_, i) => ({
      variant: i + 1,
      type: 'contact',
      name: `CTA Вариант #${i + 1}`,
      desc: `Призыв к прямому заказу в Telegram #${i + 1}`,
      defaultProps: {
        title: 'Оформить заказ в Telegram',
        subtitle: 'Менеджер ответит моментально',
        buttonText: 'Написать продавцу'
      }
    }))
  },

  {
    category: 'Footer',
    name: '🔻 Подвал (Footer)',
    count: 15,
    items: Array.from({ length: 15 }, (_, i) => ({
      variant: i + 1,
      type: 'footer',
      name: `Footer Вариант #${i + 1}`,
      desc: `Подвал сайта #${i + 1}`,
      defaultProps: {
        copyright: '© 2026. Все права защищены.'
      }
    }))
  }
]

export function SectionLibraryModal({ isOpen, onClose, onSelectSection }) {
  const [activeCategory, setActiveCategory] = useState(EXPANDED_SECTION_LIBRARY[0].category)

  if (!isOpen) return null

  const currentGroup = EXPANDED_SECTION_LIBRARY.find((g) => g.category === activeCategory) || EXPANDED_SECTION_LIBRARY[0]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#0d0f17] border border-slate-800 rounded-[2.5rem] max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              <span>Библиотека Секций (Tilda Style Section Library)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Выберите вариант секции. При клике блок сразу вставится в макет на холсте!</p>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {EXPANDED_SECTION_LIBRARY.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === group.category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {group.name} ({group.count})
            </button>
          ))}
        </div>

        {/* Section Variants Grid */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          {currentGroup.items.map((item) => (
            <div
              key={item.variant}
              onClick={() => {
                onSelectSection(item)
                onClose()
              }}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500 p-5 rounded-3xl cursor-pointer transition-all flex flex-col justify-between space-y-4 group shadow-md"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>Вариант #{item.variant}</span>
                </div>
                <h4 className="font-extrabold text-sm text-white group-hover:text-blue-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400">
                <span>Вставить в макет</span>
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

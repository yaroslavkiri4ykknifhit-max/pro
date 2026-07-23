import React from 'react'
import {
  Edit3,
  FileText,
  Wand2,
  Package,
  Palette,
  Send,
  ExternalLink,
  Store,
  Check,
  Copy,
  ChevronLeft
} from 'lucide-react'

export function LeftRailNav({ activeMode, setActiveMode, shop, onPublishClick }) {
  const menuItems = [
    { id: 'editor', label: 'Редактор', icon: Edit3 },
    { id: 'pages', label: 'Страницы', icon: FileText },
    { id: 'themes', label: 'Шаблоны', icon: Wand2 },
    { id: 'products', label: 'Товары', icon: Package },
    { id: 'design', label: 'Дизайн', icon: Palette },
    { id: 'publish', label: 'Публикация', icon: Send }
  ]

  return (
    <aside className="w-16 sm:w-20 bg-[#090a0f] border-r border-slate-800/80 flex flex-col justify-between items-center py-4 z-40 flex-shrink-0 select-none">
      
      {/* Top Logo Icon */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20 font-display">
          C
        </div>

        {/* Vertical Tool Navigation Items */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMode === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveMode(item.id)}
                className={`relative group p-3 rounded-2xl transition-all duration-200 flex flex-col items-center gap-1 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold tracking-tight leading-none scale-90">
                  {item.label}
                </span>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Store View CTA */}
      <div className="flex flex-col items-center gap-3">
        {shop && (
          <a
            href={`#/s/${shop.slug}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors"
            title="Просмотр сайта"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

    </aside>
  )
}

import React, { useState } from 'react'
import { X, Eye, Wand2, Check, Sparkles, Monitor, ArrowRight } from 'lucide-react'
import { THEME_LIBRARY } from '../../themes/index.js'

export function TemplateGalleryModal({ isOpen, onClose, onApplyPreset }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL')
  const [previewTheme, setPreviewTheme] = useState(null) // Fullscreen Live Preview Modal State

  if (!isOpen) return null

  const categories = ['ALL', 'MINIMAL', 'LUXURY', 'STREETWEAR', 'HIGH FASHION', 'GLASS']

  const filteredThemes = THEME_LIBRARY.filter((theme) => {
    if (selectedFilter === 'ALL') return true
    if (selectedFilter === 'MINIMAL') return theme.id.includes('minimal') || theme.id.includes('underbuy')
    if (selectedFilter === 'LUXURY') return theme.id.includes('luxury') || theme.id.includes('farfetch')
    if (selectedFilter === 'STREETWEAR') return theme.id.includes('streetwear') || theme.id.includes('poizon')
    if (selectedFilter === 'HIGH FASHION') return theme.id.includes('zara') || theme.id.includes('editorial') || theme.id.includes('boutique')
    if (selectedFilter === 'GLASS') return theme.id.includes('apple') || theme.id.includes('glass')
    return true
  })

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
      
      {/* FULLSCREEN LIVE PREVIEW MODAL */}
      {previewTheme ? (
        <div className="fixed inset-0 z-50 bg-[#090a0f] text-white flex flex-col animate-in fade-in zoom-in duration-200">
          
          {/* Top Preview Bar */}
          <div className="h-16 bg-[#0d0f17] border-b border-slate-800 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-lg text-white font-display">
                Полноэкранный Предпросмотр: {previewTheme.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                Макет 100% готов к запуску
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onApplyPreset(previewTheme.id)
                  setPreviewTheme(null)
                  onClose()
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Использовать этот шаблон</span>
              </button>

              <button
                onClick={() => setPreviewTheme(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Live Interactive Preview Page Frame */}
          <div className="flex-1 overflow-y-auto bg-white text-black p-8 flex justify-center">
            <div className="w-full max-w-5xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden min-h-screen">
              
              {/* Site Mini Banner */}
              <div className="p-8 bg-black text-white text-center space-y-3">
                <div className="text-3xl font-black uppercase tracking-tight font-display">
                  {previewTheme.themeJson?.name || previewTheme.name}
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">{previewTheme.desc}</p>
              </div>

              {/* Site Mock Blocks */}
              <div className="p-8 space-y-12">
                <div className="p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tight font-display">
                    HERO SECTION: {previewTheme.name}
                  </h2>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto">
                    Широкоформатный интерактивный заголовок с адаптированной типографикой и кнопками заказа
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase font-display">КАТАЛОГ ТОВАРОВ</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="border border-slate-200 p-4 rounded-2xl space-y-2 bg-slate-50">
                        <div className="h-48 bg-slate-200 rounded-xl"></div>
                        <div className="text-xs font-bold text-slate-400 uppercase">БРЕНД #{num}</div>
                        <div className="font-extrabold text-sm uppercase">НАИМЕНОВАНИЕ ТОВАРА #{num}</div>
                        <div className="font-black text-base">12 500 ₽</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-black text-white text-center space-y-3">
                  <h3 className="text-xl font-bold uppercase font-display">ПОДВАЛ САЙТА & TELEGRAM</h3>
                  <p className="text-xs text-slate-400">© 2026 Все права защищены. Прямой прием заказов.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* MAIN TEMPLATE GALLERY MODAL */
        <div className="bg-[#0d0f17] border border-slate-800 rounded-[2.5rem] max-w-6xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col text-white">
          
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-blue-500" />
                <span>Библиотека Шаблонов Дизайна Сайтов (Framer / Tilda Style)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Выберите готовый макет структуры сайта. Выбирается не одежда, а полноценный дизайн всей страницы!
              </p>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Site Miniature Cards Grid */}
          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {filteredThemes.map((themeItem) => (
              <div
                key={themeItem.id}
                className="bg-slate-900/80 rounded-3xl p-5 border border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div className="space-y-3">
                  {/* Site Layout Miniature Frame */}
                  <div className="h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative group-hover:border-blue-500/50 transition-colors">
                    <img
                      src={themeItem.preview}
                      alt={themeItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />

                    {/* Structure Overlay Preview */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end">
                      <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                        Макет страницы: Hero → Сетка → Отзывы → Footer
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white font-display group-hover:text-blue-400 transition-colors">
                      {themeItem.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{themeItem.desc}</p>
                  </div>
                </div>

                {/* Bottom Card Actions: Preview & Apply */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setPreviewTheme(themeItem)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Предпросмотр</span>
                  </button>

                  <button
                    onClick={() => {
                      onApplyPreset(themeItem.id)
                      onClose()
                    }}
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Использовать</span>
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

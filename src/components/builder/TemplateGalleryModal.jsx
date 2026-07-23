import React, { useState } from 'react'
import { X, Eye, Wand2 } from 'lucide-react'
import { THEME_LIBRARY, THEMES_REGISTRY } from '../../themes/index.jsx'

export function TemplateGalleryModal({ isOpen, onClose, onApplyPreset }) {
  const [previewThemeId, setPreviewThemeId] = useState(null)

  if (!isOpen) return null

  const activePreviewTheme = previewThemeId ? THEMES_REGISTRY[previewThemeId] : null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none">
      
      {/* FULLSCREEN LIVE INTERACTIVE PREVIEW MODAL */}
      {activePreviewTheme ? (
        <div className="fixed inset-0 z-50 bg-[#090a0f] text-white flex flex-col animate-in fade-in zoom-in duration-200">
          
          <div className="h-16 bg-[#0d0f17] border-b border-slate-800 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-lg text-white font-display">
                Полноэкранный Предпросмотр: {activePreviewTheme.tokens.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                Автономная система компонентов
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onApplyPreset(previewThemeId)
                  setPreviewThemeId(null)
                  onClose()
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-full shadow-lg flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Использовать этот шаблон</span>
              </button>

              <button
                onClick={() => setPreviewThemeId(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#090a0f] p-8 flex justify-center">
            <div
              className="w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden min-h-screen border border-slate-800"
              style={{
                backgroundColor: activePreviewTheme.tokens.colors.background,
                color: activePreviewTheme.tokens.colors.text,
                fontFamily: activePreviewTheme.tokens.typography.fontFamily
              }}
            >
              <activePreviewTheme.HeroComponent
                props={{
                  title: `${activePreviewTheme.tokens.name.toUpperCase()} ARCHIVE`,
                  subtitle: activePreviewTheme.tokens.desc
                }}
              />

              <activePreviewTheme.CatalogComponent
                products={[
                  { id: '1', title: 'ARCHIVE TOTE BAG', brand: 'LUXURY BRAND', price: 6500, oldPrice: 8900, category: 'СУМКИ', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
                  { id: '2', title: 'HIGH TOP EDITION SNEAKERS', brand: 'STREET BRAND', price: 12500, oldPrice: 15000, category: 'ОБУВЬ', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
                ]}
                currencySymbol="₽"
              />

              <activePreviewTheme.FooterComponent telegram="reseller_admin" />
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-[#0d0f17] border border-slate-800 rounded-[2.5rem] max-w-6xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col text-white">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-black font-display tracking-tight text-white flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-blue-500" />
                <span>Автономные Шаблоны Дизайна (Balenciaga, Poizon, Zara)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Каждый шаблон имеет уникальные компоненты, сетку, шрифты, отступы и стиль карточек!
              </p>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
            {THEME_LIBRARY.map((themeItem) => {
              return (
                <div
                  key={themeItem.id}
                  className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="h-56 rounded-2xl overflow-hidden bg-white border border-slate-700 relative text-black text-[8px] transform scale-100 origin-top pointer-events-none p-2 space-y-2">
                      <div className="p-2 bg-black text-white text-center rounded">
                        <div className="font-extrabold uppercase leading-none">{themeItem.name}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <div className="border border-slate-300 p-1 rounded bg-slate-50 space-y-1">
                          <img src={themeItem.preview} alt="" className="w-full h-14 object-contain" />
                          <div className="font-extrabold uppercase text-[7px] line-clamp-1">{themeItem.name} Item</div>
                          <div className="font-black text-[8px]">6 500 ₽</div>
                        </div>
                        <div className="border border-slate-300 p-1 rounded bg-slate-50 space-y-1">
                          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-14 object-contain" />
                          <div className="font-extrabold uppercase text-[7px] line-clamp-1">Sneaker Drop</div>
                          <div className="font-black text-[8px]">12 500 ₽</div>
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

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setPreviewThemeId(themeItem.id)}
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
              )
            })}
          </div>

        </div>
      )}

    </div>
  )
}

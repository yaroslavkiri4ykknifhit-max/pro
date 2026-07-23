import React, { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2
} from 'lucide-react'
import { THEMES_REGISTRY } from '../../themes/index.jsx'

export function LiveCanvasPreview({
  shop,
  products,
  blocks,
  selectedBlockId,
  onSelectBlock,
  onOpenInspector,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onOpenLibrary,
  onInlineTextChange
}) {
  const [deviceView, setDeviceView] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  const shopProducts = products.filter((p) => p.shop_id === shop?.id)
  const themeConfig = shop?.theme_config || {}
  const themeId = themeConfig.id || 'balenciaga'

  // Get active theme's dedicated component set
  const themePackage = THEMES_REGISTRY[themeId] || THEMES_REGISTRY.balenciaga
  const { tokens, HeroComponent, CatalogComponent, FooterComponent } = themePackage

  const colors = themeConfig.colors || tokens.colors
  const typography = themeConfig.typography || tokens.typography
  const currencySymbol = themeConfig.currencySymbol || '₽'
  const telegram = themeConfig.telegram || 'admin'

  const deviceWidthClass =
    deviceView === 'mobile'
      ? 'w-[375px]'
      : deviceView === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-[1300px]'

  return (
    <div className="flex-1 bg-[#090a0f] flex flex-col h-full overflow-hidden select-none relative">
      
      {/* Device Switcher Header */}
      <div className="h-14 bg-[#0d0f17] border-b border-slate-800/80 px-6 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Десктоп</span>
          </button>

          <button
            onClick={() => setDeviceView('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Планшет</span>
          </button>

          <button
            onClick={() => setDeviceView('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Мобильный</span>
          </button>
        </div>

        <div className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>АКТИВНЫЙ ШАБЛОН: {tokens.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Canvas Viewport Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#090a0f]">
        <div
          className={`${deviceWidthClass} transition-all duration-300 min-h-screen shadow-2xl flex flex-col relative border border-slate-800 rounded-3xl overflow-hidden`}
          style={{
            backgroundColor: colors.background || '#ffffff',
            color: colors.text || '#000000',
            fontFamily: typography.fontFamily || 'Inter'
          }}
        >

          {/* RENDER THEME BLOCKS USING DEDICATED THEME COMPONENTS */}
          <main className="flex-1 p-6 space-y-8">
            {blocks.filter((b) => !b.hidden).map((block, idx) => {
              const isSelected = selectedBlockId === block.id

              return (
                <div
                  key={block.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectBlock(block.id)
                  }}
                  className={`group relative transition-all duration-200 ${
                    isSelected
                      ? 'ring-4 ring-blue-500/80 ring-offset-4 ring-offset-white rounded-3xl'
                      : 'hover:outline hover:outline-2 hover:outline-blue-400/50 hover:outline-offset-2 rounded-3xl'
                  }`}
                >
                  {/* Floating Action Bar */}
                  {isSelected && (
                    <div className="absolute -top-4 right-4 z-40 bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-extrabold animate-in fade-in zoom-in duration-150">
                      <span>Секция: {block.type}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenInspector(block)
                        }}
                        className="px-2 py-0.5 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-[11px]"
                      >
                        Настроить
                      </button>
                      <button onClick={() => onMoveBlock(idx, -1)} disabled={idx === 0}>
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onMoveBlock(idx, 1)} disabled={idx === blocks.length - 1}>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDuplicateBlock(idx)}>
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDeleteBlock(block.id)} className="text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* DEDICATED THEME COMPONENT RENDERERS */}
                  {block.type === 'hero' && (
                    <HeroComponent props={block.props} onInlineTextChange={onInlineTextChange} blockId={block.id} />
                  )}

                  {block.type === 'products' && (
                    <CatalogComponent products={shopProducts} currencySymbol={currencySymbol} />
                  )}

                  {block.type === 'contact' && (
                    <FooterComponent telegram={telegram} />
                  )}
                </div>
              )
            })}
          </main>

          {/* Bottom Insertion Button */}
          <div className="p-8 text-center bg-slate-900/10 border-t border-slate-200">
            <button
              onClick={onOpenLibrary}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>+ Добавить секцию</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

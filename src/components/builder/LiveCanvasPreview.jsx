import React from 'react'
import { Plus, ArrowUp, ArrowDown, Copy, Trash2, Wifi, Battery, Signal } from 'lucide-react'
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
  const shopProducts = products.filter((p) => p.shop_id === shop?.id)
  const themeConfig = shop?.theme_config || {}
  const themeId = themeConfig.id || 'balenciaga'

  // Get active theme's dedicated component set
  const themePackage = THEMES_REGISTRY[themeId] || THEMES_REGISTRY.balenciaga
  const { tokens, HeroComponent, CatalogComponent, FooterComponent } = themePackage

  const colors = themeConfig.colors || tokens.colors
  const typography = themeConfig.typography || tokens.typography
  const currencySymbol = themeConfig.currencySymbol || '₽'
  const telegram = themeConfig.telegram || 'reseller_admin'

  return (
    <div className="flex-1 bg-[#090a0f] flex flex-col h-full overflow-hidden relative select-none">
      
      {/* MOBILE-FIRST WORKSPACE HEADER */}
      <div className="h-12 bg-[#0d0f17] border-b border-slate-800/80 px-6 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-slate-300">
            📱 IPHONE 16 PRO STOREFRONT • {tokens.name.toUpperCase()}
          </span>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          MOBILE FIRST ENGINE (TG / IG / TIKTOK READY)
        </div>
      </div>

      {/* FULL UNRESTRICTED SCROLLABLE WORKSPACE CANVAS WITH IPHONE 16 PRO FRAME */}
      <div
        tabIndex={0}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 flex justify-center items-start bg-[#090a0f] focus:outline-none scroll-smooth"
      >
        
        {/* IPHONE 16 PRO DEVICE CONTAINER */}
        <div className="w-[380px] max-w-full my-2 relative transition-all duration-300">
          
          {/* Outer Titanium Bezel Frame */}
          <div className="bg-[#1a1d26] border-[6px] border-[#2d3242] rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-2 relative overflow-hidden ring-1 ring-white/10">
            
            {/* Inner Phone Body */}
            <div
              className="bg-white rounded-[44px] overflow-hidden flex flex-col relative min-h-[750px] shadow-inner"
              style={{
                backgroundColor: colors.background || '#ffffff',
                color: colors.text || '#000000',
                fontFamily: typography.fontFamily || 'Inter'
              }}
            >
              
              {/* STATUS BAR & DYNAMIC ISLAND */}
              <div className="h-11 bg-black/90 backdrop-blur-md text-white px-7 flex items-center justify-between z-40 sticky top-0 flex-shrink-0 select-none">
                <span className="text-[11px] font-black tracking-tight">9:41</span>

                {/* Dynamic Island Notch */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 border border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#090a0f] border border-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
                </div>

                <div className="flex items-center gap-1.5 opacity-90">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* STOREFRONT COMPONENT RENDERER */}
              <main className="flex-1 p-2 space-y-4">
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
                          ? 'ring-4 ring-blue-500/80 ring-offset-2 ring-offset-white rounded-2xl'
                          : 'hover:outline hover:outline-2 hover:outline-blue-400/50 rounded-2xl'
                      }`}
                    >
                      {/* Floating Block Bar */}
                      {isSelected && (
                        <div className="absolute -top-3.5 right-2 z-40 bg-blue-600 text-white px-3 py-1 rounded-full shadow-xl flex items-center gap-1.5 text-[10px] font-black animate-in fade-in zoom-in duration-150">
                          <span>{block.type}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenInspector(block)
                            }}
                            className="px-1.5 py-0.5 bg-white text-black rounded-full font-bold text-[9px]"
                          >
                            Настройки
                          </button>
                          <button onClick={() => onMoveBlock(idx, -1)} disabled={idx === 0}>
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button onClick={() => onMoveBlock(idx, 1)} disabled={idx === blocks.length - 1}>
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button onClick={() => onDuplicateBlock(idx)}>
                            <Copy className="w-3 h-3" />
                          </button>
                          <button onClick={() => onDeleteBlock(block.id)} className="text-red-300">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* THEME RENDERERS */}
                      {block.type === 'hero' && (
                        <HeroComponent props={block.props} onInlineTextChange={onInlineTextChange} blockId={block.id} />
                      )}

                      {block.type === 'products' && (
                        <CatalogComponent products={shopProducts} currencySymbol={currencySymbol} telegram={telegram} />
                      )}

                      {block.type === 'contact' && (
                        <FooterComponent telegram={telegram} />
                      )}
                    </div>
                  )
                })}
              </main>

              {/* Bottom Canvas "+ Добавить секцию" Button */}
              <div className="p-6 text-center bg-slate-900/10 border-t border-slate-200">
                <button
                  onClick={onOpenLibrary}
                  className="inline-flex items-center gap-1.5 px-6 py-3 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-xl hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Добавить секцию</span>
                </button>
              </div>

              {/* SAFE AREA HOME BAR INDICATOR */}
              <div className="py-2 bg-black/90 flex justify-center sticky bottom-0 z-40 flex-shrink-0">
                <div className="w-32 h-1 bg-white/80 rounded-full"></div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

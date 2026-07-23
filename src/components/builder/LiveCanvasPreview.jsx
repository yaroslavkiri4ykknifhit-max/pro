import React, { useState } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Settings,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Eye,
  Heart,
  Search,
  ShoppingBag,
  Send,
  ChevronDown
} from 'lucide-react'

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
  const theme = shop?.theme_config || {}
  const colors = theme.colors || {}
  const typography = theme.typography || {}
  const styles = theme.styles || {}

  const currencySymbol = theme.currencySymbol || '₽'
  const logoText = theme.logoText || shop?.name || 'under buy'

  // Device Container Widths
  const deviceWidthClass =
    deviceView === 'mobile'
      ? 'w-[375px]'
      : deviceView === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-[1300px]'

  return (
    <div className="flex-1 bg-[#090a0f] flex flex-col h-full overflow-hidden select-none relative">
      
      {/* Top Device Switcher Bar */}
      <div className="h-14 bg-[#0d0f17] border-b border-slate-800/80 px-6 flex items-center justify-between z-30 flex-shrink-0">
        
        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'desktop' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Десктоп</span>
          </button>

          <button
            onClick={() => setDeviceView('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'tablet' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Планшет</span>
          </button>

          <button
            onClick={() => setDeviceView('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceView === 'mobile' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Мобильный</span>
          </button>
        </div>

        {/* Viewport Info */}
        <div className="text-xs font-mono font-bold text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live React Preview: {deviceView.toUpperCase()}</span>
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

          {/* STORE HEADER */}
          <header className="w-full border-b py-5 px-6 sticky top-0 z-30 bg-white/90 backdrop-blur-md border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase font-display">
                {theme.logoUrl ? (
                  <img src={theme.logoUrl} alt="" className="h-8 object-contain" />
                ) : (
                  <span>{logoText}</span>
                )}
              </div>

              <div className="flex items-center gap-4 text-black">
                <Heart className="w-5 h-5 stroke-[2]" />
                <Search className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
          </header>

          {/* RENDER ACTIVE BLOCKS */}
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
                  {/* Floating Action Overlay Bar on Selected Block */}
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

                      <button onClick={() => onMoveBlock(idx, -1)} disabled={idx === 0} className="hover:opacity-75">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onMoveBlock(idx, 1)} disabled={idx === blocks.length - 1} className="hover:opacity-75">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDuplicateBlock(idx)} className="hover:opacity-75">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDeleteBlock(block.id)} className="hover:opacity-75 text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* BLOCK VARIANT RENDERERS */}
                  
                  {/* HERO BLOCK */}
                  {block.type === 'hero' && (
                    <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
                      <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onInlineTextChange(block.id, 'title', e.target.innerText)}
                        className="text-3xl font-black uppercase font-display tracking-tight focus:outline-none"
                      >
                        {block.props?.title || 'НОВАЯ КОЛЛЕКЦИЯ 2026'}
                      </h1>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onInlineTextChange(block.id, 'subtitle', e.target.innerText)}
                        className="text-xs text-slate-600 max-w-md focus:outline-none"
                      >
                        {block.props?.subtitle || 'Эксклюзивные брендовые товары'}
                      </p>
                      {block.props?.imageUrl && (
                        <img src={block.props.imageUrl} alt="" className="w-full h-56 object-cover rounded-2xl" />
                      )}
                    </div>
                  )}

                  {/* CATEGORIES BLOCK */}
                  {block.type === 'categories' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border-2 border-black bg-white px-4 py-3 text-xs font-black uppercase tracking-wider flex justify-between items-center">
                        <span>ВСЕ</span> <ChevronDown className="w-4 h-4" />
                      </div>
                      <div className="border-2 border-black bg-white px-4 py-3 text-xs font-black uppercase tracking-wider flex justify-between items-center">
                        <span>ВСЕ БРЕНДЫ</span> <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* PRODUCTS CATALOG BLOCK */}
                  {block.type === 'products' && (
                    <div className="space-y-4">
                      {block.props?.title && (
                        <h2 className="text-xl font-black font-display uppercase">{block.props.title}</h2>
                      )}

                      <div className={`grid ${block.props?.columns === 4 ? 'grid-cols-4' : block.props?.columns === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                        {shopProducts.slice(0, 4).map((p) => (
                          <div key={p.id} className="bg-white border border-slate-200 p-3 space-y-2 relative group">
                            <Heart className="w-4 h-4 absolute top-3 right-3 text-black stroke-[2]" />
                            <img src={p.image_url} alt="" className="w-full h-44 object-contain bg-slate-50 p-2" />
                            <div className="text-[10px] font-bold text-slate-400 uppercase font-display">{p.brand}</div>
                            <div className="text-xs font-extrabold uppercase font-display leading-tight line-clamp-1">{p.title}</div>
                            <div className="text-sm font-black font-display">{p.price} {currencySymbol}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BANNER PROMO BLOCK */}
                  {block.type === 'promo' && (
                    <div className="bg-black text-white p-8 rounded-3xl text-center space-y-2">
                      <h3 className="text-xl font-black uppercase font-display">{block.props?.title || 'Спецпредложение'}</h3>
                      <p className="text-xs text-slate-300">{block.props?.subtitle}</p>
                    </div>
                  )}

                  {/* CONTACT / CTA BLOCK */}
                  {block.type === 'contact' && (
                    <div className="border-2 border-black p-8 rounded-3xl text-center space-y-4 bg-black text-white">
                      <h3 className="text-xl font-black uppercase font-display">{block.props?.title || 'Оформить заказ'}</h3>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto">{block.props?.subtitle}</p>
                      <button className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full">
                        {block.props?.buttonText || 'Написать в Telegram'}
                      </button>
                    </div>
                  )}

                </div>
              )
            })}
          </main>

          {/* Bottom Canvas "+ Добавить секцию" Button */}
          <div className="p-8 text-center bg-slate-50 border-t border-slate-200">
            <button
              onClick={onOpenLibrary}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-xl transition-all"
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

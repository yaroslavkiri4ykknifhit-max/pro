import React from 'react'
import { Heart, ChevronDown, Send } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'Balenciaga Type',
  desc: 'Современный luxury fashion: монохромная палитра, гигантская типографика, много воздуха и ультраминимализм',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    cardBg: '#ffffff',
    text: '#000000',
    border: '#000000',
    accent: '#000000'
  },
  typography: {
    fontFamily: 'Inter',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '0px',
    shadow: 'none',
    containerWidth: '1200px'
  }
}

export function BalenciagaHero({ props, onInlineTextChange, blockId }) {
  return (
    <section className="py-20 px-8 bg-black text-white text-center space-y-6 rounded-none">
      <div className="inline-block border border-white/30 px-4 py-1 text-[10px] font-black uppercase tracking-widest">
        SUMMER ARCHIVE 2026
      </div>
      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
        className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight max-w-3xl mx-auto leading-none focus:outline-none"
      >
        {props?.title || 'BALENCIAGA ARCHIVE COLLECTION'}
      </h1>
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
        className="text-xs text-slate-300 max-w-md mx-auto tracking-wider uppercase focus:outline-none"
      >
        {props?.subtitle || 'Эксклюзивный ресейл высокой моды с проверкой подлинности'}
      </p>
      {props?.imageUrl && (
        <div className="pt-4 max-w-4xl mx-auto h-96 overflow-hidden">
          <img src={props.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </section>
  )
}

export function BalenciagaCatalog({ products, currencySymbol }) {
  return (
    <section className="space-y-8 py-10 px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="border-2 border-black bg-white px-5 py-3 text-xs font-black uppercase tracking-widest flex justify-between items-center cursor-pointer">
          <span>ВСЕ КАТЕГОРИИ</span> <ChevronDown className="w-4 h-4 stroke-[3]" />
        </div>
        <div className="border-2 border-black bg-white px-5 py-3 text-xs font-black uppercase tracking-widest flex justify-between items-center cursor-pointer">
          <span>ВСЕ БРЕНДЫ</span> <ChevronDown className="w-4 h-4 stroke-[3]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer flex flex-col justify-between space-y-3">
            <div className="h-80 w-full bg-slate-50 border border-slate-200 relative flex items-center justify-center p-4 overflow-hidden">
              <img src={p.image_url} alt="" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
              <Heart className="w-5 h-5 absolute top-3 right-3 text-black stroke-[2]" />
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{p.brand}</div>
              <h3 className="font-black text-sm uppercase tracking-tight leading-snug line-clamp-2">{p.title}</h3>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="font-black text-xl font-display">{p.price.toLocaleString('ru-RU')} {currencySymbol}</span>
                {p.oldPrice && <span className="line-through text-slate-400 text-xs font-bold">{p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}</span>}
              </div>
            </div>
            {p.category && <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-2">{p.category}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function BalenciagaFooter({ telegram }) {
  return (
    <footer className="border-t-2 border-black py-12 px-6 text-center space-y-4 bg-black text-white">
      <h3 className="text-2xl font-black uppercase tracking-tight font-display">BALENCIAGA CLIENT SERVICE</h3>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">Прямой приём заказов и консультация стилиста в Telegram</p>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
      >
        <Send className="w-4 h-4" />
        <span>Заказать в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

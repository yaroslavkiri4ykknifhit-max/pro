import React from 'react'
import { Send, ArrowUpRight } from 'lucide-react'

export const zaraTokens = {
  id: 'zara',
  name: 'Zara Editorial Fashion',
  desc: 'Редакционная эстетика фэшн-журнала: белоснежный фон, ультракрупные portrait фотографии, 1400px контейнер',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    cardBg: '#ffffff',
    text: '#111111',
    border: '#e5e5e0',
    accent: '#000000'
  },
  typography: {
    fontFamily: 'General Sans',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '0px',
    shadow: 'none',
    containerWidth: '1400px'
  }
}

export function ZaraHero({ props, onInlineTextChange, blockId }) {
  return (
    <section className="py-24 px-8 text-center space-y-8 bg-white border-b border-slate-200">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400 block">
        EDITORIAL LOOKBOOK ISSUE 2026
      </span>

      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
        className="text-5xl sm:text-7xl font-light tracking-tight text-black font-display uppercase max-w-4xl mx-auto leading-none focus:outline-none"
      >
        {props?.title || 'ZARA EDITORIAL ARCHIVE'}
      </h1>

      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
        className="text-xs text-slate-500 max-w-lg mx-auto tracking-widest uppercase focus:outline-none"
      >
        {props?.subtitle || 'Чистые линии, строгий силуэт и естественные текстуры'}
      </p>

      {props?.imageUrl && (
        <div className="pt-6 max-w-5xl mx-auto h-[500px] overflow-hidden">
          <img src={props.imageUrl} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
      )}
    </section>
  )
}

export function ZaraCatalog({ products, currencySymbol }) {
  return (
    <section className="space-y-12 py-12 px-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between border-b border-black pb-4">
        <h2 className="text-2xl font-light uppercase tracking-widest font-display">COLLECTION CATALOGUE</h2>
        <span className="text-xs font-semibold tracking-widest text-slate-400">INDEX [{products.length}]</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer space-y-4">
            <div className="h-[480px] w-full bg-slate-50 overflow-hidden relative border border-slate-100">
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <button className="absolute bottom-4 right-4 p-3 bg-black text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-display">{p.brand}</div>
              <h3 className="font-medium text-base uppercase tracking-wider text-black font-display">{p.title}</h3>
              <div className="text-lg font-bold font-display text-black">{p.price.toLocaleString('ru-RU')} {currencySymbol}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ZaraFooter({ telegram }) {
  return (
    <footer className="py-16 px-8 text-center space-y-6 bg-white border-t border-black">
      <h3 className="text-3xl font-light uppercase tracking-widest font-display">ZARA EDITORIAL SERVICE</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto tracking-wider uppercase">Оформить заказ или уточнить наличие у стилиста</p>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors"
      >
        <Send className="w-4 h-4" />
        <span>Оформить в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

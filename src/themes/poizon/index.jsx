import React from 'react'
import { ShieldCheck, Zap, Search, ShoppingBag, Send, Tag } from 'lucide-react'

export const poizonTokens = {
  id: 'poizon',
  name: 'Poizon Street Marketplace',
  desc: 'Тёмный маркетплейс кроссовок: неоновые акценты cyan, плотная сетка 4 колонок, бейджи скидок и размеров',
  colors: {
    primary: '#00f0ff',
    background: '#0a0d14',
    cardBg: '#131824',
    text: '#ffffff',
    border: '#1f293d',
    accent: '#00f0ff'
  },
  typography: {
    fontFamily: 'Geist',
    headingCase: 'uppercase',
    brandCase: 'uppercase'
  },
  styles: {
    borderRadius: '16px',
    shadow: 'glow',
    containerWidth: '1300px'
  }
}

export function PoizonHero({ props, onInlineTextChange, blockId }) {
  return (
    <section className="py-12 px-6 bg-[#131824] border border-[#1f293d] rounded-3xl relative overflow-hidden space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-[#00f0ff] uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4" />
        <span>Poizon 100% Legit Check Verified</span>
      </div>

      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
        className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display leading-tight focus:outline-none"
      >
        {props?.title || 'POIZON SNEAKER MARKETPLACE'}
      </h1>

      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
        className="text-xs text-slate-400 max-w-lg focus:outline-none"
      >
        {props?.subtitle || 'Лимитированные релизы кроссовок с сертификатом подлинности'}
      </p>

      {props?.imageUrl && (
        <div className="h-64 rounded-2xl overflow-hidden mt-4 border border-[#1f293d]">
          <img src={props.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </section>
  )
}

export function PoizonCatalog({ products, currencySymbol }) {
  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Поиск лимитированных релезов..."
            className="w-full bg-[#131824] border border-[#1f293d] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f0ff]"
          />
        </div>

        <button className="px-4 py-2.5 rounded-2xl bg-[#00f0ff] text-black font-extrabold text-xs uppercase shadow-md shadow-[#00f0ff]/20">
          Все Дропы
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-[#131824] border border-[#1f293d] hover:border-[#00f0ff] rounded-2xl p-3 space-y-2 group transition-all duration-300 relative flex flex-col justify-between"
          >
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#00f0ff] text-black font-extrabold text-[10px]">
              -20%
            </span>

            <div>
              <div className="h-44 rounded-xl overflow-hidden bg-[#0a0d14] flex items-center justify-center p-2 mb-2">
                <img src={p.image_url} alt="" className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#00f0ff] uppercase">{p.brand || 'POIZON'}</div>
                <h3 className="font-extrabold text-xs uppercase leading-snug text-white line-clamp-2">{p.title}</h3>
                
                {p.size && (
                  <div className="inline-flex items-center gap-1 text-[10px] bg-[#0a0d14] px-2 py-0.5 rounded text-slate-400 border border-[#1f293d]">
                    <Tag className="w-2.5 h-2.5 text-[#00f0ff]" />
                    <span>{p.size}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1f293d] flex items-center justify-between">
              <span className="font-extrabold text-sm text-[#00f0ff]">{p.price.toLocaleString('ru-RU')} {currencySymbol}</span>
              <button className="p-1.5 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PoizonFooter({ telegram }) {
  return (
    <footer className="bg-[#131824] border border-[#1f293d] rounded-3xl p-8 text-center space-y-4 text-white">
      <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#00f0ff]">
        <Zap className="w-4 h-4" />
        <span>POIZON FAST TELEGRAM ORDER</span>
      </div>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">Быстрая проверка размера и моментальный приём заказов менеджером</p>
      <a
        href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#00f0ff]/25"
      >
        <Send className="w-4 h-4" />
        <span>Купить через Telegram (@{(telegram || 'admin').replace('@', '')})</span>
      </a>
    </footer>
  )
}

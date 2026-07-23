import React, { useState } from 'react'
import { Heart, Search, ChevronDown, Send, ArrowRight, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react'

export const balenciagaTokens = {
  id: 'balenciaga',
  name: 'BALENCIAGA TYPE',
  subtitle: 'Luxury Avant-Garde Boutique',
  desc: 'Высокая мода мирового уровня: монохромная палитра, гигантская типографика, асимметричный лукбук и атмосфера бутиков за миллион долларов',
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
    containerWidth: '1300px'
  }
}

export function BalenciagaHero({ props, onInlineTextChange, blockId }) {
  return (
    <section className="relative bg-black text-white rounded-none py-28 px-6 sm:px-12 space-y-12 overflow-hidden border-b-2 border-black">
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 border border-white/30 px-5 py-1.5 text-[11px] font-black uppercase tracking-[0.3em] bg-white/5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PARIS RUNWAY ARCHIVE 2026</span>
        </div>

        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
          className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] font-display text-white focus:outline-none drop-shadow-2xl"
        >
          {props?.title || 'BALENCIAGA ARCHIVE'}
        </h1>

        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
          className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto uppercase tracking-[0.2em] font-medium leading-relaxed focus:outline-none"
        >
          {props?.subtitle || 'Эксклюзивный ресейл концептуальной моды с гарантией 100% аутентичности'}
        </p>

        {props?.imageUrl && (
          <div className="pt-8 max-w-5xl mx-auto h-[480px] border border-white/20 overflow-hidden relative group">
            <img src={props.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale" />
            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/20 px-6 py-3 text-left">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">LOOK #01</div>
              <div className="text-xs font-black uppercase text-white">LIMITED ARCHIVE PIECE</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function BalenciagaCatalog({ products, currencySymbol }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categories = ['ALL', 'СУМКИ', 'ОБУВЬ', 'ОДЕЖДА', 'АКСЕССУАРЫ']

  const filtered = activeCategory === 'ALL' ? products : products.filter(p => (p.category || '').toUpperCase() === activeCategory)

  return (
    <div className="space-y-24 py-12 px-4 sm:px-8 max-w-[1300px] mx-auto text-black">
      
      {/* MARQUEE TICKER */}
      <div className="overflow-hidden whitespace-nowrap border-y-2 border-black py-4 bg-black text-white text-xs font-black uppercase tracking-[0.4em]">
        <div className="inline-block animate-marquee space-x-12">
          <span>PARIS • MILANO • TOKYO • NEW YORK • ARCHIVE DROPS 2026</span>
          <span>100% AUTHENTICITY GUARANTEED BY CONCIERGE</span>
          <span>FREE WORLDWIDE EXPRESS DELIVERY</span>
        </div>
      </div>

      {/* CATEGORY NAV PILLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-black tracking-widest text-slate-400">TOTAL [{filtered.length}]</span>
      </div>

      {/* ASYMMETRICAL HIGH FASHION PRODUCT CATALOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filtered.map((p, idx) => (
          <div key={p.id || idx} className="group cursor-pointer space-y-4 border-b border-black pb-8">
            <div className="h-[420px] w-full bg-slate-50 border-2 border-black relative flex items-center justify-center p-6 overflow-hidden">
              <img
                src={p.image_url}
                alt={p.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                ARCHIVE
              </span>
              <button className="absolute top-4 right-4 p-2 bg-white border border-black hover:bg-black hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-display">
                {p.brand || 'BALENCIAGA'}
              </div>
              <h3 className="font-black text-base uppercase tracking-tight leading-tight font-display text-black line-clamp-2">
                {p.title}
              </h3>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                <div className="flex items-baseline gap-3">
                  <span className="font-black text-2xl font-display text-black">
                    {p.price.toLocaleString('ru-RU')} {currencySymbol}
                  </span>
                  {p.oldPrice && (
                    <span className="line-through text-slate-400 text-xs font-bold">
                      {p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                    </span>
                  )}
                </div>
                <button className="px-5 py-2 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <span>Заказать</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BRAND MANIFESTO STORY */}
      <div className="border-2 border-black p-12 bg-black text-white space-y-6 text-center">
        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">OUR MANIFESTO</span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight max-w-2xl mx-auto font-display">
          "WE DO NOT FOLLOW TRENDS. WE CREATE DIGITAL ARCHIVES FOR THE FUTURE."
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
          Каждая вещь в нашем онлайн-бутике проходит независимую экспертизу подлинности перед публикацией.
        </p>
      </div>

      {/* FAQ ACCORDION */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black uppercase tracking-tight border-b-2 border-black pb-4 font-display">
          CLIENT SERVICE FAQ
        </h3>

        <div className="space-y-3">
          {[
            { q: 'Как происходит проверка аутентичности?', a: 'Каждый предмет гардероба проверяется независимой командой экспертов с применением технологии ультрафиолетового сканирования микропошива.' },
            { q: 'Каковы сроки и условия доставки?', a: 'Доставка по Москве осуществляется с курьером за 3 часа. Доставка по всему миру — экспресс-службами DHL/EMS за 3-5 дней.' },
            { q: 'Можно ли сделать примерку перед покупкой?', a: 'Да, для клиентов в Москве доступна услуга примера до 5 вещей на дому.' }
          ].map((item, index) => (
            <div key={index} className="border-2 border-black bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-5 text-left font-black text-xs uppercase tracking-wider flex justify-between items-center hover:bg-slate-50"
              >
                <span>{item.q}</span>
                {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              {openFaq === index && (
                <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export function BalenciagaFooter({ telegram }) {
  return (
    <footer className="border-t-4 border-black bg-black text-white py-16 px-8 text-center space-y-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display">
          BALENCIAGA PRIVATE CONCIERGE
        </h3>
        <p className="text-xs text-slate-400 uppercase tracking-widest max-w-md mx-auto">
          Прямой приём заказов и индивидуальный подбор размера стилистом в Telegram
        </p>
      </div>

      <div>
        <a
          href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-200 transition-colors shadow-2xl"
        >
          <Send className="w-4 h-4" />
          <span>Оформить заказ в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
        </a>
      </div>

      <div className="pt-8 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        <span>© 2026 BALENCIAGA ARCHIVE STORE. ALL RIGHTS RESERVED.</span>
        <span>POWERED BY CREATIWISE ENGINE</span>
      </div>
    </footer>
  )
}

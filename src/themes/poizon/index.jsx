import React, { useState } from 'react'
import { ShieldCheck, Zap, Search, ShoppingBag, Send, Tag, Flame, CheckCircle, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react'

export const poizonTokens = {
  id: 'poizon',
  name: 'POIZON STREET MARKETPLACE',
  subtitle: 'Next-Gen Cyber Tech Marketplace',
  desc: 'Тёмный технологичный маркетплейс кроссовок: неоновые акценты cyan, плотная сетка 4 колонок, бейджи скидок и 100% Legit Check',
  colors: {
    primary: '#00f0ff',
    background: '#080a10',
    cardBg: '#111624',
    text: '#ffffff',
    border: '#1b2336',
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
    <section className="py-16 px-6 sm:px-10 bg-[#111624] border border-[#1b2336] rounded-3xl relative overflow-hidden space-y-6 shadow-2xl">
      {/* Neon Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b2336] pb-4">
        <div className="flex items-center gap-2 text-xs font-black text-[#00f0ff] uppercase tracking-wider bg-[#00f0ff]/10 px-4 py-1.5 rounded-full border border-[#00f0ff]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>POIZON 100% VERIFIED LEGIT CHECK</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
          <Clock className="w-4 h-4 text-[#00f0ff]" />
          <span>NEXT DROP IN: 04:12:59</span>
        </div>
      </div>

      <div className="space-y-4 max-w-3xl">
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
          className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-display leading-none focus:outline-none"
        >
          {props?.title || 'POIZON SNEAKER MARKETPLACE'}
        </h1>

        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
          className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl focus:outline-none"
        >
          {props?.subtitle || 'Платформа лимитированных ресейл-дропов с независимой проверкой подлинности по 9 параметрам'}
        </p>
      </div>

      {props?.imageUrl && (
        <div className="h-72 rounded-2xl overflow-hidden mt-4 border border-[#1b2336] relative">
          <img src={props.imageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-[#00f0ff] border border-[#00f0ff]/30">
            🔥 HIGH DEMAND
          </div>
        </div>
      )}
    </section>
  )
}

export function PoizonCatalog({ products, currencySymbol }) {
  const [activeFaq, setActiveFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = products.filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div className="space-y-16 py-8 text-white">
      
      {/* NEON RUNNING TICKER */}
      <div className="overflow-hidden whitespace-nowrap bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest py-3 rounded-2xl shadow-lg shadow-[#00f0ff]/20">
        <div className="inline-block animate-marquee space-x-8">
          <span>🔥 JUST DROPPED: NIKE AIR JORDAN 1 HIGH OG</span>
          <span>⚡ EXPRESS DELIVERY 3-5 DAYS</span>
          <span>✅ 100% LEGIT CHECK WITH CERTIFICATE</span>
          <span>🔥 LIMITED SIZES AVAILABLE</span>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Поиск по кроссовкам, бренду или размеру (например Nike 42)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111624] border border-[#1b2336] rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f0ff] font-bold"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Найдено: <strong className="text-[#00f0ff]">{filtered.length}</strong></span>
        </div>
      </div>

      {/* 4-COLUMN DENSE TECH MARKETPLACE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p, idx) => (
          <div
            key={p.id || idx}
            className="bg-[#111624] border border-[#1b2336] hover:border-[#00f0ff] rounded-2xl p-4 space-y-3 group transition-all duration-300 relative flex flex-col justify-between shadow-xl hover:shadow-[#00f0ff]/10"
          >
            {/* Discount Badge Top Left */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-[#ff0055] text-white font-black text-[10px]">
                -25%
              </span>
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#00f0ff]" /> В наличии
              </span>
            </div>

            <div>
              <div className="h-44 rounded-xl overflow-hidden bg-[#080a10] flex items-center justify-center p-3 mb-3 border border-[#1b2336]">
                <img src={p.image_url} alt="" className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-black text-[#00f0ff] uppercase tracking-wider">{p.brand || 'NIKE'}</div>
                <h3 className="font-extrabold text-xs uppercase leading-snug text-white line-clamp-2">{p.title}</h3>
                
                {p.size && (
                  <div className="inline-flex items-center gap-1 text-[10px] bg-[#080a10] px-2.5 py-1 rounded-md text-slate-400 border border-[#1b2336]">
                    <Tag className="w-3 h-3 text-[#00f0ff]" />
                    <span>Размеры: {p.size}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1b2336] flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-[#00f0ff] block font-display">
                  {p.price.toLocaleString('ru-RU')} {currencySymbol}
                </span>
                {p.oldPrice && (
                  <span className="line-through text-slate-500 text-[10px]">
                    {p.oldPrice.toLocaleString('ru-RU')} {currencySymbol}
                  </span>
                )}
              </div>

              <button className="p-2 rounded-xl bg-[#00f0ff] text-black font-bold group-hover:scale-105 transition-transform shadow-md shadow-[#00f0ff]/20">
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3-STEP LEGIT CHECK GUARANTEE BLOCK */}
      <div className="bg-[#111624] border border-[#1b2336] rounded-3xl p-8 space-y-6">
        <h3 className="text-xl font-black uppercase text-white font-display text-center">
          ⚡ 3 ЭТАПА ПРОВЕРКИ POIZON LEGIT CHECK
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#080a10] p-6 rounded-2xl border border-[#1b2336] space-y-2">
            <CheckCircle className="w-6 h-6 text-[#00f0ff]" />
            <h4 className="font-extrabold text-sm">1. Микро-сканирование швов</h4>
            <p className="text-xs text-slate-400">Проверка геометрии стежков и оригинальной строчки нити.</p>
          </div>

          <div className="bg-[#080a10] p-6 rounded-2xl border border-[#1b2336] space-y-2">
            <CheckCircle className="w-6 h-6 text-[#00f0ff]" />
            <h4 className="font-extrabold text-sm">2. УФ-проверка материалов</h4>
            <p className="text-xs text-slate-400">Анализ состава кожи и штампов завода по спец-спектру.</p>
          </div>

          <div className="bg-[#080a10] p-6 rounded-2xl border border-[#1b2336] space-y-2">
            <CheckCircle className="w-6 h-6 text-[#00f0ff]" />
            <h4 className="font-extrabold text-sm">3. Пломбирование NFC</h4>
            <p className="text-xs text-slate-400">Крепление фирменной бирки с защищенным NFC-сертификатом.</p>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="bg-[#111624] border border-[#1b2336] rounded-3xl p-8 space-y-4">
        <h3 className="text-xl font-black uppercase tracking-tight text-white font-display">
          ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
        </h3>

        <div className="space-y-3">
          {[
            { q: 'Как проверить синий NFC-тег Poizon?', a: 'Поднесите любой смартфон с функцией NFC к фирменной бирке — откроется страница сертификата проверки.' },
            { q: 'Что делать, если размер не подойдет?', a: 'Мы предоставляем возможность бесплатного обмена на соседний размер в течение 14 дней.' }
          ].map((item, index) => (
            <div key={index} className="bg-[#080a10] border border-[#1b2336] rounded-2xl">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-4 text-left font-bold text-xs uppercase flex justify-between items-center text-white"
              >
                <span>{item.q}</span>
                {activeFaq === index ? <ChevronUp className="w-4 h-4 text-[#00f0ff]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {activeFaq === index && (
                <div className="p-4 pt-0 text-xs text-slate-400 border-t border-[#1b2336] mt-2">
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

export function PoizonFooter({ telegram }) {
  return (
    <footer className="bg-[#111624] border border-[#1b2336] rounded-3xl p-10 text-center space-y-6 text-white shadow-2xl">
      <div className="flex items-center justify-center gap-2 text-base font-black text-[#00f0ff] uppercase tracking-wider">
        <Zap className="w-5 h-5" />
        <span>POIZON INSTANT TELEGRAM ORDER GATEWAY</span>
      </div>

      <p className="text-xs text-slate-400 max-w-md mx-auto">
        Подбор нужного размера, проверка наличия и оформление заявки напрямую через менеджера в Telegram
      </p>

      <div>
        <a
          href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#00f0ff]/25 hover:bg-[#33f3ff] transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Оформить заказ в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
        </a>
      </div>

      <div className="pt-6 border-t border-[#1b2336] text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-between max-w-4xl mx-auto">
        <span>© 2026 POIZON STREET STORE. ALL RIGHTS RESERVED.</span>
        <span>VERIFIED LEGIT CHECK ENGINE</span>
      </div>
    </footer>
  )
}

import React, { useState } from 'react'
import { Send, ArrowUpRight, BookOpen, Quote, Sparkles } from 'lucide-react'

export const zaraTokens = {
  id: 'zara',
  name: 'EDITORIAL FASHION MAGAZINE',
  subtitle: 'Vogue & Kinfolk Style Journal',
  desc: 'Редакционная эстетика журнала высокой моды: белоснежные страницы, разворот журнала, 1400px контейнер, крупная portrait фотография',
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
    <section className="py-24 px-6 sm:px-12 text-center space-y-8 bg-[#faf9f5] border-b border-black/10">
      <div className="flex items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
        <BookOpen className="w-4 h-4 text-black" />
        <span>EDITORIAL JOURNAL • ISSUE N° 42 • SUMMER 2026</span>
      </div>

      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'title', e.target.innerText)}
        className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight text-black uppercase max-w-5xl mx-auto leading-none focus:outline-none"
      >
        {props?.title || 'THE ART OF SLOW FASHION'}
      </h1>

      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onInlineTextChange && onInlineTextChange(blockId, 'subtitle', e.target.innerText)}
        className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto tracking-[0.2em] uppercase focus:outline-none font-sans"
      >
        {props?.subtitle || 'Редакционная подборка архивных предметов гардероба и концептуального силуэта'}
      </p>

      {props?.imageUrl && (
        <div className="pt-8 max-w-5xl mx-auto h-[550px] overflow-hidden border border-slate-200 shadow-xl">
          <img src={props.imageUrl} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      )}
    </section>
  )
}

export function ZaraCatalog({ products, currencySymbol }) {
  return (
    <div className="space-y-24 py-16 px-6 max-w-[1400px] mx-auto text-black">
      
      {/* JOURNAL RUNNING TICKER */}
      <div className="overflow-hidden whitespace-nowrap border-y border-black py-4 font-serif text-sm uppercase tracking-[0.3em] bg-white">
        <div className="inline-block animate-marquee space-x-12">
          <span>VOL. 42 • ESTABLISHED IN PARIS • THE FASHION ARCHIVE</span>
          <span>CURATED SELECTION OF CONTEMPORARY APPAREL</span>
          <span>VOGUE & KINFOLK APPROVED LOOKBOOK</span>
        </div>
      </div>

      {/* MAGAZINE EDITORIAL SPREAD / ARTICLE BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#faf9f5] p-10 border border-slate-200">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400">ESSAY / PERSPECTIVE</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light uppercase tracking-tight leading-tight">
            "CLOTHING IS NOT MERELY MATERIAL. IT IS A VISUAL MANIFESTO OF ONE'S INNER LANDSCAPE."
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl font-sans">
            Каждая позиция нашей летней коллекции отобрана ведущими фэшн-стилистами с акцентом на натуральные ткани, фактуру льна и архитектуру кроя.
          </p>
        </div>

        <div className="lg:col-span-5 h-[380px] bg-slate-100 overflow-hidden border border-black/10">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 2-COLUMN WIDE ULTRA TALL PORTRAIT CARDS GRID */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <h2 className="text-3xl font-serif font-light uppercase tracking-widest">COLLECTION INDEX</h2>
          <span className="text-xs font-mono font-bold text-slate-400">PAGE 01 / [{products.length} ITEMS]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-20">
          {products.map((p) => (
            <div key={p.id} className="group cursor-pointer space-y-4">
              <div className="h-[520px] w-full bg-[#faf9f5] overflow-hidden relative border border-slate-200">
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button className="absolute bottom-6 right-6 p-4 bg-black text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 pt-2">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em] font-sans">{p.brand || 'EDITORIAL'}</div>
                <h3 className="font-serif text-lg font-normal uppercase tracking-wider text-black">{p.title}</h3>
                <div className="text-xl font-bold font-serif text-black pt-1">{p.price.toLocaleString('ru-RU')} {currencySymbol}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRESS QUOTES BLOCK */}
      <div className="py-16 border-y-2 border-black text-center space-y-6">
        <Quote className="w-8 h-8 mx-auto text-slate-300" />
        <blockquote className="text-2xl sm:text-3xl font-serif font-light italic max-w-3xl mx-auto leading-relaxed">
          "A REFRESHING TAKE ON DIGITAL E-COMMERCE. MINIMALIST, HIGH-PITCHED TYPOGRAPHY AND UNCOMPROMISING QUALITY."
        </blockquote>
        <div className="text-xs font-extrabold uppercase tracking-[0.3em] text-slate-400 font-sans">
          — HARPER'S BAZAAR EDITORIAL
        </div>
      </div>

    </div>
  )
}

export function ZaraFooter({ telegram }) {
  return (
    <footer className="py-20 px-8 text-center space-y-8 bg-[#faf9f5] border-t-2 border-black text-black">
      <div className="max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400 font-sans">
          JOURNAL CLIENT SERVICE
        </span>
        <h3 className="text-3xl sm:text-4xl font-serif font-light uppercase tracking-widest">
          EDITORIAL CONCIERGE
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto tracking-wider uppercase font-sans">
          Оформить заказ или проконсультироваться по наличию у персонального фэшн-стилиста
        </p>
      </div>

      <div>
        <a
          href={`https://t.me/${(telegram || 'admin').replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-extrabold text-xs uppercase tracking-[0.25em] hover:bg-slate-800 transition-colors shadow-2xl"
        >
          <Send className="w-4 h-4" />
          <span>Оформить заказ в Telegram (@{(telegram || 'admin').replace('@', '')})</span>
        </a>
      </div>

      <div className="pt-10 border-t border-slate-300 text-[10px] text-slate-400 uppercase tracking-widest flex justify-between max-w-5xl mx-auto font-sans">
        <span>© 2026 EDITORIAL MAGAZINE STORE. ALL RIGHTS RESERVED.</span>
        <span>ISSUE N° 42</span>
      </div>
    </footer>
  )
}

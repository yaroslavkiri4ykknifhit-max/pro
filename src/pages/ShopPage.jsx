import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Share2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { THEMES_REGISTRY } from '../themes/index.jsx'

export function ShopPage() {
  const { shopSlug } = useParams()
  const { shops, products } = useStore()

  // Find shop matching current slug
  const shop = shops.find((s) => s.slug === shopSlug) || shops[0]
  const shopProducts = products.filter((p) => p.shop_id === shop?.id)

  const [copiedLink, setCopiedLink] = useState(false)

  const themeConfig = shop?.theme_config || {}
  const themeId = themeConfig.id || 'balenciaga'

  // Get active theme's dedicated component set
  const themePackage = THEMES_REGISTRY[themeId] || THEMES_REGISTRY.balenciaga
  const { tokens, HeroComponent, CatalogComponent, FooterComponent } = themePackage

  const colors = themeConfig.colors || tokens.colors
  const typography = themeConfig.typography || tokens.typography
  const currencySymbol = themeConfig.currencySymbol || '₽'
  const telegram = themeConfig.telegram || 'reseller_admin'
  const logoText = themeConfig.logoText || shop?.name || tokens.name

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-400 mb-4" />
        <h1 className="text-2xl font-bold font-display mb-2">Магазин не найден</h1>
        <Link to="/" className="px-6 py-3 bg-black text-white rounded-none text-xs font-bold uppercase">
          На главную
        </Link>
      </div>
    )
  }

  const activeBlocks = shop.blocks || [
    { id: 'b-h-1', type: 'hero' },
    { id: 'b-p-1', type: 'products' },
    { id: 'b-c-1', type: 'contact' }
  ]

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 flex flex-col selection:bg-black selection:text-white"
      style={{
        backgroundColor: colors.background || '#ffffff',
        color: colors.text || '#000000',
        fontFamily: typography.fontFamily || 'Inter'
      }}
    >
      <header className="w-full border-b py-5 px-6 sticky top-0 z-40 bg-white/90 backdrop-blur-md border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={`/s/${shop.slug}`} className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase font-display text-black">
            {themeConfig.logoUrl ? (
              <img src={themeConfig.logoUrl} alt="" className="h-8 object-contain" />
            ) : (
              <span>{logoText}</span>
            )}
          </Link>

          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Скопировано!' : 'Поделиться'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow space-y-12">
        {activeBlocks.filter((b) => !b.hidden).map((block) => {
          if (block.type === 'hero') {
            return (
              <HeroComponent key={block.id} props={block.props} />
            )
          }

          if (block.type === 'products') {
            return (
              <CatalogComponent key={block.id} products={shopProducts} currencySymbol={currencySymbol} />
            )
          }

          if (block.type === 'contact') {
            return (
              <FooterComponent key={block.id} telegram={telegram} />
            )
          }

          return null
        })}
      </main>

      <footer className="w-full py-8 text-center text-xs opacity-60 border-t border-slate-200 mt-12">
        <p>© {new Date().getFullYear()} {logoText.toUpperCase()}. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        <p className="mt-1">Витрина создана на <Link to="/" className="underline font-bold text-black">Creatiwise Platform</Link></p>
      </footer>
    </div>
  )
}

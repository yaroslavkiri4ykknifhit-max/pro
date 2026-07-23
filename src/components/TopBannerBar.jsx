import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store, LayoutDashboard, Sparkles, ExternalLink, RefreshCw } from 'lucide-react'
import { useStore } from '../store/useStore'

export function TopBannerBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { shops, activeShopId, setActiveShopId, resetDemoData } = useStore()
  
  const activeShop = shops.find(s => s.id === activeShopId) || shops[0]

  return (
    <div className="bg-dark-900 text-white text-xs py-2 px-4 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-blue-600 text-white">
            B2B SaaS Platform Demo
          </span>
          <span className="hidden sm:inline text-slate-400">| Switch between Modes:</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode 1: Landing Page */}
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              location.pathname === '/'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Landing Page</span>
          </Link>

          {/* Mode 2: Admin Dashboard */}
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              location.pathname.startsWith('/admin')
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>2. Reseller Admin</span>
          </Link>

          {/* Mode 3: Store Showcase */}
          {activeShop && (
            <button
              onClick={() => navigate(`/s/${activeShop.slug}`)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                location.pathname.startsWith('/s/')
                  ? 'bg-emerald-500 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>3. Live Store ({activeShop.slug})</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          )}

          {/* Reset Demo Data button */}
          <button
            onClick={() => {
              if (window.confirm('Reset demo shops and products to initial state?')) {
                resetDemoData()
              }
            }}
            title="Reset demo data"
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors ml-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

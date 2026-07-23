import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TopBannerBar } from './components/TopBannerBar'
import { LandingPage } from './pages/LandingPage'
import { AdminPage } from './pages/AdminPage'
import { ShopPage } from './pages/ShopPage'
import { useStore } from './store/useStore'

export default function App() {
  const fetchData = useStore((state) => state.fetchData)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Router>
      <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans relative">
        <TopBannerBar />
        <Routes>
          {/* Mode 1: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Mode 2: Reseller Admin Dashboard */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Mode 3: Dynamic Store Showcase */}
          <Route path="/s/:shopSlug" element={<ShopPage />} />
          <Route path="/:shopSlug" element={<ShopPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

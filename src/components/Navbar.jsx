import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Shield, Sparkles } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Главная', href: '#' },
    { name: 'О платформе', href: '#about' },
    { name: 'Как это работает', href: '#how-we-work' },
    { name: 'Возможности', href: '#services' },
    { name: 'Шаблоны витрин', href: '#portfolio' },
  ]

  return (
    <header className="w-full bg-[#f8f9fa] border-b border-slate-200/60 sticky top-9 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="font-extrabold text-2xl tracking-tight text-black font-display">
            creatiwise<span className="text-black font-extrabold">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200/80 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-black transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            Конструктор Витрин
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-black hover:bg-slate-800 rounded-full transition-all duration-200 shadow-sm"
          >
            Создать Витрину
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/admin"
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-full"
          >
            Конструктор
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-black focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-black py-1 border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-5 py-3 text-sm font-bold text-white bg-blue-600 rounded-full"
            >
              Открыть Кабинет Ресейлера
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-slate-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-block font-extrabold text-2xl tracking-tight text-black font-display">
            creatiwise<span className="text-black font-extrabold">.</span>
          </Link>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs">
            B2B SaaS-платформа для дропшипперов и ресейлеров. Конструктор стильных интернет-витрин с приёмом заказов в Telegram.
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Навигация</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#" className="hover:text-black transition-colors">Главная</a></li>
              <li><a href="#about" className="hover:text-black transition-colors">О платформе</a></li>
              <li><a href="#how-we-work" className="hover:text-black transition-colors">Как это работает</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Возможности</a></li>
              <li><a href="#portfolio" className="hover:text-black transition-colors">Шаблоны</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Кабинет</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><Link to="/admin" className="hover:text-black transition-colors font-bold text-blue-600">Панель Ресейлера</Link></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Поддержка</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Частые вопросы</a></li>
              <li><span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Системы активны</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Сообщество</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#" className="hover:text-black transition-colors">Telegram Канал</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Поддержка Telegram</a></li>
            </ul>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>© {new Date().getFullYear()} Creatiwise. Все права защищены. B2B Reseller Showcase Platform.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-600">Политика конфиденциальности</a>
          <a href="#" className="hover:text-slate-600">Условия сервиса</a>
        </div>
      </div>
    </footer>
  )
}

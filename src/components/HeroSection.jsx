import React from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column - Headline & Details */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300/80 bg-white text-xs font-semibold text-slate-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Конструктор интернет-витрин для ресейла</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] font-display uppercase">
            СОЗДАВАЙТЕ СТИЛЬНЫЕ <br />
            <span className="inline-flex items-center gap-2 text-blue-600">
              ВИТРИНЫ
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-slate-900 stroke-[1.5] inline-block -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l2.4 7.2H21.6l-5.8 4.2 2.2 7.1L12 16.2l-6 4.3 2.2-7.1L2.4 9.2h7.2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span> <br />
            И ПРОДАВАЙТЕ В TELEGRAM
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Платформа для дропшипперов и ресейлеров. Запускайте брендовый каталог за 1 минуту в стилях известных мировых брендов и принимайте заказы прямо в личный Telegram.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/admin"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white font-medium hover:bg-slate-800 transition-all duration-200 shadow-md group"
            >
              <span>Создать магазин</span>
              <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-300 text-slate-800 font-semibold hover:bg-white transition-all shadow-sm"
            >
              <span>Смотреть шаблоны</span>
            </a>
          </div>
        </div>

        {/* Right Column - Hero Visual Card */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
          
          {/* Satisfied Clients Badge */}
          <div className="mb-4 lg:mb-6 self-start lg:self-start bg-white border border-slate-200 shadow-sm rounded-2xl p-3 inline-flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Ресейлер"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Ресейлер"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Ресейлер"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">250+ Активных</div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <span>Магазинов</span>
                <span className="flex items-center text-amber-500 font-bold">★ 4.9</span>
              </div>
            </div>
          </div>

          {/* Main Hero Photo Container */}
          <div className="relative w-full max-w-md bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/80">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
              alt="Creatiwise Reseller Showcase Platform"
              className="w-full h-[420px] sm:h-[480px] object-cover object-top"
            />
            
            {/* Pill Tag at bottom of photo */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-lg border border-white/10 whitespace-nowrap">
              Дизайны в стиле известных брендов
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

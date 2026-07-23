import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PortfolioSection() {
  const presets = [
    {
      title: '🖤 Minimalist Luxury (Balenciaga / Celine)',
      category: 'Монохром и Премиум',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '🔥 Streetwear & Cyber (Supreme / Off-White)',
      category: 'Уличный стиль и Кроссовки',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '🍏 Apple Clean & Glass',
      category: 'Светлый интерьерный стиль',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <section id="portfolio" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Badge & Title */}
      <div className="space-y-4 max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 shadow-sm">
          <span>Готовые шаблоны витрин</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Выберите стиль своего бренда
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {presets.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2 text-black shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <span>Перейти в конструктор и выбрать стиль</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  )
}

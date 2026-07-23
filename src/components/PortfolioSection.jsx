import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export function PortfolioSection() {
  const projects = [
    {
      title: 'Fintech Mobile Dashboard',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Minimalist SaaS Identity',
      category: 'Branding & Web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'E-Commerce Link-in-Bio',
      category: 'Fullstack App',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <section id="portfolio" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Badge & Title */}
      <div className="space-y-4 max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-sm">
          <span>Portfolio</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Explore our most successful projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {projects.map((project, idx) => (
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
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
        >
          <span>See all projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

    </section>
  )
}

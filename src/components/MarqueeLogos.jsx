import React from 'react'
import { Plus } from 'lucide-react'

export function MarqueeLogos() {
  const logos = [
    { name: 'Velox', svg: '⚡ VELOX' },
    { name: 'Solis', svg: '☀️ SOLIS' },
    { name: 'ububa', svg: '❖ ububa' },
    { name: 'digg', svg: 'digg' },
    { name: 'Cinfores', svg: '⬡ Cinfores' },
    { name: 'Aether', svg: '◈ Aether' },
    { name: 'Nexis', svg: '▲ NEXIS' },
  ]

  return (
    <div className="w-full bg-[#f8f9fa] border-y border-slate-200/80 py-6 overflow-hidden select-none">
      <div className="relative flex overflow-x-hidden">
        {/* Row 1 */}
        <div className="flex items-center space-x-8 sm:space-x-12 animate-marquee whitespace-nowrap">
          {logos.concat(logos).concat(logos).map((logo, index) => (
            <React.Fragment key={index}>
              <span className="text-slate-400">
                <Plus className="w-4 h-4" />
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 font-display">
                {logo.svg}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

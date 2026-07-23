import React from 'react'
import { ArrowUpRight, Palette, Layers, Layout, Code, Smartphone, Terminal } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      title: 'Brand Identity',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Palette
    },
    {
      title: 'Illustration',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Layers
    },
    {
      title: 'UI/UX Design',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Layout
    },
    {
      title: 'Frontend Design',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Code
    },
    {
      title: 'Android/iOS App',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Smartphone
    },
    {
      title: 'Software Development',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all.',
      icon: Terminal
    },
  ]

  return (
    <section id="services" className="bg-[#090a0f] text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span>What we do</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
              We design meaningful not just <br className="hidden sm:inline" /> quick impressions
            </h2>
          </div>

          <div className="lg:col-span-5 text-slate-400 text-sm sm:text-base leading-relaxed lg:pt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac all
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComp = service.icon
            return (
              <div
                key={index}
                className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15">
                      <IconComp className="w-6 h-6 text-white" />
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white text-slate-400 group-hover:text-black flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

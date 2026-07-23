import React from 'react'

export function CTASection() {
  return (
    <section id="contact" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#090a0f] text-white rounded-[2.5rem] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-tight">
            Let's start designing your project
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Have an idea? We'd love to transform your brand into a unique style! Send us a message!
          </p>

          <div className="pt-4">
            <a
              href="mailto:contact@creatiwise.com"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-white hover:bg-slate-100 rounded-full transition-all duration-200 shadow-xl"
            >
              Send us a message
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

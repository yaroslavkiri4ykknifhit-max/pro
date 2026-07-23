import React from 'react'

export function BentoGrid() {
  const tags = [
    'Marketing',
    'Web Design',
    'Web Design',
    'Product Design',
    'SEO',
    'Brand Positioning'
  ]

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-sm mb-6">
        <span>About us</span>
      </div>

      {/* Grid Layout Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        
        {/* Left Column: Heading & Text */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Meet Creatiwise: Your Design <br className="hidden sm:inline" /> Partners
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            We're not just designers; we're creators, problem-solvers, and your brand's best friends. At Creatiwise, we live and breathe design, from captivating visuals to seamless digital experiences. Think of us as an extension of your team, ready to bring your ideas to life.
          </p>
        </div>

        {/* Right Column: Circular Collage Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
              alt="Team members collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* Asymmetric Bento Card (Dark Card with 40% Growth & Tags) */}
      <div className="w-full bg-[#090a0f] text-white rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Abstract Wavy Background Pattern Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-grid-pattern"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Portion of Dark Card */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white font-display tracking-tight">
                40%
              </span>
              <p className="text-slate-300 text-sm sm:text-base font-medium">
                Increased growth revenues
              </p>
            </div>

            {/* Pill Tags */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Portion: Sub-card Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=700&q=80"
                alt="Creatiwise strategy session"
                className="w-full h-56 sm:h-64 object-cover"
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

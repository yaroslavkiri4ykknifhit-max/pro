import React from 'react'

export function RoadmapSection() {
  const steps = [
    {
      number: '01',
      title: 'Define',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.',
      rotation: 'lg:rotate-[2deg]',
      align: 'lg:ml-auto lg:w-[460px]',
      pinPos: 'top-3 left-1/2 -translate-x-1/2',
    },
    {
      number: '02',
      title: 'Design',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.',
      rotation: 'lg:-rotate-[3deg]',
      align: 'lg:mr-auto lg:w-[460px]',
      pinPos: 'top-3 left-1/2 -translate-x-1/2',
    },
    {
      number: '03',
      title: 'Build',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.',
      rotation: 'lg:rotate-[3deg]',
      align: 'lg:ml-auto lg:w-[460px]',
      pinPos: 'top-3 left-1/2 -translate-x-1/2',
    },
    {
      number: '04',
      title: 'Launch',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.',
      rotation: 'lg:-rotate-[2deg]',
      align: 'lg:mr-auto lg:w-[460px]',
      pinPos: 'top-3 left-1/2 -translate-x-1/2',
    },
  ]

  return (
    <section id="how-we-work" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Top Header */}
      <div className="max-w-2xl space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-sm">
          <span>How we work</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Let us show you how we drive your brand to new heights
        </h2>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac x3
        </p>
      </div>

      {/* Roadmap Container with Curved SVG Line & Pinned Stickers */}
      <div className="relative min-h-[900px] flex flex-col justify-between py-6">

        {/* SVG Curved Dashed Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          viewBox="0 0 1000 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 500,20 C 750,120 850,220 700,320 C 500,420 150,380 250,550 C 350,680 750,680 700,800 C 650,880 400,850 250,850"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            fill="none"
          />
        </svg>

        {/* 4 Pinned Cards */}
        <div className="space-y-12 lg:space-y-16 relative z-10">
          
          {/* Card 01 - Define */}
          <div className="flex justify-end">
            <div className={`w-full lg:w-[480px] bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card-sticker transition-transform hover:scale-[1.01] duration-300 relative ${steps[0].rotation}`}>
              {/* Pushpin / Circle dot top */}
              <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-300 shadow-inner mx-auto mb-4"></div>
              
              <div className="text-sm font-bold text-slate-400 font-display mb-1">{steps[0].number}</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 font-display">{steps[0].title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{steps[0].desc}</p>
            </div>
          </div>

          {/* Card 02 - Design */}
          <div className="flex justify-start">
            <div className={`w-full lg:w-[480px] bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card-sticker transition-transform hover:scale-[1.01] duration-300 relative ${steps[1].rotation}`}>
              <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-300 shadow-inner mx-auto mb-4"></div>
              
              <div className="text-sm font-bold text-slate-400 font-display mb-1">{steps[1].number}</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 font-display">{steps[1].title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{steps[1].desc}</p>
            </div>
          </div>

          {/* Card 03 - Build */}
          <div className="flex justify-end">
            <div className={`w-full lg:w-[480px] bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card-sticker transition-transform hover:scale-[1.01] duration-300 relative ${steps[2].rotation}`}>
              <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-300 shadow-inner mx-auto mb-4"></div>
              
              <div className="text-sm font-bold text-slate-400 font-display mb-1">{steps[2].number}</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 font-display">{steps[2].title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{steps[2].desc}</p>
            </div>
          </div>

          {/* Card 04 - Launch */}
          <div className="flex justify-start">
            <div className={`w-full lg:w-[480px] bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card-sticker transition-transform hover:scale-[1.01] duration-300 relative ${steps[3].rotation}`}>
              <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-300 shadow-inner mx-auto mb-4"></div>
              
              <div className="text-sm font-bold text-slate-400 font-display mb-1">{steps[3].number}</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 font-display">{steps[3].title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{steps[3].desc}</p>
            </div>
          </div>

        </div>

        {/* Handwritten "Ready to be delivered!" annotation */}
        <div className="mt-12 flex justify-center lg:justify-end items-center gap-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-slate-700 font-bold -rotate-3">
            Ready to be delivered!
          </span>
          <svg className="w-12 h-8 text-slate-700 stroke-2 fill-none" viewBox="0 0 60 40">
            <path d="M5 20 Q 30 5, 50 30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <polyline points="42,28 52,32 50,20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

      </div>

    </section>
  )
}

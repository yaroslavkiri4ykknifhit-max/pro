import React from 'react'
import { Quote } from 'lucide-react'

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-sm">
          <span>Reviews</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Here's what people say about <br className="hidden sm:inline" /> our work
        </h2>
      </div>

      {/* Testimonial Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar Photo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-100 flex-shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Julia G."
              className="w-full h-full object-cover"
            />
          </div>

          {/* Testimonial Content */}
          <div className="space-y-6 flex-1 text-center md:text-left">
            <div className="inline-block p-3 rounded-full bg-slate-100 text-slate-800">
              <Quote className="w-6 h-6 fill-current" />
            </div>

            <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna et turpis condimentum gravida."
            </p>

            <div>
              <div className="font-bold text-slate-900 text-lg font-display">Julia G.</div>
              <div className="text-slate-500 text-xs sm:text-sm">Brand Manager</div>
            </div>
          </div>

        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-3 h-3 rounded-full bg-black"></span>
          <span className="w-3 h-3 rounded-full bg-slate-200"></span>
          <span className="w-3 h-3 rounded-full bg-slate-200"></span>
        </div>

      </div>

    </section>
  )
}

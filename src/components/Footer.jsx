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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac.
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-black transition-colors">About us</a></li>
              <li><a href="#how-we-work" className="hover:text-black transition-colors">How we work</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-black transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">SaaS & Support</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><Link to="/admin" className="hover:text-black transition-colors">Reseller Admin</Link></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Support</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available for work</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Social Media</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Dribbble</a></li>
              <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
            </ul>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>© {new Date().getFullYear()} Creatiwise. All rights reserved. B2B Reseller Showcase Platform.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

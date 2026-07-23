import React from 'react'
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { BentoGrid } from '../components/BentoGrid'
import { ServicesSection } from '../components/ServicesSection'
import { PortfolioSection } from '../components/PortfolioSection'
import { RoadmapSection } from '../components/RoadmapSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main className="space-y-16 sm:space-y-24">
        <HeroSection />
        <ServicesSection />
        <BentoGrid />
        <PortfolioSection />
        <RoadmapSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

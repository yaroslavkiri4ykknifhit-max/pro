import React from 'react'
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { MarqueeLogos } from '../components/MarqueeLogos'
import { BentoGrid } from '../components/BentoGrid'
import { RoadmapSection } from '../components/RoadmapSection'
import { ServicesSection } from '../components/ServicesSection'
import { PortfolioSection } from '../components/PortfolioSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MarqueeLogos />
        <BentoGrid />
        <RoadmapSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import HowItWorks from '../components/sections/HowItWorks'
import WhySection from '../components/sections/WhySection'
import BuiltFor from '../components/sections/BuiltFor'
import QuoteSection from '../components/sections/QuoteSection'
import Features from '../components/sections/Features'
import Pricing from '../components/sections/Pricing'
import Testimonials from '../components/sections/Testimonials'
import Guides from '../components/sections/Guides'
import FinalCta from '../components/sections/FinalCta'
import Footer from '../components/sections/Footer'

export default function HomePage() {
  const [lastEstimate, setLastEstimate] = useState(null)

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero onEstimateBuilt={setLastEstimate} />
        <HowItWorks lastEstimate={lastEstimate} />
        <WhySection />
        <BuiltFor />
        <QuoteSection />
        <Features />
        <Pricing />
        <Testimonials />
        <Guides />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

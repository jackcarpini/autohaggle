import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Workflow from '@/components/Workflow'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import InteractiveCharts from '@/components/InteractiveCharts'
import BackgroundEffect from '@/components/BackgroundEffect'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <BackgroundEffect />
      <div className="relative z-10">
        <Hero />
        <Features />
        <Workflow />
        <InteractiveCharts />
        <Testimonials />
        <CTA />
      </div>
    </main>
  )
}


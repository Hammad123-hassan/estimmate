import { ArrowRight } from 'lucide-react'
import AnimatedButton from '../ui/AnimatedButton'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function FinalCta() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-section-navy py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />

      <Reveal>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Ready when you are</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            Plan smarter. Impress clients. Grow faster.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Turn rough requirements into client-ready estimates with clear costs, timelines, and risks.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <AnimatedButton>
              <Button to="/signup" variant="white" size="lg">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </AnimatedButton>
            <AnimatedButton>
              <Button to="/contact" variant="outlineLight" size="lg">
                Contact us
              </Button>
            </AnimatedButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

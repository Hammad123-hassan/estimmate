import EstimateInput from '../EstimateInput'
import { useHeroIntro } from '../../hooks/useGsap'

export default function Hero({ onEstimateBuilt }) {
  const containerRef = useHeroIntro()

  return (
    <section id="home" className="relative overflow-hidden bg-hero-glow pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-navy-400/15 blur-3xl" />

      <div ref={containerRef} className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p
          data-hero
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Trusted by software & delivery teams
        </p>
        <h1 data-hero className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
          Client-ready project
          <br />
          <span className="text-gradient">estimates in minutes</span>
        </h1>
        <p data-hero className="mx-auto mt-5 max-w-2xl text-base text-ink-muted sm:text-lg">
          We help software companies estimate costs, timelines, trade-offs, risks and avoid expensive
          surprises.
        </p>

        <div data-hero className="mt-10">
          <EstimateInput onBuild={onEstimateBuilt} />
        </div>
      </div>
    </section>
  )
}

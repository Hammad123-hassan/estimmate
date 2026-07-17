import EstimateInput from '../EstimateInput'
import { useHeroIntro } from '../../hooks/useGsap'

export default function Hero({ onEstimateBuilt }) {
  const containerRef = useHeroIntro()

  return (
    <section id="home" className="relative overflow-hidden bg-hero-glow py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-navy-400/15 blur-3xl" />

      <div ref={containerRef} className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p
          data-hero
          className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-700 shadow-sm sm:mb-5 sm:px-3 sm:text-xs"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <span className="truncate">Trusted by software & delivery teams</span>
        </p>
        <h1 data-hero className="text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl sm:leading-tight md:text-6xl">
          Client-ready project{' '}
          <span className="text-gradient block sm:inline">estimates in minutes</span>
        </h1>
        <p data-hero className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:mt-5 sm:text-lg">
          We help software companies estimate costs, timelines, trade-offs, risks and avoid expensive
          surprises.
        </p>

        <div data-hero className="mt-8 sm:mt-10">
          <EstimateInput onBuild={onEstimateBuilt} />
        </div>
      </div>
    </section>
  )
}

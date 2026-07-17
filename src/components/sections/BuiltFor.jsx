import {
  BarChart3,
  Briefcase,
  Clock3,
  Code2,
  Package,
  Star,
} from 'lucide-react'
import { BUILT_FOR } from '../../data/content'
import { useStaggerIn } from '../../hooks/useGsap'
import AnimatedIcon from '../ui/AnimatedIcon'
import Reveal from '../ui/Reveal'

const ICONS = {
  briefcase: Briefcase,
  clock: Clock3,
  chart: BarChart3,
  code: Code2,
  package: Package,
  star: Star,
}

export default function BuiltFor() {
  const cardsRef = useStaggerIn('[data-stagger]', {
    stagger: 0.16,
    y: 50,
    x: 22,
    duration: 0.75,
    start: 'top 85%',
  })

  return (
    <section id="built-for" className="relative overflow-hidden bg-section-navy pt-14 pb-20 text-white sm:pt-20 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl">Built specially for</h2>
        </Reveal>

        <div ref={cardsRef} className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT_FOR.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <article
                key={item.title}
                data-stagger
                className="glass group cursor-pointer rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:ring-1 hover:ring-gold-400/40"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition group-hover:bg-gold-500/20">
                    <AnimatedIcon>
                      <Icon className="h-5 w-5 text-white/90" />
                    </AnimatedIcon>
                  </span>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0]">
        <svg viewBox="0 0 1440 80" className="block h-12 w-full sm:h-16" preserveAspectRatio="none" aria-hidden>
          <path fill="var(--color-surface)" d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}

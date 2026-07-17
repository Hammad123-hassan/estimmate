import { useCountUp, useInView } from '../../hooks/useMotion'
import Reveal from '../ui/Reveal'

export default function QuoteSection() {
  const { ref, inView } = useInView()
  const overBudget = useCountUp(45, inView)
  const lessValue = useCountUp(56, inView)

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <div ref={ref} className="relative">
            <span
              className="pointer-events-none absolute -left-2 -top-6 select-none text-7xl font-serif leading-none text-brand-200 sm:-left-8 sm:text-8xl"
              aria-hidden
            >
              “
            </span>
            <p className="relative text-xl font-extrabold leading-snug text-ink sm:text-3xl md:text-4xl">
              Large IT projects run{' '}
              <span className="text-brand-600 transition hover:text-gold-600">{overBudget}%</span> over budget
              and deliver <span className="text-brand-600 transition hover:text-gold-600">{lessValue}%</span>{' '}
              less value than expected.
            </p>
          </div>
          <p className="mt-6 text-sm text-ink-muted sm:text-base">
            McKinsey & Oxford University, ‘Delivering large-scale IT projects’
          </p>
        </Reveal>
      </div>
    </section>
  )
}

import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { COMPARISON } from '../../data/content'
import { useStaggerCards } from '../../hooks/useGsap'
import Reveal from '../ui/Reveal'

export default function WhySection() {
  const cardsRef = useStaggerCards('[data-card]')

  return (
    <section id="why" className="relative overflow-hidden bg-surface py-20">
      <div className="pointer-events-none absolute left-1/4 top-32 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-20 h-56 w-56 rounded-full bg-gold-400/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
            Why teams switch to <span className="text-gradient">EstimMate</span>
          </h2>
        </Reveal>

        <div ref={cardsRef} className="mt-12 grid gap-5 lg:grid-cols-3">
          {COMPARISON.map((card) => (
            <ComparisonCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonCard({ card }) {
  const isBrand = card.variant === 'brand'
  const isSoft = card.variant === 'soft'

  return (
    <article
      data-card
      className={`group flex h-full cursor-default flex-col rounded-[24px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isBrand
          ? 'bg-brand-gradient text-white shadow-lg shadow-brand-500/30'
          : isSoft
            ? 'border border-brand-100 bg-brand-50/80 shadow-sm'
            : 'border border-slate-200 bg-white shadow-sm'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <h3 className={`text-xl font-extrabold ${isBrand ? 'text-white' : 'text-ink'}`}>{card.title}</h3>
        <CardBadge id={card.id} brand={isBrand} />
      </div>

      <ul className="flex flex-1 flex-col gap-4">
        {card.items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className={`mt-0.5 shrink-0 ${isBrand ? 'text-white' : 'text-ink-muted'}`}>
              {isBrand ? <ThumbsUp className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
            </span>
            <div>
              <p className={`font-semibold ${isBrand ? 'text-white' : 'text-ink'}`}>{item.title}</p>
              <p className={`mt-0.5 text-sm leading-relaxed ${isBrand ? 'text-white/85' : 'text-ink-muted'}`}>
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function CardBadge({ id, brand }) {
  if (id === 'spreadsheet') {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-sm font-extrabold text-emerald-700">
        X
      </span>
    )
  }
  if (id === 'ai') {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-fuchsia-100 text-fuchsia-500">
        ✦
      </span>
    )
  }
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold ${
        brand ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-600'
      }`}
    >
      E
    </span>
  )
}

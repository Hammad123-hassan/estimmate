import { useState } from 'react'
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react'
import { GUIDES } from '../../data/content'
import { useStaggerIn } from '../../hooks/useGsap'
import AnimatedIcon from '../ui/AnimatedIcon'
import Reveal from '../ui/Reveal'

export default function Guides() {
  const [active, setActive] = useState(GUIDES[0].id)
  const tags = ['All', ...new Set(GUIDES.map((g) => g.tag))]
  const [filter, setFilter] = useState('All')
  const cardsRef = useStaggerIn('[data-stagger]', { stagger: 0.16, y: 40, x: 18 })

  const visible = filter === 'All' ? GUIDES : GUIDES.filter((g) => g.tag === filter)

  return (
    <section id="guides" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Guides</h2>
              <p className="mt-2 text-ink-muted">Practical playbooks for estimation, delivery, and sales.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(tag)}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    filter === tag
                      ? 'bg-brand-gradient text-white'
                      : 'border border-brand-100 bg-white text-ink-muted hover:text-ink'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div ref={cardsRef} className="mt-10 grid gap-4 md:grid-cols-3">
          {visible.map((guide) => (
            <article
              key={guide.id}
              data-stagger
              onMouseEnter={() => setActive(guide.id)}
              className={`group flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                active === guide.id ? 'border-brand-400 ring-1 ring-brand-200' : 'border-brand-100'
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                  <AnimatedIcon>
                    <BookOpen className="h-3.5 w-3.5" />
                  </AnimatedIcon>
                  {guide.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {guide.readTime}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-ink group-hover:text-brand-700">{guide.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{guide.description}</p>
              <button
                type="button"
                className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-navy-700 transition group-hover:gap-2"
              >
                Read guide{' '}
                <AnimatedIcon>
                  <ArrowUpRight className="h-4 w-4" />
                </AnimatedIcon>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

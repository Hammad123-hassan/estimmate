import { useState } from 'react'
import { Check, Infinity as InfinityIcon, Mail } from 'lucide-react'
import { PRICING_PLANS } from '../../data/content'
import { useStaggerIn } from '../../hooks/useGsap'
import AnimatedButton from '../ui/AnimatedButton'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const [modes, setModes] = useState({
    pro: 'solo',
    business: 'team',
  })
  const gridRef = useStaggerIn('[data-stagger]', { stagger: 0.2, y: 56, x: 28 })

  return (
    <section id="pricing" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">Upgrade your workflow</h2>
        </Reveal>

        <div className="relative mx-auto mt-8 flex w-fit items-center rounded-full border border-brand-100 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
              billing === 'monthly' ? 'bg-brand-gradient text-white shadow' : 'text-ink-muted hover:text-ink'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
              billing === 'yearly' ? 'bg-brand-gradient text-white shadow' : 'text-ink-muted hover:text-ink'
            }`}
          >
            Yearly
            <span className="absolute -top-3 right-0 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              Save 20%
            </span>
          </button>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billing={billing}
              mode={modes[plan.id]}
              onModeChange={(mode) => setModes((m) => ({ ...m, [plan.id]: mode }))}
            />
          ))}
        </div>

        <ScaleBanner />
      </div>
    </section>
  )
}

function PricingCard({ plan, billing, mode, onModeChange }) {
  const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  const layers = plan.id === 'free' ? 1 : plan.id === 'pro' ? 2 : 3

  return (
    <article
      data-stagger
      className={`flex flex-col overflow-hidden rounded-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        plan.featured
          ? 'bg-white shadow-lg shadow-brand-500/20 ring-1 ring-brand-200'
          : plan.id === 'pro'
            ? 'border border-brand-100 bg-brand-50/60 shadow-sm'
            : 'border border-slate-200 bg-white shadow-sm'
      }`}
    >
      <div className={`relative p-6 ${plan.featured ? 'bg-brand-gradient text-white' : ''}`}>
        {plan.hasToggle && (
          <div
            className={`mb-4 inline-flex rounded-full p-1 text-xs font-semibold ${
              plan.featured ? 'bg-white/20' : 'bg-white'
            }`}
          >
            {['solo', 'team'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onModeChange(m)}
                className={`rounded-full px-3 py-1 capitalize transition ${
                  mode === m
                    ? plan.featured
                      ? 'bg-white text-brand-700'
                      : 'bg-brand-gradient text-white'
                    : plan.featured
                      ? 'text-white/80'
                      : 'text-ink-muted'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-2xl font-extrabold ${plan.featured ? 'text-white' : 'text-ink'}`}>
              {plan.name}
            </h3>
            <p className={`mt-1 text-sm ${plan.featured ? 'text-white/85' : 'text-ink-muted'}`}>
              {plan.subtitle}
              {plan.hasToggle && mode === 'team' ? ' · team seats' : ''}
            </p>
            <p className="mt-4">
              <span className={`text-4xl font-extrabold ${plan.featured ? 'text-white' : 'text-ink'}`}>
                ${price}
              </span>
              <span className={`ml-1 text-sm ${plan.featured ? 'text-white/80' : 'text-ink-muted'}`}>
                user per month
              </span>
            </p>
          </div>
          <LayerIcon layers={layers} light={plan.featured} />
        </div>

        <Button
          variant={plan.featured ? 'white' : 'outline'}
          className="mt-5 w-full"
        >
          {plan.cta}
        </Button>
      </div>

      <ul className="flex flex-1 flex-col gap-3 p-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span>
              {feature.includes('∞') ? (
                <>
                  <InfinityIcon className="mr-1 inline h-3.5 w-3.5" />
                  {feature.replace('∞ ', '')}
                </>
              ) : (
                feature
              )}
              {feature.includes('AI credits') && plan.id !== 'free' && (
                <span className="ml-2 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
                  {plan.id === 'pro' ? 'x3' : 'x5'}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {plan.addons && (
        <div className="border-t border-brand-100 px-6 py-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-muted">Add-ons</p>
          <ul className="space-y-1.5">
            {plan.addons.map((addon) => (
              <li key={addon.label} className="flex justify-between text-sm text-ink-muted">
                <span>{addon.label}</span>
                <span className="font-semibold text-ink">${addon.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

function LayerIcon({ layers, light }) {
  return (
    <div className="relative h-14 w-14 shrink-0" aria-hidden>
      {Array.from({ length: layers }).map((_, i) => (
        <span
          key={i}
          className={`absolute left-1/2 h-8 w-8 -translate-x-1/2 rounded-lg border ${
            light ? 'border-white/40 bg-white/25' : 'border-brand-200 bg-brand-100'
          }`}
          style={{
            top: `${i * 6}px`,
            transform: `translateX(-50%) rotate(45deg)`,
            opacity: 1 - i * 0.15,
          }}
        />
      ))}
    </div>
  )
}

function ScaleBanner() {
  return (
    <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
      <div className="flex gap-4">
        <span className="w-1 shrink-0 rounded-full bg-brand-500" aria-hidden />
        <div>
          <h3 className="text-lg font-extrabold text-ink">Scale with custom solutions</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Get custom features, workflows, and integrations designed for your team
          </p>
        </div>
      </div>
      <AnimatedButton className="shrink-0">
        <Button to="/contact" variant="soft" className="cursor-pointer">
          <Mail className="h-4 w-4" /> Contact us
        </Button>
      </AnimatedButton>
    </div>
  )
}

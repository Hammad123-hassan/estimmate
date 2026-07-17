import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Folder,
  MessageSquare,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DEMO_ESTIMATES, HOW_IT_WORKS_STEPS, REFINE_ROWS } from '../../data/content'
import AnimatedIcon from '../ui/AnimatedIcon'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks({ lastEstimate }) {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const pillsRef = useRef(null)
  const stepsRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pills = pillsRef.current
    const steps = stepsRef.current
    if (!section || !pills || !steps) return undefined

    const ctx = gsap.context(() => {
      const makeScrub = (trigger, build) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            end: 'center center',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })
        build(tl)
        return tl
      }

      const title = section.querySelector('[data-how-title]')
      gsap.set(title, { autoAlpha: 0, y: 30 })
      makeScrub(section, (tl) => {
        tl.to(title, { autoAlpha: 1, y: 0, duration: 0.5 })
      })

      const pillBtns = gsap.utils.toArray(pills.querySelectorAll('[data-step-pill]'))
      gsap.set(pillBtns, { autoAlpha: 0, y: 24, scale: 0.9 })
      makeScrub(pills, (tl) => {
        pillBtns.forEach((btn, i) => {
          tl.to(
            btn,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
            },
            i * 0.1,
          )
        })
      })

      const stepBlocks = gsap.utils.toArray(steps.querySelectorAll('[data-step-block]'))
      stepBlocks.forEach((block, index) => {
        gsap.set(block, {
          autoAlpha: 0,
          y: 60,
          x: index % 2 === 0 ? -40 : 40,
        })

        const svgIcons = block.querySelectorAll('svg')
        if (svgIcons.length) {
          gsap.set(svgIcons, { autoAlpha: 0, scale: 0.5, rotate: -15 })
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: block,
            start: 'top 90%',
            end: 'center center',
            scrub: 0.85,
            invalidateOnRefresh: true,
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          },
        })

        tl.to(block, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.55,
        })
        if (svgIcons.length) {
          tl.to(
            svgIcons,
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              duration: 0.35,
              stagger: 0.04,
            },
            0.08,
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-section-navy py-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 data-how-title className="text-center text-3xl font-extrabold sm:text-4xl">
          How it works
        </h2>

        <div ref={pillsRef} className="mt-8 flex flex-wrap justify-center gap-2">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              data-step-pill
              onClick={() => {
                setActiveStep(i)
                document
                  .querySelector(`[data-step-block="${i}"]`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition duration-300 ${
                i === activeStep ? 'bg-white text-navy-800 shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {i + 1}. {step.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div ref={stepsRef} className="mt-12 space-y-20">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const reverse = index % 2 === 1
            const isActive = index === activeStep
            return (
              <div
                key={step.id}
                data-step-block={index}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  isActive ? 'opacity-100' : 'opacity-90'
                }`}
              >
                <div className={reverse ? 'lg:order-2' : ''}>
                  <p className="text-sm font-bold uppercase tracking-wider text-gold-400">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-white/85">{step.description}</p>
                  {lastEstimate && index === 0 && (
                    <p className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-sm">
                      Latest brief ready — approx.{' '}
                      <span className="font-bold text-gold-400">
                        ${lastEstimate.sum.toLocaleString()}
                      </span>
                    </p>
                  )}
                  <Button variant="white" className="mt-6" onClick={() => setActiveStep(index)}>
                    Explore this step
                  </Button>
                </div>
                <div className={reverse ? 'lg:order-1' : ''}>
                  {step.demo === 'create' && <CreateDemo lastEstimate={lastEstimate} />}
                  {step.demo === 'refine' && <RefineDemo />}
                  {step.demo === 'publish' && <PublishDemo />}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <a href="#features">
            <Button variant="white">See all features</Button>
          </a>
        </div>
      </div>
    </section>
  )
}

function CreateDemo({ lastEstimate }) {
  const [rows, setRows] = useState(DEMO_ESTIMATES)
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 0
        }
        return p + 3
      })
    }, 180)
    return () => clearInterval(id)
  }, [playing])

  const filtered = rows.filter(
    (r) =>
      r.updatedBy.toLowerCase().includes(query.toLowerCase()) ||
      r.totalCost.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="rounded-2xl bg-white p-4 text-ink shadow-2xl shadow-black/25 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink-muted">
          <AnimatedIcon>
            <Search className="h-4 w-4" />
          </AnimatedIcon>
          <AnimatedIcon>
            <Star className="h-4 w-4" />
          </AnimatedIcon>
          <AnimatedIcon>
            <Folder className="h-4 w-4" />
          </AnimatedIcon>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Work</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search estimations"
            className="field-input h-10 w-full rounded-xl border bg-brand-50/40 pl-9 pr-3 text-sm outline-none ring-brand-400 focus:ring-2"
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            setRows((prev) => [
              {
                updated: new Date().toLocaleDateString('en-GB'),
                updatedBy: 'You',
                totalCost: lastEstimate ? `$${lastEstimate.sum.toLocaleString()}` : '$71,638',
              },
              ...prev,
            ])
          }
        >
          <AnimatedIcon>
            <Plus className="h-4 w-4" />
          </AnimatedIcon>{' '}
          New estimation
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-brand-100">
        <div className="grid grid-cols-3 gap-2 bg-brand-50/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <span>Updated</span>
          <span>Updated by</span>
          <span className="text-right">Total cost</span>
        </div>
        <ul>
          {filtered.map((row, i) => (
            <li
              key={`${row.updated}-${row.updatedBy}-${i}`}
              className="grid grid-cols-3 gap-2 border-t border-brand-50 px-3 py-3 text-sm transition hover:bg-brand-50/50"
            >
              <span>{row.updated}</span>
              <span className="truncate">{row.updatedBy}</span>
              <span className="text-right font-semibold">{row.totalCost}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-navy-900 px-3 py-2 text-white">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="cursor-pointer"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <Play className="h-4 w-4" fill="currentColor" />
        </button>
        <span className="text-xs tabular-nums">
          0:{String(Math.floor((progress / 100) * 28)).padStart(2, '0')} / 0:28
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-brand-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function RefineDemo() {
  const [rows, setRows] = useState(REFINE_ROWS)
  const [chat, setChat] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Ask me to refine hours, roles, or costs.' },
  ])

  const send = () => {
    if (!chat.trim()) return
    const userMsg = chat.trim()
    setMessages((m) => [...m, { role: 'user', text: userMsg }])
    setChat('')
    setTimeout(() => {
      setRows((prev) =>
        prev.map((row, i) => (i === 0 ? { ...row, hours: '200h', cost: '$17,000' } : row)),
      )
      setMessages((m) => [
        ...m,
        { role: 'ai', text: 'Updated Authentication effort to 200h and recalculated cost.' },
      ])
    }, 600)
  }

  return (
    <div className="grid gap-3 rounded-2xl bg-white p-3 text-ink shadow-2xl shadow-black/25 sm:grid-cols-[1fr_0.85fr] sm:p-4">
      <div className="rounded-xl border border-brand-100">
        <div className="flex items-center justify-between border-b border-brand-50 px-3 py-2">
          <span className="text-sm font-bold">Work</span>
          <span className="text-sm font-bold text-brand-600">$107,300</span>
        </div>
        <ul>
          {rows.map((row) => (
            <li
              key={row.name}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 border-t border-brand-50 px-3 py-2.5 text-xs sm:text-sm"
            >
              <span className="truncate font-medium">{row.name}</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                {row.role}
              </span>
              <span className="text-ink-muted">{row.hours}</span>
              <span className="font-semibold">{row.cost}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col rounded-xl border border-brand-100 bg-brand-50/40">
        <div className="flex items-center gap-2 border-b border-brand-100 px-3 py-2 text-sm font-bold">
          <AnimatedIcon>
            <MessageSquare className="h-4 w-4 text-brand-600" />
          </AnimatedIcon>{' '}
          AI-Chat
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-3" style={{ maxHeight: 180 }}>
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`rounded-lg px-2.5 py-2 text-xs ${
                msg.role === 'ai' ? 'bg-white text-ink' : 'ml-4 bg-navy-800 text-white'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-brand-100 p-2">
          <input
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Reduce auth hours…"
            className="field-input h-9 flex-1 rounded-lg border bg-white px-2 text-xs outline-none"
          />
          <button
            type="button"
            onClick={send}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-brand-gradient text-white"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function PublishDemo() {
  const [highlight, setHighlight] = useState('work')
  const work = [
    { label: 'Auth & Access', value: 28400 },
    { label: 'Marketplace', value: 35200 },
    { label: 'Payments', value: 17360 },
  ]
  const roles = [
    { label: 'DevOps', value: 12600 },
    { label: 'QA', value: 9800 },
    { label: 'Frontend', value: 21400 },
  ]
  const items = highlight === 'work' ? work : roles
  const max = Math.max(...items.map((i) => i.value))

  return (
    <div className="rounded-2xl bg-white p-4 text-ink shadow-2xl shadow-black/25 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {['Team', 'Rates', 'Context', 'Dashboard'].map((tab) => (
            <span
              key={tab}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                tab === 'Dashboard' ? 'bg-brand-50 text-brand-700' : 'text-ink-muted'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <span className="rounded-lg bg-navy-800 px-3 py-1.5 text-sm font-bold text-white">
          SUM $80,960
        </span>
      </div>

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setHighlight('work')}
          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
            highlight === 'work' ? 'bg-brand-gradient text-white' : 'bg-brand-50 text-brand-700'
          }`}
        >
          Work
        </button>
        <button
          type="button"
          onClick={() => setHighlight('roles')}
          className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
            highlight === 'roles' ? 'bg-brand-gradient text-white' : 'bg-brand-50 text-brand-700'
          }`}
        >
          Roles
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-ink-muted">{item.label}</span>
              <span className="font-semibold">${item.value.toLocaleString()}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-brand-50">
              <div
                className="h-full rounded-full bg-brand-gradient transition-all duration-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-brand-200 bg-brand-50/50 py-3 text-sm font-semibold text-brand-700">
        <AnimatedIcon>
          <Sparkles className="h-4 w-4 text-gold-500" />
        </AnimatedIcon>
        Ready to share with client
      </div>
    </div>
  )
}

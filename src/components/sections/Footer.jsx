import { Link } from 'react-router-dom'
import { Globe, Mail, Share2 } from 'lucide-react'
import { FOOTER_COLUMNS } from '../../data/content'
import { useStaggerIn } from '../../hooks/useGsap'
import Logo from '../ui/Logo'

export default function Footer() {
  const gridRef = useStaggerIn('[data-stagger]', { stagger: 0.12, y: 28, x: 16, start: 'top 95%' })

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div ref={gridRef} className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div data-stagger>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Client-ready project estimates for software teams that need clarity on cost, timeline, and risk.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} data-stagger>
              <h4 className="text-sm font-bold uppercase tracking-wide text-gold-400">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="text-sm text-white/70 transition hover:text-white">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-white/70 transition hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} EstimMate. All rights reserved.</p>
          <p>Built for teams who estimate with confidence.</p>
        </div>
      </div>
    </footer>
  )
}

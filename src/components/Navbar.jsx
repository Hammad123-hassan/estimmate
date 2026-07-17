import { useEffect, useState } from 'react'
import { ArrowRight, Menu, User, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import Logo from './ui/Logo'
import Button from './ui/Button'
import AnimatedButton from './ui/AnimatedButton'

export default function Navbar({ variant = 'light' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isDark = variant === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled || isDark
            ? isDark
              ? 'border border-white/15 bg-white/10 shadow-lg backdrop-blur-xl'
              : 'border border-brand-100/80 bg-white/90 shadow-lg shadow-brand-500/10 backdrop-blur-xl'
            : 'border border-transparent bg-white/40 backdrop-blur-md'
        }`}
      >
        <Logo light={isDark && !scrolled ? false : isDark} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-white/85 hover:bg-white/10 hover:text-white'
                    : 'text-ink-muted hover:bg-brand-50 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 sm:flex">
          <AnimatedButton>
            <Button to="/login" variant={isDark ? 'outlineLight' : 'outline'} size="sm">
              <User className="h-4 w-4" />
              Login
            </Button>
          </AnimatedButton>
          <AnimatedButton>
            <Button to="/signup" variant="primary" size="sm">
              Join now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </AnimatedButton>
        </div>

        <button
          type="button"
          className={`cursor-pointer rounded-lg p-2 lg:hidden ${isDark ? 'text-white' : 'text-ink'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-4 top-20 w-[min(100%-2rem,20rem)] rounded-2xl border border-brand-100 bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-50"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-brand-100 pt-4">
              <Button to="/login" variant="outline" className="w-full" onClick={() => setOpen(false)}>
                <User className="h-4 w-4" />
                Login
              </Button>
              <Button to="/signup" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                Join now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

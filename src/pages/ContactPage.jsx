import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Send, X } from 'lucide-react'
import { Field } from '../components/auth/FormFields'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'
import AnimatedButton from '../components/ui/AnimatedButton'
import { usePopIn } from '../hooks/useGsap'

export default function ContactPage() {
  const navigate = useNavigate()
  const cardRef = usePopIn()
  const [email, setEmail] = useState('email@gmail.com')
  const [message, setMessage] = useState('I need custom subscription type')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    const next = {}
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email'
    if (!message.trim() || message.trim().length < 8) next.message = 'Please add a bit more detail'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-hero-glow px-4 py-20 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-navy-900/25" />
      <div className="absolute left-3 top-3 z-10 sm:left-6 sm:top-6">
        <Logo />
      </div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white sm:right-6 sm:top-6"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div ref={cardRef} className="relative mt-6 w-full max-w-md sm:mt-0">
        <div className="absolute left-1/2 top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-50 shadow-md ring-4 ring-white sm:h-16 sm:w-16">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-500/30 sm:h-10 sm:w-10">
            <Send className="h-5 w-5" />
          </span>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white px-5 pb-6 pt-11 shadow-2xl shadow-navy-900/15 sm:rounded-[28px] sm:px-8 sm:pb-7 sm:pt-12">
          {sent ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-brand-500" />
              <h1 className="mt-4 text-2xl font-extrabold text-ink">Request sent</h1>
              <p className="mt-2 text-sm text-ink-muted">
                Thanks! We’ll get back to you at <span className="font-semibold text-ink">{email}</span>.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="primary" onClick={() => navigate('/')}>
                  Back to home
                </Button>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">Contact us</h1>
              <p className="mt-2 text-center text-sm text-ink-muted">
                Tell us about custom plans, workflows, or integrations.
              </p>

              <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
                <Field
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  autoComplete="email"
                  error={errors.email}
                />

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink-muted">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I need custom subscription type"
                    className={`field-textarea w-full resize-none rounded-xl border bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:ring-2 ${
                      errors.message ? 'field-error focus:ring-rose-200' : 'focus:ring-brand-200'
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
                </div>

                <AnimatedButton className="w-full">
                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? 'Sending…' : 'Send request'}
                  </Button>
                </AnimatedButton>
              </form>

              <p className="mt-5 text-center text-sm text-ink-muted">
                Prefer to start free?{' '}
                <Link to="/signup" className="cursor-pointer font-semibold text-brand-600 hover:text-brand-700">
                  Sign up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

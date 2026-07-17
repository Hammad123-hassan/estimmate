import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthMarketing from '../components/auth/AuthMarketing'
import GoogleButton from '../components/auth/GoogleButton'
import { Field, OrDivider, PasswordField } from '../components/auth/FormFields'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'

export default function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const validate = () => {
    const next = {}
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email'
    if (!password || password.length < 6) next.password = 'Password must be at least 6 characters'
    if (repeat !== password) next.repeat = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setToast('Account created')
    setTimeout(() => navigate('/login'), 800)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.42fr)_1fr]">
      <section className="flex flex-col bg-hero-glow px-4 py-6 sm:px-10 sm:py-8">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 sm:py-10">
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-xl shadow-navy-900/5 sm:rounded-[28px] sm:p-8">
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Create account</h1>
            <p className="mt-2 text-sm text-ink-muted">Start building structured estimates in minutes.</p>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
              <Field
                id="signup-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                autoComplete="email"
                error={errors.email}
              />
              <PasswordField
                id="signup-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                error={errors.password}
              />
              <PasswordField
                id="signup-repeat"
                label="Repeat password"
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                placeholder="Repeat password"
                autoComplete="new-password"
                error={errors.repeat}
              />

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Sign up'}
              </Button>
            </form>

            <OrDivider />
            <GoogleButton
              label="Continue with Google"
              onClick={() => {
                setToast('Google signup demo')
                setTimeout(() => navigate('/'), 700)
              }}
            />
          </div>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Log in
            </Link>
          </p>
          {toast && (
            <p className="mt-4 rounded-xl bg-brand-50 px-3 py-2 text-center text-sm font-medium text-brand-700">
              {toast}
            </p>
          )}
        </div>
      </section>
      <AuthMarketing />
    </div>
  )
}

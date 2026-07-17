import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthMarketing from '../components/auth/AuthMarketing'
import GoogleButton from '../components/auth/GoogleButton'
import { Field, OrDivider, PasswordField } from '../components/auth/FormFields'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const validate = () => {
    const next = {}
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email'
    if (!password || password.length < 6) next.password = 'Password must be at least 6 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setToast('Logged in successfully')
    setTimeout(() => navigate('/'), 700)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.42fr)_1fr]">
      <section className="flex flex-col bg-hero-glow px-4 py-6 sm:px-10 sm:py-8">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 sm:py-10">
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-xl shadow-navy-900/5 sm:rounded-[28px] sm:p-8">
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm text-ink-muted">Log in to continue building client-ready estimates.</p>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
              <Field
                id="login-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                autoComplete="email"
                error={errors.email}
              />
              <div>
                <PasswordField
                  id="login-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <div className="mt-2 text-right">
                  <button type="button" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Logging in…' : 'Log in'}
              </Button>
            </form>

            <OrDivider />
            <GoogleButton
              onClick={() => {
                setToast('Google sign-in demo')
                setTimeout(() => navigate('/'), 700)
              }}
            />
          </div>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign up
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

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function inputClass(error) {
  return [
    'field-input',
    'h-11 w-full rounded-xl bg-white px-3.5 text-sm text-ink outline-none transition',
    error ? 'field-error field-ring-error' : 'field-ring',
  ].join(' ')
}

export function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass(error)}
      />
      {error ? <p className="mt-1 text-xs text-rose-500">{error}</p> : null}
    </div>
  )
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter password',
  autoComplete = 'current-password',
  error,
}) {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${inputClass(error)} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-ink-muted hover:text-ink"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="mt-1 text-xs text-rose-500">{error}</p> : null}
    </div>
  )
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="field-divider h-px flex-1" />
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">or</span>
      <span className="field-divider h-px flex-1" />
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  to,
  ...props
}) {
  const base =
    'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none'

  const sizes = {
    sm: 'h-9 px-4 text-sm rounded-full',
    md: 'h-11 px-5 text-sm rounded-full',
    lg: 'h-12 px-6 text-base rounded-full',
  }

  const variants = {
    primary:
      'bg-brand-gradient text-white shadow-md shadow-brand-500/25 hover:brightness-110 hover:shadow-lg hover:shadow-brand-500/30',
    outline:
      'border border-brand-300 bg-white/80 text-brand-700 hover:bg-brand-50',
    outlineLight:
      'border border-white/70 bg-white/10 text-white hover:bg-white/20',
    ghost: 'text-ink-muted hover:text-ink hover:bg-brand-50',
    soft: 'bg-brand-100 text-brand-700 hover:bg-brand-200',
    white: 'bg-white text-brand-600 hover:bg-brand-50 shadow-sm',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

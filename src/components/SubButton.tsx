interface SubButtonProps {
  label: string
  variant?: 'main' | 'sub' | 'primary-sub'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const variantStyles = {
  main: {
    base: 'bg-secondary-500 text-primary-50',
    hover: 'hover:bg-secondary-400',
    disabled: 'bg-secondary-500 text-primary-50 opacity-40',
  },
  sub: {
    base: 'bg-secondary-100 text-secondary-500',
    hover: 'hover:bg-secondary-200',
    disabled: 'bg-gray-100 text-gray-400',
  },
  'primary-sub': {
    base: 'bg-primary-100 text-primary-500',
    hover: 'hover:bg-primary-200',
    disabled: 'bg-gray-100 text-gray-400',
  },
}

export default function SubButton({
  label,
  variant = 'main',
  disabled = false,
  onClick,
  className,
}: SubButtonProps) {
  const styles = variantStyles[variant]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-15 w-42.5 items-center justify-center rounded-xl px-11.75 typography-body1-semibold transition-colors ${
        disabled
          ? `${styles.disabled} cursor-not-allowed`
          : `${styles.base} ${styles.hover} cursor-pointer`
      } ${className ?? ''}`}
    >
      {label}
    </button>
  )
}

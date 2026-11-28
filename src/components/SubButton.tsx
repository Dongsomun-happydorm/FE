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
    hover: 'hover:bg-secondary-600',
    disabled: 'bg-gray-100 text-gray-400',
  },
  sub: {
    base: 'bg-secondary-100 text-secondary-500',
    hover: 'hover:bg-secondary-200',
    disabled: 'bg-secondary-100 text-secondary-500 opacity-40',
  },
  'primary-sub': {
    base: 'bg-primary-100 text-primary-500',
    hover: 'hover:bg-primary-200',
    disabled: 'bg-primary-100 text-primary-500 opacity-40',
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
      className={`flex w-[170px] items-center justify-center rounded-xl px-[47px] py-[19px] typography-body1-semibold transition-colors ${
        disabled
          ? `${styles.disabled} cursor-not-allowed`
          : `${styles.base} ${styles.hover} cursor-pointer`
      } ${className ?? ''}`}
    >
      {label}
    </button>
  )
}

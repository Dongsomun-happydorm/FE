interface StatusChipProps {
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function StatusChip({ label, variant = 'primary', className }: StatusChipProps) {
  const colorClass =
    variant === 'primary'
      ? 'bg-primary-100 text-primary-500'
      : 'bg-secondary-100 text-secondary-500'

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[40px] px-1.5 py-0.5 text-[12px] font-medium whitespace-nowrap ${colorClass} ${className ?? ''}`}
    >
      {label}
    </span>
  )
}

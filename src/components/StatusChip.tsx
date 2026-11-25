interface StatusChipProps {
  status: 'sharing' | 'completed'
  className?: string
}

const statusConfig = {
  sharing: {
    label: '나눔중',
    className: 'bg-primary-100 text-primary-500',
  },
  completed: {
    label: '나눔완료',
    className: 'bg-secondary-100 text-secondary-500',
  },
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const { label, className: statusClass } = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[40px] px-1.5 py-0.5 typography-caption font-semibold ${statusClass} ${className ?? ''}`}
    >
      {label}
    </span>
  )
}

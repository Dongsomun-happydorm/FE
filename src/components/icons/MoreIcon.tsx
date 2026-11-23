import defaultIcon from '@/assets/icons/icon-more-default.svg'
import hoverIcon from '@/assets/icons/icon-more-hover.svg'

interface MoreIconProps {
  className?: string
  variant?: 'default' | 'hover'
}

export default function MoreIcon({ className, variant = 'default' }: MoreIconProps) {
  return (
    <img
      src={variant === 'hover' ? hoverIcon : defaultIcon}
      alt="더보기"
      className={className ?? 'size-[22px]'}
    />
  )
}

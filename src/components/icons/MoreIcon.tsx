import defaultIcon from '@/assets/icons/icon-more-default.svg'
import hoverIcon from '@/assets/icons/icon-more-hover.svg'

interface MoreIconProps {
  className?: string
}

export default function MoreIcon({ className }: MoreIconProps) {
  return (
    <div className={`group relative ${className ?? 'size-[22px]'}`}>
      <img src={defaultIcon} alt="더보기" className="size-full group-hover:hidden" />
      <img src={hoverIcon} alt="더보기" className="hidden size-full group-hover:block" />
    </div>
  )
}

import { useEffect, useState } from 'react'
import placeholder from '@/assets/mypage/item-placeholder.png'

export type ItemStatus = 'sharing' | 'completed' | 'reserved' | 'closed'

export interface ItemListProps {
  name: string
  status: ItemStatus
  quantity: number
  unit?: string
  location?: string
  image?: string | Blob
  isOwner?: boolean
  bg?: string
}

const STATUS = {
  sharing: {
    label: '내가 나눔중',
    badge: 'bg-primary-100 text-primary-500',
    quantity: 'text-primary-500',
    background: 'bg-gray-white',
  },
  completed: {
    label: '나눔 완료',
    badge: 'bg-secondary-100 text-secondary-500',
    quantity: 'text-gray-600',
    background: 'bg-gray-100/40',
  },
  reserved: {
    label: '예약 완료',
    badge: 'bg-secondary-100 text-secondary-500',
    quantity: 'text-gray-600',
    background: 'bg-gray-white',
  },
  closed: {
    label: '예약 마감',
    badge: 'bg-secondary-100 text-secondary-500',
    quantity: 'text-gray-600',
    background: 'bg-gray-white',
  },
}

export default function ItemList({
  name,
  status,
  quantity,
  unit = '개',
  location,
  image,
  isOwner = true,
  bg,
}: ItemListProps) {
  const currentStatus = STATUS[status]
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (!(image instanceof Blob)) return
    const url = URL.createObjectURL(image)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  return (
    <li
      className={`flex min-h-[85px] items-center gap-2 rounded-xl px-4 ${bg ?? currentStatus.background}`}
    >
      {/* 물품 이미지 */}
      <img
        src={(typeof image === 'string' ? image : preview) || placeholder}
        alt={name}
        className="size-[53px] shrink-0 rounded-[9.217px] object-cover"
      />

      {/* 물품 정보 */}
      <div className="flex flex-col gap-[3px]">
        {/* 물품명 및 상태 */}
        <div className="flex flex-wrap items-center gap-x-2">
          <p className="typography-body2-semibold text-[#303237]">{name}</p>

          <span
            className={`text-caption rounded-full px-1.5 py-0.5 font-semibold whitespace-nowrap ${currentStatus.badge}`}
          >
            {status === 'sharing' && !isOwner ? '나눔중' : currentStatus.label}
          </span>
        </div>

        {/* 수량 및 위치 */}
        <div className="flex items-baseline gap-1">
          <p
            className={`typography-body2-semibold min-w-7 whitespace-nowrap ${currentStatus.quantity}`}
          >
            {quantity}
            {unit}
          </p>

          {location?.trim() && <p className="text-sm leading-6 text-gray-600">{location}</p>}
        </div>
      </div>
    </li>
  )
}

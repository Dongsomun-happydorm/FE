import { useEffect, useState } from 'react'
import placeholder from '@/assets/list/item-placeholder.png'
import StatusChip from '@/components/StatusChip'

export type ItemStatus = 'sharing' | 'completed' | 'reserved' | 'closed'

export interface ItemListProps {
  name: string
  status: ItemStatus
  quantity: number
  unit?: string
  location?: string
  image?: string | Blob
  isOwner?: boolean
  isReserver?: boolean
  bg?: string
}

function getChipConfig(
  status: ItemStatus,
  isOwner: boolean,
  isReserver: boolean
): { label: string; variant: 'primary' | 'secondary' } {
  if (status === 'sharing') {
    return { label: isOwner ? '내가 나눔중' : '나눔중', variant: 'primary' }
  }
  if (status === 'reserved') {
    if (isOwner) return { label: '예약 완료', variant: 'secondary' }
    if (isReserver) return { label: '예약중', variant: 'secondary' }
    return { label: '예약 마감', variant: 'secondary' }
  }
  if (status === 'completed') {
    if (isOwner) return { label: '나눔 완료', variant: 'secondary' }
    if (isReserver) return { label: '수령 완료', variant: 'secondary' }
    return { label: '나눔 마감', variant: 'secondary' }
  }
  // closed
  return { label: '나눔 마감', variant: 'secondary' }
}

const quantityColor: Record<ItemStatus, string> = {
  sharing: 'text-primary-500',
  completed: 'text-gray-600',
  reserved: 'text-gray-600',
  closed: 'text-gray-600',
}

const backgroundColor: Record<ItemStatus, string> = {
  sharing: 'bg-gray-white',
  completed: 'bg-gray-100/40',
  reserved: 'bg-gray-white',
  closed: 'bg-gray-white',
}

export default function ItemList({
  name,
  status,
  quantity,
  unit = '개',
  location,
  image,
  isOwner = false,
  isReserver = false,
  bg,
}: ItemListProps) {
  const chip = getChipConfig(status, isOwner, isReserver)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (!(image instanceof Blob)) return
    const url = URL.createObjectURL(image)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  return (
    <li
      className={`flex min-h-[85px] items-center gap-2 rounded-xl px-4 ${bg ?? backgroundColor[status]}`}
    >
      <img
        src={(typeof image === 'string' ? image : preview) || placeholder}
        alt={name}
        className="size-[53px] shrink-0 rounded-[9.217px] object-cover"
      />

      <div className="flex flex-col gap-[3px]">
        <div className="flex flex-wrap items-center gap-x-2">
          <p className="typography-body2-semibold text-[#303237]">{name}</p>
          <StatusChip label={chip.label} variant={chip.variant} />
        </div>

        <div className="flex items-baseline gap-1">
          <p className={`typography-body2-semibold min-w-7 whitespace-nowrap ${quantityColor[status]}`}>
            {quantity}{unit}
          </p>
          {location?.trim() && <p className="text-sm leading-6 text-gray-600">{location}</p>}
        </div>
      </div>
    </li>
  )
}

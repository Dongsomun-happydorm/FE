import LocationPinIcon from '@/components/icons/LocationPinIcon'

interface SharingStatusCardsProps {
  sharingCount: number
  completedCount: number
}

export default function SharingStatusCards({
  sharingCount,
  completedCount,
}: SharingStatusCardsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 gap-3">
      <div className="flex flex-1 items-center gap-1 overflow-hidden rounded-lg bg-gray-50 p-4">
        <LocationPinIcon variant="primary" className="size-[18px] shrink-0" />
        <span className="typography-body2-semibold text-primary-500 whitespace-nowrap">
          나눔중 물품
        </span>
        <span className="typography-body2-semibold text-primary-500 whitespace-nowrap">
          {sharingCount}건
        </span>
      </div>
      <div className="flex flex-1 items-center gap-1 overflow-hidden rounded-lg bg-gray-50 p-4">
        <LocationPinIcon variant="secondary" className="size-[18px] shrink-0" />
        <span className="typography-body2-semibold text-secondary-500 whitespace-nowrap">
          나눔 완료 물품
        </span>
        <span className="typography-body2-semibold text-secondary-500 whitespace-nowrap">
          {completedCount}건
        </span>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import floorMapImage from '@/assets/map/floor-map.png'
import LocationPinIcon from '@/components/icons/LocationPinIcon'
import StatusChip from '@/components/StatusChip'
import ItemList from '@/components/ItemList'
import SubButton from '@/components/SubButton'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

export interface LocationPin {
  id: string
  x: number
  y: number
  type: 'sharing' | 'completed'
  name: string
  quantity: number
  unit: string
  location?: string
  image?: string | Blob
  isOwner: boolean
}

type ReservationState = 'sharing' | 'reserved' | 'completed'

interface FloorMapProps {
  pins?: LocationPin[]
  onPinSelect?: (id: string | null) => void
  onRemovePin?: (id: string) => void
}

const LOUNGE_ZONE = { left: 52, top: 24, width: 20, height: 34 }

const defaultPins: LocationPin[] = [
  { id: '1', x: 50, y: 30, type: 'sharing', name: '물품1', quantity: 1, unit: '개', isOwner: false },
  { id: '2', x: 25, y: 50, type: 'sharing', name: '물품2', quantity: 2, unit: '개', isOwner: true },
  { id: '3', x: 75, y: 50, type: 'completed', name: '물품3', quantity: 1, unit: '개', isOwner: false },
]

function getChipConfig(type: 'sharing' | 'completed', isOwner: boolean) {
  if (type === 'sharing') return { label: isOwner ? '내가 나눔중' : '나눔중', variant: 'primary' as const }
  return { label: isOwner ? '나눔 완료' : '나눔 마감', variant: 'secondary' as const }
}

function getChipForReservation(rState: ReservationState, pin: LocationPin) {
  if (pin.isOwner) return getChipConfig(pin.type, true)
  if (rState === 'sharing') return { label: '나눔중', variant: 'primary' as const }
  if (rState === 'reserved') return { label: '예약중', variant: 'secondary' as const }
  return { label: '수령 완료', variant: 'secondary' as const }
}

export default function FloorMap({ pins = defaultPins, onPinSelect, onRemovePin }: FloorMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [lockedId, setLockedId] = useState<string | null>(null)
  const [reservations, setReservations] = useState<Record<string, ReservationState>>({})
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const selectedId = lockedId ?? hoveredId
  const selectedPin = pins.find((p) => p.id === selectedId) ?? null

  useEffect(() => {
    onPinSelect?.(selectedId)
  }, [selectedId])

  function lock(id: string | null) {
    setLockedId(id)
  }

  function reserve(id: string) {
    setReservations((prev) => ({ ...prev, [id]: 'reserved' }))
  }

  function complete(id: string) {
    setReservations((prev) => ({ ...prev, [id]: 'completed' }))
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: '1097 / 634' }} onClick={() => lock(null)}>
      <img
        src={floorMapImage}
        alt="층 평면도"
        className="absolute inset-0 h-full w-full object-fill"
      />

      {/* 휴게실 영역 오버레이 — 핀은 이 영역 기준 좌표 */}
      <div
        className="absolute z-10"
        style={{
          left: `${LOUNGE_ZONE.left}%`,
          top: `${LOUNGE_ZONE.top}%`,
          width: `${LOUNGE_ZONE.width}%`,
          height: `${LOUNGE_ZONE.height}%`,
        }}
      >
        {pins.map((pin) => {
          const isSelected = pin.id === selectedId
          const rState = reservations[pin.id] ?? (pin.type === 'sharing' ? 'sharing' : 'completed')
          const chip = getChipForReservation(rState as ReservationState, pin)
          return (
            <div
              key={pin.id}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setHoveredId(pin.id)
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setHoveredId(null)
              }}
              onClick={(e) => {
                e.stopPropagation()
                lock(lockedId === pin.id ? null : pin.id)
              }}
            >
              <div
                className={`relative transition-transform duration-200 ${isSelected ? '-translate-y-2.5' : ''}`}
              >
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 mb-3.5 -translate-x-1/2 whitespace-nowrap">
                    <StatusChip label={chip.label} variant={chip.variant} />
                  </div>
                )}
                <LocationPinIcon variant={pin.type === 'sharing' ? 'primary' : 'secondary'} />
              </div>
            </div>
          )
        })}
      </div>

      {/* 선택된 핀 아래 ItemList 카드 */}
      {selectedPin && (() => {
        const rState: ReservationState = reservations[selectedPin.id] ?? 'sharing'
        return (
          <div
            className="absolute z-30 w-full px-4"
            style={{
              top: `calc(${LOUNGE_ZONE.top + (selectedPin.y / 100) * LOUNGE_ZONE.height}% + 10px)`,
            }}
          >
            <ul className="w-full overflow-hidden rounded-xl shadow-2">
              <ItemList
                name={selectedPin.name}
                status={rState === 'sharing' ? 'sharing' : rState === 'reserved' ? 'reserved' : 'completed'}
                quantity={selectedPin.quantity}
                unit={selectedPin.unit}
                location={selectedPin.location}
                image={selectedPin.image}
                isOwner={selectedPin.isOwner}
                isReserver={rState !== 'sharing'}
                onClose={() => setPendingDeleteId(selectedPin.id)}
              />
            </ul>
            {selectedPin.type === 'sharing' && !selectedPin.isOwner && (
              <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <SubButton
                  label="예약하기"
                  variant="main"
                  className="flex-1"
                  disabled={rState !== 'sharing'}
                  onClick={() => reserve(selectedPin.id)}
                />
                <SubButton
                  label="수령완료"
                  variant="sub"
                  className="flex-1"
                  disabled={rState !== 'reserved'}
                  onClick={() => complete(selectedPin.id)}
                />
              </div>
            )}
          </div>
        )
      })()}
      {pendingDeleteId && (
        <ConfirmDeleteModal
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={() => {
            onRemovePin?.(pendingDeleteId)
            setPendingDeleteId(null)
            lock(null)
          }}
        />
      )}
    </div>
  )
}

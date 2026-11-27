import floorMapImage from '@/assets/map/floor-map.png'
import LocationPinIcon from '@/components/icons/LocationPinIcon'

interface LocationPin {
  id: string
  x: number
  y: number
  type: 'sharing' | 'completed'
}

interface FloorMapProps {
  pins?: LocationPin[]
}

// 전체 이미지 대비 휴게실 영역 비율 (시각적으로 확인 후 미세 조정 필요)
const LOUNGE_ZONE = { left: 52, top: 24, width: 20, height: 34 }

// pin x, y는 휴게실 영역 내 0~100% 기준
const defaultPins: LocationPin[] = [
  { id: '1', x: 50, y: 30, type: 'sharing' },
  { id: '2', x: 25, y: 50, type: 'sharing' },
  { id: '3', x: 75, y: 50, type: 'completed' },
]

export default function FloorMap({ pins = defaultPins }: FloorMapProps) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '1097 / 634' }}>
      <img
        src={floorMapImage}
        alt="층 평면도"
        className="absolute inset-0 h-full w-full object-fill"
      />

      {/* 휴게실 영역 오버레이 — 핀은 이 영역 기준 좌표 */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${LOUNGE_ZONE.left}%`,
          top: `${LOUNGE_ZONE.top}%`,
          width: `${LOUNGE_ZONE.width}%`,
          height: `${LOUNGE_ZONE.height}%`,
        }}
      >
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute -translate-x-1/2 -translate-y-full drop-shadow-md"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <LocationPinIcon variant={pin.type === 'sharing' ? 'primary' : 'secondary'} />
          </div>
        ))}
      </div>
    </div>
  )
}

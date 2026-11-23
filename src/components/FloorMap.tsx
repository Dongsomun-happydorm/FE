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

const defaultPins: LocationPin[] = [
  { id: '1', x: 52, y: 44, type: 'sharing' },
  { id: '2', x: 44, y: 58, type: 'sharing' },
  { id: '3', x: 60, y: 58, type: 'completed' },
]

export default function FloorMap({ pins = defaultPins }: FloorMapProps) {
  return (
    <div className="relative h-full w-full">
      {/* <img
        src={floorMapImage}
        alt="층 평면도"
        className="absolute inset-0 h-full w-full object-contain"
      />

      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute -translate-x-1/2 -translate-y-full drop-shadow-md"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <LocationPinIcon variant={pin.type === 'sharing' ? 'primary' : 'secondary'} />
        </div>
      ))} */}
    </div>
  )
}

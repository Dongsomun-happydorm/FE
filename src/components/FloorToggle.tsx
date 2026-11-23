interface FloorToggleProps {
  floors: number[]
  activeFloor: number
  onFloorChange: (floor: number) => void
}

export default function FloorToggle({ floors, activeFloor, onFloorChange }: FloorToggleProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto px-4 py-3 scrollbar-none">
      {floors.map((floor) => {
        const isActive = floor === activeFloor
        return (
          <button
            key={floor}
            onClick={() => onFloorChange(floor)}
            className={`flex h-[30px] shrink-0 items-center justify-center rounded-full px-3 typography-body2-regular transition-colors ${
              isActive
                ? 'bg-primary-500 text-gray-50 font-medium'
                : 'border-[0.5px] border-gray-100 bg-gray-50 text-gray-600 hover:border-primary-500 hover:text-primary-500'
            }`}
          >
            {floor}F
          </button>
        )
      })}
    </div>
  )
}

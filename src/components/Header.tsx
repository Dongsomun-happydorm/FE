import { Link } from 'react-router-dom'
import LocationPinIcon from '@/components/icons/LocationPinIcon'
import profileIcon from '@/assets/icons/icon-profile.svg'
import ZoneDropdown from '@/components/ZoneDropdown'
import { BUILDING_NAME, ZONE_OPTIONS } from '@/constants/building'
import { useBuildingStore } from '@/stores/buildingStore'

export default function Header() {
  const { selectedZone, activeFloor, setZone } = useBuildingStore()

  return (
    <div className="flex h-13.5 items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <Link to="/" aria-label="나눔 지도" className="cursor-pointer">
          <LocationPinIcon />
        </Link>
        <div className="flex items-center gap-1">
          <span className="typography-body1-semibold text-gray-900 whitespace-nowrap">
            {BUILDING_NAME} {selectedZone} {activeFloor}
          </span>
          <ZoneDropdown
            options={[...ZONE_OPTIONS]}
            value={selectedZone}
            onChange={setZone}
            showLabel={false}
          />
        </div>
      </div>
      <Link
        to="/mypage"
        aria-label="마이페이지"
        className="flex size-7 items-center justify-center rounded-full bg-gray-100"
      >
        <img src={profileIcon} alt="" className="size-5.25" />
      </Link>
    </div>
  )
}

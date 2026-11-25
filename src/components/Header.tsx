import LocationPinIcon from './icons/LocationPinIcon'
import profileIcon from '@/assets/icons/icon-profile.svg'
import MoreIcon from '@/components/icons/MoreIcon'

interface HeaderProps {
  building: string
  floor: number
}

export default function Header({ building, floor }: HeaderProps) {
  return (
    <div className="flex h-[54px] items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <LocationPinIcon/>
        <div className="flex items-center gap-1">
          <span className="typography-body1-semibold text-gray-900 whitespace-nowrap">
            {building} {floor}층
          </span>
          <MoreIcon />
        </div>
      </div>
      <div className="flex size-7 items-center justify-center rounded-full bg-gray-100">
        <img src={profileIcon} alt="프로필" className="size-[21px]" />
      </div>
    </div>
  )
}

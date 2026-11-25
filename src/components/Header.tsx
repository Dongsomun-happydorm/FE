import { Link } from 'react-router-dom'
import locationIcon from '@/assets/icons/icon-location-primary.svg'
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
        <img src={locationIcon} alt="location" className="size-6" />
        <div className="flex items-center gap-1">
          <span className="typography-body1-semibold text-gray-900 whitespace-nowrap">
            {building} {floor}층
          </span>
          <MoreIcon />
        </div>
      </div>
      <Link
        to="/mypage"
        aria-label="마이페이지"
        className="flex size-7 items-center justify-center rounded-full bg-gray-100"
      >
        <img src={profileIcon} alt="" className="size-[21px]" />
      </Link>
    </div>
  )
}

import profileIcon from '@/assets/icons/icon-profile.svg'

import MoreIcon from '@/components/icons/MoreIcon'
import ItemList from '@/components/ItemList'
import { useSharing } from '@/data/SharingProvider'
import { CURRENT_USER_ID, newestFirst } from '@/data/sharingItems'

// 사용자 정보 Mock Data
const USER = {
  name: '홍길동',
  room: 'B0401-B',
  email: 'abc@gmail.com',
}

const RESERVED_ITEM_IDS = ['basket', 'paper', 'reserved-paper']

interface MypageProps {
  onBack?: () => void
}

export default function Mypage({ onBack = () => window.history.back() }: MypageProps) {
  const { items } = useSharing()
  const sections = [
    {
      id: 'my-shares',
      title: '내 나눔',
      items: newestFirst(items.filter((item) => item.ownerId === CURRENT_USER_ID)),
    },
    {
      id: 'my-reservations',
      title: '내 예약',
      items: items.filter((item) => RESERVED_ITEM_IDS.includes(item.id)),
    },
  ]

  return (
    <div className="bg-gray-white flex h-dvh w-full flex-col">
      {/* 마이페이지 헤더 */}
      <header className="bg-gray-white relative flex h-[60px] shrink-0 items-center justify-center">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onBack}
          className="absolute left-1 flex size-[46px] cursor-pointer items-center justify-center"
        >
          <span aria-hidden="true">
            <MoreIcon className="size-[22px] rotate-90" />
          </span>
        </button>

        <h1 className="typography-body1-semibold text-gray-900">마이페이지</h1>
      </header>

      {/* 마이페이지 본문 */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        {/* 사용자 프로필 */}
        <div className="flex h-[70px] items-center gap-4 px-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <img src={profileIcon} alt="" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="typography-body2-semibold text-gray-900">{USER.name}</p>

              <p className="typography-body2-medium text-primary-500">{USER.room}</p>
            </div>

            <p className="typography-caption text-[#8b97a7]">{USER.email}</p>
          </div>
        </div>

        {/* 내 나눔 및 내 예약 */}
        {sections.map(({ id, title, items }) => (
          <section key={id} aria-labelledby={id}>
            {/* 섹션 구분선 */}
            <div aria-hidden="true" className="h-2 bg-gray-100/80" />

            {/* 섹션 제목 */}
            <h2 id={id} className="typography-body2-semibold text-gray-black px-4 py-4">
              {title}
            </h2>

            {/* 물품 리스트 컴포넌트 */}
            <ul>
              {items.map((item) => (
                <ItemList
                  key={item.id}
                  name={item.name}
                  status={item.id === 'reserved-paper' ? 'reserved' : item.status}
                  quantity={item.quantity}
                  location={item.location}
                  image={item.images[0]}
                  unit={item.unit}
                  isOwner={item.ownerId === CURRENT_USER_ID}
                />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}

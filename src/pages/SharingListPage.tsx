import { useNavigate } from 'react-router-dom'
import FloorToggle from '@/components/FloorToggle'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import ItemList from '@/components/ItemList'
import { useSharing } from '@/data/SharingProvider'
import { CURRENT_USER_ID, FLOORS, TABS, itemsForToday } from '@/data/sharingItems'

export default function SharingListPage() {
  const navigate = useNavigate()
  const { building, floor, setFloor, items } = useSharing()
  const visibleItems = itemsForToday(items, building, floor)

  return (
    <div className="bg-gray-white flex h-dvh w-full flex-col">
      <div className="shrink-0">
        <Header building={`동소문행복기숙사 ${building}`} floor={floor} />
        <TabBar
          tabs={TABS}
          activeTab="list"
          onTabChange={(tab) => {
            if (tab === 'map') navigate('/')
          }}
        />
        <div className="pt-3">
          <FloorToggle floors={FLOORS} activeFloor={floor} onFloorChange={setFloor} />
        </div>
      </div>
      <main className="min-h-0 flex-1 overflow-y-auto">
        <p className="typography-caption px-4 pt-1 pb-2 text-gray-500">
          오늘 하루동안 기숙사 휴게실에서 오간 나눔을 한눈에 확인해 보세요
        </p>
        {visibleItems.length ? (
          <ul aria-label={`${floor}층 나눔 물품`}>
            {visibleItems.map((item) => (
              <ItemList
                key={item.id}
                name={item.name}
                status={item.status}
                quantity={item.quantity}
                unit={item.unit}
                location={item.location}
                image={item.images[0]}
                isOwner={item.ownerId === CURRENT_USER_ID}
                bg="bg-gray-white"
              />
            ))}
          </ul>
        ) : (
          <p className="typography-body2-regular px-4 py-10 text-center text-gray-600">
            아직 해당 층에 등록된 나눔 물품이 없어요.
          </p>
        )}
      </main>
    </div>
  )
}

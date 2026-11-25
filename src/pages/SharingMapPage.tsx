import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import FloorToggle from '@/components/FloorToggle'
import FloorMap from '@/components/FloorMap'
import FloatingButton from '@/components/FloatingButton'
import SharingStatusCards from '@/components/SharingStatusCards'

import { useSharing } from '@/data/SharingProvider'
import { FLOORS, TABS, itemsForToday } from '@/data/sharingItems'

export default function SharingMapPage() {
  const navigate = useNavigate()
  const { building, floor, setFloor, items } = useSharing()
  const floorItems = itemsForToday(items, building, floor)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white">
      <Header building={`동소문행복기숙사 ${building}`} floor={floor} />

      <TabBar
        tabs={TABS}
        activeTab="map"
        onTabChange={(tab) => {
          if (tab === 'list') navigate('/list')
        }}
      />

      <FloorToggle floors={FLOORS} activeFloor={floor} onFloorChange={setFloor} />

      {/* 지도 영역 */}
      <div className="relative flex-1 overflow-hidden">
        <FloorMap />

        <FloatingButton label="나눔 등록" onClick={() => navigate('/register')} />

        <SharingStatusCards
          sharingCount={floorItems.filter((item) => item.status === 'sharing').length}
          completedCount={floorItems.filter((item) => item.status === 'completed').length}
        />
      </div>
    </div>
  )
}

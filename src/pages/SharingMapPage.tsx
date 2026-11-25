import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import FloorToggle from '@/components/FloorToggle'
import FloorMap from '@/components/FloorMap'
import FloatingButton from '@/components/FloatingButton'
import SharingStatusCards from '@/components/SharingStatusCards'
import { FLOORS_BY_ZONE } from '@/constants/building'
import { useBuildingStore } from '@/stores/buildingStore'
import { useSharing } from '@/data/SharingProvider'
import { TABS, itemsForToday } from '@/data/sharingItems'

export default function SharingMapPage() {
  const navigate = useNavigate()
  const { selectedZone, activeFloor, setFloor } = useBuildingStore()
  const floors = FLOORS_BY_ZONE[selectedZone]
  const { items } = useSharing()
  const floorItems = itemsForToday(items, selectedZone, activeFloor)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white">
      <Header />

      <TabBar
        tabs={TABS}
        activeTab="map"
        onTabChange={(tab) => {
          if (tab === 'list') navigate('/list')
        }}
      />

      <FloorToggle floors={floors} activeFloor={activeFloor} onFloorChange={setFloor} />

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

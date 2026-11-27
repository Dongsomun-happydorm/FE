import { useState } from 'react'
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
import { TABS, itemsForToday, CURRENT_USER_ID } from '@/data/sharingItems'
import type { SharingItem } from '@/data/sharingItems'
import type { LocationPin } from '@/components/FloorMap'

function hashId(id: string): number {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xfffffff
  return h
}

function itemToPin(item: SharingItem): LocationPin {
  return {
    id: item.id,
    x: 10 + (hashId(item.id) % 80),
    y: 10 + (hashId(item.id + 'y') % 80),
    type: item.status === 'sharing' ? 'sharing' : 'completed',
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    location: item.location,
    image: item.images[0] as string | Blob | undefined,
    isOwner: item.ownerId === CURRENT_USER_ID,
  }
}

export default function SharingMapPage() {
  const navigate = useNavigate()
  const { selectedZone, activeFloor, setFloor } = useBuildingStore()
  const floors = FLOORS_BY_ZONE[selectedZone]
  const { items } = useSharing()
  const floorItems = itemsForToday(items, selectedZone, activeFloor)
  const [pinSelected, setPinSelected] = useState(false)
  const pins = floorItems
    .filter((item) => item.status === 'sharing' || item.status === 'completed')
    .map(itemToPin)

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
      <p className="typography-caption px-4 pt-1 text-gray-500">
        오늘 하루동안 기숙사 휴게실에서 오간 나눔을 한눈에 확인해 보세요
      </p>
      <div className="relative flex-1 overflow-hidden pt-50">
        <FloorMap pins={pins} onPinSelect={(id) => setPinSelected(id !== null)} />
        {!pinSelected && <FloatingButton label="나눔 등록" onClick={() => navigate('/register')} />}
        <SharingStatusCards
          sharingCount={floorItems.filter((item) => item.status === 'sharing').length}
          completedCount={floorItems.filter((item) => item.status === 'completed').length}
        />
      </div>
    </div>
  )
}

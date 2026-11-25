import { useState } from 'react'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import FloorToggle from '@/components/FloorToggle'
import FloorMap from '@/components/FloorMap'
import FloatingButton from '@/components/FloatingButton'
import SharingStatusCards from '@/components/SharingStatusCards'
import { FLOORS_BY_ZONE } from '@/constants/building'
import { useBuildingStore } from '@/stores/buildingStore'

const TABS = [
  { id: 'map', label: '나눔 지도' },
  { id: 'list', label: '나눔 목록' },
]

export default function SharingMapPage() {
  const [activeTab, setActiveTab] = useState('map')
  const { selectedZone, activeFloor, setFloor } = useBuildingStore()
  const floors = FLOORS_BY_ZONE[selectedZone]

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white">
      <Header />
      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <FloorToggle
        floors={floors}
        activeFloor={activeFloor}
        onFloorChange={setFloor}
      />
      <p className="typography-caption px-4  text-gray-500">
        오늘 하루동안 기숙사 휴게실에서 오간 나눔을 한눈에 확인해 보세요
      </p>
      <div className="relative flex-1 overflow-hidden">
        {activeTab === 'map' ? (
          <FloorMap />
        ) : (
          <div className="flex h-full items-center justify-center typography-body1-medium text-gray-500">
            나눔 목록
          </div>
        )}
        <FloatingButton label="나눔 등록" />
        <SharingStatusCards sharingCount={2} completedCount={2} />
      </div>
    </div>
  )
}

import { useState } from 'react'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import FloorToggle from '@/components/FloorToggle'
import FloorMap from '@/components/FloorMap'
import FloatingButton from '@/components/FloatingButton'
import SharingStatusCards from '@/components/SharingStatusCards'

const TABS = [
  { id: 'map', label: '나눔 지도' },
  { id: 'list', label: '나눔 목록' },
]

const FLOORS = [2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function SharingMapPage() {
  const [activeTab, setActiveTab] = useState('map')
  const [activeFloor, setActiveFloor] = useState(4)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white">
      <Header building="동소문행복기숙사 B동" floor={activeFloor} />

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <FloorToggle
        floors={FLOORS}
        activeFloor={activeFloor}
        onFloorChange={setActiveFloor}
      />

      {/* 지도 영역 */}
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

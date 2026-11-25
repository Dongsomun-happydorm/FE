import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BUILDING, createMockItems } from './sharingItems'
import type { SharingItem } from './sharingItems'
import { readSharingItems, saveSharingItem } from './sharingStorage'

interface SharingContextValue {
  building: string
  floor: number
  setFloor: (floor: number) => void
  items: SharingItem[]
  addItem: (item: SharingItem) => Promise<void>
}

const SharingContext = createContext<SharingContextValue | null>(null)

export function useSharing() {
  const context = useContext(SharingContext)
  if (!context) throw new Error('SharingProvider is required')
  return context
}

export default function SharingProvider({ children }: { children: ReactNode }) {
  const [floor, setFloor] = useState(4)
  const [mockItems] = useState(createMockItems)
  const [registrations, setRegistrations] = useState<SharingItem[]>([])

  useEffect(() => {
    let active = true
    readSharingItems()
      .then((stored) => {
        if (active)
          setRegistrations((current) => [
            ...current,
            ...stored.filter((item) => !current.some(({ id }) => id === item.id)),
          ])
      })
      .catch((error) => {
        console.warn('나눔 등록 내역을 불러오지 못했습니다.', error)
      })
    return () => {
      active = false
    }
  }, [])

  async function addItem(item: SharingItem) {
    await saveSharingItem(item)
    setRegistrations((current) => [item, ...current.filter(({ id }) => id !== item.id)])
  }

  return (
    <SharingContext.Provider
      value={{
        building: BUILDING,
        floor,
        setFloor,
        items: [...registrations, ...mockItems],
        addItem,
      }}
    >
      {children}
    </SharingContext.Provider>
  )
}

import { create } from 'zustand'
import { FLOORS_BY_ZONE, ZONE_OPTIONS } from '@/constants/building'
import type { Zone } from '@/constants/building'

interface BuildingState {
  selectedZone: Zone
  activeFloor: string
  setZone: (zone: Zone) => void
  setFloor: (floor: string) => void
}

export const useBuildingStore = create<BuildingState>((set) => ({
  selectedZone: ZONE_OPTIONS[0],
  activeFloor: FLOORS_BY_ZONE[ZONE_OPTIONS[0]][0],
  setZone: (zone) =>
    set({ selectedZone: zone, activeFloor: FLOORS_BY_ZONE[zone][0] }),
  setFloor: (floor) => set({ activeFloor: floor }),
}))

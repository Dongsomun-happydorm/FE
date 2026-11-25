import placeholder from '@/assets/list/item-placeholder.png'
import grapes from '@/assets/list/shine-muscat.png'

export const BUILDING = 'B동'
export const FLOORS = [2, 3, 4, 5, 6, 7, 8, 9, 10]
export const TABS = [
  { id: 'map', label: '나눔 지도' },
  { id: 'list', label: '나눔 목록' },
]
export const CURRENT_USER_ID = 'user01'

export interface SharingItem {
  id: string
  ownerId: string
  building: string
  floor: string
  name: string
  quantity: number
  unit: string
  location?: string
  memo: string
  images: (string | Blob)[]
  status: 'sharing' | 'completed' | 'closed'
  createdAt: string
}

const koreanDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', dateStyle: 'short' })
const defaults = { building: BUILDING, floor: '4F', unit: '개', memo: '', images: [placeholder] }
const paper = { name: '두루마리 휴지', quantity: 1, location: '휴게실 안쪽 책상 위' }

export function createMockItems(now = new Date()): SharingItem[] {
  const midnight = Date.parse(`${koreanDate.format(now)}T00:00:00+09:00`)
  const todayAt = (offset: number) =>
    new Date(Math.min(midnight + offset, now.getTime())).toISOString()

  return [
    {
      ...defaults,
      id: 'basket',
      ownerId: CURRENT_USER_ID,
      name: '바구니',
      quantity: 3,
      location: '휴게실 전자레인지 위',
      status: 'sharing',
      createdAt: todayAt(3000),
    },
    {
      ...defaults,
      ...paper,
      id: 'paper',
      ownerId: CURRENT_USER_ID,
      status: 'completed',
      createdAt: todayAt(2000),
    },
    {
      ...defaults,
      id: 'cleaning',
      ownerId: 'user02',
      name: '청소용품',
      quantity: 8,
      location: '휴게실 책상위',
      status: 'sharing',
      createdAt: todayAt(1000),
    },
    {
      ...defaults,
      id: 'grapes',
      ownerId: 'user03',
      name: '샤인머스켓',
      quantity: 5,
      unit: '송이',
      images: [grapes],
      status: 'closed',
      createdAt: todayAt(0),
    },
    {
      ...defaults,
      id: 'hangers',
      ownerId: 'user02',
      floor: '3F',
      name: '옷걸이',
      quantity: 4,
      location: '휴게실 선반 위',
      status: 'sharing',
      createdAt: todayAt(0),
    },
    {
      ...defaults,
      id: 'tissues',
      ownerId: 'user03',
      floor: '5F',
      name: '각티슈',
      quantity: 2,
      location: '휴게실 테이블 위',
      status: 'completed',
      createdAt: todayAt(0),
    },
    {
      ...defaults,
      ...paper,
      id: 'reserved-paper',
      ownerId: CURRENT_USER_ID,
      status: 'closed',
      createdAt: new Date(midnight - 1).toISOString(),
    },
  ]
}

export function newestFirst(items: SharingItem[]) {
  return [...items].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

export function itemsForToday(
  items: SharingItem[],
  building: string,
  floor: string,
  now = new Date()
) {
  const today = koreanDate.format(now)
  return newestFirst(
    items.filter(
      (item) =>
        item.building === building &&
        item.floor === floor &&
        koreanDate.format(new Date(item.createdAt)) === today
    )
  )
}

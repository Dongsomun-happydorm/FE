export const BUILDING_NAME = '동소문행복기숙사'

export const ZONE_OPTIONS = ['공용', 'A동', 'B동'] as const

export type Zone = (typeof ZONE_OPTIONS)[number]

export const FLOORS_BY_ZONE: Record<Zone, string[]> = {
  공용: ['B1', '1F'],
  A동: ['2F', '3F', '4F', '5F'],
  B동: ['2F', '3F', '4F', '5F', '6F', '7F', '8F', '9F', '10F'],
}

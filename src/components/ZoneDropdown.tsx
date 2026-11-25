import { useEffect, useRef, useState } from 'react'
import MoreIcon from '@/components/icons/MoreIcon'

interface ZoneDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  showLabel?: boolean
}

export default function ZoneDropdown({ options, value, onChange, showLabel = true }: ZoneDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="flex items-center gap-1">
      {showLabel && (
        <span className="typography-body1-semibold text-gray-900 whitespace-nowrap">{value}</span>
      )}
      <div ref={ref} className="relative">
        <button onClick={() => setOpen((prev) => !prev)} className="flex items-center">
          <MoreIcon className={`size-5.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute left-1/2 top-full z-50 mt-1 w-16.5 -translate-x-1/2 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2">
            <div className="flex flex-col gap-0.5 p-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`flex h-10 w-full items-center justify-center typography-body2-medium text-[#2b2b2b] transition-colors hover:bg-gray-100 rounded-md ${
                    option === value ? 'bg-gray-100' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

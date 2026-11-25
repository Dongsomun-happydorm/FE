import { useEffect, useRef, useState } from 'react'
import MoreIcon from '@/components/icons/MoreIcon'

interface ZoneDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function ZoneDropdown({ options, value, onChange }: ZoneDropdownProps) {
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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        <span className="typography-body1-semibold text-gray-900 whitespace-nowrap">{value}</span>
        <MoreIcon />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[66px] overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),0px_2px_2px_0px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-0.5 p-2">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`flex h-10 w-full items-center justify-center typography-body2-medium text-[#2b2b2b] transition-colors ${
                  option === value ? 'rounded-[8px] bg-gray-100' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

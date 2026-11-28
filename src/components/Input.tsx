import { useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import clearIcon from '@/assets/register/clear.svg'

interface InputProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'onChange' | 'defaultValue' | 'type'
> {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

export default function Input({
  value,
  onChange,
  onClear,
  className = '',
  disabled,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`group flex h-12 w-full items-center gap-1 rounded-lg border-[0.5px] bg-gray-50 px-[13.5px] ${value || disabled ? 'border-primary-500' : 'focus-within:border-primary-500 border-transparent'} ${disabled ? 'opacity-40' : ''} ${className}`}
    >
      <input
        {...props}
        ref={inputRef}
        type="text"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-500 ${value ? 'typography-body2-medium text-gray-900' : 'typography-body2-regular text-gray-500'}`}
      />
      {value && !disabled && (
        <button
          type="button"
          aria-label="입력값 지우기"
          className="hidden shrink-0 cursor-pointer group-focus-within:block"
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => {
            inputRef.current?.focus()
            onChange('')
            onClear?.()
          }}
        >
          <img src={clearIcon} alt="" />
        </button>
      )}
    </div>
  )
}

import type { ComponentPropsWithoutRef } from 'react'

interface MainbuttonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const VARIANT_CLASSES = {
  primary: 'bg-primary-500 enabled:hover:bg-primary-400',
  secondary: 'bg-secondary-500 enabled:hover:bg-secondary-400',
}

export default function Mainbutton({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className = '',
  children = '예약하기',
  ...props
}: MainbuttonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`typography-body1-semibold inline-flex items-center justify-center rounded-xl px-4 whitespace-nowrap transition-colors enabled:cursor-pointer ${VARIANT_CLASSES[variant]} ${fullWidth ? 'text-gray-white h-[60px] w-full disabled:bg-gray-100 disabled:text-gray-400' : 'text-primary-50 w-[170px] py-[19px] disabled:opacity-20'} ${className}`}
    >
      {children}
    </button>
  )
}

interface FloatingButtonProps {
  label: string
  onClick?: () => void
}

export default function FloatingButton({ label, onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[90px] left-1/2 -translate-x-1/2 h-[50px] w-[120px] rounded-full bg-primary-500 typography-subtitle2 text-gray-50 shadow-2 active:bg-primary-600 transition-colors"
    >
      {label}
    </button>
  )
}

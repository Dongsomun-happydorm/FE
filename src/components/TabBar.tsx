interface Tab {
  id: string
  label: string
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex w-full border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-1 items-center justify-center py-[18px] typography-body2-semibold transition-colors ${
              isActive
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

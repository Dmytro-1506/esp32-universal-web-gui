import './Sidebar.css'

export type NavigationItemId =
  | 'overview'
  | 'display'
  | 'led'
  | 'sound'
  | 'buttons'
  | 'battery'
  | 'settings'
  | 'activity-log'

interface SidebarProps {
  activeItem: NavigationItemId
  onNavigate: (item: NavigationItemId) => void
}

const navigationItems: { id: NavigationItemId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '⌂' },
  { id: 'display', label: 'Display', icon: '▣' },
  { id: 'led', label: 'LED', icon: '●' },
  { id: 'sound', label: 'Sound', icon: '♫' },
  { id: 'buttons', label: 'Buttons', icon: '▤' },
  { id: 'battery', label: 'Battery', icon: '▰' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
  { id: 'activity-log', label: 'Activity log', icon: '▤' },
]

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside className="app-sidebar" aria-label="Main sidebar">
      <nav className="app-sidebar__nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`app-sidebar__item${activeItem === item.id ? ' app-sidebar__item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeItem === item.id ? 'page' : undefined}
          >
            <span className="app-sidebar__icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <span className="app-sidebar__connection-dot" aria-hidden="true" />
        <span>Device connection not configured</span>
      </div>
    </aside>
  )
}

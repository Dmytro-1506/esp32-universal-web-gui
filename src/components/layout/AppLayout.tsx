import { useState, type ReactNode } from 'react'
import type { AppearanceSettings } from '../../app/settings/appearance'
import { Header } from './Header'
import { Sidebar, type NavigationItemId } from './Sidebar'
import './AppLayout.css'

interface AppLayoutProps {
  appearance: AppearanceSettings
  onAppearanceChange: (next: AppearanceSettings) => void
  children: ReactNode
}

const sectionTitles: Record<NavigationItemId, string> = {
  overview: 'Overview',
  display: 'Display',
  led: 'LED control',
  sound: 'Sound',
  buttons: 'Buttons',
  battery: 'Battery',
  settings: 'Settings',
  'activity-log': 'Activity log',
}

export function AppLayout({
  appearance,
  onAppearanceChange,
  children,
}: AppLayoutProps) {
  const [activeItem, setActiveItem] = useState<NavigationItemId>('overview')

  return (
    <div className="app-shell">
      <Header
        appearance={appearance}
        onAppearanceChange={onAppearanceChange}
      />

      <div className="app-shell__body">
        <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

        <main className="app-main" id="main-content">
          <div className="app-main__heading">
            <div>
              <p className="app-main__eyebrow">ESP32 Smart Panel</p>
              <h1>{sectionTitles[activeItem]}</h1>
            </div>
            <span className="app-main__device-label">Device not connected</span>
          </div>

          {activeItem === 'overview' ? (
            children
          ) : (
            <section className="app-placeholder" aria-live="polite">
              <h2>{sectionTitles[activeItem]}</h2>
              <p>
                This section is planned but has not been implemented yet.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

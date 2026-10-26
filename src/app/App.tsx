import { useState } from "react";
import { DEFAULT_APPEARANCE } from "./settings/appearance";
import type { AppearanceSettings } from "./settings/appearance";
import { AppLayout } from "../components/layout/AppLayout";
import { DashboardPage } from "../features/dashboard/DashboardPage";

function App() {
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    ...DEFAULT_APPEARANCE,
  });

  return (
    <div data-theme={appearance.theme} data-layout={appearance.layout}>
      <AppLayout appearance={appearance} onAppearanceChange={setAppearance}>
        <DashboardPage />
      </AppLayout>
    </div>
  );
}

export default App;

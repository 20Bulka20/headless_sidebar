import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { useMediaQuery } from "./demo/useMediaQuery";
import { StyledSidebar } from "./demo/StyledSidebar";
import {
  AnalyticsPage,
  DashboardPage,
  InventoryPage,
  ReportsPage,
  SalesPage,
  SettingsPage,
} from "./demo/pages";

function App() {
  // hook to check if the screen is mobile to show mobile or desktop layout
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={`flex h-screen ${isMobile ? "flex-col" : "flex-row"}`}>
      <StyledSidebar isMobile={isMobile} />

      <main
        className={`min-h-0 min-w-0 flex-1 bg-stone-50 ${
          isMobile ? "pb-20" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/sales/list" element={<SalesPage />} />
          <Route path="/sales/analytics" element={<AnalyticsPage />} />
          <Route path="/sales/settings" element={<SettingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

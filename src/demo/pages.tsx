export function Page({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <p className="text-sm uppercase tracking-wide text-stone-400">Current route</p>
      <h1 className="text-2xl font-semibold text-stone-800">{title}</h1>
    </div>
  );
}

export function DashboardPage() {
  return <Page title="Dashboard" />;
}

export function InventoryPage() {
  return <Page title="Inventory" />;
}

export function SalesPage() {
  return <Page title="Sales" />;
}

export function AnalyticsPage() {
  return <Page title="Analytics" />;
}

export function SettingsPage() {
  return <Page title="Settings" />;
}

export function ReportsPage() {
  return <Page title="Reports" />;
}

import "./App.css";
import SidebarRoot from "./sidebar/components/SidebarRoot";
import SidebarItem from "./sidebar/components/SidebarItem";
import { SidebarList } from "./sidebar/components/SidebarList";
import { SidebarToggle } from "./sidebar/components/SidebarToggle";
import { Sparkles, Compass, TrendingUp, CloudLightning } from "lucide-react";
import { SidebarSubMenu } from "./sidebar/components/SidebarSubMenu";
import { useMediaQuery } from "./demo/useMediaQuery";

function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "mobile" : "desktop";

  const desktopItemStyles =
    "flex w-full min-w-0 items-center gap-2 h-10 px-3 rounded-md hover:bg-gray-100 data-active:bg-blue-100 data-active:text-blue-600 cursor-pointer whitespace-nowrap group-data-[collapsed]:justify-center group-data-[collapsed]:px-2";

  const mobileNavItemStyles =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs data-active:text-blue-600 data-active:bg-blue-50 cursor-pointer";

  const mobileSheetItemStyles =
    "flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-gray-100 data-active:bg-blue-50 data-active:text-blue-600 cursor-pointer";

  const itemClassName = isMobile ? mobileNavItemStyles : desktopItemStyles;

  return (
    <div className={`flex h-screen ${isMobile ? "flex-col" : "flex-row"}`}>
      <SidebarRoot
        layout={layout}
        defaultActiveId="item1"
        defaultExpanded={true}
        sidebarClassName={
          isMobile
            ? "fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white"
            : "h-full shrink-0 transition-[width] data-expanded:w-52 data-collapsed:w-16 bg-slate-200"
        }
      >
        <SidebarList
          listClassName={
            isMobile
              ? "flex flex-row justify-around gap-0 p-0"
              : "flex flex-col gap-2 p-4"
          }
        >
          <SidebarItem
            icon={<Sparkles className="h-5 w-5 shrink-0" />}
            label="Dashboard"
            id="item1"
            className={itemClassName}
          />

          <SidebarItem
            icon={<Compass className="h-5 w-5 shrink-0" />}
            label="Inventory"
            id="item2"
            className={itemClassName}
          />

          <SidebarSubMenu
            id="sidebar-submenu-1"
            label="Sales Block"
            icon={<CloudLightning className="h-5 w-5 shrink-0" />}
            triggerClassName={itemClassName}
            sheetBackdropClassName="fixed inset-0 z-50 bg-black/30"
            sheetClassName="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-lg"
            sheetHeaderClassName="flex items-center justify-between border-b border-stone-200 px-4 py-3 font-semibold"
            sheetContentClassName="flex flex-col gap-1 p-2 pb-6"
          >
            <SidebarItem
              label="Sales"
              id="item3"
              className={isMobile ? mobileSheetItemStyles : desktopItemStyles}
            />
            <SidebarItem
              label="Analytics"
              id="item4"
              className={isMobile ? mobileSheetItemStyles : desktopItemStyles}
            />
            <SidebarItem
              label="Settings"
              id="item5"
              className={isMobile ? mobileSheetItemStyles : desktopItemStyles}
            />
          </SidebarSubMenu>

          <SidebarItem
            icon={<TrendingUp className="h-5 w-5 shrink-0" />}
            label="Reports"
            id="item6"
            className={itemClassName}
          />
        </SidebarList>

        <SidebarToggle />
      </SidebarRoot>

      <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-stone-50 text-stone-500">
        Main content
      </main>
    </div>
  );
}

export default App;

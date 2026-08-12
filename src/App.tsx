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

  const mobilePanelItemStyles =
    "flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-gray-100 data-active:bg-blue-50 data-active:text-blue-600 cursor-pointer";

  const itemClassName = isMobile ? mobileNavItemStyles : desktopItemStyles;

  const tooltipClassName =
    "pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-sm text-stone-800 shadow";

  return (
    <div className={`flex h-screen ${isMobile ? "flex-col" : "flex-row"}`}>
      <SidebarRoot
        layout={layout}
        defaultActiveId="item1"
        defaultExpanded={true}
        className={
          isMobile
            ? "fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white"
            : "group flex h-full shrink-0 flex-col transition-[width] data-expanded:w-52 data-collapsed:w-16 bg-slate-200"
        }
      >
        <SidebarList
          className={
            isMobile
              ? "flex list-none flex-row justify-around gap-0 m-0 p-0"
              : "m-0 flex list-none flex-col gap-2 p-4"
          }
        >
          <SidebarItem
            icon={<Sparkles className="h-5 w-5 shrink-0" />}
            label="Dashboard"
            id="item1"
            className={itemClassName}
            wrapperClassName="relative"
            tooltipClassName={tooltipClassName}
          />

          <SidebarItem
            icon={<Compass className="h-5 w-5 shrink-0" />}
            label="Inventory"
            id="item2"
            className={itemClassName}
            wrapperClassName="relative"
            tooltipClassName={tooltipClassName}
          />

          <SidebarSubMenu
            id="sidebar-submenu-1"
            label="Sales Block"
            icon={<CloudLightning className="h-5 w-5 shrink-0" />}
            className="relative"
            triggerClassName={itemClassName}
            inlineContentClassName="mt-1 flex list-none flex-col gap-1 p-0 pl-4"
            flyoutContentClassName="absolute left-full top-0 z-10 m-0 min-w-40 list-none rounded border bg-white p-2 shadow"
            flyoutHeadingClassName="px-2 py-1 font-bold"
            panelBackdropClassName="fixed inset-0 z-50 bg-black/30"
            panelClassName="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-lg"
            panelHeaderClassName="flex items-center justify-between border-b border-stone-200 px-4 py-3 font-semibold"
            panelContentClassName="m-0 flex list-none flex-col gap-1 p-2 pb-6"
            panelCloseClassName="cursor-pointer text-xl leading-none"
          >
            <SidebarItem
              label="Sales"
              id="item3"
              className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
            />
            <SidebarItem
              label="Analytics"
              id="item4"
              className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
            />
            <SidebarItem
              label="Settings"
              id="item5"
              className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
            />
          </SidebarSubMenu>

          <SidebarItem
            icon={<TrendingUp className="h-5 w-5 shrink-0" />}
            label="Reports"
            id="item6"
            className={itemClassName}
            wrapperClassName="relative"
            tooltipClassName={tooltipClassName}
          />
        </SidebarList>

        <SidebarToggle className="mt-auto cursor-pointer p-3" />
      </SidebarRoot>

      <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-stone-50 text-stone-500">
        Main content
      </main>
    </div>
  );
}

export default App;

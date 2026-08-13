import { CloudLightning, Compass, Sparkles, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {
  SidebarItem,
  SidebarList,
  SidebarRoot,
  SidebarSubMenu,
  SidebarToggle,
  type SidebarId,
} from "../sidebar";

export const StyledSidebar = ({ isMobile }: { isMobile: boolean }) => {
  const layout = isMobile ? "mobile" : "desktop";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const desktopItemStyles =
    "flex w-full min-w-0 items-center gap-2 h-10 px-3 rounded-md hover:bg-gray-100 data-active:bg-blue-100 data-active:text-blue-600 cursor-pointer whitespace-nowrap group-data-[collapsed]:justify-center group-data-[collapsed]:px-2";

  const mobileNavItemStyles =
    "flex flex-1 flex-col items-center justify-center gap-0.5 p-2 rounded-md text-xs data-active:text-blue-600 data-active:bg-blue-50 cursor-pointer";

  const mobilePanelItemStyles =
    "flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-gray-100 data-active:bg-blue-50 data-active:text-blue-600 cursor-pointer";

  const itemClassName = isMobile ? mobileNavItemStyles : desktopItemStyles;

  const tooltipClassName =
    "pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-sm text-stone-800 shadow";

  const activeIdChangeHandler = (id: SidebarId) => {
    navigate(id);
  };
  return (
    <SidebarRoot
      layout={layout}
      activeId={pathname}
      onActiveChange={activeIdChangeHandler}
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
            ? "m-0 flex list-none flex-row justify-around gap-0 p-2"
            : "m-0 flex list-none flex-col gap-2 p-4"
        }
      >
        <SidebarItem
          icon={<Sparkles className="h-5 w-5 shrink-0" />}
          label="Dashboard"
          id="/dashboard"
          className={itemClassName}
          wrapperClassName="relative"
          tooltipClassName={tooltipClassName}
        />

        <SidebarItem
          icon={<Compass className="h-5 w-5 shrink-0" />}
          label="Inventory"
          id="/inventory"
          className={itemClassName}
          wrapperClassName="relative"
          tooltipClassName={tooltipClassName}
        />

        <SidebarSubMenu
          id="/sales"
          label="Sales Block"
          icon={<CloudLightning className="h-5 w-5 shrink-0" />}
          className="relative"
          triggerClassName={itemClassName}
          inlineContentClassName="mt-1 flex list-none flex-col gap-1 p-0 pl-4"
          flyoutContentClassName="absolute left-full top-0 z-10 m-0 min-w-40 list-none rounded-md  bg-white p-2 shadow"
          flyoutHeadingClassName="px-2 py-1 font-bold"
          panelBackdropClassName="fixed inset-0 z-50 bg-black/30"
          panelClassName="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-lg"
          panelHeaderClassName="flex items-center justify-between border-b border-stone-200 px-4 py-3 font-semibold"
          panelContentClassName="m-0 flex list-none flex-col gap-1 p-2 pb-6"
          panelCloseClassName="cursor-pointer text-xl leading-none"
        >
          <SidebarItem
            label="Sales"
            id="/sales/list"
            className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
          />
          <SidebarItem
            label="Analytics"
            id="/sales/analytics"
            className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
          />
          <SidebarItem
            label="Settings"
            id="/sales/settings"
            className={isMobile ? mobilePanelItemStyles : desktopItemStyles}
          />
        </SidebarSubMenu>

        <SidebarItem
          icon={<TrendingUp className="h-5 w-5 shrink-0" />}
          label="Reports"
          id="/reports"
          className={itemClassName}
          wrapperClassName="relative"
          tooltipClassName={tooltipClassName}
        />
      </SidebarList>

      <SidebarToggle className="mt-auto cursor-pointer p-3" />
    </SidebarRoot>
  );
};

import "./App.css";
import SidebarRoot from "./sidebar/components/SidebarRoot";
import SidebarItem from "./sidebar/components/SidebarItem";
import { SidebarList } from "./sidebar/components/SidebarList";
import { SidebarToggle } from "./sidebar/components/SidebarToggle";
import {
  Sparkles,
  Compass,
  Infinity,
  Layers,
  Orbit,
  TrendingUp,
  CloudLightning,
} from "lucide-react";
import { SidebarSubMenu } from "./sidebar/components/SidebarSubMenu";

function App() {
  const SidebarItemStyles =
    " flex w-full min-w-fit items-center gap-2 h-10  px-3 rounded-md hover:bg-gray-100 data-active:bg-blue-100 data-active:text-blue-600 cursor-pointer whitespace-nowrap ";
  return (
    <div className="flex h-screen ">
      <SidebarRoot
        defaultActiveId="item1"
        defaultExpanded={true}
        sidebarClassName="
     
        transition-[width]
        data-expanded:w-52
        data-collapsed:w-16
        bg-slate-200"
      >
        <SidebarList listClassName="flex flex-col gap-2 p-4">
          <SidebarItem
            icon={<Sparkles className="w-4 h-4" />}
            label={"Dashboard"}
            key="sidebar-item-1"
            id="item1"
            className={SidebarItemStyles}
          />

          <SidebarItem
            icon={<Compass className="w-4 h-4" />}
            label={"Inventory"}
            key="sidebar-item-2"
            id="item2"
            className={SidebarItemStyles}
          />

          <SidebarSubMenu
            key="sidebar-submenu-1"
            id="sidebar-submenu-1"
            label="Sales Block"
            icon={<CloudLightning className="w-4 h-4" />}
            triggerClassName={SidebarItemStyles}
          >
            <SidebarItem
              icon={<Infinity className="w-4 h-4" />}
              label={"Sales"}
              key="sidebar-item-3"
              id="item3"
              className={SidebarItemStyles}
            />
            <SidebarItem
              icon={<Layers className="w-4 h-4" />}
              label={"Analytics"}
              key="sidebar-item-4"
              id="item4"
              className={SidebarItemStyles}
            />

            <SidebarItem
              icon={<Orbit className="w-4 h-4" />}
              label={"Settings"}
              key="sidebar-item-5"
              id="item5"
              className={SidebarItemStyles}
            />
          </SidebarSubMenu>

          <SidebarItem
            icon={<TrendingUp className="w-4 h-4" />}
            label={"Reports"}
            key="sidebar-item-6"
            id="item6"
            className={SidebarItemStyles}
          />
        </SidebarList>

        <SidebarToggle />
      </SidebarRoot>
    </div>
  );
}

export default App;

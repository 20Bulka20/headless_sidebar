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
  Activity,
  PieChart,
  Gauge,
  Workflow,
  Menu,
  Command,
  Fingerprint,
  Eye,
  LayoutGrid,
  Leaf,
  Flame,
  Moon,
  CloudLightning,
  Globe,
} from "lucide-react";

function App() {
  return (
    <div className="flex h-screen ">
      <SidebarRoot
        defaultActiveId="item1"
        defaultExpanded={true}
        sidebarClassName="
        transition-[width]
        data-expanded:w-50
        data-collapsed:w-16
        bg-slate-200"
      >
        <SidebarList listClassName="flex flex-col gap-2 p-4">
          <SidebarItem
            icon={<Sparkles className="w-4 h-4" />}
            label={"Dashboard"}
            key="sidebar-item-1"
            id="item1"
            sidebarItemClassName="flex items-center gap-2"
          />

          <SidebarItem
            icon={<Compass className="w-4 h-4" />}
            label={"Inventory"}
            key="sidebar-item-2"
            id="item2"
            sidebarItemClassName="flex items-center gap-2"
          />

          <SidebarItem
            icon={<Infinity className="w-4 h-4" />}
            label={"Sales"}
            key="sidebar-item-3"
            id="item3"
            sidebarItemClassName="flex items-center gap-2"
          />

          <SidebarItem
            icon={<Layers className="w-4 h-4" />}
            label={"Analytics"}
            key="sidebar-item-4"
            id="item4"
            sidebarItemClassName="flex items-center gap-2"
          />

          <SidebarItem
            icon={<Orbit className="w-4 h-4" />}
            label={"Settings"}
            key="sidebar-item-5"
            id="item5"
            sidebarItemClassName="flex items-center gap-2"
          />

          <SidebarItem
            icon={<TrendingUp className="w-4 h-4" />}
            label={"Reports"}
            key="sidebar-item-6"
            id="item6"
            sidebarItemClassName="flex items-center gap-2"
          />
        </SidebarList>

        <SidebarToggle />
      </SidebarRoot>
    </div>
  );
}

export default App;

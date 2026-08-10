import "./App.css";
import SidebarRoot from "./sidebar/components/SidebarRoot";
import SidebarItem from "./sidebar/components/SidebarItem";
import { SidebarList } from "./sidebar/components/SidebarList";
import { SidebarToggle } from "./sidebar/components/SidebarToggle";

function App() {
  return (
    <div>
      <SidebarRoot
        defaultActiveId="item1"
        defaultExpanded={true}
        sidebarClassName="
        transition-[width]
        data-expanded:w-50
        data-collapsed:w-16
        bg-slate-200"
      >
        <SidebarList listClassName="flex flex-col gap-2">
          <SidebarItem key="sidebar-item-1" id="item1">
            Item 1
          </SidebarItem>

          <SidebarItem key="sidebar-item-2" id="item2">
            Item 2
          </SidebarItem>

          <SidebarItem key="sidebar-item-3" id="item3">
            Item 3
          </SidebarItem>

          <SidebarItem key="sidebar-item-4" id="item4">
            Item 4
          </SidebarItem>
        </SidebarList>

        <SidebarToggle />
      </SidebarRoot>
    </div>
  );
}

export default App;

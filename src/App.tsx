import "./App.css";
import SidebarRoot from "./sidebar/components/SidebarRoot";
import SidebarItem from "./sidebar/components/SidebarItem";
import { SidebarList } from "./sidebar/components/SidebarList";

function App() {
  return (
    <div>
      <SidebarRoot defaultActiveId="item1">
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
      </SidebarRoot>
    </div>
  );
}

export default App;

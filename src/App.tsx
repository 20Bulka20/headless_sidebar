import "./App.css";
import SidebarRoot from "./sidebar/components/SidebarRoot";
import SidebarItem from "./sidebar/components/SidebarItem";

function App() {
  return (
    <div>
      <SidebarRoot
        defaultActiveId="item1"
        onActiveChange={(id) => console.log("id", id)}
      >
        <ul className="flex flex-col gap-2">
          <li key="item1">
            <SidebarItem key="sidebar-item-1" id="item1">
              Item 1
            </SidebarItem>
          </li>
          <li key="item2">
            <SidebarItem key="sidebar-item-2" id="item2">
              Item 2
            </SidebarItem>
          </li>
          <li key="item3">
            <SidebarItem key="sidebar-item-3" id="item3">
              Item 3
            </SidebarItem>
          </li>
          <li key="item4">
            <SidebarItem key="sidebar-item-4" id="item4">
              Item 4
            </SidebarItem>
          </li>
        </ul>
      </SidebarRoot>
    </div>
  );
}

export default App;

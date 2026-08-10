import { useState } from "react";
import { SidebarContext } from "../SidebarContext";
import type { SidebarId, SidebarRootProps } from "../types";

const SidebarRoot = ({
  children,
  layout = "desktop",
  activeId: activeIdProp,

  sidebarClassName,
  defaultExpanded = true,
}: SidebarRootProps) => {
  const [activeId, setActiveId] = useState<SidebarId | null>(
    activeIdProp ?? null,
  );
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <SidebarContext.Provider
      value={{
        layout,
        expanded,
        activeId,
        openSubId: null,
        setExpanded,
        setActiveId,
        openSub: () => {},
        closeSub: () => {},
        toggleSub: () => {},
        registerItem: () => {},
        unregisterItem: () => {},
        isActiveBranch: (id) => activeId === id,
      }}
    >
      <nav
        data-expanded={expanded ? "" : undefined}
        data-collapsed={expanded ? undefined : ""}
        className={` ${sidebarClassName}`}
      >
        {children}
      </nav>
    </SidebarContext.Provider>
  );
};

export default SidebarRoot;

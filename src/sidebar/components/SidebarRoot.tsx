import { useState } from "react";
import { SidebarContext } from "../SidebarContext";
import type { SidebarId, SidebarRootProps } from "../types";

const SidebarRoot = ({
  children,
  layout = "desktop",
  defaultActiveId,

  sidebarClassName,
  defaultExpanded = true,
}: SidebarRootProps) => {
  const [activeId, setActiveId] = useState<SidebarId | null>(
    defaultActiveId ?? null,
  );
  const [expanded, setExpanded] = useState(defaultExpanded);
  console.log(activeId);
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

import { useState } from "react";
import { SidebarContext } from "../SidebarContext";
import type { SidebarId, SidebarRootProps } from "../types";

const SidebarRoot = ({
  children,
  layout = "desktop",
  activeId: activeIdProp,
}: SidebarRootProps) => {
  const [activeId, setActiveId] = useState<SidebarId | null>(
    activeIdProp ?? null,
  );

  return (
    <SidebarContext.Provider
      value={{
        layout,
        expanded: true,
        activeId,
        openSubId: null,
        setExpanded: () => {},
        setActiveId,
        openSub: () => {},
        closeSub: () => {},
        toggleSub: () => {},
        registerItem: () => {},
        unregisterItem: () => {},
        isActiveBranch: (id) => activeId === id,
      }}
    >
      <nav>{children}</nav>
    </SidebarContext.Provider>
  );
};

export default SidebarRoot;

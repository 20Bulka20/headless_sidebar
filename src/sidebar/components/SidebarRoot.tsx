import { useCallback, useEffect, useMemo, useState } from "react";
import { SidebarContext } from "../SidebarContext";
import type { SidebarId, SidebarRootProps } from "../types";
import { useActiveBranch } from "../useActiveBranch";

const SidebarRoot = ({
  children,
  layout = "desktop",
  className,
  activeId = null,
  onActiveChange,
  defaultExpanded = true,
}: SidebarRootProps) => {
  const [expanded, setExpandedState] = useState(defaultExpanded);
  const [openSubId, setOpenSubId] = useState<SidebarId | null>(null);

  // reset openSubId when layout changes
  useEffect(() => {
    setOpenSubId(null);
  }, [layout]);

  const { registerItem, unregisterItem, isActiveBranch } =
    useActiveBranch(activeId);

  const setActiveId = useCallback(
    (id: SidebarId) => {
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const setExpanded = useCallback((value: boolean) => {
    setExpandedState(value);
    setOpenSubId(null);
  }, []);

  const openSub = useCallback((id: SidebarId) => {
    setOpenSubId(id);
  }, []);

  const closeSub = useCallback(() => {
    setOpenSubId(null);
  }, []);

  const toggleSub = useCallback((id: SidebarId) => {
    setOpenSubId((current) => (current === id ? null : id));
  }, []);

  const value = useMemo(
    () => ({
      layout,
      expanded,
      activeId,
      openSubId,
      setExpanded,
      setActiveId,
      openSub,
      closeSub,
      toggleSub,
      registerItem,
      unregisterItem,
      isActiveBranch,
    }),
    [
      layout,
      expanded,
      activeId,
      openSubId,
      setExpanded,
      setActiveId,
      openSub,
      closeSub,
      toggleSub,
      registerItem,
      unregisterItem,
      isActiveBranch,
    ],
  );

  return (
    <SidebarContext.Provider value={value}>
      <nav
        data-layout={layout}
        data-expanded={expanded ? "" : undefined}
        data-collapsed={expanded ? undefined : ""}
        aria-label="Sidebar"
        className={className}
      >
        {children}
      </nav>
    </SidebarContext.Provider>
  );
};

export default SidebarRoot;

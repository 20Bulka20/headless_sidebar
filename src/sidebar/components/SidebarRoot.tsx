import { useCallback, useEffect, useMemo, useState } from "react";
import { SidebarContext } from "../SidebarContext";
import type { SidebarId, SidebarRootProps } from "../types";

const SidebarRoot = ({
  children,
  layout = "desktop",
  defaultActiveId,
  className,

  defaultExpanded = true,
}: SidebarRootProps) => {
  const [activeId, setActiveIdState] = useState<SidebarId | null>(
    defaultActiveId ?? null,
  );
  const [expanded, setExpandedState] = useState(defaultExpanded);
  const [openSubId, setOpenSubId] = useState<SidebarId | null>(null);

  useEffect(() => {
    setOpenSubId(null);
  }, [layout]);

  const [parentById, setParentById] = useState<
    Map<SidebarId, SidebarId | null>
  >(() => new Map());

  const setActiveId = useCallback((id: SidebarId) => {
    setActiveIdState(id);
  }, []);

  const setExpanded = useCallback((value: boolean) => {
    setExpandedState(value);
    setOpenSubId(null);
  }, []);

  const registerItem = useCallback(
    (id: SidebarId, parentId: SidebarId | null) => {
      setParentById((prev) => {
        if (prev.get(id) === parentId) return prev;
        const next = new Map(prev);
        next.set(id, parentId);
        return next;
      });
    },
    [],
  );

  const unregisterItem = useCallback((id: SidebarId) => {
    setParentById((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isActiveBranch = useCallback(
    (id: SidebarId) => {
      if (activeId == null) return false;
      if (activeId === id) return true;

      let current: SidebarId | null = activeId;
      const visited = new Set<SidebarId>();

      while (current) {
        if (visited.has(current)) break;
        visited.add(current);

        const parent: SidebarId | null | undefined = parentById.get(current);
        if (parent === id) return true;
        current = parent ?? null;
      }

      return false;
    },
    [activeId, parentById],
  );

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

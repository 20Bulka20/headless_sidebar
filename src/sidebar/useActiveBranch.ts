import { useCallback, useState } from "react";
import type { SidebarId } from "./types";

/**
 * Descendant registration: items report `id → parentId` on mount so Root can
 * tell when a parent should look active because a child is selected.
 *
 * Compound components don't parse JSX trees, so children register themselves
 *
 * Example map after mount:
 *   "/dashboard"  → null
 *   "/sales"      → null
 *   "/sales/list" → "/sales"
 *
 * `isActiveBranch("/sales")` is true when `activeId` is "/sales/list".
 */
export function useActiveBranch(activeId: SidebarId | null) {
  const [parentById, setParentById] = useState<
    Map<SidebarId, SidebarId | null>
  >(() => new Map());

  const registerItem = useCallback(
    (id: SidebarId, parentId: SidebarId | null) => {
      setParentById((prev) => {
        // Same mapping already stored — skip to avoid a needless re-render.
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

      // Walk from the selected item up toward the root.
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

  return { registerItem, unregisterItem, isActiveBranch };
}

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSidebar } from "../SidebarContext";
import { SubContext } from "../SidebarSubMenuContext";
import type { SidebarId } from "../types";

type SidebarSubMenuProps = {
  id: SidebarId;
  label: ReactNode;
  icon?: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

export const SidebarSubMenu = ({
  id,
  label,
  icon,
  triggerClassName,
  contentClassName,
  children,
}: SidebarSubMenuProps) => {
  const { expanded, activeId, openSubId, openSub, closeSub, isActiveBranch } =
    useSidebar();

  const contentRef = useRef<HTMLUListElement>(null);
  // Allows closing by parent click even when a child is active (expanded only)
  const [userCollapsed, setUserCollapsed] = useState(false);

  const isBranchActive = isActiveBranch(id);
  const hasActiveChild = isBranchActive && activeId !== id;

  // Selecting a (new) child clears manual collapse so the branch can auto-open again
  useEffect(() => {
    if (hasActiveChild) {
      setUserCollapsed(false);
    }
  }, [activeId, hasActiveChild]);

  // expanded: hover/click, or auto-open when child active (unless user collapsed)
  // collapsed: only while hovered/clicked
  const isOpen = expanded
    ? openSubId === id || (hasActiveChild && !userCollapsed)
    : openSubId === id;

  // Don't leave focus inside a hidden/inert subtree
  useEffect(() => {
    if (isOpen) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && contentRef.current?.contains(active)) {
      active.blur();
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (isOpen) {
      setUserCollapsed(true);
      closeSub();
    } else {
      setUserCollapsed(false);
      openSub(id);
    }
  };

  return (
    <SubContext.Provider value={id}>
      <li
        className="relative"
        onMouseEnter={() => {
          if (!expanded) openSub(id);
        }}
        onMouseLeave={() => {
          if (!expanded) closeSub();
        }}
      >
        <button
          type="button"
          data-active={isBranchActive ? "" : undefined}
          data-open={isOpen ? "" : undefined}
          aria-expanded={isOpen}
          className={triggerClassName}
          onClick={handleTriggerClick}
        >
          {icon}
          {expanded && label}
        </button>

        <ul
          ref={contentRef}
          inert={isOpen ? undefined : true}
          data-open={isOpen ? "" : undefined}
          className={
            isOpen
              ? (contentClassName ??
                (expanded
                  ? "mt-1 flex flex-col gap-1 pl-4"
                  : "absolute left-full top-0 z-10 min-w-40 rounded border bg-white p-2 shadow"))
              : "hidden"
          }
        >
          {children}
        </ul>
      </li>
    </SubContext.Provider>
  );
};

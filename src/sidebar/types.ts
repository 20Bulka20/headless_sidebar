import type { ReactNode } from "react";

// ID of the sidebar item
export type SidebarId = string;

// Viewport / layout mode of the menu
export type SidebarLayout = "desktop" | "mobile";

export type SidebarRootProps = {
  children: ReactNode;

  /** Optional class name for the root `<nav>` */
  className?: string;

  /** Viewport mode: `"desktop"` | `"mobile"` */
  layout?: SidebarLayout;

  /** Controlled expanded/collapsed state (desktop width mode) */
  expanded?: boolean;
  /** Uncontrolled initial expanded state (used when `expanded` is omitted) */
  defaultExpanded?: boolean;
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;

  /** Controlled id of the currently selected item */
  activeId?: SidebarId | null;
  /** Uncontrolled initial active item (used when `activeId` is omitted) */
  defaultActiveId?: SidebarId | null;
  /** Called when the active item changes */
  onActiveChange?: (id: SidebarId) => void;
};

export type SidebarContextValue = {
  layout: SidebarLayout;
  expanded: boolean;
  activeId: SidebarId | null;
  openSubId: SidebarId | null;

  setExpanded: (expanded: boolean) => void;
  setActiveId: (id: SidebarId) => void;
  openSub: (id: SidebarId) => void;
  closeSub: () => void;
  toggleSub: (id: SidebarId) => void;

  // Register parent/child to know when parent-active
  registerItem: (id: SidebarId, parentId: SidebarId | null) => void;
  unregisterItem: (id: SidebarId) => void;
  // Whether `id` or any of its descendants equals `activeId`
  isActiveBranch: (id: SidebarId) => boolean;
};

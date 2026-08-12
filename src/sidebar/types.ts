import type { ReactNode } from "react";

// ID of the sidebar item
export type SidebarId = string;

// Viewport / layout mode of the menu
export type SidebarLayout = "desktop" | "mobile";

// Desktop width mode
export type SidebarExpandedMode = "collapsed" | "expanded";

export type SidebarState = {
  layout: SidebarLayout;
  expanded: boolean;
  // Currently selected item
  activeId: SidebarId | null;
  // Which submenu is open
  openSubId: SidebarId | null;
};

export type SidebarItemStatus = {
  isActive: boolean;
  // True when this item is a parent and some descendant is active
  isParentActive: boolean;
  // True when this submenu is the open one (`openSubId`)
  isOpen: boolean;
};

export type SidebarRootProps = {
  children: ReactNode;

  className?: string;

  layout?: SidebarLayout;
  defaultLayout?: SidebarLayout;
  onLayoutChange?: (layout: SidebarLayout) => void;

  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;

  activeId?: SidebarId | null;
  defaultActiveId?: SidebarId | null;
  onActiveChange?: (id: SidebarId) => void;

  openSubId?: SidebarId | null;
  defaultOpenSubId?: SidebarId | null;
  onOpenSubChange?: (id: SidebarId | null) => void;
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

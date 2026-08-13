import type { ReactNode } from "react";

// ID of the sidebar item
export type SidebarId = string;

// Viewport / layout mode of the menu
export type SidebarLayout = "desktop" | "mobile";

export type SidebarRootProps = {
  children: ReactNode;

  /** Class name for the root `<nav>` */
  className?: string;

  /** Viewport mode: `"desktop"` | `"mobile"` */
  layout?: SidebarLayout;

  /** Initial expanded/collapsed state (desktop width mode); toggled via SidebarToggle */
  defaultExpanded?: boolean;

  /** Selected item id — owned by the parent (router, useState, etc.) */
  activeId?: SidebarId | null;
  /** Called when an item is selected; parent should update `activeId` */
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

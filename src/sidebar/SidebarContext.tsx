import { createContext, useContext } from "react";
import type { SidebarContextValue } from "./types";

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined,
);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("Sidebar.* must be used within Sidebar.Root");
  }
  return ctx;
}

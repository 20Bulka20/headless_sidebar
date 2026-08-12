import type { ReactNode } from "react";
import { useSidebar } from "../SidebarContext";

type SidebarToggleProps = {
  children?: ReactNode;
};
export const SidebarToggle = ({ children }: SidebarToggleProps) => {
  const { expanded, setExpanded } = useSidebar();

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer"
    >
      {children ?? (expanded ? "«" : "»")}
    </button>
  );
};

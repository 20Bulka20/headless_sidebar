import type { ReactNode } from "react";
import { useSidebar } from "../SidebarContext";

type SidebarToggleProps = {
  children?: ReactNode;
};
export const SidebarToggle = ({ children }: SidebarToggleProps) => {
  const { expanded, setExpanded, closeSub } = useSidebar();

  const handleClick = () => {
    setExpanded(!expanded);
    closeSub();
  };
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children ?? (expanded ? "«" : "»")}
    </button>
  );
};

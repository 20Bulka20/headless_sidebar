import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSidebar } from "../SidebarContext";
import type { SidebarId } from "../types";

type SidebarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: SidebarId;
  children?: ReactNode;
};

const SidebarItem = ({ id, children, ...rest }: SidebarItemProps) => {
  const { activeId, setActiveId } = useSidebar();
  const isActive = activeId === id;

  return (
    <li key={id}>
      <button
        type="button"
        data-active={isActive ? "" : undefined}
        onClick={() => setActiveId(id)}
        {...rest}
      >
        {children}
      </button>
    </li>
  );
};

export default SidebarItem;

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSidebar } from "../SidebarContext";
import type { SidebarId } from "../types";

type SidebarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: SidebarId;
  icon?: ReactNode;
  label?: ReactNode | string;
  sidebarItemClassName?: string;
};

const SidebarItem = ({
  id,
  icon,
  label,
  sidebarItemClassName,
  ...rest
}: SidebarItemProps) => {
  const { activeId, setActiveId, expanded } = useSidebar();
  const isActive = activeId === id;

  return (
    <li key={id}>
      {" "}
      {/* TODO: decide if we need to use key={id} */}
      <button
        type="button"
        data-active={isActive ? "" : undefined}
        onClick={() => setActiveId(id)}
        {...rest}
        className={`${sidebarItemClassName}`}
      >
        {icon && icon}
        {expanded && label}
      </button>
    </li>
  );
};

export default SidebarItem;

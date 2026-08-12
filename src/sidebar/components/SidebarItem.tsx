import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { useSidebar } from "../SidebarContext";
import { useSubParentId } from "../SidebarSubMenuContext";
import type { SidebarId } from "../types";

// Omit onClick: navigation/close belong in headless (setActiveId, closeSub) or Root
// onActiveChange (router later). A consumer onClick would either be unused noise or
// accidentally override the internal handler via ...rest.
type SidebarItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "id"
> & {
  id: SidebarId;
  icon?: ReactNode;
  label?: ReactNode | string;
  className?: string;
  // Class for wrapping <li> (e.g. relative for tooltip positioning)
  wrapperClassName?: string;
  // Styles for collapsed-desktop tooltip — consumer only; no defaults
  tooltipClassName?: string;
};

const SidebarItem = ({
  id,
  icon,
  label,
  className,
  wrapperClassName,
  tooltipClassName,
  ...rest
}: SidebarItemProps) => {
  const {
    layout,
    setActiveId,
    expanded,
    closeSub,
    registerItem,
    unregisterItem,
    isActiveBranch,
  } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const parentId = useSubParentId();
  const isActive = isActiveBranch(id);
  const isMobile = layout === "mobile";
  const showLabel = expanded || parentId != null || isMobile;

  // Collapsed desktop leaf items: show label in tooltip on hover (visual only).

  const showTooltip =
    isHovered &&
    !expanded &&
    !isMobile &&
    parentId == null &&
    label != null &&
    label !== "";

  useEffect(() => {
    registerItem(id, parentId);
    return () => unregisterItem(id);
  }, [id, parentId, registerItem, unregisterItem]);

  return (
    <li className={wrapperClassName}>
      <button
        type="button"
        className={className}
        data-active={isActive ? "" : undefined}
        aria-current={isActive ? "page" : undefined}
        aria-label={!showLabel && typeof label === "string" ? label : undefined}
        {...rest}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(event) => {
          setActiveId(id);
          if (isMobile && parentId != null) {
            event.currentTarget.blur();
            closeSub();
            return;
          }
          if (!expanded && parentId != null) {
            event.currentTarget.blur();
            closeSub();
          }
        }}
      >
        {icon}
        {showLabel && label}
      </button>
      {showTooltip && (
        <span role="tooltip" className={tooltipClassName}>
          {label}
        </span>
      )}
    </li>
  );
};

export default SidebarItem;

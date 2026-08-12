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
};

const SidebarItem = ({
  id,
  icon,
  label,
  className,
  ...rest
}: SidebarItemProps) => {
  const {
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

  useEffect(() => {
    registerItem(id, parentId);
    return () => unregisterItem(id);
  }, [id, parentId, registerItem, unregisterItem]);

  return (
    <li className="relative">
      <button
        type="button"
        className={className}
        data-active={isActive ? "" : undefined}
        aria-current={isActive ? "page" : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
        onClick={(event) => {
          setActiveId(id);
          // collapsed flyout: close after selecting a sub-item
          if (!expanded && parentId != null) {
            event.currentTarget.blur();
            closeSub();
          }
        }}
      >
        {icon}
        {(expanded || parentId != null) && label}
      </button>
      {isHovered && !expanded && label && !parentId && (
        <Tooltip content={label} />
      )}
    </li>
  );
};

const Tooltip = ({ content }: { content: ReactNode }) => {
  return (
    <div className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 shadow">
      {content}
    </div>
  );
};
export default SidebarItem;

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useSidebar } from "../SidebarContext";
import { SubContext } from "../SidebarSubMenuContext";
import type { SidebarId } from "../types";
import { SidebarClose } from "./SidebarClose";

type SidebarSubMenuProps = {
  id: SidebarId;
  label: ReactNode;
  icon?: ReactNode;
  /** Class for the wrapping <li> */
  className?: string;
  triggerClassName?: string;
  /** Expanded desktop: inline list below trigger */
  inlineContentClassName?: string;
  /** Collapsed desktop: flyout panel to the right of trigger */
  flyoutContentClassName?: string;
  /** Optional heading inside collapsed flyout */
  flyoutHeadingClassName?: string;
  /** Mobile: submenu panel (portal) */
  panelClassName?: string;
  panelBackdropClassName?: string;
  panelHeaderClassName?: string;
  panelContentClassName?: string;
  panelCloseClassName?: string;
  children: ReactNode;
};

export const SidebarSubMenu = ({
  id,
  label,
  icon,
  className,
  triggerClassName,
  inlineContentClassName,
  flyoutContentClassName,
  flyoutHeadingClassName,
  panelClassName,
  panelBackdropClassName,
  panelHeaderClassName,
  panelContentClassName,
  panelCloseClassName,
  children,
}: SidebarSubMenuProps) => {
  const {
    layout,
    expanded,
    activeId,
    openSubId,
    openSub,
    closeSub,
    toggleSub,
    isActiveBranch,
  } = useSidebar();

  const contentRef = useRef<HTMLUListElement>(null);
  const [userCollapsed, setUserCollapsed] = useState(false);

  const isMobile = layout === "mobile";
  const isBranchActive = isActiveBranch(id);
  const hasActiveChild = isBranchActive && activeId !== id;

  useEffect(() => {
    if (hasActiveChild) {
      setUserCollapsed(false);
    }
  }, [activeId, hasActiveChild]);

  const isOpen = isMobile
    ? openSubId === id
    : expanded
      ? openSubId === id || (hasActiveChild && !userCollapsed)
      : openSubId === id;

  useEffect(() => {
    if (isOpen) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && contentRef.current?.contains(active)) {
      active.blur();
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (isMobile) {
      toggleSub(id);
      return;
    }
    if (isOpen) {
      setUserCollapsed(true);
      closeSub();
    } else {
      setUserCollapsed(false);
      openSub(id);
    }
  };

  const showTriggerLabel = isMobile || expanded;

  // Keep children mounted on mobile even when closed so registerItem parent map
  // survives panel close — otherwise parent loses data-active after picking a child.

  const mobilePanel = isMobile
    ? createPortal(
        <>
          <button
            type="button"
            aria-label="Close menu"
            data-open={isOpen ? "" : undefined}
            className={panelBackdropClassName}
            onClick={closeSub}
            inert={isOpen ? undefined : true}
          />
          <div
            role="dialog"
            aria-modal={isOpen ? true : undefined}
            aria-label={typeof label === "string" ? label : undefined}
            data-open={isOpen ? "" : undefined}
            className={panelClassName}
            inert={isOpen ? undefined : true}
          >
            <div className={panelHeaderClassName}>
              <span>{label}</span>
              <SidebarClose className={panelCloseClassName} />
            </div>
            <ul ref={contentRef} className={panelContentClassName}>
              {children}
            </ul>
          </div>
        </>,
        document.body,
      )
    : null;

  const desktopContentClassName = expanded
    ? inlineContentClassName
    : flyoutContentClassName;

  return (
    <SubContext.Provider value={id}>
      <li
        className={className}
        onMouseEnter={() => {
          if (!isMobile && !expanded) openSub(id);
        }}
        onMouseLeave={() => {
          if (!isMobile && !expanded) closeSub();
        }}
      >
        <button
          type="button"
          data-active={isBranchActive ? "" : undefined}
          data-open={isOpen ? "" : undefined}
          aria-expanded={isOpen}
          aria-label={
            !showTriggerLabel && typeof label === "string" ? label : undefined
          }
          className={triggerClassName}
          onClick={handleTriggerClick}
        >
          {icon}
          {showTriggerLabel && label}
        </button>

        {!isMobile && (
          <ul
            ref={contentRef}
            hidden={!isOpen}
            inert={isOpen ? undefined : true}
            data-open={isOpen ? "" : undefined}
            className={desktopContentClassName}
          >
            {!expanded && <li className={flyoutHeadingClassName}>{label}</li>}
            {children}
          </ul>
        )}

        {mobilePanel}
      </li>
    </SubContext.Provider>
  );
};

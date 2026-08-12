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
  triggerClassName?: string;
  // Expanded desktop: inline list below trigger
  inlineContentClassName?: string;
  // Collapsed desktop: flyout panel to the right of trigger
  flyoutContentClassName?: string;
  // Mobile: list inside bottom sheet
  sheetContentClassName?: string;
  sheetClassName?: string;
  sheetBackdropClassName?: string;
  sheetHeaderClassName?: string;
  children: ReactNode;
};

const defaultInlineContentClassName = "mt-1 flex flex-col gap-1 pl-4";
const defaultFlyoutContentClassName =
  "absolute left-full top-0 z-10 min-w-40 rounded  bg-white p-2 shadow";

export const SidebarSubMenu = ({
  id,
  label,
  icon,
  triggerClassName,
  inlineContentClassName,
  flyoutContentClassName,
  sheetContentClassName,
  sheetClassName,
  sheetBackdropClassName,
  sheetHeaderClassName,
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
  // survives sheet close — otherwise parent loses data-active after picking a child.
  const sheet = isMobile
    ? createPortal(
        <>
          <button
            type="button"
            aria-label="Close menu"
            className={isOpen ? sheetBackdropClassName : "hidden"}
            onClick={closeSub}
          />
          <div
            role="dialog"
            aria-modal={isOpen ? true : undefined}
            aria-label={typeof label === "string" ? label : undefined}
            data-open={isOpen ? "" : undefined}
            className={isOpen ? sheetClassName : "hidden"}
            inert={isOpen ? undefined : true}
          >
            <div className={sheetHeaderClassName}>
              <span>{label}</span>
              <SidebarClose />
            </div>
            <ul
              ref={contentRef}
              className={
                sheetContentClassName ?? "flex flex-col gap-1 p-2 pb-6"
              }
            >
              {children}
            </ul>
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <SubContext.Provider value={id}>
      <li
        className="relative"
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
          className={triggerClassName}
          onClick={handleTriggerClick}
        >
          {icon && <span className="inline-flex shrink-0">{icon}</span>}
          {showTriggerLabel && label}
        </button>

        {!isMobile && (
          <ul
            ref={contentRef}
            inert={isOpen ? undefined : true}
            data-open={isOpen ? "" : undefined}
            className={
              isOpen
                ? expanded
                  ? (inlineContentClassName ?? defaultInlineContentClassName)
                  : (flyoutContentClassName ?? defaultFlyoutContentClassName)
                : "hidden"
            }
          >
            {!expanded && <span className="font-bold">{label}</span>}
            {children}
          </ul>
        )}

        {sheet}
      </li>
    </SubContext.Provider>
  );
};

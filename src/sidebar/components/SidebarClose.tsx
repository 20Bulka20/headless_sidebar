import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSidebar } from "../SidebarContext";

type SidebarCloseProps = {
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const SidebarClose = ({
  children,
  onClick,
  ...rest
}: SidebarCloseProps) => {
  const { closeSub } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Close menu"
      onClick={(event) => {
        closeSub();
        onClick?.(event);
      }}
      {...rest}
    >
      {children ?? "×"}
    </button>
  );
};

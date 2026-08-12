import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSidebar } from "../SidebarContext";
import { X } from "lucide-react";

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
      {children ?? <X />}
    </button>
  );
};

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSidebar } from "../SidebarContext";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

type SidebarToggleProps = {
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const SidebarToggle = ({
  children,
  className,
  onClick,
  ...rest
}: SidebarToggleProps) => {
  const { expanded, setExpanded, layout } = useSidebar();

  if (layout === "mobile") return null;

  return (
    <button
      type="button"
      aria-expanded={expanded}
      data-expanded={expanded ? "" : undefined}
      className={className}
      {...rest}
      onClick={(event) => {
        setExpanded(!expanded);
        onClick?.(event);
      }}
    >
      {children ?? (expanded ? <ArrowLeftToLine /> : <ArrowRightToLine />)}
    </button>
  );
};

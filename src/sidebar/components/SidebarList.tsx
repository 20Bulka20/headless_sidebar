import type { ReactNode } from "react";

type SidebarListProps = {
  children: ReactNode;
  className?: string;
};

export const SidebarList = ({ children, className }: SidebarListProps) => {
  return <ul className={className}>{children}</ul>;
};

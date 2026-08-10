import type { ReactNode } from "react";

type SidebarListProps = {
  children: ReactNode;
  listClassName?: string;
};

export const SidebarList = ({ children, listClassName }: SidebarListProps) => {
  return <ul className={` list-none p-0 m-0 ${listClassName}`}>{children}</ul>;
};

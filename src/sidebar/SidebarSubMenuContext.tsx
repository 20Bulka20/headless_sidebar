import { createContext, useContext } from "react";
import type { SidebarId } from "./types";

export const SubContext = createContext<SidebarId | null>(null);

export const useSubParentId = () => useContext(SubContext);

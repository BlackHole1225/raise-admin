"use client";

import { SideContent } from "@/components/Sidebar/index.content";

type SideMenuProps = {
  drawerWidth: number;
  isDrawerOpen: boolean;
};

export const SideMenu: React.FC<SideMenuProps> = ({
  drawerWidth,
  isDrawerOpen,
}) => {
  return <SideContent drawerWidth={drawerWidth} isDrawerOpen={isDrawerOpen} />;
};

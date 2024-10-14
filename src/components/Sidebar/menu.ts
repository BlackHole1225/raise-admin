import { MenuItemType } from "@/types/model/menu";
import { TFunction } from "i18next";

export const createSideBar = (
  commonT: TFunction<string | readonly string[], "metadata">
): Array<MenuItemType> => {
  return [
    {
      name: commonT("users"),
      link: "/users"
      // icon: <InsertDriveFileOutlined />,
    },
    {
      name: commonT("Campaigns"),
      // icon: <TimelineIcon />,
      children: [
        { name: commonT("Kyc"), link: "/campaign" },
        { name: commonT("sidebar.category"), link: "/campaign/categories" },
        { name: commonT("Location"), link: "/campaign/locations" },
      ],
    },
  ];
};


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
      name: commonT("games"),
      // icon: <TimelineIcon />,
      children: [
        { name: commonT("sidebar.games"), link: "/games" },
        { name: commonT("sidebar.category"), link: "/games/categories" },
        { name: commonT("sidebar.genres"), link: "/games/genres" },
      ],
    },
    {
      name: commonT("esports"),
      // icon: <AccountBoxIcon />,
      children: [
        { name: commonT("sidebar.esports"), link: "/esports-games" },
        { name: commonT("sidebar.bets"), link: "/esports-games/bets" },
      ],
    },
    {
      name: commonT("Finance"),
      // icon: <AccountBoxIcon />,
      children: [
        { name: commonT("sidebar.currency"), link: "/finance/currency" },
        { name: commonT("sidebar.blockchain"), link: "/finance/blockchain" },
        { name: commonT("sidebar.withdraw"), link: "/finance/withdraws" },
      ],
    },
    {
      name: commonT("Reports"),
      // icon: <AccountBoxIcon />,
      children: [
        { name: commonT("sidebar.reports"), link: "/reports/report" },
        { name: commonT("sidebar.distributes"), link: "/reports/report" },
      ],
    },
  ];
};


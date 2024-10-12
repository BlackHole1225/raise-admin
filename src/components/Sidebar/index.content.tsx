"use client";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import { AccountCircle, ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import Link from "next/link";
import { theme } from "@/libs/mui";
import { useAuthContext } from "@/contexts/authContext";
import { useTranslation } from "@/i18n/client";
import { LANGUAGE_OPTIONS, NAMESPACE_OPTIONS } from "@/i18n/settings";
import {createSideBar} from "./menu";

import React, { useState } from "react";
import { MenuItemType } from "@/types/model/menu";
import Logo from "../../../public/images/logo_white.svg";


const linkStyle = {
  textDecoration: "none",
  width: "100%",
  fontWeight: "bold",
  color: "#fff",
}
const SingleLevel = ({item}:{item: MenuItemType}) => {
  const pathname = usePathname();
  return (
    <ListItem >
      <Link href={item.link?item.link:''} style={linkStyle}>
        <ListItemButton selected={item.link === pathname}>
          <ListItemText sx={{ ml: 1 }} primary={item.name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

const MultiLevel = ({item}:{item: MenuItemType}) => {
  const { children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const pathname = usePathname();

  return (
    <React.Fragment>
      <ListItem onClick={handleClick}
      sx={{
        "&& .Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          fontWeight: "bold",
        },
      }}>
        <Link  href={item.link?item.link:'#'}  style={linkStyle}>
          <ListItemButton selected={item.link === pathname}>
            <ListItemText sx={{ ml: 1 }} primary={item.name} />
          </ListItemButton>
        </Link>
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >
          {children?.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const MenuItem = ({item}:{item: MenuItemType}) => {
  const Component = item.children ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

type SideContentProps = {
  drawerWidth: number;
  isDrawerOpen: boolean;
};

export const SideContent: React.FC<SideContentProps> = ({
  drawerWidth,
  isDrawerOpen,
}) => {
  const { t: commonT } = useTranslation(
    LANGUAGE_OPTIONS.JAPANESE,
    NAMESPACE_OPTIONS.auction
  );
  const SIDEBAR_ITEMS = createSideBar(commonT);
  const { user } = useAuthContext();
  return (
    user && (
      <Drawer
        sx={{
          width: isDrawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        open={isDrawerOpen}
        variant="persistent"  
        anchor="left"
      >
        <Box
          sx={{ backgroundColor: "#001629", height: "100vh", width: "100%" }}
        >
          <Toolbar>
            <Image src={Logo} width={120} height={30} alt='logo'/>
            <Typography
              sx={{
                color: "white",
                mx: 1,
              }}
            >
            </Typography>
          </Toolbar>
          <List sx={{ color: "#fff" }}>
            {SIDEBAR_ITEMS.map((item, key) => (<MenuItem key={key} item={item} />))}
          </List>
        </Box>{" "}
      </Drawer>
    )
  );
};

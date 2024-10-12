"use client";
import { AppBar, colors, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "@/contexts/authContext";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { theme } from "@/libs/mui";
import { deleteTokenCookie } from "@/libs/cookie";

type AppBarContentProps = {
  drawerWidth: number;
  handleDrawer: () => void;
  isDrawerOpen: boolean;
};

export const AppBarContent: React.FC<AppBarContentProps> = ({
  drawerWidth,
  handleDrawer,
  isDrawerOpen,
}) => {
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    deleteTokenCookie();
    handleClose();
  }

  return (
    user && (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: isDrawerOpen ? `${drawerWidth}px` : "0px",
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent:'space-between' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={() => handleDrawer()}
            edge="start"
            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Link className={link} href={"/"} passHref> */}
          {/* <Image
              width={50}
              height={20}
              gap={1}
              position="center"
              src={"/logo.png"}
              alt={"logo"}
            ></Image> */}
          {/* </Link> */}
          
         {/* {user && ( */}
            <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                
               <AccountCircle sx={{color: theme.palette.primary.main}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    )
  );
};

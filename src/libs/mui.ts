"use client";
import { createTheme } from "@mui/material/styles";
import { blueGrey, red } from "@mui/material/colors";
import { Language } from "@/i18n/settings";

export const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      light: blueGrey[400],
    },
    secondary: {
      main: blueGrey[50],
    },
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 0,
    },
  },
});

export const getDateFormat = (language: Language) => {
  if (language === "ja") {
    return {
      monthAndYear: "YYYY年 MM月",
      monthShort: "MM月",
    };
  } else {
    return {};
  }
};

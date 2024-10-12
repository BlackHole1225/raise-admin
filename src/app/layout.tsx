import type { Metadata } from "next";
import { getTranslation } from "@/i18n";
import {
  LANGUAGE_OPTIONS,
  DEFAULT_NS,
  KEY_PREFIX_OPTIONS,
} from "@/i18n/settings";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "@/contexts/authContext";
import { SnackbarProvider } from "@/contexts/snackbarContext";
import { ShowWrapper } from "@/components/LayoutWrapper";
import { theme } from "@/libs/mui";

export async function generateMetadata({
  params: { lng = LANGUAGE_OPTIONS.JAPANESE },
}) {
  const { t } = await getTranslation(lng, DEFAULT_NS, {
    keyPrefix: KEY_PREFIX_OPTIONS.metadata,
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  style={{ backgroundColor: "#f3f7fa" }}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SnackbarProvider>
              <ShowWrapper>{children}</ShowWrapper>
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

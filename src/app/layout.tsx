import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/src/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  colors: {
    primary: [
      '#FFF0EB',
      '#FFE0D6',
      '#FFD0C1',
      '#FFC0AC',
      '#FFB097',
      '#FFA082',
      '#FF906D',
      '#FF8058',
      '#FF7043',
      '#FF6B35',
    ],
    secondary: [
      '#F3F3F8',
      '#E6E6F0',
      '#DCDCE8',
      '#C8C8D8',
      '#B4B4C8',
      '#A0A0B8',
      '#8C8CA8',
      '#787898',
      '#646488',
      '#1A1A2E',
    ],
  },
  primaryColor: 'primary',
  fontFamily: 'var(--font-secondary)',
  headings: {
    fontFamily: 'var(--font-primary)',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
  },
  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  },
});

export const metadata: Metadata = {
  title: "ReturnRun - Package Return Pickup Service",
  description: "Schedule convenient package return pickups with ReturnRun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider theme={theme}>
          <Navigation />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

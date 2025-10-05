import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import HireMeLauncher from "./components/HireMeLauncher";
import HireMePortal from "./components/HireMePortal";
import { GlobalNav } from "./components/GlobalNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TheYash - Portfolio",
  description: " Services starting at $9 !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlobalNav />
          <HireMeLauncher />
          <HireMePortal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

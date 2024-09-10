import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarContextProvider from "./context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SST",
  description: "SST Electronics Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SidebarContextProvider>
        <body
          className={`bg-[#9568ff1a] ${inter.className}`}
          data-sidebar="open"
        >
          {children}
        </body>
      </SidebarContextProvider>
    </html>
  );
}

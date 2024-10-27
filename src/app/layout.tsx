import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarContextProvider from "./context/SidebarContext";
import { connection } from "@/database/dbConnection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  connection();
  return (
    <html lang="en">
      <SidebarContextProvider>
        <body
          className={`bg-[#9568ff1a] ${inter.className}`}
          data-sidebar="open"
        >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            pauseOnHover
          />
          {children}
        </body>
      </SidebarContextProvider>
    </html>
  );
}

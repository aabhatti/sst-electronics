import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-[#669bbc] flex min-h-screen h-screen w-screen flex-1">
        <Header />
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden ml-[300px] mt-[70px]">
          {children}
        </div>
      </div>
    </>
  );
}

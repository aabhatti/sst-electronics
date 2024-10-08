import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen h-screen w-screen flex-1">
        <Header />
        <Sidebar />
        <div className="page flex flex-col flex-1 overflow-hidden p-6">
          {children}
        </div>
      </div>
    </>
  );
}

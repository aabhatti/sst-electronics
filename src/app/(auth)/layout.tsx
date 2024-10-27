import AuthLoginForm from "@/components/AuthLoginForm";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#9568ff1a] flex items-center justify-center min-h-screen h-screen w-screen flex-1">
      <div className="flex flex-col flex-1 overflow-hidden w-full h-full items-center justify-center ">
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col overflow-hidden w-[500px] m-8">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mb-4 px-4 py-2">
            <h2 className="text-zinc-100 font-bold text-center">
              SST Electronics Center
            </h2>
          </div>
          {children}
          <AuthLoginForm />
        </div>
      </div>
    </div>
  );
}

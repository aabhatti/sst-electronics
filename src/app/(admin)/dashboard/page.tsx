import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";

const Dashboard = async () => {
  const session = await auth();
  console.log("session>>>>", session);
  if (!session?.user) redirect("/login");

  return (
    <div>
      {"Dashboard"}

      <div>Name: {session?.user?.name || ""}</div>
      <div>Email: {session?.user?.email || ""}</div>
      <div>
        <Image
          src={session?.user?.image || ""}
          alt={session?.user?.name || ""}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
};

export default Dashboard;

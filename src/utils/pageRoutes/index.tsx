import { allowedAdmins } from "@/config";
import {
  BiSolidDashboard,
  BiSolidUser,
  BiReceipt,
  BiCopyAlt,
  BiSolidUserDetail,
} from "react-icons/bi";

import { auth } from "@/auth";

interface Route {
  title: string;
  icon: JSX.Element;
  path: string;
}

// Define the routes with proper TypeScript typing
const routes: Route[] = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard />,
    path: "/dashboard",
  },
];

const usersRoute: Route = {
  title: "Users",
  icon: <BiSolidUser />,
  path: "/users",
};

const userDetailsRoute: Route = {
  title: "User Details",
  icon: <BiSolidUserDetail />,
  path: "/details",
};

const dealsRoute: Route = {
  title: "Deals",
  icon: <BiReceipt />,
  path: "/deals",
};

const installmentRoute: Route = {
  title: "Installments",
  icon: <BiCopyAlt />,
  path: "/installments",
};

const profileRoute: Route = {
  title: "Profile",
  icon: <BiSolidUserDetail />,
  path: "/profile",
};

// Use async function with a return type of Promise<Route[]>
export const getPageRoutes = async (): Promise<Route[]> => {
  const session = await auth();
  console.log("session in getPageRoutes>>>>", session);

  const isAdmin = session?.user?.email
    ? allowedAdmins?.includes(session.user.email)
    : false;

  if (isAdmin) {
    return [
      ...routes,
      usersRoute,
      userDetailsRoute,
      dealsRoute,
      installmentRoute,
    ];
  } else {
    return [...routes, profileRoute];
  }
};

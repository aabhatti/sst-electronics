import React from "react";
import Button from "../button";
import { handleLogout } from "@/app/lib/actions";

const Logout = () => {
  return (
    <>
      <Button onClick={handleLogout}>{"Logout"}</Button>
    </>
  );
};

export default Logout;

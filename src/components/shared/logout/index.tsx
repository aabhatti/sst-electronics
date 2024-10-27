"use client";
import React from "react";
import Button from "../button";
import { handleLogout } from "@/lib/actions/auth.actions";

const Logout = () => {
  return (
    <>
      <Button
        onClick={(e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          handleLogout();
        }}
      >
        {"Logout"}
      </Button>
    </>
  );
};

export default Logout;

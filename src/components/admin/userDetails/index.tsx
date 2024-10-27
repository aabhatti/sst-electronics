"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";

const Users = () => {
  const [isUser, setIsUser] = useState(true);

  return <>{isUser ? <UserForm /> : null}</>;
};

export default Users;

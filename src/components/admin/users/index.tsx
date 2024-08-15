"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";

const Users = () => {
  const [isUser, setIsUser] = useState(false);

  return (
    <>
      {isUser ?
        <UserForm /> :
        
        }
    </>
  );
};

export default Users;

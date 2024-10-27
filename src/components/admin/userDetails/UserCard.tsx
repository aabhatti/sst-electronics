"use client";
import React from "react";

interface Data {
  [key: string]: any;
}
const UserCard = ({
  user,
  className = "",
}: {
  user: Data | null;
  className?: string;
}) => {
  const excludesKeys = [
    "_id",
    "id",
    "createdAt",
    "updatedAt",
    "status",
    "firstName",
    "lastName",
  ];
  return (
    <div className={`card bg-info-light grid md:grid-cols-2 ${className}`}>
      {Object.keys(user || {})
        .filter((k) => !excludesKeys.includes(k))
        .map((key) => (
          <p
            className={`flex items-center justify-start p-1 ${
              key === "address" && "md:col-span-2"
            }`}
            key={key}
          >
            <span className="font-semibold uppercase mr-1"> {key}: </span>
            <span className="">{(user && user[key]) || "N/A"}</span>
          </p>
        ))}
    </div>
  );
};

export default UserCard;

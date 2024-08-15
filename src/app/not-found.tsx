"use client";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red">
        Page not found,{" "}
        <Link href={"/"} className="text-primary">
          go to back!
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;

// import { RotatingLines } from "react-loader-spinner";

import Spinner from "@/components/shared/spinner";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[50vh] w-100 flex-1">
        <Spinner />
      </div>
    </>
  );
}

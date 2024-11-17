"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { initialUsersValue, handleFetchUserDetails } from "./helper";
import UserCard from "@/components/admin/userDetails/UserCard";
import DealCard from "@/components/admin/userDetails/DealCard";
import { LuRefreshCw } from "react-icons/lu";
import { throttle } from "lodash";
import Spinner from "@/components/shared/spinner";
import dynamic from "next/dynamic";
const GeneratePdf = dynamic(() => import("@/components/shared/generatePDF"), {
  ssr: false,
});

const Details = ({ params }: { params: { props?: string[] } }) => {
  const userId = params.props ? params.props[0] : "";
  const [data, setData] = useState(initialUsersValue());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleFetchUserDetails({
      id: userId,
      setData: setData,
    });
    //eslint-disable-next-line
  }, []);

  const handleRefresh = useCallback(
    () => handleFetchUserDetails({ id: userId, setData: setData }),
    [userId]
  );

  const throttleRefresh = useMemo(
    () => throttle(handleRefresh, 5000, { trailing: false }),
    [handleRefresh]
  );

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="card flex items-center justify-between">
        <h2 className="m-0">{"User Details"}</h2>
        {data?.user && <GeneratePdf html={ref} fileName={"User Details.pdf"} />}
        {throttleRefresh && (
          <button
            className="btn btn-sm rounded-full bg-baseSecondary hover:bg-primary text-primary hover:text-secondary p-4 border-baseSecondary"
            onClick={throttleRefresh}
            disabled={Boolean(data && data.loading)}
          >
            <LuRefreshCw className="text-xl" />
          </button>
        )}
      </div>

      {data && data.loading && (
        <div className="flex flex-1 fs-4 fw-normal card-table-color items-center justify-center py-4">
          <Spinner color="text-primary" />
        </div>
      )}
      {!data?.user && !data?.loading && (
        <div className="flex flex-1 fs-4 fw-normal card-table-color items-center justify-center py-4">
          <p className="text-primary">No data available</p>
        </div>
      )}

      {/* <div className="max-w-[1200px] m-auto"> */}
      {data?.user && (
        <div className="card" ref={ref}>
          {data.user && <UserCard user={data.user} />}

          {data.deals?.map((deal, index) => (
            <div className="" key={deal.name + index}>
              {data.user && <DealCard deal={deal} loading={data.loading} />}
            </div>
          ))}
        </div>
      )}
    </div>
    // </div>
  );
};

export default Details;

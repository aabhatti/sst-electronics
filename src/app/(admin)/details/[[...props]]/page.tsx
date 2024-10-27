"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  initialUsersValue,
  handleFetchUserDetails,
  headerValues,
} from "./helper";
import Table from "@/components/shared/table";
import { useRouter, useSearchParams } from "next/navigation";
import UserCard from "@/components/admin/userDetails/UserCard";
import DealCard from "@/components/admin/userDetails/DealCard";
import { LuRefreshCw } from "react-icons/lu";
import { throttle } from "lodash";
import Spinner from "@/components/shared/spinner";

const Details = ({ params }: { params: { props?: string[] } }) => {
  const userId = params.props ? params.props[0] : "";
  const [data, setData] = useState(initialUsersValue());

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
      {data.user && <UserCard user={data.user} />}

      {data.deals?.map((deal, index) => (
        <div className="" key={deal.name + index}>
          {data.user && <DealCard deal={deal} loading={data.loading} />}
        </div>
      ))}
    </div>
  );
};

export default Details;

"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  dashboardValues,
  formateAmountRupees,
  handleFetchDashboardSummary,
  initialValues,
} from "./helper";
import Spinner from "@/components/shared/spinner";
import { LuRefreshCw } from "react-icons/lu";
import { throttle } from "lodash";

const Dashboard = () => {
  const [data, setData] = useState(initialValues());

  useEffect(() => {
    handleFetchDashboardSummary({
      setData,
    });
    //eslint-disable-next-line
  }, []);

  const handleRefresh = useCallback(
    () => handleFetchDashboardSummary({ setData }),
    []
  );

  const throttleRefresh = useMemo(
    () => throttle(handleRefresh, 5000, { trailing: false }),
    [handleRefresh]
  );

  const formateValue = (key: string, value: any) =>
    formateAmountRupees.includes(key)
      ? `RS: ${value || 0}/-`
      : `${value || ""}`;
  return (
    <>
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="card flex items-center justify-between">
          <h2 className="m-0">{"Dashboard"}</h2>
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
        {!data.data && !data?.loading && (
          <div className="flex flex-1 fs-4 fw-normal card-table-color items-center justify-center py-4">
            <p className="text-primary">No data available</p>
          </div>
        )}

        {!data?.loading && data?.data && Object.keys(data.data).length > 0 && (
          <div className="flex items-center justify-center -m-5 p-6 gap-4 flex-wrap">
            {Object.keys(dashboardValues).map((key: string) => (
              <div
                key={key}
                className={`card flex-1 flex flex-col items-center justify-center min-w-fit ${
                  (dashboardValues && dashboardValues[key]?.bg) || ""
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">
                  {(dashboardValues && dashboardValues[key]?.name) || key}
                </h3>
                <p className="text-[24px]">
                  {formateValue(key, (data.data && data.data[key]) || "")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* {data?.data &&
          data.data.deal &&
          Object.keys(data.data.deal).length > 0 && (
            <div className="flex items-center justify-center -m-5 p-6 gap-4">
              {Object.keys(data.data.deal).map((key) => (
                <div
                  key={key}
                  className={`card flex-1 flex flex-col items-center justify-center ${
                    (dashboardValues && dashboardValues[key]?.bg) || ""
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {(dashboardValues && dashboardValues[key]?.name) || key}
                  </h3>
                  <p className="text-lg">{data.data?.deal[key]}</p>
                </div>
              ))}
            </div>
          )}

        {data?.data &&
          data.data.installment &&
          Object.keys(data.data.installment).length > 0 && (
            <div className="flex items-center justify-center -m-5 p-6 gap-4">
              {Object.keys(data.data.installment).map((key) => (
                <div
                  key={key}
                  className={`card flex-1 flex flex-col items-center justify-center ${
                    (dashboardValues && dashboardValues[key]?.bg) || ""
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {(dashboardValues && dashboardValues[key]?.name) || key}
                  </h3>
                  <p className="text-lg">{data.data?.installment[key]}</p>
                </div>
              ))}
            </div>
          )} */}
      </div>
    </>
  );
};

export default Dashboard;

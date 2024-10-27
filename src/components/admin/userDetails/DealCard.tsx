"use client";
import React from "react";
import Table from "@/components/shared/table";
import { headerValues, formateData } from "@/app/(admin)/installments/helper";
import { MonthYearDateFormate, addMonthsToDate } from "../../../../utils";
import UserCard from "./UserCard";

interface Data {
  [key: string]: any;
}
const DealCard = ({
  deal,
  loading,
}: {
  deal: Data | null;
  loading: boolean;
}) => {
  const currencyKeys: Record<string, any> = {
    worth: {
      class: "bg-info-light",
      label: "Total Installments",
      value: (deal && deal.noOfInstallments) || 0,
    },
    paid: {
      class: "bg-success-light",
      label: "Paid Installments",
      value: (deal && deal.installments && deal.installments.length) || 0,
    },
    due: {
      class: "bg-danger-light",
      label: "Due Installments",
      value:
        (deal &&
          deal.noOfInstallments &&
          deal.installments &&
          deal.installments.length &&
          Number(
            Number(deal.noOfInstallments) - Number(deal.installments.length)
          )) ||
        0,
    },
  };

  const installments = formateData((deal && deal.installments) || []);
  const noOfInstallments =
    deal && deal.noOfInstallments ? Number(deal.noOfInstallments) - 1 : 0;
  return (
    <div className="card !shadow-none">
      <h2 className="text-center text-primary font-bold !text-4xl mb-0">
        {(deal && deal.name) || "DEAL_NAME"}
      </h2>
      {deal && deal.description && (
        <p className="text-sm text-center m-0">{`(${deal.description})`}</p>
      )}
      {deal && deal.createdAt && (
        <p className="text-md font-semibold text-basePrimary text-center m-0">{`${MonthYearDateFormate(
          deal.createdAt
        )} to ${MonthYearDateFormate(
          addMonthsToDate(deal.createdAt, noOfInstallments)
        )}`}</p>
      )}
      <div className="grid lg:grid-cols-3 mt-2">
        {Object.keys(deal || {})
          .filter((k) => Object.keys(currencyKeys).includes(k))
          .map((key) => (
            <div
              className={`flex flex-col px-4 py-2 ${
                currencyKeys[key]?.class || ""
              }`}
              key={key}
            >
              <p className={`flex items-center justify-start`}>
                <span className="font-semibold text-basePrimary uppercase mr-1">
                  {" "}
                  {key}:{" "}
                </span>
                <span className="font-bold">{`Rs ${
                  (deal && deal[key]) || "N/A"
                }/-`}</span>
              </p>

              <p className={`flex items-center justify-start`}>
                <span className="font-semibold text-basePrimary  mr-1">
                  {" "}
                  {currencyKeys[key]?.label || ""}:{" "}
                </span>
                <span className="font-bold">
                  {currencyKeys[key]?.value || ""}
                </span>
              </p>
            </div>
          ))}
      </div>

      <h2 className="text-primary font-bold mt-4 text-2xl">{"References:"}</h2>
      <div className="grid lg:grid-cols-2 gap-2">
        {deal && deal.referenceOne && (
          <UserCard
            user={deal.referenceOne}
            className="!text-sm rounded-lg p-2 m-0"
          />
        )}
        {deal && deal.referenceTwo && (
          <UserCard
            user={deal.referenceTwo}
            className="!text-sm rounded-lg p-2 m-0"
          />
        )}
      </div>
      <div className="flex flex-1 overflow-hidden m-0 mt-4">
        <Table
          className="!min-h-fit"
          title={"Installment(s):"}
          loading={loading}
          header={headerValues}
          bodyData={installments}
        />
      </div>
    </div>
  );
};

export default DealCard;

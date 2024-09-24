"use client";
import React, { useState, useEffect, useCallback } from "react";
import { initialUsersValue, fetchInstallments, headerValues } from "./helper";
import Table from "@/components/shared/table";
import { useRouter } from "next/navigation";

const Installments = () => {
  const router = useRouter();
  const [data, setData] = useState(initialUsersValue());

  useEffect(() => {
    fetchInstallments({
      page: data.page,
      search: data.search,
      setData: setData,
    });
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search: string) => {
      setData((prev) => ({ ...prev, search }));
      fetchInstallments({ page: data.page, search: search, setData: setData });
    },
    [data.page]
  );

  const handlePagination = useCallback(
    (page: number) => {
      setData((prev) => ({ ...prev, page }));
      fetchInstallments({ page, search: data.search, setData: setData });
    },
    [data.search]
  );

  const handleRefresh = useCallback(() => {
    fetchInstallments({ page: 1, search: data.search, setData: setData });
  }, [data.search]);

  const handleNavigate = () => router.push("/installments/create");
  return (
    <>
      <div className="card">
        <h2 className="m-0">{"Installments"}</h2>
      </div>
      <div className="card flex flex-1 overflow-hidden m-0">
        <Table
          loading={data.loading}
          search={data.search}
          handleSearch={handleSearch}
          header={headerValues}
          bodyData={data.list}
          limit={data?.offset}
          total={data?.total}
          page={data?.page}
          handlePagination={handlePagination}
          handleRefresh={handleRefresh}
          handleCreate={handleNavigate}
        />
      </div>
    </>
  );
};

export default Installments;

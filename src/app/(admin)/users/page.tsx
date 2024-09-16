"use client";
import React, { useState, useEffect, useCallback } from "react";
import { initialUsersValue, fetchUsers, headerUsersValues } from "./helper";
import Table from "@/components/shared/table";
import { useRouter } from "next/navigation";
const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsersValue());

  useEffect(() => {
    fetchUsers({ page: users.page, search: users.search, setData: setUsers });
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search: string) => {
      setUsers((prev) => ({ ...prev, search }));
      fetchUsers({ page: users.page, search: search, setData: setUsers });
    },
    [users.page]
  );

  const handlePagination = useCallback(
    (page: number) => {
      setUsers((prev) => ({ ...prev, page }));
      fetchUsers({ page, search: users.search, setData: setUsers });
    },
    [users.search]
  );

  const handleRefresh = useCallback(() => {
    fetchUsers({ page: 1, search: users.search, setData: setUsers });
  }, [users.search]);

  const handleNavigate = () => router.push("/users/create");
  return (
    <>
      <div className="card">
        <h2 className="m-0">{"users"}</h2>
      </div>
      <div className="card">
        <Table
          loading={users.loading}
          search={users.search}
          handleSearch={handleSearch}
          header={headerUsersValues}
          bodyData={users.list}
          limit={users?.offset}
          total={users?.total}
          page={users?.page}
          handlePagination={handlePagination}
          handleRefresh={handleRefresh}
          handleCreate={handleNavigate}
        />
      </div>
    </>
  );
};

export default Users;

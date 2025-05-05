import { OFFSET } from "../../../utils/constants";
import {
  IHandleFetchUsersParams,
  ICreateUserInput,
  IUpdateUserInput,
  UsersState,
} from "@/utils/interfaces";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import {
  createUser,
  updateUser,
  fetchUsers,
} from "@/lib/actions/users.actions";
import { error, success } from "@/components/shared/alert";
import { HttpStatusCode } from "../../../../constants";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaAddressCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { formatDate } from "@/utils/parser";
import { handleLogout } from "@/lib/actions/auth.actions";

interface ICreateUsersParams {
  data: ICreateUserInput;
  navigate: () => void;
}

interface IUpdateUserParams {
  data: IUpdateUserInput;
  navigate: () => void;
}

// The initial state function
export const initialUsersValue = (): UsersState => {
  return {
    list: [],
    loading: true,
    page: 1,
    offset: OFFSET,
    search: "",
    total: 0,
  };
};

const formatDataObj = (row: any) => {
  return {
    id: row.id,
    date: (
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs">Created At</p>
        <h2 className="text-sm">{formatDate(row.createdAt)}</h2>
        <p className="text-xs">Updated At</p>
        <h2 className="text-sm">{formatDate(row.updatedAt)}</h2>
      </div>
    ),
    name: (
      <div className="flex items-center justify-start">
        <div className="cursor-pointer text-md">
          <Link href={`/details/${row.id}`} className="text-primary">
            {row.name}
          </Link>
        </div>
      </div>
    ),
    info: (
      <div className="flex flex-col max-w-[300px]">
        {/* <p className="w-5 text-sm">{row.id}</p> */}
        <h2 className="flex items-center text-sm">
          <FaAddressCard className="font-bold mr-1 min-w=[16px]" />
          {row.cnic || "N/A"}
        </h2>

        <h2 className="flex items-center text-sm">
          <FaEnvelope className="font-bold mr-1 min-w=[16px]" />
          {row.email ? <a href={`mailto:${row.email}`}>{row.email}</a> : "N/A"}
        </h2>
        <h2 className="flex items-center text-sm">
          <FaPhoneAlt className="font-bold mr-1 min-w=[16px]" />
          {row.mobile ? <a href={`tel:${row.mobile}`}>{row.mobile}</a> : "N/A"}
        </h2>
        <h2 className="flex items-start text-sm">
          <FaMapMarkerAlt className="font-bold mr-1 min-w=[16px]" />
          {row.address || "N/A"}
        </h2>
      </div>
    ),

    address: row.address || "N/A",
    status: row.status || "N/A",
    total: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount:{" "}
          <span className="font-semibold">{`Rs ${row.totalWorth}/-`}</span>
        </span>
        <span className="text-md">
          Installments:
          <span className="font-semibold">{row.totalInstallments}</span>
        </span>
        <span className="text-md">
          No of Deals:
          <span className="font-semibold">{row.noOfDeals}</span>
        </span>
      </div>
    ),
    paid: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount:
          <span className="font-semibold">{`Rs ${row.totalPaid}/-`}</span>
        </span>
        <span className="text-md">
          Installments:{" "}
          <span className="font-semibold"> {row.totalPaidInstallments}</span>
        </span>
      </div>
    ),
    due: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount:{" "}
          <span className="font-semibold"> {`Rs ${row.totalDue}/-`}</span>
        </span>
        <span className="text-md">
          Installments:{" "}
          <span className="font-semibold">
            {Number(row.totalInstallments) - Number(row.totalPaidInstallments)}
          </span>
        </span>
      </div>
    ),
    action: (
      <div className="flex items-center justify-center">
        <div className="p-1 cursor-pointer">
          <Link href={`/users/edit/${row.id}`} className="text-primary">
            <FaEdit />
          </Link>
        </div>
      </div>
    ),
  };
};

const formateData = (data: any) =>
  data?.length > 0 ? data.map((row: any) => formatDataObj(row)) : [];

// The fetchUsers function
export const handleFetchUsers = async ({
  page,
  search,
  setData,
}: IHandleFetchUsersParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));
    const resp = await fetchUsers({ page, offset: OFFSET, search });
    if (resp?.status === HttpStatusCode.UNAUTHORIZED) {
      handleLogout();
    }
    if (resp.status === HttpStatusCode.OK) {
      setData((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list: formateData(resp?.data?.list || []),
        page,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: [],
        total: 0,
        page,
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: [], total: 0, page }));
  }
};

// The create user handler
export const handleCreateUser = async ({
  data,
  navigate,
}: ICreateUsersParams): Promise<void> => {
  try {
    const resp = await createUser(data);
    if (resp?.code === HttpStatusCode.CREATED) {
      if (resp.message) success(resp.message.toString());
      navigate && navigate();
    } else {
      if (resp?.message) error(resp.message.toString());
    }
  } catch (err) {
    if (err instanceof Error) {
      error(err?.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};

// The update user handler function
export const handleUpdateUser = async ({
  data,
  navigate,
}: IUpdateUserParams): Promise<void> => {
  try {
    const resp = await updateUser(data);
    if (resp?.code === HttpStatusCode.OK) {
      if (resp.message) success(resp.message.toString());
      navigate && navigate();
    } else {
      if (resp?.message) error(resp.message.toString());
    }
  } catch (err) {
    if (err instanceof Error) {
      error(err?.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};

export const headerUsersValues = [
  {
    type: "string",
    name: "Date",
    value: "date",
    bg: "primary-light",
    className: "text-center",
  },
  { type: "string", name: "Name", value: "name", bg: "primary-light" },
  { type: "string", name: "Info", value: "info", bg: "primary-light" },
  // { type: "string", name: "Status", value: "status", bg: "primary-light" },
  { type: "string", name: "Total", value: "total", bg: "info-light" },
  { type: "string", name: "Paid", value: "paid", bg: "success-light" },
  { type: "string", name: "Due", value: "due", bg: "danger-light" },
  { type: "string", name: "Action", value: "action", bg: "primary-light" },
];

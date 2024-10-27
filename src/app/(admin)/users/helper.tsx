import { OFFSET } from "../../../utils/constants";
import {
  IHandleFetchUsersParams,
  ICreateUserInput,
  UsersState,
} from "@/utils/interfaces";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { createUser, fetchUsers } from "@/lib/actions/users.actions";
import { error, success } from "@/components/shared/alert";
import { HttpStatusCode } from "../../../../constants";

interface ICreateUsersParams {
  data: ICreateUserInput;
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
    name: (
      <div className="flex items-center justify-center">
        <div className="p-1 cursor-pointer">
          <Link href={`/details/${row.id}`} className="text-primary">
            {row.name}
          </Link>
        </div>
      </div>
    ),
    // name: row.name,
    email: row.email,
    mobile: row.mobile,
    cnic: row.cnic,
    address: row.address,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    action: (
      <div className="flex items-center justify-center">
        <div className="p-1 cursor-pointer">
          <Link href={`/users/${row.id}`} className="text-primary">
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

// The fetchUsers function
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

export const headerUsersValues = [
  { type: "string", name: "User ID", value: "id" },
  { type: "string", name: "Name", value: "name" },
  { type: "string", name: "Email", value: "email" },
  { type: "string", name: "Mobile", value: "mobile" },
  { type: "string", name: "CNIC", value: "cnic" },
  { type: "string", name: "Address", value: "address" },
  { type: "string", name: "Status", value: "status" },
  { type: "date", name: "Created At", value: "createdAt" },
  { type: "date", name: "Updated At", value: "updatedAt" },
  { type: "string", name: "Action", value: "action" },
];

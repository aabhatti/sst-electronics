import { parseUrl } from "../../../config/helper";
import { OFFSET, METHODES, HTTP_STATUS_CODE } from "../../../utils/constants";
import { AdminUrls } from "../../../utils/routes";
import { ExecuteHttpRequest } from "../../../config/ExecuteHttpRequest";
import { ICreateUserInput } from "@/utils/interfaces";

// Define the types for the user data and state
interface User {
  // Define properties for a User if necessary
}

interface UsersState {
  list: User[];
  loading: boolean;
  page: number;
  offset: number;
  search: string;
  total: number;
}

// Define the types for the fetchUsers function parameters
interface FetchUsersParams {
  page: number;
  search: string;
  setData: React.Dispatch<React.SetStateAction<UsersState>>;
}

// Define the types for the fetchUsers function parameters
interface ICreateUsersParams {
  data: ICreateUserInput;
  //   navigate: () => void;
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

// The fetchUsers function
export const fetchUsers = async ({
  page,
  search,
  setData,
}: FetchUsersParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const url = parseUrl(AdminUrls.fetchAllUsers(page, OFFSET, search));
    const resp = await ExecuteHttpRequest(METHODES.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list: resp?.data?.list || [],
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
}: //   navigate,
ICreateUsersParams): Promise<void> => {
  try {
    const resp = await ExecuteHttpRequest(
      METHODES.POST,
      AdminUrls.createUser,
      data
    );
    console.log("resp>>>", resp);
    // navigate && navigate();
  } catch (err) {
    console.log("err>>>>", err);
  }
};

export const headerUsersValues = [
  { type: "string", name: "Name", value: "name" },
  { type: "string", name: "Email", value: "email" },
  { type: "string", name: "Status", value: "status" },
  { type: "string", name: "Created At", value: "createdAt" },
  { type: "string", name: "Updated At", value: "updatedAt" },
  //   { type: "string", name: "Action", value: "action" },
];

import { HTTP_STATUS_CODE } from "../../../utils/constants";
import { queryFetchUsers } from "@/lib/actions/users.actions";

interface Data {
  id: string;
  url?: string;
  [key: string]: any;
}

interface StateData {
  list: Data[] | [];
  loading: boolean;
  search: string;
}

// Define the types for the fetchUsers function parameters
interface FetchParams {
  query: string;
  setData: React.Dispatch<React.SetStateAction<StateData>>;
}

// The initial state function
export const initialUsersValue = (): StateData => {
  return {
    list: [],
    loading: false,
    search: "",
  };
};

const formateData = (data: any) =>
  data?.length > 0
    ? data.map((row: any) => ({
        id: row.id,
        name: `${row.name} (${row.cnic})`,
      }))
    : [];

// The fetch on the base of search query (users) function
export const queryUsers = async ({
  query = "",
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await queryFetchUsers(query);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: formateData(resp?.data || []),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: [],
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: [] }));
  }
};

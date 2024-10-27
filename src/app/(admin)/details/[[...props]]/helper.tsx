import { HttpStatusCode } from "../../../../../constants";
import { error, success } from "@/components/shared/alert";
import { fetchUserDetails } from "@/lib/actions/users.actions";

interface Data {
  [key: string]: any;
}
interface StateData {
  user: Data | null;
  deals: Data[] | [];
  loading: boolean;
}

// Define the types for the fetchUserDetails function parameters
interface FetchParams {
  id: string;
  setData: React.Dispatch<React.SetStateAction<StateData>>;
}

// The initial state function
export const initialUsersValue = (): StateData => {
  return {
    user: null,
    deals: [],
    loading: true,
  };
};

// The fetchUsers function
export const handleFetchUserDetails = async ({
  id,
  setData,
}: FetchParams): Promise<void> => {
  console.log("clicked in handleFetchUserDetails");

  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await fetchUserDetails(id);
    if (resp.status === HttpStatusCode.OK) {
      const { deals, ...user } = resp.data;
      setData((prev) => ({
        ...prev,
        loading: false,
        user: user || null,
        deals: deals || [],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        user: null,
        deals: [],
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, user: null, deals: [] }));
  }
};

export const headerValues = [
  { type: "string", name: "ID", value: "id" },
  { type: "string", name: "Name", value: "name" },
  { type: "string", name: "User Name", value: "userName" },
  { type: "string", name: "Description", value: "description" },
  { type: "component", name: "References", value: "references" },
  { type: "string", name: "Worth", value: "worth" },
  { type: "string", name: "Advance", value: "advance" },
  { type: "string", name: "Due", value: "due" },
  { type: "date", name: "Created At", value: "createdAt" },
  { type: "date", name: "Updated At", value: "updatedAt" },
  //   { type: "string", name: "Action", value: "action" },
];

import { parseUrl } from "../../../config/helper";
import { OFFSET, METHODES, HTTP_STATUS_CODE } from "../../../utils/constants";
import { AdminUrls } from "../../../utils/routes";
import { ExecuteHttpRequest } from "../../../config/ExecuteHttpRequest";
import { ICreateInstallmentInput } from "@/utils/interfaces";

interface Data {}

interface StateData {
  list: Data[];
  loading: boolean;
  page: number;
  offset: number;
  search: string;
  total: number;
}

// Define the types for the fetchUsers function parameters
interface FetchParams {
  page: number;
  search: string;
  setData: React.Dispatch<React.SetStateAction<StateData>>;
}

// Define the types for the fetchUsers function parameters
interface ICreateParams {
  data: ICreateInstallmentInput;
  navigate: () => void;
}

// The initial state function
export const initialUsersValue = (): StateData => {
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
export const fetchInstallments = async ({
  page,
  search,
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const url = parseUrl(AdminUrls.fetchAllInstallments(page, OFFSET, search));
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

// create installment handler
export const handleCreateInstallment = async ({
  data,
  navigate,
}: ICreateParams): Promise<void> => {
  try {
    const resp = await ExecuteHttpRequest(
      METHODES.POST,
      AdminUrls.createInstallment,
      data
    );
    console.log("resp>>>", resp);
    if (resp && resp.status === 200) {
      navigate && navigate();
    } else {
      // show error message to the user
    }
  } catch (err) {
    console.log("err>>>>", err);
  }
};

export const headerValues = [
  { type: "string", name: "User Name", value: "userName" },
  { type: "string", name: "Deal", value: "dealName" },
  { type: "string", name: "Amount", value: "amount" },
  { type: "date", name: "Created At", value: "createdAt" },
  { type: "date", name: "Updated At", value: "updatedAt" },
  //   { type: "string", name: "Action", value: "action" },
];

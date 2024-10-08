import { parseUrl } from "../../../config/helper";
import { OFFSET, METHODES, HTTP_STATUS_CODE } from "../../../utils/constants";
import { AdminUrls } from "../../../utils/routes";
import { ExecuteHttpRequest } from "../../../config/ExecuteHttpRequest";
import { ICreateDealInput } from "@/utils/interfaces";

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
interface ICreateDealParams {
  data: ICreateDealInput;
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

const formatDataObj = (row: any) => {
  return {
    id: row.id,
    name: row.name,
    userName: row.userName,
    due: row.due,
    worth: row.worth,
    advance: row.advance,
    description: row.description,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    references: (
      <div className="flex flex-col">
        <div className="flex flex-col">
          <span>{row.referenceOne.name}</span>
          <span>{row.referenceOne.cnic}</span>
        </div>
        <div className="flex flex-col">
          <span>{row.referenceTwo.name}</span>
          <span>{row.referenceTwo.cnic}</span>
        </div>
      </div>
    ),
  };
};
const formateDeals = (data: any) =>
  data?.length > 0 ? data.map((row: any) => formatDataObj(row)) : [];

// The fetchUsers function
export const fetchDeals = async ({
  page,
  search,
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const url = parseUrl(AdminUrls.fetchAllDeals(page, OFFSET, search));
    const resp = await ExecuteHttpRequest(METHODES.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list: formateDeals(resp?.data?.list || []),
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

// create deal handler
export const handleCreateDeal = async ({
  data,
  navigate,
}: ICreateDealParams): Promise<void> => {
  try {
    const resp = await ExecuteHttpRequest(
      METHODES.POST,
      AdminUrls.createDeal,
      data
    );
    console.log("resp>>>", resp);
    if (resp.status === 200) {
      navigate && navigate();
    } else {
      // show errror
    }
  } catch (err) {
    console.log("err>>>>", err);
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

import { OFFSET } from "../../../utils/constants";
import { ICreateDealInput } from "@/utils/interfaces";
import { createDeal, fetchDeals } from "@/lib/actions/deals.actions";
import { HttpStatusCode } from "../../../../constants";
import { error, success } from "@/components/shared/alert";
import { DayMonthYearDateFormate } from "../../../../utils";
import Link from "next/link";

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
    date: row.date ? row.date : DayMonthYearDateFormate(row.createdAt),
    deal: (
      <>
        <p className="w-5 text-sm">{row.id}</p>
        <h2 className="font-semibold text-md text-primary">{row.name}</h2>
        {row.description && (
          <p className="text-sm text-basePrimary">{`(${row.description})`}</p>
        )}
      </>
    ),
    userName: (
      <div className="flex items-center justify-start">
        <div className="cursor-pointer">
          <Link
            href={`/details/${row.userId}`}
            className="text-primary text-md"
          >
            {row.userName}
          </Link>
        </div>
      </div>
    ),
    references: (
      <div className="flex items-center justify-start">
        <div className="flex flex-col text-xs">
          <span>{row.referenceOne.name}</span>
          <span>CNIC: {row.referenceOne.cnic || "N/A"}</span>
          <span>Mobile: {row.referenceOne.mobile || "N/A"}</span>
        </div>
        <div className="flex flex-col text-xs border-s border-primary ml-2 pl-2">
          <span>{row.referenceTwo.name}</span>
          <span>CNIC: {row.referenceTwo.cnic || "N/A"}</span>
          <span>Mobile: {row.referenceTwo.mobile || "N/A"}</span>
        </div>
      </div>
    ),
    total: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount: <span className="font-semibold">{`Rs ${row.worth}/-`}</span>
        </span>
        <span className="text-md">
          Installments:
          <span className="font-semibold">{row.noOfInstallments}</span>
        </span>
      </div>
    ),
    paid: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount:
          <span className="font-semibold">{`Rs ${row.paid}/-`}</span>
        </span>
        <span className="text-md">
          Installments:{" "}
          <span className="font-semibold"> {row.paidInstallments}</span>
        </span>
      </div>
    ),
    due: (
      <div className="flex flex-col">
        <span className="text-md">
          Amount: <span className="font-semibold"> {`Rs ${row.due}/-`}</span>
        </span>
        <span className="text-md">
          Installments:{" "}
          <span className="font-semibold">
            {Number(row.noOfInstallments) - Number(row.paidInstallments)}
          </span>
        </span>
      </div>
    ),
  };
};
const formateData = (data: any) =>
  data?.length > 0 ? data.map((row: any) => formatDataObj(row)) : [];

// The fetchUsers function
export const handleFetchDeals = async ({
  page,
  search,
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await fetchDeals({ page, offset: OFFSET, search });

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

// create deal handler
export const handleCreateDeal = async ({
  data,
  navigate,
}: ICreateDealParams): Promise<void> => {
  try {
    const resp = await createDeal(data);
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

export const headerValues = [
  { type: "string", name: "Date", value: "date", bg: "primary-light" },
  { type: "string", name: "Deal", value: "deal", bg: "primary-light" },
  { type: "string", name: "User Name", value: "userName", bg: "primary-light" },
  {
    type: "component",
    name: "References",
    value: "references",
    bg: "info-light",
  },
  { type: "string", name: "Total", value: "total", bg: "info-light" },
  { type: "string", name: "Paid", value: "paid", bg: "success-light" },
  { type: "string", name: "Due", value: "due", bg: "danger-light" },
];

import { OFFSET, METHODES, HTTP_STATUS_CODE } from "../../../utils/constants";
import { ICreateInstallmentInput } from "@/utils/interfaces";
import {
  createInstallment,
  fetchInstallments,
} from "@/lib/actions/installments.actions";
import { HttpStatusCode } from "../../../../constants";
import { error, success } from "@/components/shared/alert";
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
export const handleFetchInstallments = async ({
  page,
  search,
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await fetchInstallments({ page, offset: OFFSET, search });

    if (resp.status === HTTP_STATUS_CODE.OK) {
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

export const formateData = (data: any) =>
  data?.length > 0 ? data.map((row: any) => formatDataObj(row)) : [];

const formatDataObj = (row: any) => {
  return {
    id: row.id,
    date: row.date,
    userName: (
      <div className="flex items-center justify-start">
        <div className="cursor-pointer">
          <Link href={`/details/${row.userId}`} className="text-primary">
            {row.userName}
          </Link>
        </div>
      </div>
    ),
    dealName: row.dealName,
    receipt: row.receipt ? (
      <a
        href={row.receipt.replace("/public", "")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        Receipt.pdf
      </a>
    ) : (
      "N/A"
    ),

    status: row.status ? row.status.toUpperCase() : "N/A",
    amount: `Rs ${row.amount || 0}/-`,
    dealDues: `Rs ${row.dealDues || 0}/-`,
  };
};

// create installment handler
export const handleCreateInstallment = async ({
  data,
  navigate,
}: ICreateParams): Promise<void> => {
  try {
    const resp = await createInstallment(data);
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
  { type: "string", name: "User Name", value: "userName", bg: "primary-light" },
  { type: "string", name: "Deal", value: "dealName", bg: "primary-light" },
  { type: "string", name: "Receipt", value: "receipt", bg: "info-light" },
  { type: "string", name: "Status", value: "status", bg: "success-light" },
  { type: "string", name: "Amount", value: "amount", bg: "success-light" },
  { type: "string", name: "Due", value: "dealDues", bg: "danger-light" },
];

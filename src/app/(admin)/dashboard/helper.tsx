import { handleLogout } from "@/lib/actions/auth.actions";
import { HttpStatusCode } from "../../../../constants";
// import { error, success } from "@/components/shared/alert";
import { fetchDashboardSummary } from "@/lib/actions/dashboard.actions";

// interface Summary {
//   [key: string]: number;
// }

// interface Installment {
//   [key: string]: number;
// }

// interface Deal {
//   [key: string]: number;
// }

interface Data {
  [key: string]: number;
}

interface StateData {
  data: Data | null;
  loading: boolean;
}

// Define the types for the fetchUserDetails function parameters
interface FetchParams {
  setData: React.Dispatch<React.SetStateAction<StateData>>;
}

// The initial state function
export const initialValues = (): StateData => {
  return {
    data: null,
    loading: true,
  };
};

// The fetch Dashboard summary function
export const handleFetchDashboardSummary = async ({
  setData,
}: FetchParams): Promise<void> => {
  try {
    setData((prev) => ({ ...prev, loading: true }));
    const resp = await fetchDashboardSummary();
    if (resp?.status === HttpStatusCode.UNAUTHORIZED) {
      handleLogout();
    }

    if (resp && resp.status === HttpStatusCode.OK) {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: resp.data || null,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  } catch (err) {
    console.log("err handleFetchDashboardSummary>>>", err);
    setData((prev) => ({ ...prev, loading: false }));
  }
};

interface DashboardValuesType {
  [key: string]: {
    name: string;
    bg: string;
  };
}

export const dashboardValues: DashboardValuesType = {
  totalDealOpen: {
    name: "Total Deals Open",
    bg: "bg-info-light",
  },
  totalDueInstallments: {
    name: "Total Due Installments",
    bg: "bg-primary-light",
  },
  totalAmountPending: {
    name: "Total Amount Due",
    bg: "bg-danger-light",
  },

  // totalAmountInvest: {
  //   name: "Total Amount Investment",
  //   bg: "bg-info-light",
  // },
  // totalAmountReceived: {
  //   name: "Total Amount Received",
  //   bg: "bg-success-light",
  // },

  // totalNoOfInstallments: {
  //   name: "Total no of Installments",
  //   bg: "bg-info-light",
  // },
  // totalPaidInstallments: {
  //   name: "Total Paid Installments",
  //   bg: "bg-success-light",
  // },

  // totalNoOfDeal: {
  //   name: "Total No Of Deals",
  //   bg: "bg-info-light",
  // },
  // totalDealClose: {
  //   name: "Total Deals Closed",
  //   bg: "bg-success-light",
  // },
};

export const formateAmountRupees: [key: string] = ["totalAmountPending"];

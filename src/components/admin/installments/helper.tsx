import { error, success } from "../../shared/alert";
import { HttpStatusCode } from "../../../../constants";
import { fetchDealsByUserId } from "@/lib/actions/deals.actions";

interface Deal {
  id: string;
  [key: string]: any;
}

interface DealsState {
  loading: boolean;
  data: Deal[] | [];
}

// The initial state function
export const initialDealsValue = (): DealsState => {
  return {
    loading: false,
    data: [],
  };
};

interface IHandleFetchUserDealsByUserId {
  userId: string;
  setDeals: React.Dispatch<React.SetStateAction<DealsState>>;
}

export const paymentMethodeOptions = [
  {
    id: "cash",
    name: "Cash",
  },
  {
    id: "account",
    name: "Account",
  },
];
// The fetchUser by Id function
export const handleFetchUserDealsByUserId = async ({
  userId,
  setDeals,
}: IHandleFetchUserDealsByUserId): Promise<void> => {
  try {
    setDeals((prev) => ({ ...prev, loading: true }));
    const resp = await fetchDealsByUserId(userId);
    if (resp?.code === HttpStatusCode.OK) {
      setDeals({
        data: resp.data,
        loading: false,
      });
    } else {
      if (resp?.message) error(resp.message.toString());
      setDeals((prev) => ({ ...prev, loading: false }));
    }
  } catch (err) {
    setDeals((prev) => ({ ...prev, loading: false }));
    if (err instanceof Error) {
      error(err?.message);
    } else {
      error("An unknown error occurred.");
    }
  }
};

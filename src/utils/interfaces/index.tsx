interface ILoginInput {
  email: string;
  password: string;
}

interface IRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ICreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  cnic: string;
  address: string;
}

interface IUpdateUserInput extends ICreateUserInput {
  id: string;
}

interface ICreateDealInput {
  userId: string;
  name: string;
  description: string;
  worth: number;
  advance: number;
  noOfInstallments: number;
  referenceOne: string;
  referenceTwo: string;
}

interface ICreateInstallmentInput {
  userId: string;
  dealId: string;
  amount: number;
}

interface User {}

interface UsersState {
  list: User[];
  loading: boolean;
  page: number;
  offset: number;
  search: string;
  total: number;
}
interface IHandleFetchUsersParams {
  page: number;
  search: string;
  setData: React.Dispatch<React.SetStateAction<UsersState>>;
}

interface IFetchUsersParams {
  page: number;
  search: string;
  offset: number;
}

interface IFetchWithPageOffsetSearchParams {
  page: number;
  search: string;
  offset: number;
}
export type {
  ILoginInput,
  IRegisterInput,
  ICreateUserInput,
  IUpdateUserInput,
  ICreateDealInput,
  ICreateInstallmentInput,
  IHandleFetchUsersParams,
  UsersState,
  IFetchUsersParams,
  IFetchWithPageOffsetSearchParams,
};

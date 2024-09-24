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

interface ICreateDealInput {
  userId: string;
  name: string;
  description: string;
  worth: number;
  advance: number;
  referenceOne: string;
  referenceTwo: string;
}

interface ICreateInstallmentInput {
  userId: string;
  dealId: string;
  amount: number;
}
export type {
  ILoginInput,
  IRegisterInput,
  ICreateUserInput,
  ICreateDealInput,
  ICreateInstallmentInput,
};

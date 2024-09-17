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
export type { ILoginInput, IRegisterInput, ICreateUserInput };

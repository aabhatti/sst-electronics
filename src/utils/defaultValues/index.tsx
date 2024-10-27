const loginDefaultValues = {
  email: "",
  password: "",
};

const registerDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const createUserDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  cnic: "",
  address: "",
};

const createDealDefaultValues = {
  userId: "",
  name: "",
  description: "",
  worth: 0,
  advance: 0,
  noOfInstallments: 12,
  referenceOne: "",
  referenceTwo: "",
};

const createInstallmentDefaultValues = {
  userId: "",
  dealId: "",
  amount: 0,
};

export {
  loginDefaultValues,
  registerDefaultValues,
  createUserDefaultValues,
  createDealDefaultValues,
  createInstallmentDefaultValues,
};

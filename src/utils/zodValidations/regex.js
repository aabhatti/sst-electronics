export const alphanumericRegex = /^[A-Za-z0-9\s]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-!_@#$%^&*])(?=.{8,})/;
export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const nameRegex = /^[A-Za-z\s]+$/;
export const walletAddressRegex = /^[a-zA-Z0-9]{26,42}$/;
export const bsbRegex = /^[0-9]{3}-[0-9]{3}$/;
export const bankAccountTitleRegex = /^[a-zA-Z\s']+$/;

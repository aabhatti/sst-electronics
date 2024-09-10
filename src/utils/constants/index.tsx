export const OFFSET = Number(process.env.REACT_APP_PAGE_OFFSET) || 10;
export const DEBOUNCE_TIME = 1000;

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NOT_EXECUTE: 210,
  NOT_FOUND: 404,
  Expectation_Failed: 417,
  CONFLICT: 409,
};

export const LENGTH = {
  MAX_30: "Maximum 30 characters",
  MAX_60: "Maximum 60 characters",
  MAX_13: "Maximum 13 characters",
  MAX_11: "Maximum 11 characters",
  MAX_100: "Maximum 100 characters",
};

export const SERVICE_ERROR = "Something went wrong, Please try again.";
export const HTTP_REQUEST_ERROR = {
  INCORRECT_METHOD: (method: string = "") => {
    return `Unsupported method: ${method}`;
  },
};
export const ERRORS = {
  NUMERICAL_VALUE_REQUIRED: "Input numerical value to continue",
  NON_ZERO_VALUE_REQUIRED: "Value must be above 0",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email",
  FIRST_NAME_REQUIRED: "First name is required",
  FIRST_NAME_INVALID: "First name must contain only alphabetic characters",
  NAME_REQUIRED: "Name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  LAST_NAME_INVALID: "Last name must contain only alphabetic characters",
  NAME_INVALID: "Name must contain only alphanumeric characters and spaces",
  DOB_REQUIRED: "Date of birth is required",
  DOB_MIN_INVALID: "Minimum age requirement of 18 years",
  DOB_MAX_INVALID: "Maximum date range greater than 1900",
  CONTACT_NUMBER_INVALID: "Please enter a valid contact number",
  CURRENT_PASSWORD_REQUIRED: "Current password is required",
  NEW_PASSWORD_INVALID:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Character",
  DUPLICATE_NEW_PASSWORD: "New password should be different from old password",
  PASSWORD_NOT_MATCHED: "Passwords do not match",
  VERIFICATION_CODE_REQUIRED: "Verification code is required",
  VERIFICATION_CODE_INVALID: "Please input the 6 digits 2FA code",
  COIN_REQUIRED: "Select a coin to continue",
  QUANTITY_MIN_REQUIRED: "Minimum 0.00000001 required",
  AMOUNT_MIN_REQUIRED: "Minimum 0.01 required",
  WALLET_ADDRESS_REQUIRED: "Enter wallet address to continue",
  WALLET_ADDRESS_INVALID: "Invalid address",
  BSB_REQUIRED: "Please enter valid BSB",
  BANK_ACCOUNT_NUMBER_REQUIRED: "Bank Account Number is required",
  BANK_ACCOUNT_MAX_LENGTH:
    "Bank Account Number must be at most 20 characters long",
  BANK_ACCOUNT_TITLE_REQUIRED: "Bank Account Title is required",
  BANK_ACCOUNT_TITLE_MAX_LENGTH:
    "Bank Account Title must be at most 100 characters long",
  BANK_ACCOUNT_TITLE_INVALID:
    "Bank Account Title must contain only letters, spaces, and apostrophes",
  BANK_ACCOUNT_REQUIRED: "Select bank account to continue",
  WITHDRAW_MIN_AMOUNT_REQUIRED: "Minimum 100 required",
  AMOUNT_REQUIRED: "Amount is required",
  ID_REQUIRED: "Id is required",
  PASSWORD_REQUIRED: "Password is required",
  LOGIN_KEY_REQUIRED: "Login Key is required",
  COIN_SELECTION_REQUIRED: "Coin must be selected",
  FACTOR_INVALID: "Factor should be between 0 and 100",
  BALANCE_NON_ZERO_REQUIRED: "Balance should be greater than 0",
  NOTES_REQUIRED: "Please enter notes",
  NOTES_INVALID_LENGTH: "Notes should be less than 1000 characters",
  VIDEO_CALL_LINK_REQUIRED: "Please enter video call link",
  ADD_EMAIL_REQUIRED: "Please enter email",
  ADD_EMAIL_INVALID: "Please enter a valid email",
  ORGANIZATION_NAME_REQUIRED: "Organization Name is required",
  ORGANIZATION_NAME_INVALID:
    "Organization name must contain only alphanumeric characters and spaces",
  CNIC_REQUIRED: "CNIC is required",
  CNIC_INVALID: "CNIC must contain only numbers",
  MOBILE_REQUIRED: "Mobile number is required",
  MOBILE_INVALID: "Mobile number must contain only numbers",
  ADDRESS_REQUIRED: "Address is required",
  ADDRESS_INVALID:
    "Address must contain only alphanumeric characters and spaces",
};

export const GENERIC = {
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  SUBMIT: "Submit",
};

export const TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  DATE: "date",
  NUMBER: "number",
  RANGE: "range",
};

export const LABELS = {
  EMAIL: "Email*",
  EMAIL_2: "E-mail*",
  NEW_EMAIL: "New Email*",
  PASSWORD: "Password*",
  CONFIRM_PASSWORD: "Confirm Password*",
  NAME: "Name*",
  FIRST_NAME: "First Name*",
  LAST_NAME: "Last Name*",
  DOB: "DOB*",
  DATE_OF_BIRTH: "Date of Birth",
  ROLE: "Role*",
  VERIFICATION_CODE: "Verification Code*",
  CONTACT_NUMBER: "Phone",
  CONTACT_NO: "Contact No.",
  CURRENT_PASSWORD: "Current Password*",
  NEW_PASSWORD: "New Password*",
  CONFIRM_NEW_PASSWORD: "Confirm New Password*",
  PRICE: "Price",
  AMOUNT: "Amount",
  TOTAL: "Total",
  GO_TO_BACK: "Go to Back",
  ERROR_404: "404",
  ACCOUNT_NOT_FOUND: "The page you were looking for is not found",
  ACCOUNT_NOT_FOUND_DESC:
    "You may have mistyped the address or the page may have moved.",
  BSB: "BSB*",
  BANK_ACCOUNT_NUMBER: "Bank Account Number*",
  BANK_ACCOUNT_TITLE: "Bank Account Title*",
  COINS: "Coins",
  COIN_REQUIRED: "Coin*",
  BALANCE_REQUIRED: "Balance*",
  QUANTITY_REQUIRED: "Quantity*",
  VARIANT_FACTOR_REQUIRED: "Variant Factor*",
  NOTES: "Write Notes*",
  VIDEO_LINK: "Video Link*",
  DATE_OF_BIRTH_REQUIRED: "Date of Birth*",
  DEPOSIT_THRESHOLD_LIMIT: "Deposit Threshold Limit",
  CONTACT_EMAIL: "Contact Email*",
  SEARCH: "Search",
  MOBILE: "Mobile",
  CNIC: "CNIC",
  ADDRESS: "Address",
};

export const PLACEHOLDERS = {
  EMAIL: "Enter your email",
  NEW_EMAIL: "Enter New Email Address",
  EMAIL_EXAMPLE: "user@example.com",
  EMAIL_REGISTER: "name@example.com",
  PASSWORD: "Enter your password",
  CONFIRM_PASSWORD: "Enter your confirm password",
  FIRST_NAME: "John",
  LAST_NAME: "Doe",
  DOB: "dd/mm/yyyy",
  ROLE: "Role",
  VERIFICATION_CODE: "Enter verification code",
  CONTACT_NUMBER: "(+61) 3843 9876",
  CURRENT_PASSWORD: "Enter Current Password",
  PRICE: "0.00",
  BSB: "123-456",
  BANK_ACCOUNT_NUMBER: "123456789",
  BANK_ACCOUNT_TITLE: "John Doe",
  USER_NAME: "User Name",
  COINS: "Select coin",
  SELECT_COIN: "Select coin",
  TYPE_SELECT_COIN: "Type or select coin",
  ENTER_QUANTITY: "Enter quantity",
  A$100: "A$100",
  SEND_EMAIL: "Resend Email",
  APPROVE_REJECT: "Approve / Reject",
  NOTES: "Write Notes",
  VIDEO_LINK: "Video Link",
  THRESHOLD_LIMIT: "e.g, 10000",
  CONTACT_EMAIL: "Contact Email",
  SELECT_USER: "Type or select user",
  AMOUNT: "Enter Amount",
  REF_ID: "Enter Reference ID",
  ACCOUNT_NUMBER: "Enter Account#",
  API_KEY_NAME: "API Key Name",
  SET_PASSWORD: "Enter New Password",
  SET_CONFIRM_PASSWORD: "Re-Enter New Password",
  SET_EMAIL: "Enter email address",
  MOBILE: "Enter mobile number",
  CNIC: "Enter CNIC number",
  ADDRESS: "Enter home address",
};

export enum NAMES {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  MOBILE = "mobile",
  CNIC = "cnic",
  ADDRESS = "address",
}

export const BUTTON_TYPE = {
  SUBMIT: "submit",
  BUTTON: "button",
};

export const GENERIC_MESSAGES = {
  SOMETHING_WENT_WRONG: "Something went wrong",
  NO_DATA_AVAILABLE: "Sorry, no data available",
  NO_RESULTS_TO_DISPLAY: "No results to display",
  NO_DATA_TO_DISPLAY: "No results to display",
  ADMINS: "Admins",
  USERS: "Users",
  CREATE_ADMIN: "Create Admin",
  GENERATE_BANK_ACCOUNT: "Generate Bank Account",
  RESET: "Reset",
};

export const GENERIC_CONSTANTS = {
  DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  DATE_FORMAT: "YYYY-MM-DD",
};

export enum TooltipPosition {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

export enum METHODES {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export const ENCRYPTED_KEYS = {
  token: "X7gF9Lm",
  user: "r8kT2Vb",
  permissions: "W9hP1Qs",
  userInfo: "y3dN6Jw",
  loginKey: "L7kD5Xt",
  maintenanceDate: "T1wN6Qy",
};

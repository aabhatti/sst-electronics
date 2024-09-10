import moment from "moment";
import { GENERIC_CONSTANTS } from "@/utils/constants";
import { CUSTOM_TYPES } from "./constants";
import Tooltip from "../tooltip";

type Pagination = number[];

const shouldDataDisplay = (
  loading: boolean,
  tableBody: boolean,
  bodyData: any[]
): boolean => !loading && (tableBody || dataExists(bodyData));

const dataExists = (data: any[]): boolean => !!(data?.length > 0);

const rowDetails = (page: number, limit: number, total: number): string => {
  const startIndex = total && page > 0 ? (page - 1) * limit + 1 : 0;
  const endIndex = total && page > 0 ? Math.min(page * limit, total) : 0;

  return `Showing ${startIndex} to ${endIndex} of ${total} entries`;
};

const isPreviousEnabled = (pagination: Pagination, page: number): boolean =>
  pagination?.length > 0 && pagination[0] !== page;

const isForwardEnabled = (pagination: Pagination, page: number): boolean =>
  pagination?.length > 0 && pagination[pagination.length - 1] !== page;

const isCurrentEnabled = (page: number, number: number): boolean =>
  page !== number;

const isPageButtonEnabled = (page: number, number: number): boolean =>
  page === number || page === number - 1 || page === number + 1;

const getTextDisplay = (
  type: string,
  text: string = "",
  maxLength: number = 25
): JSX.Element | string => {
  let value: JSX.Element | string = "";
  if (type === CUSTOM_TYPES.DATE) {
    value = moment(text).format(GENERIC_CONSTANTS.DATE_TIME_FORMAT);
  } else if (type === CUSTOM_TYPES.STRING) {
    value = (
      <Tooltip text={text}>
        <span className="hover-overlay">
          {text?.length > maxLength
            ? `${text.substring(0, maxLength)}...`
            : text}
        </span>
      </Tooltip>
    );
  } else if (type === CUSTOM_TYPES.WALLET) {
    value = (
      <span>
        {text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
      </span>
    );
  }
  return value;
};

const isEllipsis = (text: string, maxLength: number = 25): boolean =>
  text?.length > maxLength;

const addEllipsis = (text: string, maxLength: number = 25): string => {
  return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

type Search = {
  prev: string;
  current: string;
};

const initialSearch: Search = {
  prev: "",
  current: "",
};

export {
  shouldDataDisplay,
  dataExists,
  rowDetails,
  isPreviousEnabled,
  isForwardEnabled,
  isCurrentEnabled,
  isPageButtonEnabled,
  getTextDisplay,
  addEllipsis,
  isEllipsis,
  initialSearch,
};

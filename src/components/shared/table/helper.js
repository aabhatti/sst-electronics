import moment from "moment";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { DATE_FORMAT } from "../../../utils/Constants";
import { CUSTOM_TYPES } from "./constants";

const shouldDataDisplay = (loading, tableBody, bodyData) =>
  !loading && (tableBody || dataExists(bodyData));

const dataExists = (data) => !!(data?.length > 0);

const rowDetails = (page, limit, total) => {
  const startIndex = total && page > 0 ? (page - 1) * limit + 1 : 0;
  const endIndex = total && page > 0 ? Math.min(page * limit, total) : 0;

  return `Showing ${startIndex} to ${endIndex} of ${total} entries`;
};

const isPreviousEnabled = (pagination, page) =>
  pagination?.length > 0 && pagination[0] !== page;

const isForwardEnabled = (pagination, page) =>
  pagination?.length > 0 && pagination[pagination.length - 1] !== page;

const isCurrentEnabled = (page, number) => page !== number;

const isPageButtonEnabled = (page, number) =>
  page === number || page === number - 1 || page === number + 1;

const getTextDisplay = (type, text = "", maxLength = 25) => {
  let value = "";
  if (type === CUSTOM_TYPES.DATE) {
    value = moment(text).format(DATE_FORMAT.REGULAR);
  } else if (type === CUSTOM_TYPES.STRING) {
    value = (
      <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
        <span className="hover-overlay">
          {text?.length > maxLength
            ? `${text.substring(0, maxLength)}...`
            : text}
        </span>
      </OverlayTrigger>
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

const isEllipsis = (text, maxLength = 25) => text?.length > maxLength;

const addEllipsis = (text, maxLength = 25) => {
  return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const initialSearch = {
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

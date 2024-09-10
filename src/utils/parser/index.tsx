import moment from "moment";
import { GENERIC_CONSTANTS } from "../constants";

export const formatDate = (date?: Date) => {
  return date ? moment(date).format(GENERIC_CONSTANTS.DATE_TIME_FORMAT) : "";
};

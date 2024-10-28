import * as z from "zod";
import { monthNames } from "../constants";

const dbId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Must be a 24-byte hexadecimal number");

const getDateNow = () => new Date();

const addMonthsToDate = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  let month = !isNaN(Number(months)) ? Number(months) : 0;
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};

const DayMonthYearDateFormate = (date: Date) => {
  date = new Date(date);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const MonthYearDateFormate = (date: Date) => {
  date = new Date(date);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const isArray = (value: any) => {
  return value && typeof value === "object";
};

const isString = (value: any) => {
  return typeof value === "string";
};

export {
  dbId,
  getDateNow,
  addMonthsToDate,
  MonthYearDateFormate,
  DayMonthYearDateFormate,
  isArray,
  isString,
};

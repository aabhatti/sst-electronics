import { ToastOptions, toast } from "react-toastify";

export const success = (value: string, option: ToastOptions = {}): void => {
  toast.success(value, option);
};

export const error = (value: string, option: ToastOptions = {}): void => {
  toast.error(value, option);
};

export const showError = (value: string, option: ToastOptions = {}): void => {
  toast.error(value, option);
};

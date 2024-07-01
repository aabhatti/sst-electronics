"use client";
import React, {
  useState,
  ReactNode,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import TextField from "./TextField";
import { TYPE } from "../../../utils/constants";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface TextFieldProps {
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  icon?: string;
  secondaryIcon?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  loading?: boolean;
  startGroupText?: string;
  endGroupText?: string;
  [key: string]: any; // To allow additional props
}

const TextFieldPassword: React.FC<TextFieldProps> = ({
  name,
  className = "",
  placeholder,
  label,
  onChange,
  error,
  icon,
  secondaryIcon,
  onBlur,
  disabled = false,
  loading = false,
  startGroupText = "",
  endGroupText = "",
  ...props
}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <>
      <TextField
        {...props}
        name={name}
        type={isPasswordShow ? TYPE.TEXT : TYPE.PASSWORD}
        className={className}
        placeholder={placeholder}
        label={label}
        onChange={onChange}
        error={error}
        icon={icon}
        onBlur={onBlur}
        disabled={disabled}
        loading={loading}
        startGroupText={startGroupText}
        endGroupText={endGroupText}
        secondaryIcon={
          <div className="flex items-center">
            {secondaryIcon && <span className="mr-2">{secondaryIcon}</span>}

            <div
              className="cursor-pointer"
              onClick={() => {
                setIsPasswordShow((prev) => !prev);
              }}
            >
              {isPasswordShow ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
        }
      />
    </>
  );
};

export default TextFieldPassword;

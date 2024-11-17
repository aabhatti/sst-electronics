import React, { ReactNode, ChangeEventHandler, FocusEventHandler } from "react";
import Spinner from "../spinner";

interface TextFieldProps {
  type?: string;
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
  required?: boolean;
  [key: string]: any; // To allow additional props
}

const TextField: React.FC<TextFieldProps> = ({
  type = "button",
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
  required = false,
  ...props
}) => {
  return (
    <>
      {label && (
        <label className="text-base-primary text-base block w-full mb-1">
          {label}
          {required && <span className="required">{"*"}</span>}
        </label>
      )}

      <div className="flex items-center relative">
        {icon && (
          <div className="absolute top-[12px] left-[10px] z-10">{icon}</div>
        )}

        {startGroupText && (
          <span className="p-4 rounded-l-lg">{startGroupText}</span>
        )}
        <input
          disabled={disabled}
          type={type}
          name={name}
          className={`text-sm text-base-primary border-2 border-base-primary ${
            !startGroupText && "rounded-l-lg"
          } ${
            !endGroupText && "rounded-r-lg"
          } outline-none focus:ring-primary focus:border-primary block w-full p-2 ${
            secondaryIcon && "pr-10"
          } ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />

        {secondaryIcon && (
          <div className="absolute top-[12px] right-[10px] z-10">
            {secondaryIcon}
          </div>
        )}

        {!loading && endGroupText && (
          <div className="p-4 rounded-r-lg">{endGroupText}</div>
        )}

        {loading && (
          <span className="input-group-text">
            <Spinner color={"primary"} />
          </span>
        )}
      </div>

      <p className="text-fontDanger text-sm m-0">{error}&nbsp;</p>
    </>
  );
};

export default TextField;

import React from "react";
import Spinner from "../spinner";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  loading,
  className = "",
  onClick,
  variant = "btn-primary",
}) => {
  return (
    <>
      <button
        type={type}
        className={`text-secondary bg-primary hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${variant} ${className}`}
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner color="" className="w-[18px] h-[18px]" />
          </div>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default Button;

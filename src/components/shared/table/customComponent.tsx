import React, { ReactElement } from "react";

interface CustomComponentProps {
  component: ReactElement;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  component,
  onClick,
  disabled = false,
}) => {
  return React.cloneElement(component, {
    onClick: disabled ? undefined : onClick,
    disabled,
  });
};

export default CustomComponent;

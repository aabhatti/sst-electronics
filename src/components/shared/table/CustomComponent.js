import React from "react";

const CustomComponent = ({ component, onClick }) => {
  return React.cloneElement(component, { onClick });
};

export default CustomComponent;

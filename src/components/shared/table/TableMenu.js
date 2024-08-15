import React from "react";
import { Dropdown } from "react-bootstrap";

const TableMenu = ({ list = [], onClick, disabled = false }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        className="dropdown-toggle-icon light sharp i-false c-pointer"
        disabled={disabled}
      >
        <i className="fa fa-ellipsis-v fs-18" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {list?.map((menuItem, key) => (
          <Dropdown.Item
            key={key}
            onClick={(e) => {
              e.stopPropagation();
              onClick(menuItem.value);
            }}
          >
            {menuItem.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableMenu;

import React, { useState } from "react";

interface TooltipProps {
  text: string; // The text to display inside the tooltip
  children: React.ReactNode; // The element that the tooltip is attached to
  position?: "top" | "right" | "bottom" | "left"; // Tooltip position relative to the element
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  const tooltipPositionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div
          className={`absolute z-10 p-2 text-white bg-gray-800 rounded shadow-lg whitespace-nowrap ${tooltipPositionClasses[position]}`}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;

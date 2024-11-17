import React, { memo } from "react";
import { GENERIC } from "@/utils/constants";
import Spinner from "../spinner";

// Define types for props
interface Option {
  id: string;
  url?: string;
  [key: string]: any;
}

interface RenderSingleListProps {
  loading: boolean;
  options: Option[] | [];
  renderKey: string;
  onSelect: (o: Option) => void;
  selected: string | undefined;
  blurRef: React.MutableRefObject<boolean>;
}

const RenderSingleList: React.FC<RenderSingleListProps> = ({
  loading = false,
  options = [],
  renderKey,
  onSelect,
  selected,
  blurRef,
}) => {
  const onSelectOption = (e: any, option: Option) => {
    e?.stopPropagation();
    e?.preventDefault();
    onSelect(option);
  };

  return (
    <div className="autocomplete-options-cont">
      <div className="render-options-cont" style={{ backgroundColor: "white" }}>
        {loading && (
          <div className="loading-cont">
            <span className="text-sm text-basePrimary">{GENERIC.LOADING}</span>
            <Spinner className="!w-4 !h-4" />
          </div>
        )}

        {!loading && options?.length === 0 && (
          <span className="px-2 text-sm text-basePrimary">
            {GENERIC.NO_OPTIONS}
          </span>
        )}

        {!loading && options.length > 0 && (
          <ul className="options">
            {options.map((option, index) => {
              const optionName = (option && option[renderKey]) || "";
              return (
                <li
                  key={option.id + index}
                  className={`rendered-option ${
                    option?.id === selected ? "selected" : ""
                  }`}
                  onMouseDown={() => {
                    blurRef.current = false;
                  }}
                  onClick={(e) => onSelectOption(e, option)}
                >
                  <div className="option-name">
                    <p>{optionName}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(RenderSingleList);

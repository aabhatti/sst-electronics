// import React, { useState, useEffect, memo, useRef, useCallback } from "react";
// import { FaCheck } from "react-icons/fa";
// import { GENERIC, TYPE } from "@/utils/constants";
// import {
//   handleChangeValues,
//   handleChangeValue,
//   handleFilterOptions,
//   handleSelectedOptions,
//   handleKeyDownBackspace,
//   handleOpenClose,
// } from "./helper";
// import { useOutsideClick } from "../blurHook";

// // Define types for props
// interface Option {
//   id: string;
//   url?: string;
//   [key: string]: any;
// }

// interface AutoCompleteProps {
//   id?: string;
//   name?: string;
//   label?: string;
//   placeholder?: string;
//   multiple?: boolean;
//   required?: boolean;
//   fullWidth?: boolean;
//   renderKey?: string;
//   loading?: boolean;
//   disabled?: boolean;
//   isIcon?: React.ReactNode;
//   heading?: string;
//   data?: Option[] | [];
//   value?: Option[];
//   onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onInputChange: (value: string) => void;
//   onChange: (value: any) => void;
//   onBlur?: () => void;
//   startAdornment?: React.ReactNode;
//   endAdornment?: React.ReactNode;
//   touch?: boolean;
//   error?: string;
//   labelClasses?: string;
//   helperText?: string;
//   expandIcon?: boolean;
//   textFieldClassName?: string;
//   [key: string]: any;
// }

// const AutoComplete: React.FC<AutoCompleteProps> = ({
//   id = "",
//   name = "",
//   label = "",
//   placeholder = "type here",
//   multiple = false,
//   required = false,
//   fullWidth = true,
//   renderKey = GENERIC._NAME,
//   loading = false,
//   disabled = false,
//   isIcon = null,
//   heading = "",
//   data = [],
//   value = [],
//   onTextChange = null,
//   onInputChange = () => {},
//   onChange = () => {},
//   onBlur = () => {},
//   startAdornment = "",
//   endAdornment = "",
//   touch,
//   error,
//   labelClasses = "",
//   helperText = "",
//   expandIcon = false,
//   textFieldClassName = "",
//   ...props
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const blurRef = useRef(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [obj, setObj] = useState({
//     open: false,
//     val: (value && value[0] && value[0][renderKey]) || "",
//     options: data,
//     selectedOptions: value && value[0] && value[0][renderKey] ? value : [],
//     selectedIds: [] as string[],
//   });

//   const containsImage =
//     data?.length > 0
//       ? data.filter((row) => row?.url)?.length > 0
//         ? true
//         : false
//       : false;

//   useEffect(() => {
//     if (multiple) onChangeValues(data, value, renderKey);
//     else onChangeValue(data, value, renderKey);
//   }, [data, value, renderKey, multiple]);

//   const onChangeValues = useCallback(
//     (data: Option[], value: Option[], renderKey: string) =>
//       handleChangeValues(data, value, renderKey, setObj),
//     [setObj]
//   );

//   const onChangeValue = useCallback(
//     (data: Option[], value: Option[], renderKey: string) =>
//       handleChangeValue(data, value, renderKey, setObj),
//     [setObj]
//   );

//   const onFilterOptions = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       onInputChange(e.target.value);
//       if (onTextChange) {
//         onTextChange(e);
//         setObj((prev) => ({
//           ...prev,
//           val: e.target.value,
//         }));
//       } else {
//         handleFilterOptions(e, renderKey, multiple, data, onChange, setObj);
//       }
//     },
//     [data, multiple, onChange, renderKey, setObj, onTextChange, onInputChange]
//   );

//   const onSelectedOptions = useCallback(
//     (option: Option) =>
//       handleSelectedOptions(
//         option,
//         renderKey,
//         multiple,
//         data,
//         onChange,
//         setObj
//       ),
//     [data, multiple, onChange, renderKey, setObj]
//   );

//   const onKeyDownBackspace = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) =>
//       handleKeyDownBackspace(event, obj, multiple, renderKey, setObj),
//     [multiple, obj.selectedIds.length, obj?.val, renderKey, setObj]
//   );

//   const onOpenClose = useCallback(
//     () =>
//       handleOpenClose(
//         obj.open,
//         value,
//         data,
//         multiple,
//         renderKey,
//         inputRef,
//         blurRef,
//         setObj
//       ),
//     [obj.open, data, multiple, renderKey, value, inputRef?.current, setObj]
//   );

//   useOutsideClick(ref, () => {
//     if (obj?.open)
//       handleOpenClose(
//         obj.open,
//         value,
//         data,
//         multiple,
//         renderKey,
//         inputRef,
//         blurRef,
//         setObj
//       );
//   });

//   const selection = obj?.open ? obj?.selectedOptions : value;

//   return (
//     <>
//       <div className={`autocomplete-cont`} ref={ref}>
//         <div
//           className={`autocomplete-input-cont ${
//             obj?.open ? "open" : ""
//           }  ${textFieldClassName}`}
//         >
//           <div className="start-endornment">
//             <div className="label-border mr-2">
//               {label && (
//                 <p className={`label ${labelClasses}`}>
//                   {required && <span className="required">{"*"}</span>}
//                   {label}
//                 </p>
//               )}
//             </div>
//             {heading && (
//               <span className="text-gray-400 py-2 pl-5">{heading}</span>
//             )}
//             {startAdornment}
//           </div>

//           <div
//             className={`input-cont text-sm text-base-primary border-2 border-base-primary bg-white ${
//               !startAdornment && "rounded-l-lg"
//             } ${
//               !endAdornment && "rounded-r-lg"
//             } outline-none focus:ring-primary focus:border-primary block w-full p-2 ${textFieldClassName}`}
//           >
//             {multiple && (
//               <>
//                 {selection?.length > 0 &&
//                   selection.map((option, index) => (
//                     <span
//                       key={option.id + index}
//                       className="selected-option-chip border border-[#E2E4E9]"
//                     >
//                       {containsImage && (
//                         <span className="autocomplete-chip !bg-gray-500 mr-2">
//                           {option?.url ? (
//                             <img
//                               src={option.url}
//                               alt="no image"
//                               className="autocomplete-chip"
//                             />
//                           ) : (
//                             <p className="!bg-gray-500 font-semibold text-white text-sm">
//                               {option && option[renderKey]
//                                 ? option[renderKey][0]
//                                 : ""}
//                             </p>
//                           )}
//                         </span>
//                       )}
//                       <span className="option-name">
//                         {option ? option[renderKey] : ""}
//                       </span>
//                     </span>
//                   ))}
//               </>
//             )}

//             <input
//               className="autocomplete-text-field"
//               disabled={disabled}
//               type={TYPE.TEXT}
//               id={id}
//               name={name}
//               ref={inputRef}
//               value={obj?.val}
//               placeholder={placeholder}
//               onKeyDown={onKeyDownBackspace}
//               onChange={onFilterOptions}
//               onFocus={() =>
//                 setObj((prev) => ({
//                   ...prev,
//                   open: true,
//                 }))
//               }
//               onBlur={(e) => {
//                 if (!multiple && blurRef?.current) {
//                   setObj((prev) => ({
//                     ...prev,
//                     open: false,
//                     val: (value && value[0] && value[0][renderKey]) || "",
//                     options: data,
//                   }));
//                 }
//               }}
//             />
//           </div>
//           {expandIcon && !disabled && (
//             <div className="end-endornment">
//               {endAdornment}
//               <span
//                 onMouseDown={() => {
//                   blurRef.current = false;
//                 }}
//                 className="open-close"
//                 onClick={onOpenClose}
//               />
//             </div>
//           )}
//         </div>

//         {obj?.open && (
//           <div className="autocomplete-options-cont">
//             <div
//               className="render-options-cont"
//               style={{ backgroundColor: "white" }}
//             >
//               {loading && (
//                 <div className="loading-cont">
//                   <span>{GENERIC.LOADING}</span>
//                 </div>
//               )}

//               {!loading && obj?.options.length > 0 && (
//                 <ul className="options">
//                   {obj?.options.map((option, index) => {
//                     const optionName = (option && option[renderKey]) || "";
//                     const key = optionName.toLowerCase();
//                     const isSelected =
//                       key &&
//                       obj.selectedOptions?.length > 0 &&
//                       obj?.selectedOptions.find(
//                         (selected) => key === selected[renderKey]?.toLowerCase()
//                       );
//                     return (
//                       <li
//                         {...props}
//                         key={option.id + index}
//                         className={`rendered-option ${
//                           isSelected ? "selected" : ""
//                         }`}
//                         onMouseDown={() => {
//                           blurRef.current = false;
//                         }}
//                         onClick={(e) => {
//                           e?.stopPropagation();
//                           e?.preventDefault();
//                           onSelectedOptions(option);
//                           blurRef.current = true;
//                         }}
//                       >
//                         {multiple && (
//                           <span
//                             className={`multi-option-check ${
//                               isSelected ? "checked" : ""
//                             }`}
//                           >
//                             {isSelected && (
//                               <FaCheck
//                                 size={10}
//                                 style={{ color: "white" }}
//                                 className="mx-1"
//                               />
//                             )}
//                           </span>
//                         )}
//                         <div className="option-name">
//                           <p>{optionName}</p>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default memo(AutoComplete);
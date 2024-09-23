// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import AutoComplete from "@/components/shared/autocomplete";
// import { initialUsersValue, queryUsers } from "./helper";
// import { debounce } from "lodash";
// import { PLACEHOLDERS } from "@/utils/constants";

// // Define the types for the props
// interface UserAutoCompleteProps {
//   name?: string;
//   label?: string;
//   error?: string;
//   touch?: boolean;
//   helperText?: string;
//   onChange: (value: any) => void;
//   onBlur: () => void;
//   value?: any;
//   disabled?: boolean;
// }

// const UserAutoComplete: React.FC<UserAutoCompleteProps> = ({
//   name = "user",
//   label = "",
//   error = "",
//   touch,
//   helperText,
//   onChange = () => {},
//   onBlur = () => {},
//   value = null,
//   disabled = false,
// }) => {
//   const [data, setData] = useState(initialUsersValue());

//   useEffect(() => {
//     console.log("data.search>>>>>>", data.search);

//     const search = data?.search.trim();
//     console.log("search>>>>>>", search);
//     if (search && search.length > 1) {
//       queryUsers({ query: search, setData: setData });
//     }
//     // eslint-disable-next-line
//   }, [data.search]);

//   const handleSearch = useCallback(
//     (search: string) => setData((prev) => ({ ...prev, search })),
//     [setData]
//   );

//   const debounceSearch = useMemo(
//     () => debounce((search: string) => handleSearch(search), 1000),
//     [handleSearch]
//   );

//   return (
//     <AutoComplete
//       data={data?.list}
//       name={name}
//       label={label}
//       labelClasses="!w-fit"
//       placeholder={PLACEHOLDERS.USER_ID}
//       error={error}
//       touch={touch}
//       helperText={helperText}
//       onInputChange={debounceSearch}
//       onChange={onChange}
//       onBlur={onBlur}
//       value={value}
//       disabled={disabled}
//     />
//   );
// };

// export default UserAutoComplete;

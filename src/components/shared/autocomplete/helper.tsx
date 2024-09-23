// import { GENERIC } from "@/utils/constants";

// // Define types for the common parameters
// interface Option {
//   [key: string]: any;
// }

// type SetObjFunction = React.Dispatch<React.SetStateAction<any>>;

// export const handleChangeValues = (
//   data: Option[],
//   value: Option[],
//   renderKey: string,
//   setObj: SetObjFunction
// ) => {
//   setObj((prev: any) => ({
//     ...prev,
//     val: prev?.val || "",
//     options: data,
//     selectedOptions: value && value.length > 0 ? value : [],
//     selectedIds:
//       value && value.length > 0
//         ? value.map((o) => (o && o[renderKey]?.toLowerCase()) || "")
//         : [],
//   }));
// };

// // When multiple is false, this function is called to set the object
// export const handleChangeValue = (
//   data: Option[],
//   value: Option[],
//   renderKey: string,
//   setObj: SetObjFunction
// ) => {
//   setObj((prev: any) => ({
//     ...prev,
//     val: (value && value[0] && value[0][renderKey]) || prev?.val || "",
//     options: data,
//     selectedOptions: value && value[0] && value[0][renderKey] ? value : [],
//     selectedIds:
//       value && value[0] && value[0][renderKey]
//         ? [value[0][renderKey].toLowerCase()]
//         : [],
//   }));
// };

// export const handleFilterOptions = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   renderKey: string,
//   multiple: boolean,
//   data: Option[],
//   onChange: (value: Option[] | null) => void,
//   setObj: SetObjFunction
// ) => {
//   if (e.target.value) {
//     const value = e.target.value.toLowerCase();
//     setObj((prev: any) => ({
//       ...prev,
//       val: e.target.value,
//       options: data.filter(
//         (option) =>
//           option &&
//           option[renderKey] &&
//           option[renderKey].toLowerCase().includes(value)
//       ),
//     }));
//   } else {
//     if (multiple) {
//       let isEmpty = false;
//       setObj((prev: any) => {
//         isEmpty = !prev.val;
//         let newObj = {
//           ...prev,
//           val: e.target.value,
//           options: data,
//         };
//         if (isEmpty && prev.selectedIds.length > 0) {
//           const selectedIds = [...prev.selectedIds];
//           const key = selectedIds.pop();
//           const selectedOptions = prev.selectedOptions.filter(
//             (o: Option) => !(o && o[renderKey]?.toLowerCase() === key)
//           );
//           newObj = {
//             ...newObj,
//             selectedIds,
//             selectedOptions,
//           };
//         }
//         return newObj;
//       });
//     } else {
//       setObj((prev: any) => ({
//         ...prev,
//         val: e.target.value,
//         options: data,
//       }));
//       onChange(null);
//     }
//   }
// };

// export const handleSelectedOptions = (
//   option: Option,
//   renderKey: string,
//   multiple: boolean,
//   data: Option[],
//   onChange: (value: Option[]) => void,
//   setObj: SetObjFunction
// ) => {
//   const key = option[renderKey].toLowerCase();
//   if (multiple) {
//     setObj((prev: any) => {
//       let newObj = prev;
//       const exists = prev.selectedIds.includes(key);
//       if (exists) {
//         newObj = {
//           ...prev,
//           selectedIds: prev.selectedIds.filter((id: string) => id !== key),
//           selectedOptions: prev.selectedOptions.filter(
//             (o: Option) => o[renderKey].toLowerCase() !== key
//           ),
//         };
//       } else {
//         newObj = {
//           ...prev,
//           selectedIds: [...prev.selectedIds, key],
//           selectedOptions: [...prev.selectedOptions, option],
//         };
//       }
//       return {
//         ...newObj,
//         val: "",
//         options: data,
//       };
//     });
//   } else {
//     setObj((prev: any) => ({
//       ...prev,
//       open: false,
//     }));
//     onChange([option]);
//   }
// };

// export const handleKeyDownBackspace = (
//   event: React.KeyboardEvent<HTMLInputElement>,
//   obj: any,
//   multiple: boolean,
//   renderKey: string,
//   setObj: SetObjFunction
// ) => {
//   if (
//     event.key === GENERIC.BACKSPACE &&
//     !obj?.val &&
//     multiple &&
//     obj.selectedIds.length > 0
//   ) {
//     setObj((prev: any) => {
//       let newObj = prev;
//       if (obj.selectedIds.length === prev.selectedIds.length) {
//         const selectedIds = [...prev.selectedIds];
//         const key = selectedIds.pop();
//         const selectedOptions = prev.selectedOptions.filter(
//           (o: Option) => !(o && o[renderKey]?.toLowerCase() === key)
//         );
//         newObj = {
//           ...newObj,
//           selectedIds,
//           selectedOptions,
//         };
//       }
//       return newObj;
//     });
//   }
// };

// export const handleOpenClose = (
//   open: boolean,
//   value: Option[],
//   data: Option[],
//   multiple: boolean,
//   renderKey: string,
//   inputRef: React.RefObject<HTMLInputElement>,
//   blurRef: React.MutableRefObject<boolean>,
//   setObj: SetObjFunction
// ) => {
//   setObj((prev: any) => ({
//     ...prev,
//     open: !prev.open,
//     val: prev.open
//       ? (!multiple && value && value[0] && value[0][renderKey]) || ""
//       : prev.val,
//     options: data,
//     selectedOptions: prev.open ? [] : prev.selectedOptions,
//   }));
//   if (open) {
//     blurRef.current = true;
//   } else {
//     inputRef?.current?.focus();
//   }
// };

// export const handlePreFill = (
//   multiple: boolean,
//   value: Option[],
//   obj: any,
//   setObj: SetObjFunction
// ) => {
//   if (obj?.open && multiple) {
//     if (value?.length > 0) {
//       setObj((prev: any) => ({ ...prev, selectedOptions: value }));
//     } else {
//       setObj((prev: any) => ({ ...prev, selectedOptions: [] }));
//     }
//   }
// };

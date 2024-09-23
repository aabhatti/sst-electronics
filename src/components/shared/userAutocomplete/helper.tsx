// import { parseUrl } from "../../../config/helper";
// import { OFFSET, METHODES, HTTP_STATUS_CODE } from "../../../utils/constants";
// import { AdminUrls } from "../../../utils/routes";
// import { ExecuteHttpRequest } from "../../../config/ExecuteHttpRequest";

// interface Data {
//   id: string;
//   url?: string;
//   [key: string]: any;
// }

// interface StateData {
//   list: Data[] | [];
//   loading: boolean;
//   search: string;
// }

// // Define the types for the fetchUsers function parameters
// interface FetchParams {
//   query: string;
//   setData: React.Dispatch<React.SetStateAction<StateData>>;
// }

// // The initial state function
// export const initialUsersValue = (): StateData => {
//   return {
//     list: [],
//     loading: false,
//     search: "",
//   };
// };

// // The fetch on the base of search query (users) function
// export const queryUsers = async ({
//   query = "",
//   setData,
// }: FetchParams): Promise<void> => {
//   try {
//     setData((prev) => ({ ...prev, loading: true }));

//     const url = parseUrl(AdminUrls.queryUsers(query));
//     const resp = await ExecuteHttpRequest(METHODES.GET, url);

//     if (resp.status === HTTP_STATUS_CODE.OK) {
//       setData((prev) => ({
//         ...prev,
//         loading: false,
//         list: resp?.data?.list || [],
//       }));
//     } else {
//       setData((prev) => ({
//         ...prev,
//         loading: false,
//         list: [],
//       }));
//     }
//   } catch (err) {
//     setData((prev) => ({ ...prev, loading: false, list: [] }));
//   }
// };

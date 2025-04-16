"use server";
import { AdminUrls } from "@/utils/routes";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { METHODES } from "@/utils/constants";

export async function fetchDashboardSummary() {
  try {
    const url = AdminUrls.fetchDashboardSummary;
    return await ExecuteHttpRequest({ method: METHODES.GET, url }, true);
  } catch (error: any) {
    console.log("error in  fetchDashboardSummary server>>>", error);
    throw new Error(error);
  }
}

export async function queryFetchUsers(query: string) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.GET, url: AdminUrls.queryUsers(query) },
      null,
      true
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchUserDetails(id: string) {
  try {
    const url = AdminUrls.fetchUserDetails(id);
    return await ExecuteHttpRequest({ method: METHODES.GET, url }, true);
  } catch (error: any) {
    throw new Error(error);
  }
}

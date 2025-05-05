"use server";
import {
  ICreateDealInput,
  IFetchWithPageOffsetSearchParams,
} from "@/utils/interfaces";
import { AdminUrls } from "@/utils/routes";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { METHODES } from "@/utils/constants";

export async function fetchDeals({
  page,
  offset,
  search,
}: IFetchWithPageOffsetSearchParams) {
  try {
    const url = AdminUrls.fetchAllDeals(page, offset, search);
    return await ExecuteHttpRequest({ method: METHODES.GET, url });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createDeal(data: ICreateDealInput) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.POST, url: AdminUrls.createDeal },
      data
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchDealsByUserId(userId: string) {
  try {
    const url = AdminUrls.fetchDealsByUserId(userId);
    return await ExecuteHttpRequest({ method: METHODES.GET, url });
  } catch (error: any) {
    throw new Error(error);
  }
}

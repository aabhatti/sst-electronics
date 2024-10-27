"use server";
import {
  ICreateInstallmentInput,
  IFetchWithPageOffsetSearchParams,
} from "@/utils/interfaces";
import { AdminUrls } from "@/utils/routes";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { METHODES } from "@/utils/constants";

export async function fetchInstallments({
  page,
  offset,
  search,
}: IFetchWithPageOffsetSearchParams) {
  try {
    const url = AdminUrls.fetchAllInstallments(page, offset, search);
    return await ExecuteHttpRequest({ method: METHODES.GET, url }, true);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createInstallment(data: ICreateInstallmentInput) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.POST, url: AdminUrls.createInstallment },
      data,
      true
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

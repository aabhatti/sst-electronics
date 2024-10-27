"use server";
import { ICreateUserInput, IFetchUsersParams } from "@/utils/interfaces";
import { AdminUrls } from "@/utils/routes";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { METHODES } from "@/utils/constants";

export async function fetchUsers({ page, offset, search }: IFetchUsersParams) {
  try {
    const url = AdminUrls.fetchAllUsers(page, offset, search);
    return await ExecuteHttpRequest({ method: METHODES.GET, url }, true);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createUser(data: ICreateUserInput) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.POST, url: AdminUrls.createUser },
      data,
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

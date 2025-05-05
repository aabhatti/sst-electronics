"use server";
import {
  ICreateUserInput,
  IUpdateUserInput,
  IFetchUsersParams,
} from "@/utils/interfaces";
import { AdminUrls } from "@/utils/routes";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { METHODES } from "@/utils/constants";

export async function fetchUsers({ page, offset, search }: IFetchUsersParams) {
  try {
    const url = AdminUrls.fetchAllUsers(page, offset, search);
    return await ExecuteHttpRequest({ method: METHODES.GET, url });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createUser(data: ICreateUserInput) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.POST, url: AdminUrls.createUser },
      data
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUser(data: IUpdateUserInput) {
  try {
    return await ExecuteHttpRequest(
      { method: METHODES.PUT, url: AdminUrls.updateUser },
      data
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchUserById(id: string) {
  try {
    return await ExecuteHttpRequest({
      method: METHODES.GET,
      url: AdminUrls.fetchUserById(id),
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function queryFetchUsers(query: string) {
  try {
    return await ExecuteHttpRequest({
      method: METHODES.GET,
      url: AdminUrls.queryUsers(query),
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchUserDetails(id: string) {
  try {
    const url = AdminUrls.fetchUserDetails(id);
    return await ExecuteHttpRequest({ method: METHODES.GET, url });
  } catch (error: any) {
    throw new Error(error);
  }
}

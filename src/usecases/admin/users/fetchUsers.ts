import { UserRepository } from "../../../repositories/UserRepository";
import { IUser } from "../../../models/User";
import {
  UserMessages,
  HttpStatusCode,
  OFFSET_LIMIT,
} from "../../../../constants";
import { getPaginationWithTotalCountFacet } from "../../../../utils/facet";
import {
  getDatesSearchCondition,
  getUserSearchCondition,
} from "../../../../utils/searches";
import { userDealLookup } from "../../../../utils/lookUps";
import { userProject } from "../../../../utils/projects";

interface FetchUsersDeps {
  userRepository: UserRepository;
}

interface FetchUsersQuery {
  page?: string;
  offset?: string;
  searched?: string;
}

interface FetchUsersResponse {
  code: number;
  message: string;
  data: {
    list: IUser[];
    count: number;
  };
}

async function fetchUsers(
  query: FetchUsersQuery,
  { userRepository }: FetchUsersDeps
): Promise<FetchUsersResponse> {
  const { page, offset, searched } = query;
  const limit = offset ? parseInt(offset) : OFFSET_LIMIT;
  const pageLimit = page
    ? parseInt(page) === 1
      ? 0
      : (parseInt(page) - 1) * limit
    : 0;

  let obj: any = {};
  let condition: any = {};

  if (searched) {
    const dateSearch = getDatesSearchCondition(searched);
    const userSearch = getUserSearchCondition(searched);
    condition = {
      $and: [obj, { $or: [...userSearch, ...dateSearch] }],
    };
  }
  condition = { $match: condition };

  const facet = getPaginationWithTotalCountFacet({ pageLimit, limit });
  const pipeline = [condition, userDealLookup, userProject, facet];

  const users = await userRepository.findByAggregation(pipeline);

  return {
    code: HttpStatusCode.OK,
    message: UserMessages.USERS_FETCHED_SUCCESS,
    data: {
      list: users?.[0]?.paginatedData || [],
      count: users?.[0]?.totalCount?.[0]?.count || 0,
    },
  };
}

export { fetchUsers };

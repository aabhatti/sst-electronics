import { Types } from "mongoose";
import { UserRepository } from "../../../repositories/UserRepository";
import { DealRepository } from "../../../repositories/DealRepository";
import { UserMessages, HttpStatusCode, Roles } from "../../../../constants";
import { userDetailsProject } from "../../../../utils/projects";
import {
  userDealLookup,
  dealInstallmentLookup,
  dealReferencesLookup,
} from "../../../../utils/lookUps";

interface FetchUserDetailDeps {
  userRepository: UserRepository;
  dealRepository: DealRepository;
}

interface FetchUserDetailsResponse {
  code: number;
  message: string;
  data: {};
}

async function fetchUserDetails(
  id: string,
  { userRepository }: FetchUserDetailDeps
): Promise<FetchUserDetailsResponse> {
  const condition = {
    $match: { _id: new Types.ObjectId(id) },
  };

  const pipeline = [
    condition,
    userDealLookup,
    dealInstallmentLookup,
    dealReferencesLookup,
    userDetailsProject,
  ];

  let user = await userRepository.findByAggregation(pipeline);

  return {
    code: HttpStatusCode.OK,
    message: UserMessages.USER_DETAILS_FETCHED_SUCCESS,
    data: (user && user[0]) || null,
  };
}

export { fetchUserDetails };

import { DealRepository } from "../../../repositories/DealRepository";
import { IDeal } from "../../../models/Deal";
import { DealMessages, HttpStatusCode } from "../../../../constants";

interface FetchDeps {
  dealRepository: DealRepository;
}

interface FetchDealResponse {
  code: number;
  message: string;
  data: IDeal[];
}

async function fetchDealsByUserId(
  userId: string,
  { dealRepository }: FetchDeps
): Promise<FetchDealResponse> {
  const deals = await dealRepository.find({ userId });
  return {
    code: HttpStatusCode.OK,
    message: DealMessages.FETCHED_SUCCESS,
    data: deals,
  };
}

export { fetchDealsByUserId };

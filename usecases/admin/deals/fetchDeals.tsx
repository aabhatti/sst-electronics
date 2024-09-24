import { DealRepository } from "../../../repositories/DealRepository";
import { IDeal } from "../../../models/Deal";
import { DealMessages, HttpStatusCode, OFFSET_LIMIT } from "../../../constants";
import { getPaginationWithTotalCountFacet } from "../../../utils/facet";
import {
  getDatesSearchCondition,
  getDealSearchCondition,
} from "../../../utils/searches";
import { referenceOneLookup, referenceTwoLookup } from "../../../utils/lookUps";
import { dealProject } from "../../../utils/projects";
import {
  referenceOneAddField,
  referenceTwoAddField,
} from "../../../utils/addFields";

interface FetchDeps {
  dealRepository: DealRepository;
}

interface FetchQuery {
  page?: string;
  offset?: string;
  searched?: string;
}

interface FetchDealResponse {
  code: number;
  message: string;
  data: {
    list: IDeal[];
    count: number;
  };
}

async function fetchDeals(
  query: FetchQuery,
  { dealRepository }: FetchDeps
): Promise<FetchDealResponse> {
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
    const dataSearch = getDealSearchCondition(searched);
    condition = {
      $and: [obj, { $or: [...dataSearch, ...dateSearch] }],
    };
  }
  condition = { $match: condition };

  const facet = getPaginationWithTotalCountFacet({ pageLimit, limit });
  const pipeline = [
    condition,
    referenceOneLookup,
    referenceOneAddField,
    referenceTwoLookup,
    referenceTwoAddField,
    dealProject,
    facet,
  ];

  const records = await dealRepository.findByAggregation(pipeline);
  return {
    code: HttpStatusCode.OK,
    message: DealMessages.FETCHED_SUCCESS,
    data: {
      list: records?.[0]?.paginatedData || [],
      count: records?.[0]?.totalCount?.[0]?.count || 0,
    },
  };
}

export { fetchDeals };

import { InstallmentRepository } from "../../../repositories/InstallmentRepository";
import { IInstallment } from "../../../models/Installment";
import {
  InstallmentMessages,
  HttpStatusCode,
  OFFSET_LIMIT,
} from "../../../constants";
import { getPaginationWithTotalCountFacet } from "../../../utils/facet";
import {
  getDatesSearchCondition,
  getInstallmentSearchCondition,
} from "../../../utils/searches";
import { installmentProject } from "../../../utils/projects";

interface FetchDeps {
  installmentRepository: InstallmentRepository;
}

interface FetchQuery {
  page?: string;
  offset?: string;
  searched?: string;
}

interface FetchInstallmentsResponse {
  code: number;
  message: string;
  data: {
    list: IInstallment[];
    count: number;
  };
}

async function fetchInstallments(
  query: FetchQuery,
  { installmentRepository }: FetchDeps
): Promise<FetchInstallmentsResponse> {
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
    const dataSearch = getInstallmentSearchCondition(searched);
    condition = {
      $and: [obj, { $or: [...dataSearch, ...dateSearch] }],
    };
  }
  condition = { $match: condition };
  const facet = getPaginationWithTotalCountFacet({ pageLimit, limit });
  const pipeline = [condition, installmentProject, facet];

  const records = await installmentRepository.findByAggregation(pipeline);
  return {
    code: HttpStatusCode.OK,
    message: InstallmentMessages.FETCHED_SUCCESS,
    data: {
      list: records?.[0]?.paginatedData || [],
      count: records?.[0]?.totalCount?.[0]?.count || 0,
    },
  };
}

export { fetchInstallments };

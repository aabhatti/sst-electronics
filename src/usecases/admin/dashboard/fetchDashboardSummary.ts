import { GenericMessages, HttpStatusCode } from "../../../../constants";
import { DealRepository } from "@/repositories/DealRepository";
import { InstallmentRepository } from "@/repositories/InstallmentRepository";

interface FetchDashboardSummaryDeps {
  dealRepository: DealRepository;
  installmentRepository: InstallmentRepository;
}

interface FetchDashboardSummaryResponse {
  code: number;
  message: string;
  data: {
    summary: {
      totalAmountInvest: number;
      totalAmountReceived: number;
      totalAmountPending: number;
    };
    installment: {
      totalNoOfInstallments: number;
      totalPaidInstallments: number;
      totalDueInstallments: number;
    };
    deal: {
      totalNoOfDeal: number;
      totalDealClose: number;
      totalDealOpen: number;
    };
  };
}

async function fetchDashboardSummary({
  dealRepository,
  installmentRepository,
}: FetchDashboardSummaryDeps): Promise<FetchDashboardSummaryResponse> {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalAmountInvest: { $sum: "$worth" },
        totalAmountReceived: { $sum: "$paid" },
        totalAmountPending: { $sum: "$due" },
        totalNoOfInstallments: { $sum: "$noOfInstallments" },
        totalPaidInstallments: { $sum: "$paidInstallments" },
        totalNoOfDeal: { $sum: 1 },
        totalDealClose: {
          $sum: {
            $cond: [{ $eq: ["$paidInstallments", "$noOfInstallments"] }, 1, 0],
          },
        },
        totalDealOpen: {
          $sum: {
            $cond: [{ $ne: ["$paidInstallments", "$noOfInstallments"] }, 1, 0],
          },
        },
      },
    },
    {
      $addFields: {
        totalDueInstallments: {
          $subtract: ["$totalNoOfInstallments", "$totalPaidInstallments"],
        },
      },
    },
    {
      $project: {
        _id: 0,
        summary: {
          totalAmountInvest: "$totalAmountInvest",
          totalAmountReceived: "$totalAmountReceived",
          totalAmountPending: "$totalAmountPending",
        },
        installment: {
          totalNoOfInstallments: "$totalNoOfInstallments",
          totalPaidInstallments: "$totalPaidInstallments",
          totalDueInstallments: "$totalDueInstallments",
        },
        deal: {
          totalNoOfDeal: "$totalNoOfDeal",
          totalDealClose: "$totalDealClose",
          totalDealOpen: "$totalDealOpen",
        },
      },
    },
  ];

  const result = await dealRepository.findByAggregation(pipeline);

  return {
    code: HttpStatusCode.OK,
    message: GenericMessages.RECORD_FETCHED_SUCCESSFULLY,
    data: result[0],
  };
}

export { fetchDashboardSummary };

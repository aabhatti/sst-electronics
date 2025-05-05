import { allowedAdmins } from "@/config";
import { GenericMessages, HttpStatusCode } from "../../../../constants";
import { DealRepository } from "@/repositories/DealRepository";
import { InstallmentRepository } from "@/repositories/InstallmentRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { IJwtPayload } from "@/utils/interfaces";
import { NotFound } from "../../../../errors";
import { Types } from "mongoose";

interface FetchDashboardSummaryDeps {
  userRepository: UserRepository;
  dealRepository: DealRepository;
  installmentRepository: InstallmentRepository;
}

interface FetchDashboardSummaryResponse {
  code: number;
  message: string;
  data: {
    // summary: {
    //   totalAmountInvest: number;
    //   totalAmountReceived: number;
    totalAmountPending: number;
    // };
    // installment: {
    //   totalNoOfInstallments: number;
    //   totalPaidInstallments: number;
    totalDueInstallments: number;
    // };
    // deal: {
    //   totalNoOfDeal: number;
    //   totalDealClose: number;
    totalDealOpen: number;
    // };
  };
}

async function fetchDashboardSummary(
  jwt: IJwtPayload,
  {
    userRepository,
    dealRepository,
    installmentRepository,
  }: FetchDashboardSummaryDeps
): Promise<FetchDashboardSummaryResponse> {
  const user = await userRepository.findById(jwt.id);
  if (!(user && user.email)) {
    throw new NotFound(GenericMessages.UNABLE_TO_FIND_RECORD);
  }
  const isAdmin = allowedAdmins?.includes(user.email);

  const pipeline: any[] = [
    {
      $match: {
        $expr: { $ne: ["$paidInstallments", "$noOfInstallments"] },
      },
    },
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
        // summary: {
        //   totalAmountInvest: "$totalAmountInvest",
        //   totalAmountReceived: "$totalAmountReceived",
        totalAmountPending: "$totalAmountPending",
        // },
        // installment: {
        //   totalNoOfInstallments: "$totalNoOfInstallments",
        //   totalPaidInstallments: "$totalPaidInstallments",
        totalDueInstallments: "$totalDueInstallments",
        // },
        // deal: {
        //   totalNoOfDeal: "$totalNoOfDeal",
        //   totalDealClose: "$totalDealClose",
        totalDealOpen: "$totalDealOpen",
        // },
      },
    },
  ];

  if (!isAdmin) {
    pipeline.unshift({
      $match: {
        userId: user.id ? new Types.ObjectId(user.id) : null,
      },
    });
  }

  const result = await dealRepository.findByAggregation(pipeline);
  return {
    code: HttpStatusCode.OK,
    message: GenericMessages.RECORD_FETCHED_SUCCESSFULLY,
    data: result[0],
  };
}

export { fetchDashboardSummary };
